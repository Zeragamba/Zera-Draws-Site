import React, { FC } from 'react';

import { Gallery, GallerySizes } from '../gallery';
import { Pictures } from '../../../lib/server-api/hooks';
import { LoadingGate } from '../../../ui/loading-gate';

export const AllPicturesGallery: FC = () => {
  const { fetching, error, data = [] } = Pictures.useAll();

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="Gallery" pictures={data} reverse={true} gallerySize={GallerySizes.SMALL}/>
    </LoadingGate>
  );
};
