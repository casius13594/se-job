import React from 'react'
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const card = ({item} :any) => {
    return (
        <div className={styles.container}>
          <MdSupervisedUserCircle size={24} />
          <div className={styles.texts}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.number}>{item.number}</span>
          </div>
        </div>
      );
};

export default card