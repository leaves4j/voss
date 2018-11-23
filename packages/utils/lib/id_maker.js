let id = 0;

export default function idMarker() {
  /* istanbul ignore if */
  if (id >= Number.MAX_SAFE_INTEGER) id = 0;
  return id++;
}
