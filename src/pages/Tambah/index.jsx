import { useState, useEffect } from "react";
import styles from "./tambah.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Card from "../../components/card";

export default function Tambah() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get(`https://api-trials.x5.com.au/api/articles`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const datas = data.article;
  console.log(datas, "ppppppppppp");

  const [inputData, setInputData] = useState({
    title: datas?.title,
    content: datas?.content,
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputData.title);
    formData.append("content", inputData.content);
    axios
      .post(`https://api-trials.x5.com.au/api/articles`, formData, {
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
            <h3>Add</h3>
            <hr />
            <form onSubmit={postData}>
              <p>Tittle</p>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => handleChange(e)}
                value={inputData.title}
                placeholder="Type Your Title"
              ></input>
              <p>Content</p>
              <textarea
                id="content"
                name="content"
                onChange={(e) => handleChange(e)}
                value={inputData.name}
                placeholder="Type your Content"
                type="text"
              ></textarea>
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
