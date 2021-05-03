import React, { FC } from 'react';

import { Gallery, GallerySizes } from '../gallery';
import { Pictures } from '../../../lib/server-api/hooks';
import { LoadingGate } from '../../../ui/loading-gate';

export const RecentGallery: FC = () => {
  const { fetching, error, data = [] } = Pictures.useRecent();

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="Recent" pictures={data} gallerySize={GallerySizes.SMALL} />
    </LoadingGate>
  );
};
