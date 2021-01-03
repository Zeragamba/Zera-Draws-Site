import React from 'react';

import {Image} from "./image";

import "./tile.scss";

interface Props {
  image: Image;
}

export function Tile({image}: Props) {
  return (
    <div className={"galleryTile"}>
      <div className={"date"}>{image.date}</div>
      <img className={"image"} src={image.src} alt={image.title} />
      <div className={"title"}>{image.title}</div>
    </div>
  )
}