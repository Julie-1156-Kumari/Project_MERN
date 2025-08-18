import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users"; 

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage(); 

  const onFinish = async (values) => {
    try {
      const res = await LoginUser(values);

      const { message, data } = res; // Destructure the message and data from the response
      if (res.success) {
       messageApi.open({
          type: "success",
          content: message, 
       });

       console.log(message);

       localStorage.setItem("token", data);

        navigate("/");
      } else {
        const { message } = res?.response?.data || {}; 

        messageApi.open({
          type: "error",
          content: message,
        });
        console.error(message);
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.message, // Display generic error message
      });
    }
  };

  return (
    
    <div>

      {contextHolder}

      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                ></Input>
              </Form.Item>             

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Login;
