import { useState } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
import article from "../../assets/boxArticle.png";
import addEdit from "../../assets/boxDetailArticlee.png";

function Card() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className={styles.card}>
        <Link to={`/`} >
          <div
            className={`${styles.box} ${isClicked ? styles.green : ""}`}
            onClick={handleClick}
          >
            <img src={article} alt="" />
            <div className={styles.text}>
              <p>Article</p>
              <span>List Article</span>
            </div>
          </div>
        </Link>
        <Link to={`/tambah`}>
          <div
            className={`${styles.box} ${isClicked ? styles.green : ""}`}
            onClick={handleClick}
          >
            <img src={addEdit} alt="" />
            <div className={styles.text}>
              <p>Add/Edit</p>
              <span>Detail Article</span>
            </div>
          </div>
        </Link>
      </div>
      <hr />
    </>
  );
}

export default Card;
