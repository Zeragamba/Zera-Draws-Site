import React, {FC} from "react";
import {Layout} from "../layout/layout";

import styles from "./app.module.scss";

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <Layout />
    </div>
  );
}

export default App
