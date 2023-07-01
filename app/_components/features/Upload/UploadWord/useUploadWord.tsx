import { ChangeEventHandler, useState } from 'react';
import { read, utils } from 'xlsx';

interface Props {
  pres: any[];
  setPres: React.Dispatch<React.SetStateAction<any[]>>;
}
export const useUploadWord = ({ pres, setPres }: Props) => {
  const [file, setFile] = useState<File | undefined>(
    undefined
  );

  const dragDropFiles = (event: any) => {
    event.preventDefault();
  };
  const handleDrop = (event: any) => {
    event.preventDefault();
    console.log(event);
    setFile(event.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.readAsBinaryString(event.dataTransfer.files[0]);
    reader.onload = (event) => {
      const wb = read(event.target?.result, {
        type: 'binary',
      }); // parse the array buffer
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const data: any[] = utils.sheet_to_json<any>(ws); // generate objects
      const csv = utils.sheet_to_csv(ws);
      console.log(csv);
      console.log(data);
      setPres(data); // update state
    };
  };

  const handleFiles: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return;
    const selectedFile = files[0];
    console.log('file:', selectedFile);

    // ファイル情報をセット
    setFile(selectedFile);
  };
  const handleClearFile = () => {
    setFile(undefined);
    setPres([]);
  };

  return {
    handleFiles,
    file,
    handleClearFile,
    handleDrop,
    dragDropFiles,
    pres,
  };
};
