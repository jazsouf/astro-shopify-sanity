import { defineField } from "sanity";
import { PlaceholderStringInput } from "../../../components/shopify/placeholder-string-input";

export const placeholderString = defineField({
  name: "placeholderString",
  title: "Title",
  type: "string",
  components: {
    input: PlaceholderStringInput,
  },
});
