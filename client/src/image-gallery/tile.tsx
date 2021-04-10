import React, {FC} from 'react';

import {Picture} from '../ServerApi/pictures';

import './tile.scss';

interface TileProps {
  image: Picture;
}

export const Tile: FC<TileProps> = ({image}) => {
  return (
    <div className={'galleryTile'}>
      <div className={'date'}>{image.date}</div>
      <img className={'image'} src={image.src} alt={image.title} />
      <div className={'title'}>{image.title}</div>
    </div>
  );
};
