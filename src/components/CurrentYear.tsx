export default async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
