import React from "react";
import {Header} from "./layout/header";
import {Main} from "./layout/main";

import {Sidebar} from "./layout/sidebar";

import styles from "./app.module.scss";

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}

export default App
