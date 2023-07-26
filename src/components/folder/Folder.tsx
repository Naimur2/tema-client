import { IFolder, THandleDoubleClick } from "types/folder";


interface IAFolder {
  handleFolderDoubleClick?: THandleDoubleClick;
  folder?: IFolder;
}

const Folder = (props: IAFolder) => {
  const {
    folder = {
      _id: "",
      name: "",
      files: [],
      __v: 0,
    },
    handleFolderDoubleClick = () => {},
  } = props;

  return (
    <div
      onClick={(e) => handleFolderDoubleClick(e, folder?._id)}
      className="flex flex-col justify-center items-center gap-1 cursor-pointer hover:opacity-95"
    >
      <img
        className="w-24"
        src="/Mac_Folder_Icon.png"
        alt={`${folder?.name} folder icon`}
      />
      <p className="text-white w-20 pb-1 break-words">{folder?.name}</p>
    </div>
  );
};

export default Folder;
