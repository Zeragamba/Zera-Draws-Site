import React from "react";

import {Header} from "./header";
import styles from "./layout.module.scss";
import {Main} from "./main";
import {Sidebar} from "./sidebar";

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <Main />
    </div>
  )
}