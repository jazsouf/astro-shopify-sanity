import { SunIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const option = defineField({
  name: "option",
  title: "Product option",
  type: "object",
  icon: SunIcon,
  readOnly: true,
  fields: [
    // Name
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    // Values
    {
      title: "Values",
      name: "values",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare(selection) {
      const { name } = selection;

      return {
        title: name,
      };
    },
  },
});
