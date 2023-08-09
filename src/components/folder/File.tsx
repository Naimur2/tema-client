import { IFile, THandleDoubleClick } from "types/folder";

interface IAFile {
    handleFileDoubleClick?: THandleDoubleClick;
    file?: IFile;
}

const File = (props: IAFile) => {
    const { file, handleFileDoubleClick = () => {} } = props;
    return (
        <div
            onClick={handleFileDoubleClick}
            className="flex justify-center items-center gap-1 cursor-pointer hover:opacity-95"
        >
            <div
                className=" w-full h-[5rem]
                overflow-hidden 
            "
            >
                <img
                    className="w-full h-full aspect-square object-cover"
                    src="/Mac_Folder_Icon.png"
                    alt={`${file?.fileName} folder icon`}
                />
            </div>
            <p className="text-white max-w-[50vw] line-clamp-1">
                {file?.fileName}
            </p>
        </div>
    );
};

export default File;
