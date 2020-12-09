import React from "react";

import {DeviantArtTile, KoFiTile, RedditTile, TwitterTile} from "./tile";

import styles from "./app.module.css";

const App = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>Zeragamba</h1>
            </header>

            <div className={styles.sideBar}>
                <DeviantArtTile />
                <TwitterTile />
                <KoFiTile />
                <RedditTile />
            </div>

            <main className={styles.main}>

            </main>
        </div>
    );
}

export default App
