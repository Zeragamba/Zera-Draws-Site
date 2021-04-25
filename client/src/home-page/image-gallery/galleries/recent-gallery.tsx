import React, { FC } from 'react';

import { Gallery } from '../gallery';
import { Pictures } from '../../../server-api';

export const RecentGallery: FC = () => {
  const { data = [], LoadingGate } = Pictures.useRecent();

  return (
    <LoadingGate>
      <Gallery title="Recent" pictures={data} />
    </LoadingGate>
  );
};
