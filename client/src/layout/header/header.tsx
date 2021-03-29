import React from "react";
import styles from "./header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerText}>Zeragamba</div>
    <div className={styles.subtitle}>Learning to art</div>
  </header>
);
