import {
  ALL_PRODUCTS_QUERY,
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  PRODUCT_QUERY,
  SETTINGS_QUERY,
} from "./groq";
import { sanityFetch } from "./sanity-fetch";
import type {
  ALL_PRODUCTS_QUERYResult,
  HOME_QUERYResult,
  MODULAR_PAGE_QUERYResult,
  PRODUCT_QUERYResult,
  SETTINGS_QUERYResult,
} from "./types.generated";

export async function getModularPage(pathname: string) {
  return sanityFetch<MODULAR_PAGE_QUERYResult>({
    params: { slug: pathname },
    query: MODULAR_PAGE_QUERY,
  });
}

export async function getHomePage() {
  return sanityFetch<HOME_QUERYResult>({
    query: HOME_QUERY,
  });
}

export function getSettings() {
  return sanityFetch<SETTINGS_QUERYResult>({
    query: SETTINGS_QUERY,
  });
}

export function getProduct(handle: string) {
  return sanityFetch<PRODUCT_QUERYResult>({
    params: { handle },
    query: PRODUCT_QUERY,
  });
}

export function getAllProduct(handle: string) {
  return sanityFetch<ALL_PRODUCTS_QUERYResult>({
    params: { handle },
    query: ALL_PRODUCTS_QUERY,
  });
}
