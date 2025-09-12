

function filenameFromContentDisposition(cd){
  if (!cd) return null;

  // RFC 5987: filename*=UTF-8''encoded
  const star = cd.match(/filename\*\s*=\s*([^']+)''([^;]+)/i);
  if (star) {
    try { return decodeURIComponent(star[2]); } catch { /* ignore */ }
  }

  // filename="foo.xlsx" or filename=foo.xlsx
  const quoted = cd.match(/filename\s*=\s*"([^"]+)"/i);
  if (quoted) return quoted[1];

  const bare = cd.match(/filename\s*=\s*([^;]+)/i);
  if (bare) return bare[1].trim();

  return null;
}


export const ExcelDownload = async (res) =>{
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const cd = res.headers["content-disposition"];
    const name = filenameFromContentDisposition(cd) ?? "mx-config-template.xlsx";
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}