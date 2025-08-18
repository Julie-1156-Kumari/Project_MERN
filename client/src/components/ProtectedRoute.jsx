import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading} from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/");
      },
    },

    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                console.log("User: ", user)

                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },

        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const cleanUpAndRedirect = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getValidUser = async () => {
     try {
      let result;
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
    } catch (error) {
      message.error(error?.response?.data?.message || error.message);
    }
  };

  // console.log("USER =>", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
