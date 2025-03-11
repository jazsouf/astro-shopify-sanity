import { LockIcon } from "@sanity/icons";
import { Box, Text, TextInput, Tooltip } from "@sanity/ui";

import {
  type SanityDocument,
  type StringInputProps,
  type StringSchemaType,
  useFormValue,
} from "sanity";
import { getNestedValue } from "../../utils/get-nested-value";

type Props = StringInputProps<
  StringSchemaType & { options?: { field?: string } }
>;

export const ProxyStringInput = (props: Props) => {
  const { schemaType } = props;

  const path = schemaType?.options?.field;
  const doc = useFormValue([]) as SanityDocument;

  const proxyValue = path ? (getNestedValue(doc, path) as string) : "";

  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            This value is set in Shopify (<code>{path}</code>)
          </Text>
        </Box>
      }
      portal
    >
      <TextInput iconRight={LockIcon} readOnly={true} value={proxyValue} />
    </Tooltip>
  );
};
