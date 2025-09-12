
export function formatIPv4FromDigits(digits) {
  
  digits = digits.replace(/\D/g, ""); // digits only
  const parts = [];
  let seg = "";

  for (const ch of digits) {
    // If current segment is "0", we must start a new octet (no leading zeros)
    if (seg === "0") {
      parts.push(seg);
      seg = "";
      if (parts.length === 4) break; // ignore extra
    }

    // Try to extend current segment
    const next = seg + ch;

    // If extending makes value > 255, close current seg and start new with ch
    if (next.length > 1 && parseInt(next, 10) > 255) {
      if (seg.length === 0) {
        // If seg empty and ch alone > 255 (can't happen for single digit), fallback
        seg = ch;
      } else {
        parts.push(seg);
        seg = ch;
        if (parts.length === 4) break;
        continue;
      }
    } else {
      seg = next;
    }

    // If we hit 3 digits, cap this octet
    if (seg.length === 3) {
      parts.push(seg);
      seg = "";
      if (parts.length === 4) break;
    }
  }

  // Push any remaining segment if we still have room
  if (seg.length && parts.length < 4) parts.push(seg);

  // Truncate to 4 parts
  const ip = parts.slice(0, 4).join(".");

  return ip;
}


export function isValidIPv4(ip) {
  const octets = ip.split(".");
  if (octets.length !== 4) return false;
  for (const o of octets) {
    if (!/^\d+$/.test(o)) return false;
    if (o.length > 1 && o.startsWith("0")) return false; // no leading zeros
    const n = Number(o);
    if (n < 0 || n > 255) return false;
  }
  return true;
}
