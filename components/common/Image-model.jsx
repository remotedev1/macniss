"use client";
import { IKImage } from "imagekitio-next";

const ImageModel = ({
  path,
  width = 200,
  height = 200,
  loading = "dry",
  alt = "Alt text",
}) => {
  return (
    <IKImage
      path={path}
      width={width}
      height={height}
      loading={loading}
      alt={alt}
    />
  );
};

export default ImageModel;
