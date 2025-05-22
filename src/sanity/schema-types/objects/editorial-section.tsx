import { defineArrayMember, defineField, defineType } from "sanity";

export const editorialSection = defineType({
  name: "editorialSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "cover",
      title: "Cover",
      description:
        "Add an image or a color as a background color to your section. Required.",
      type: "array",
      of: [
        defineArrayMember({ type: "backgroundImage" }),
        defineArrayMember({ type: "color" }),
      ],
      validation: (Rule) => Rule.max(1).required(),
    }),
    defineField({
      name: "content",
      type: "richText",
      description: "Add content to your section. Optional.",
    }),
    defineField({
      name: "textColor",
      type: "color",
      description:
        "Set the color of the text in your section. Default is black.",
      hidden: ({ parent }) => {
        const hasContent = parent?.content;
        return !hasContent;
      },
    }),
  ],
  preview: {
    select: {
      cover: "cover",
    },
    prepare({ cover }) {
      let blockType = "";
      if (cover && cover[0]?._type === "backgroundImage") {
        blockType = "Image";
      }
      if (cover && cover[0]?._type === "color") {
        blockType = "Color";
      }

      return {
        title: `${blockType} Block`,
        media:
          blockType === "Image" && cover?.length ? (
            cover[0]
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: `${cover?.length ? cover[0]?.hex : "#fff"}`,
                border: "1px #fff9 solid",
              }}
            />
          ),
      };
    },
  },
});
