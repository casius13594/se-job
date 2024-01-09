import Image from "next/image";
import styles from "./guidance.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";

const Guidance = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/logo.svg" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}> Guidance</span>
          <h3 className={styles.title}>
            How to use the employer dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Details of how to operate the website and track the growth of the company.
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}> Incoming update</span>
          <h3 className={styles.title}>
            Charts display will be added in the future patch.
          </h3>
          <span className={styles.subtitle}>Boost your productivity</span>
          <p className={styles.desc}>
          The future statistical function provides more in-depth insights into the current performance of the company
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guidance;