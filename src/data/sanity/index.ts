import {
  ALL_PRODUCTS_QUERY,
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  PRODUCT_QUERY,
  SETTINGS_QUERY,
} from "./groq";
import { sanityFetch } from "./sanity-fetch";

export async function getModularPage(pathname: string) {
  return sanityFetch<any>({
    params: { slug: pathname },
    query: MODULAR_PAGE_QUERY,
  });
}

export async function getHomePage() {
  return sanityFetch<any>({
    query: HOME_QUERY,
  });
}

export function getSettings() {
  return sanityFetch<any>({
    query: SETTINGS_QUERY,
  });
}

export function getProduct(handle: string) {
  return sanityFetch<any>({
    params: { handle },
    query: PRODUCT_QUERY,
  });
}

export function getAllProduct(handle: string) {
  return sanityFetch<any>({
    params: { handle },
    query: ALL_PRODUCTS_QUERY,
  });
}
