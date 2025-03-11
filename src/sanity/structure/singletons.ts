import type { StructureBuilder } from "sanity/structure";

import { CogIcon, HomeIcon } from "@sanity/icons";

type Singleton = {
  _type: string;
  icon?: any;
  id: string;
  initialValue?: any;
  title: string;
};

export const SINGLETONS: {
  [key: string]: Singleton;
} = {
  home: {
    id: "home",
    _type: "home",
    title: "Home",
    icon: HomeIcon,
  },
  settings: {
    id: "settings",
    _type: "settings",
    title: "Site Settings",
    icon: CogIcon,
  },
};

export const singletonListItem = (S: StructureBuilder, singleton: Singleton) =>
  S.documentTypeListItem(singleton._type)
    .icon(singleton.icon)
    .child(
      S.document()
        .title(singleton.title)
        .schemaType(singleton._type)
        .documentId(singleton._type),
    );

export const singletonTypes = new Set(
  Object.values(SINGLETONS).map((singleton) => singleton._type),
);
