import React, { FC } from 'react';

import { Gallery } from '../gallery';
import { Pictures } from '../../server-api';

export const FeaturedGallery: FC = () => {
  const { data = [], LoadingGate } = Pictures.useTag('Featured');

  return (
    <LoadingGate>
      <Gallery title="Featured" pictures={data} />
    </LoadingGate>
  );
};
