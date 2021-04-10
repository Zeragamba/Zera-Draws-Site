import React, {FC} from 'react';

import {Gallery} from '../gallery';
import {Pictures} from "../../ServerApi";

export const AllPicturesGallery: FC = () => {
  const {data, LoadingGate} = Pictures.useAll();

  return (
    <LoadingGate>
      <Gallery title="" images={data} reverse={false}/>
    </LoadingGate>
  );
};
