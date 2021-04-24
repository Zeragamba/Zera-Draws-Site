import React, {FC} from 'react';

import {Picture} from '../ServerApi/pictures';

import './gallery-tile.scss';
import {API_URL} from "../ServerApi/request";

interface TileProps {
  picture: Picture;
}

export const GalleryTile: FC<TileProps> = ({picture}) => {
  return (
    <div className={'galleryTile'}>
      <div className={'date'}>{picture.date}</div>
      <img className={'image'} src={API_URL + picture.src} alt={picture.title} />
      <div className={'title'}>{picture.title}</div>
    </div>
  );
};
