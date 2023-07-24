import { IFile, THandleDoubleClick } from "screens/folder";

interface IAFile {
  handleFileDoubleClick?: THandleDoubleClick;
  file?: IFile;
}

const File = (props: IAFile) => {
  const {
    file = {
      name: "",
      type: "",
      url: "",
    },
    handleFileDoubleClick = () => {},
  } = props;
  return (
    <div
      onClick={handleFileDoubleClick}
      className="flex justify-center items-center gap-1 cursor-pointer hover:opacity-95"
    >
      <img
        className="w-4"
        src="/Mac_Folder_Icon.png"
        alt={`${file?.name} folder icon`}
      />
      <p className="text-white max-w-[50vw]">{file?.name}</p>
    </div>
  );
};

export default File;
