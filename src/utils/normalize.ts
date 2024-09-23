/**
 * Normalize spanish text replacing accents and ñ
 */

export default function normalize(s: string) {
  console.log(s);
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
