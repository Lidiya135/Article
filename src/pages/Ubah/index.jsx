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
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    id: id,
    title: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get(`https://api-trials.x5.com.au/api/articles/${id}`)
      .then((res) => {
        setInputData({
          ...inputData,
          title: res.data.data.title,
          content: res.data.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateData = async (e) => {
    e.preventDefault();
    axios
      .put(`https://api-trials.x5.com.au/api/articles/${id}`, inputData)
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
      <div className={styles.navSide}>
        <Sidebar />
        <Navbar />
      </div>
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
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
              value={inputData.title}
            ></input>
            <p>Content</p>
            <textarea
              id="content"
              name="content"
              onChange={(e) =>
                setInputData({ ...inputData, content: e.target.value })
              }
              value={inputData.content}
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
  );
}
