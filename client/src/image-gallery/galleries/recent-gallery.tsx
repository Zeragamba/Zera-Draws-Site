import React, {FC} from 'react';

import {Gallery} from '../gallery';
import {Pictures} from "../../ServerApi";

export const RecentGallery: FC = () => {
  const {data, LoadingGate} = Pictures.useTag("Featured");

  return (
    <LoadingGate>
      <Gallery title="Recent" pictures={data}/>
    </LoadingGate>
  );
};
