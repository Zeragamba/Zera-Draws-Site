import React, {FC} from 'react';

import {Picture} from '../ServerApi/pictures';

import './gallery-tile.scss';

interface TileProps {
  picture: Picture;
}

export const GalleryTile: FC<TileProps> = ({picture}) => {
  return (
    <div className={'galleryTile'}>
      <div className={'date'}>{picture.date}</div>
      <img className={'image'} src={picture.src} alt={picture.title} />
      <div className={'title'}>{picture.title}</div>
    </div>
  );
};
