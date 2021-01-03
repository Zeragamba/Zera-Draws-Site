import React from "react";
import {Layout} from "../layout/layout";

import styles from "./app.module.scss";

export const App = () => {
  return (
    <div className={styles.app}>
      <Layout />
    </div>
  );
}

export default App
