import { useState, useEffect } from "react";
import styles from "./ubah.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Card from "../../components/card";

export default function Ubah() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id, "my id detail");

  useEffect(() => {
    axios
      .get(`https://api-trials.x5.com.au/api/articles/${id}`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data);
        res.data && setData(res.data);
        console.log(data?.title, "my id dataa/ssssss");
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);

  console.log(data.title, "my id dataa");

  const [inputData, setInputData] = useState({
    title: data?.title,
    content: data?.content,
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputData.title);
    formData.append("content", inputData.content);
    axios
      .post(`https://api-trials.x5.com.au/api/articles/${id}`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        Swal.fire("Success", "Post success", "success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Warning", "Post failed", "error");
      });
  };

  return (
    <div className={styles.content}>
      <Sidebar />
      <div>
        <Navbar />
        <div className={styles.boxPage}>
          <Card />
          <div className={styles.contentTambah}>
            <h3>Edit {id} </h3>
            <hr />
            <form onSubmit={updateData}>
              <p>Tittle</p>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => handleChange(e)}
                value={inputData.title}
                placeholder=""
              ></input>
              <p>Content</p>
              <textarea
                id="content"
                name="content"
                onChange={(e) => handleChange(e)}
                value={inputData.name}
                type="text"
              ></textarea>
              <br />
              <button type="submit" onClick={updateData}>
                Save
              </button>
              <button type="submit" style={{ backgroundColor: "red" }}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
