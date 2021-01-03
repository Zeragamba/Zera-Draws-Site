import React from "react";

import deviantArtLogo from "./logos/deviant-art.png";
import redditLogo from "./logos/reddit-logo.png";
import twitterLogo from "./logos/twitter-logo.png";
import koFiLogo from "./logos/ko-fi-logo.png";

import styles from "./tile.module.scss"

interface TitleProps {
    name: string,
    image: string,
    link: string,
}

export const Tile = ({name, image, link}: TitleProps) => {
    function onClick() {
        window.open(link);
    }

    return (
        <div className={styles.wrapper} onClick={onClick} role="button">
            <div className={styles.contents}>
                <img className={styles.logo} src={image} alt={name} />
                <span className={styles.label}>{name}</span>
            </div>
        </div>
    )
}

export const DeviantArtTile = () => (
    <Tile image={deviantArtLogo} name={"DeviantArt"} link={"https://www.deviantart.com/zeragamba"} />
);

export const TwitterTile = () => (
    <Tile image={twitterLogo} name={"Twitter"} link={"https://www.twitter.com/zeragamba"} />
);

export const KoFiTile = () => (
    <Tile image={koFiLogo} name={"Ko-fi"} link={"https://ko-fi.com/zeragamba"} />
);

export const RedditTile = () => (
    <Tile image={redditLogo} name={"Reddit"} link={"https://www.reddit.com/user/Zeragamba"} />
);
