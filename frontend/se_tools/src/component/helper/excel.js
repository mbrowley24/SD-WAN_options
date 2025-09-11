


export const ExcelDownload = async (res) =>{
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const name = filenameFromContentDisposition(cd);
    a.href = url;
    a.download = `mx-Sales-config.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
}