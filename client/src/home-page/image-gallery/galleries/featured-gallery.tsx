import { FC } from 'react';

import { Gallery, GallerySizes } from '../gallery';
import { Pictures } from '../../../lib/server-api/hooks';
import { LoadingGate } from '../../../ui/loading-gate';

export const FeaturedGallery: FC = () => {
  const { fetching, error, data = [] } = Pictures.useTag('Featured');

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery pictures={data} gallerySize={GallerySizes.LARGE} />
    </LoadingGate>
  );
};
