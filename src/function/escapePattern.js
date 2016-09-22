export default function escapePattern(str) {
  return str.replace(/[-^$+?*.=|\\(){}\[\]]/g, '\\$&')
}
