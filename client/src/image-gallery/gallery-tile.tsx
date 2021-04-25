import React, { FC } from 'react';

import { Picture } from '../server-api/pictures';

import './gallery-tile.scss';

interface TileProps {
  picture: Picture;
}

export const GalleryTile: FC<TileProps> = ({ picture }) => {
  return (
    <div className={'galleryTile'}>
      <div className={'date'}>{picture.date}</div>
      <img className={'image'} src={picture.srcs.gallery} alt={picture.title} />
      <div className={'title'}>{picture.title}</div>
    </div>
  );
};
