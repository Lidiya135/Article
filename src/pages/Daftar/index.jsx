import { useEffect, useState } from "react";
import styles from "./daftar.module.css";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import edit from "../../assets/edit.png";
import del from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment/moment";

export default function Daftar() {
  const [data, setData] = useState([]);

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

  const deleteData = (e, id) => {
    Swal.fire({
      title: "Delete Article",
      text: "Are you sure you want to delete it? You can't undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://api-trials.x5.com.au/api/articles/${id}`)
          .then((res) => {
            console.log("delete success");
            console.log(res);
            getData();
            Swal.fire({
              title: "Deleted!",
              text: "Your article has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log("delete fail");
            console.log(err);
          });
      }
    });
  };

  return (
    <div className={styles.content}>
      <Sidebar />
      <div>
        <Navbar />
        <div className={styles.boxPage}>
          <Card />
          <div className={styles.daftar}>
            {/* <Card /> */}
            <div className={styles.search}>
              <input
                className={styles.bxsearch}
                type="search"
                placeholder="Type here to search"
              />
              <div className={styles.btn}>
                <input type="date" value="2023" className={styles.date} />
                <Link to={`/Tambah`}>
                  <input type="submit" value="+ Add" />
                </Link>
              </div>
            </div>
            <div className={styles.list}>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Tittle</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
                {data.articles?.map((p) => (
                  <tbody key={p.id}>
                    <tr>
                      <td>{moment.utc(p.created_at).format("DD/MM/YYYY")}</td>
                      <td>{p.title}</td>
                      <td style={{ width: "35%" }}>{p.content}</td>
                      <td>
                        <Link to={`/ubah/${p.id}`}>
                          <img src={edit} data={p} />
                        </Link>
                        <img src={del} onClick={(e) => deleteData(e, p.id)} />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
