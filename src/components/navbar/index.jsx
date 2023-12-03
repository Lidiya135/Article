import React from "react";
import styles from "./navbar.module.css";
import bahasa from "../../assets/bahasa.png";
import notif from "../../assets/notif.png";
import profil from "../../assets/profil.png";
import panah from "../../assets/panah.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to={`/`}>
        <p>Article</p>
      </Link>
      <div className={styles.content}>
        <div className={styles.notifb}>
          <img src={bahasa} alt="" className={styles.gbr} />
          <img src={panah} alt="" />
        </div>
        <img src={notif} alt="" className={styles.gbr} />
        <hr />
        <div className={styles.profil}>
          <img src={profil} alt="" />
          <img src={panah} alt="" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
