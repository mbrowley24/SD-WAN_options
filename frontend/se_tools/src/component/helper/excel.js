


export const ExcelDownload = async (res) =>{
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `test.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
}