import React, { useEffect, useState } from "react";

import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieForm from "./MovieForm";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../apicalls/movies";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import DeleteMovieModal from "./MovieDelete";
// import { Button } from "antd/es/radio";

const movies = [
  {
    key: "1",
    poster: "Image1",
    movieName: "Mastaney",
    description:
      "Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ",
    duration: 120,
    genre: "Action",
    language: "Hindi",
    releaseDate: "Oct  25, 2023",
  },
  {
    key: "2",
    poster: "Image2",
    movieName: "Mastaney",
    description:
      "Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ",
    duration: 120,
    genre: "Action",
    language: "Hindi",
    releaseDate: "Oct  25, 2023",
    action: "Delete",
  },
];

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
    },
    {
      title: "Movie Name",
      dataIndex: "movieName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              style={{ marginLeft: "4px" }}
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie_${item._id}` };
      })
    );
    dispatch(hideLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        // className="d-flex justify-content-end"
        style={{ display: "flex", justifyContent: "end", marginBlock: "8px" }}
      >
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Movie
        </Button>
      </div>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
