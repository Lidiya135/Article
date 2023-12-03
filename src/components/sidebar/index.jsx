import React, { useState } from "react";
import styles from "./sidebar.module.css";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import artc from "../../assets/article.png";
import { Link } from "react-router-dom";

function Sidebar() {
  const [navCollpase, setNavCollapse] = useState(false);
  const [smallNavCollpase, setSmallNavCollapse] = useState(false);
  const toogle = () => {
    setNavCollapse(!navCollpase);
  };
  const toogleSmall = () => {
    setSmallNavCollapse(!smallNavCollpase);
  };
  return (
    <section className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.menu} onClick={toogle}>
          <img src={menu} alt="" />
        </div>
        <div className={styles.menuSmall} onClick={toogleSmall}>
          <img src={menu} alt=""/>
        </div>
        <div
          className={`${styles.sidebarContent} ${
            smallNavCollpase ? styles.smallNav : ""
          } ${navCollpase ? styles.navCollaps : ""}`}
        >
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
      </div>
    </section>
  );
}

export default Sidebar;
