import { ArrowTopRightIcon, LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const richText = defineType({
  name: "richText",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike-through", value: "strike-through" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "linkExternal",
            title: "External Link",
            type: "object",
            icon: ArrowTopRightIcon,
            fields: [
              defineField({
                name: "url",
                title: "URL",
                description: "Enter an external URL path",
                type: "url",
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
              defineField({
                name: "newTab",
                title: "Open in new tab?",
                type: "boolean",
                initialValue: true,
              }),
            ],
          },
          {
            name: "linkInternal",
            title: "Internal Link",
            type: "object",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "reference",
                title: "Reference",
                type: "reference",
                to: [
                  { type: "home" },
                  { type: "page" },
                  { type: "plp" },
                  { type: "product" },
                ],
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
        ],
      },
    }),
  ],
});
