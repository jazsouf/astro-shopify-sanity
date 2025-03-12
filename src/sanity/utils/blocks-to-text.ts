import type { Block } from "astro-portabletext/types";

const defaults = { nonTextBehavior: "remove" };

export function blocksToText(blocks: Block[] = [], opts = {}) {
  if (typeof blocks === "string") {
    return blocks;
  }

  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}
