import { defineField } from "sanity";
import { ProxyStringInput } from "../../../components/shopify/proxy-string-input";

export const proxyString = defineField({
  name: "proxyString",
  title: "Title",
  type: "string",
  components: {
    input: ProxyStringInput,
  },
});
