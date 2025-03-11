import {
  type DocumentActionComponent,
  type DocumentActionsResolver,
  type NewDocumentOptionsResolver,
  definePlugin,
} from "sanity";

import { singletonTypes } from "../structure/singletons";
import { shopifyDelete } from "./shopify-delete";
import { shopifyLink } from "./shopify-link";

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
const LOCKED_DOCUMENT_TYPES = [...singletonTypes];

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the Sanity Connect Shopify app - and can be linked to on Shopify
const SHOPIFY_DOCUMENT_TYPES = ["product", "productVariant", "collection"];

export const resolveDocumentActions: DocumentActionsResolver = (
  prev,
  context,
) => {
  if (LOCKED_DOCUMENT_TYPES.includes(context?.schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === "publish" ||
        previousAction.action === "discardChanges" ||
        previousAction.action === "restore",
    );
  }

  if (SHOPIFY_DOCUMENT_TYPES.includes(context?.schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === "publish" ||
        previousAction.action === "unpublish" ||
        previousAction.action === "discardChanges",
    );

    return [
      ...prev,
      shopifyDelete as DocumentActionComponent,
      shopifyLink as DocumentActionComponent,
    ];
  }

  return prev;
};

export const resolveNewDocumentOptions: NewDocumentOptionsResolver = (prev) => {
  const options = prev.filter((previousOption) => {
    return (
      !LOCKED_DOCUMENT_TYPES.includes(previousOption.templateId) &&
      !SHOPIFY_DOCUMENT_TYPES.includes(previousOption.templateId)
    );
  });

  return options;
};

export const customDocumentActions = definePlugin({
  name: "custom-document-actions",
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: resolveNewDocumentOptions,
  },
});
