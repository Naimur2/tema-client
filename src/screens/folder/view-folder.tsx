import { useCallback, useState, useEffect, useMemo } from "react";
import Loader from "components/Loader";
import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import QueryDataHandler from "components/common/QueryDataHandler";
import { BsCloudDownload } from "react-icons/bs";
import { MdDelete, MdDownload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateFolderMutation,
  useCreateNewFolderMutation,
  useDeleteAFileMutation,
  useGetFolderByIdQuery,
  useUploadFileMutation,
  useUpdateFolderMutation,
} from "store/apis/folder";
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai";
import { Button, Card, Toast } from "flowbite-react";
import CustomModal from "components/common/CustomModal";
import CreateFolder from "./create-folder";
import CreateFolderForm, {
  TCreateFolderOnSubmit,
} from "components/folder/CreateFolderForm";
import MySwal from "components/MySwal";
import Folder from "components/folder/Folder";
import CreateFileForm, {
  TCreateFileOnSubmit,
} from "components/folder/CreateFileForm";
import { useUploadImageMutation } from "store/apis/uploadImage";
import {
  convertToFile,
  downloadFile,
  getThumbnailAndFile,
} from "utils/file-formatter";
import {
  IViewFilesFolders,
  THandleDoubleClick,
  TThumbnailAndFile,
} from "types/folder";

// interface IFilesORFolders {
//   _id: string;
//   name: string;
//   files: IFile[];
//   folders: IFolder[];
// }

// interface IViewFolderORFileData {
//   message: string;
//   data: IFilesORFolders;
// }

// type TThumbnailAndFile =
//   | {
//       thumbnailUrl?: string;
//       fileName?: string;
//       originalFileUrl?: string;
//       id?: string | number;
//     }
//   | undefined;

// interface IViewFilesFolders {
//   data?: IViewFolderORFileData;
//   thumbnailAndFiles?: TThumbnailAndFile[];
// }

const ViewFilesAndFolders = ({
  data,
  thumbnailAndFiles,
}: IViewFilesFolders) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteAFile] = useDeleteAFileMutation();

  const handleFolderDoubleClick: THandleDoubleClick = useCallback((e, id) => {
    if (e?.detail === 2) {
      console.log("folder double clicked", e.detail);
      navigate(`/dashboard/folders/${id}`);
    }
  }, []);

  const handleFileDelete = async ({
    fileId,
    folderId,
  }: {
    folderId: string | number;
    fileId: string | number;
  }) => {
    try {
      await deleteAFile({ folderId, fileId }).unwrap();
    } catch (error: any) {
      console.log("error", error);
      MySwal.fire({
        title: "Error",
        text: error?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  const isFolderAvailable = !!data?.data?.folders?.length;
  const isFilesAvailable = !!thumbnailAndFiles?.length;
  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {isFolderAvailable ? "Available Folders" : "No Folder Found"}
        </h5>
        {isFolderAvailable && (
          <div className="text-white flex flex-wrap gap-4">
            {data?.data?.folders?.map((folder) => {
              return (
                <Folder
                  key={folder?._id}
                  folder={folder}
                  handleFolderDoubleClick={handleFolderDoubleClick}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="grid gap-4">
        <h5 className="font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {isFilesAvailable ? "Available Files" : "No File Found"}
        </h5>
        {isFilesAvailable && (
          <div className="text-white flex flex-wrap gap-8">
            {thumbnailAndFiles?.map((thumbnailAndFile) => {
              const fileName = thumbnailAndFile?.fileName?.substring(0, 15);
              console.log("thumbnailAndFile: ", thumbnailAndFile);
              return (
                <>
                  <div
                    // className="w-full"

                    className="max-w-[400px] grid gap-4"
                  >
                    <div className=" w-full h-[5rem] overflow-hidden bg-orange-900 p-2 rounded-lg">
                      <img
                        className="w-full h-full aspect-square object-contain"
                        src={
                          thumbnailAndFile?.fileType?.includes("image")
                            ? thumbnailAndFile?.thumbnailUrl
                            : "/doc.png"
                        }
                        alt={thumbnailAndFile?.fileName}
                      />
                    </div>
                    <h5 className="font-normal tracking-tight text-gray-900 dark:text-white break-all">
                      {`${fileName ? fileName + "..." : ""}`}
                    </h5>
                    <div className="flex justify-between items-center gap-1">
                      <button
                        onClick={() =>
                          downloadFile({
                            filename: thumbnailAndFile?.fileName ?? "",
                            fileUrl: thumbnailAndFile?.originalFileUrl ?? "",
                          })
                        }
                      >
                        <MdDownload className="w-4 h-4 text-green-500" />
                      </button>
                      <button
                        onClick={() =>
                          handleFileDelete({
                            fileId: thumbnailAndFile?.id ?? "",
                            folderId: id ?? "",
                          })
                        }
                      >
                        <MdDelete className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ViewFolder() {
  const [thumbnailAndFiles, setThumbnailAndFiles] = useState<
    TThumbnailAndFile[]
  >([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, ...restRes } = useGetFolderByIdQuery(id);

  // const [createFolder, { isLoading }] = useCreateFolderMutation();
  const [createNewFolder, { isLoading }] = useCreateNewFolderMutation();

  const handleFolderDoubleClick: THandleDoubleClick = useCallback((e, id) => {
    if (e?.detail === 2) {
      console.log("folder double clicked", e.detail);
      navigate(`/dashboard/folders/${id}`);
    }
  }, []);

  const [uploadFile] = useUploadFileMutation();
  const [uploadImage] = useUploadImageMutation();
  // const [deleteAFile] = useDeleteAFileMutation();

  const processedPromises = useMemo(() => {
    const files = data?.data?.files;
    const tempConvertedFiles: TThumbnailAndFile[] = [];
    const promises = files?.map((file) => getThumbnailAndFile(file));

    if (promises) {
      return Promise.all(promises).then((thumbnailAndFiles) => {
        tempConvertedFiles.push(...thumbnailAndFiles);
        return tempConvertedFiles;
      });
    } else {
      return tempConvertedFiles;
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const processedFilesArray = await processedPromises;
      setThumbnailAndFiles(processedFilesArray);
    })();
  }, [processedPromises]);
  console.log("ThumbnailAndFiles: ", thumbnailAndFiles);

  // const handleFileDelete = ({
  //   fileId,
  //   folderId,
  // }: {
  //   folderId: string | number;
  //   fileId: string | number;
  // }) => {
  //   deleteAFile({ folderId, fileId });
  // };

  return (
    <div className="text-white">
      <QueryDataHandler
        {...restRes}
        loadingUi={<Loader isLoading={restRes?.isLoading} />}
        fetchingUi={<FetchingUi />}
        errorUi={<ApiError />}
        ui={
          <div className="space-y-4">
            <div className="flex justify-start gap-2">
              <CustomModal
                title="Add Folder"
                trigger={
                  <Button
                    // onClick={handleFolderAdd}
                    type="button"
                    color="light"
                  >
                    <AiFillFolderAdd className="w-5 h-5 fill-[#69CAF7] cursor-pointer mr-1" />{" "}
                    Add Folder
                  </Button>
                }
              >
                {({ setOpenModal }) => {
                  const onSubmit: TCreateFolderOnSubmit = async (values) => {
                    console.log("parent id: ", id);
                    try {
                      await createNewFolder({
                        parent_id: id,
                        name: values.name,
                      }).unwrap();
                      MySwal.fire({
                        title: "Success",
                        text: "Folder added successfully",
                        icon: "success",
                      });
                      setOpenModal?.(undefined);
                    } catch (error: any) {
                      MySwal.fire({
                        title: "Error",
                        text: error?.data?.message || "Something went wrong",
                        icon: "error",
                      });
                    }
                  };

                  return (
                    <CreateFolderForm
                      isLoading={isLoading}
                      onSubmit={onSubmit}
                    />
                  );
                }}
              </CustomModal>

              <CustomModal
                title="Add File"
                trigger={
                  <Button
                    // onClick={handleFileAdd}
                    type="button"
                    color="light"
                  >
                    <AiFillFileAdd className="w-5 h-5 fill-[#69CAF7] cursor-pointer mr-1" />{" "}
                    Add File
                  </Button>
                }
              >
                {/* new */}
                {({ setOpenModal }) => {
                  const onSubmit: TCreateFileOnSubmit = async (values) => {
                    console.log("parent id: ", id);
                    try {
                      MySwal.fire({
                        title: "Please wait...",
                        text: "Creating file",
                        icon: "info",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showConfirmButton: false,
                        showCancelButton: false,
                        didOpen: () => {
                          MySwal.showLoading();
                        },
                      });
                      const formData = new FormData();
                      formData.append("file", values.file);

                      const { data } = await uploadImage(formData).unwrap();
                      console.log("upload Image: ", data);

                      const submittedValue = {
                        id,
                        files: [
                          {
                            fileName: data?.[0]?.fileName,
                            fileType: data?.[0]?.fileType,
                            fileUrl: data?.[0]?.fileUrl,
                          },
                        ],
                      };

                      await uploadFile(submittedValue).unwrap();
                      MySwal.fire({
                        title: "Success",
                        text: "File added successfully",
                        icon: "success",
                      });
                      setOpenModal?.(undefined);
                    } catch (error: any) {
                      MySwal.fire({
                        title: "Error",
                        text: error?.data?.message || "Something went wrong",
                        icon: "error",
                      });
                    }
                  };

                  return (
                    <CreateFileForm isLoading={isLoading} onSubmit={onSubmit} />
                  );
                }}
              </CustomModal>
            </div>

            <ViewFilesAndFolders
              data={data}
              thumbnailAndFiles={thumbnailAndFiles}
            />
          </div>
        }
      />
    </div>
  );
}
