import React, { FC } from 'react';

import { Gallery } from '../gallery';
import { Pictures } from '../../server-api';

export const AllPicturesGallery: FC = () => {
  const { data = [], LoadingGate } = Pictures.useAll();

  return (
    <LoadingGate>
      <Gallery pictures={data} reverse={true} />
    </LoadingGate>
  );
};
