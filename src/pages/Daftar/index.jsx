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
  const [inputData, setInputData] = useState({
    search: "",
  });
  const [page, setPage] = useState(1);

  const getData = () => {
    axios 
      .get(
        `https://api-trials.x5.com.au/api/articles?search=${inputData.search}&page_size=5&page=${page}`
      )
      .then((res) => {
        // console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [inputData.search, page]);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => {
    setPage(page + 1);
  };

  const back = () => {
    if (page === 0) {
      setPage((page = 1));
    } else {
      setPage(page - 1);
    }
  };

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
            console.log(res);
            getData();
            Swal.fire({
              title: "Deleted!",
              text: "Your article has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
        <div className={styles.daftar}>
          <div className={styles.search}>
            <input
              className={styles.bxsearch}
              type="search"
              value={inputData.search}
              name="search"
              onChange={handleChange}
              placeholder="Type here to search"
            />
            <div className={styles.btn}>
              <input type="year" placeholder="2023" className={styles.date} />
              <Link to={`/Tambah`}>
                <input type="submit" value="+ Add" />
              </Link>
            </div>
          </div>
          <div className={styles.list}>
            <table>
              <tbody>
              <tr>
                <th>Date</th>
                <th>Tittle</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
              {data.articles?.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((p) => (
                  <tr key={p.id}>
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
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.pagination}>
          <div className={styles.next}>
            <button title="back" className={styles.qty} onClick={back}>
              back
            </button>
            <span> Page {page} </span>
            <button title="next" className={styles.qty} onClick={next}>
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
