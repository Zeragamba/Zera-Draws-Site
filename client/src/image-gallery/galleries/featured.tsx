import React from "react";
import {Pictures} from "../../ServerApi";
import useServerApi from "../../ServerApi/hooks/useServerApi";
import {Gallery} from "../gallery";

export function FeaturedGallery() {
  const {fetching, error, data} = useServerApi(Pictures.tag("featured"), []);

  if (fetching) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>ERROR: {error}</div>
  } else {
    return <Gallery title="" images={data} reverse={false} />
  }
}
