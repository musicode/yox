
export default function camelCase(name) {
  name.replace(/-([a-z])/gi, ($0, $1) => $1.toUpperCase())
}
