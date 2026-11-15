import ImageKit from "imagekit";

let imageKit: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!imageKit) {
    imageKit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
    });
  }

  return imageKit;
}
