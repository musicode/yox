
export default function camelCase(name) {
  return name.replace(
    /-([a-z])/gi,
    ($0, $1) => $1.toUpperCase()
  )
}
