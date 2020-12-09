import React from "react";

import deviantArtLogo from "./images/deviant-art.png";
import redditLogo from "./images/reddit-logo.png";
import twitterLogo from "./images/twitter-logo.png";
import koFiLogo from "./images/ko-fi-logo.png";

import styles from "./tile.module.css"

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
        <div className={styles.tile} onClick={onClick} role="button">
            <img className={styles.tileImage} src={image} alt={name} />
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
