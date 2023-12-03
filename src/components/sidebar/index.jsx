import React from "react";
import styles from "./sidebar.module.css";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import artc from "../../assets/article.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <section className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <img src={menu} alt="" />
        </div>
        <Link to={`/`}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
            <p>Logo</p>
          </div>
        </Link>
        <div className={styles.listMenu}>
          <img src={artc} alt="" />
          <span>Article</span>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
