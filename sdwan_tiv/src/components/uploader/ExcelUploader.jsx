"use client"
import React, {useRef} from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver"

const ExcelUploader = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    saveAs(fileRef.current);
}


export default ExcelUploader;