import { type QueryParams } from "sanity";
import { sanityClient as client } from "sanity:client";
import { SANITY_API_READ_TOKEN } from "astro:env/server";
import { PUBLIC_SANITY_VISUAL_EDITING_ENABLED } from "astro:env/client";

const visualEditingEnabled = PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = SANITY_API_READ_TOKEN;

export async function sanityFetch<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const perspective = visualEditingEnabled ? "drafts" : "published";

  const { result, resultSourceMap } = await client.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled,
      ...(visualEditingEnabled ? { token } : {}),
    },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}
