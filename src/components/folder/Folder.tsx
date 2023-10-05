import { IFolder, THandleDoubleClick } from "types/folder";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDeleteFolderMutation } from "store/apis/folder";
import MySwal from "components/MySwal";

interface IAFolder {
  handleFolderDoubleClick?: THandleDoubleClick;
  folder?: IFolder;
}

const Folder = (props: IAFolder) => {
  const folderRef = React.useRef<HTMLDivElement>(null);
  const [deleteFolder, deleteFolderRes] = useDeleteFolderMutation();
  const {
    folder = {
      _id: "",
      name: "",
      files: [],
      __v: 0,
    },
    handleFolderDoubleClick = () => {},
  } = props;

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (e.detail === 2) {
      handleFolderDoubleClick?.(e, folder?._id);
    } else {
      setShowDeleteIcon((prev) => !prev);
    }
  };

  const deleteFolderHandler = async () => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this folder!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then(async (result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            title: "Deleting Folder",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: async () => {
              await deleteFolder(folder?._id ?? "").unwrap();
              MySwal.close();
            },
          });
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire("Cancelled", "Folder is safe :)", "error");
        }
      });
    } catch (error) {
      console.log("error deleting folder", error);
    }
  };
  
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (folderRef.current && !folderRef.current.contains(event.target)) {
        setShowDeleteIcon(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center gap-1 cursor-pointer hover:opacity-95 relative"
      ref={folderRef}
    >
      <img
        className="w-24"
        src="/Mac_Folder_Icon.png"
        alt={`${folder?.name} folder icon`}
      />
      <p className="text-white w-20 pb-1 break-words">{folder?.name}</p>
      {showDeleteIcon && (
        <BsFillTrashFill
          onClick={(e) => {
            e.stopPropagation();
            deleteFolderHandler();
          }}
          className="w-5 h-5 fill-white cursor-pointer mr-1
          bg-red-500 rounded-full p-1 absolute top-0 right-0
          "
        />
      )}
    </div>
  );
};

export default Folder;
