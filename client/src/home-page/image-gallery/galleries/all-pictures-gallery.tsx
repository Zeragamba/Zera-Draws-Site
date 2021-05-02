import React, { FC } from 'react';

import { Gallery } from '../gallery';
import { Pictures } from '../../../lib/server-api/hooks';
import { LoadingGate } from '../../../ui/loading-gate';

export const AllPicturesGallery: FC = () => {
  const { fetching, error, data = [] } = Pictures.useAll();

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery pictures={data} reverse={true} />
    </LoadingGate>
  );
};
