import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { sanityClient as client } from "sanity:client";
import type { BackgroundImage } from "../data/sanity/types.generated";

interface Props {
  node: BackgroundImage["asset"];
  width?: number;
}

export function getSanityImage({ node, width = 960 }: Props) {
  const builder = imageUrlBuilder(client);

  let image: ImageUrlBuilder | undefined;

  // See https://www.sanity.io/docs/presenting-images for general documentation on
  // presenting images, and https://www.sanity.io/docs/image-url for specifics on
  // this builder API
  try {
    image = node?._ref
      ? builder.image(node._ref).width(width).fit("crop").auto("format")
      : undefined;
  } catch (error) {
    console.error(error);
  }

  return image;
}
