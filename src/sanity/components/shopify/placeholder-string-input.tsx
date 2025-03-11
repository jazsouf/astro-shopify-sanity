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

export const PlaceholderStringInput = (props: Props) => {
  const { schemaType } = props;

  const path = schemaType?.options?.field;
  const doc = useFormValue([]) as SanityDocument;

  const proxyValue = path ? getNestedValue(doc, path) : "";

  return props.renderDefault({
    ...props,
    elementProps: { ...props.elementProps, placeholder: proxyValue },
  });
};
