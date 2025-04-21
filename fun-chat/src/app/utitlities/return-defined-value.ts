export default function returnNonNullableValue<T>(value: T | undefined): T {
  if (!value) throw new Error('The checked value is undefined');
  return value;
}
