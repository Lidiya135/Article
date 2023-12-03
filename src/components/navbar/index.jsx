import { useState } from "react";
import styles from "./navbar.module.css";
import bahasa from "../../assets/bahasa.png";
import notif from "../../assets/notif.png";
import profil from "../../assets/profil.png";
import panah from "../../assets/panah.png";

function Navbar() {
  const [navCollpase, setNavCollapse] = useState(false);
  const [smallNavCollpase, setSmallNavCollapse] = useState(false);
  const toogle = () => {
    setNavCollapse(!navCollpase);
  };
  const toogleSmall = () => {
    setSmallNavCollapse(!smallNavCollpase);
  };
  return (
    <>
      <nav className={styles.nav}>
        <p className={styles.large} onClick={toogle}>Article</p>
        <p className={styles.small} onClick={toogleSmall}>Article</p>
        <ul
          className={`${styles.content} ${smallNavCollpase? styles.smallNav: ""} ${
            navCollpase ? styles.navCollaps : ""
          }`}
        >
          <li className={styles.notifb}>
            <img src={bahasa} alt="" className={styles.gbr} />
            <img src={panah} alt="" />
          </li>
          <li>
            <img src={notif} alt="" className={styles.gbr} />
          </li>
          {/* <hr /> */}
          <li className={styles.profil}>
            <img src={profil} alt="" />
            <img src={panah} alt="" />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
