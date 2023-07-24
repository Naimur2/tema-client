import { useCallback } from "react";
import Loader from "components/Loader";
import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import QueryDataHandler from "components/common/QueryDataHandler";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateFolderMutation,
  useCreateNewFolderMutation,
  useGetFolderByIdQuery,
  useUpdateFileMutation,
  useUpdateFolderMutation,
} from "store/apis/folder";
import { IFile, IFolder, THandleDoubleClick } from "./index";
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai";
import { Button } from "flowbite-react";
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

interface IFilesORFolders {
  _id: string;
  name: string;
  files: IFile[];
  folders: IFolder[];
}

interface IViewFolderORFileData {
  message: string;
  data: IFilesORFolders;
}

export default function ViewFolder() {
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

  const [updateFile] = useUpdateFileMutation();
  const [uploadImage] = useUploadImageMutation();

  // const handleFolderAdd = useCallback(() => {
  //   // createFolder()
  // }, []);

  // const handleFileAdd = useCallback(() => {
  //   // updateFile()
  // }, []);

  return (
    <div className="text-white">
      <QueryDataHandler
        {...restRes}
        loadingUi={<Loader isLoading={restRes?.isLoading} />}
        fetchingUi={<FetchingUi />}
        errorUi={<ApiError />}
        ui={
          <div className="gap-4">
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
                      const formData = new FormData();
                      formData.append("file", values.file);

                      const { data } = await uploadImage(formData).unwrap();
                      console.log("upload Image: ", data);
                      const submittedValue = {
                        id,
                        files: [
                          {
                            name: data?.[0]?.fileName,
                            type: data?.[0]?.fileType,
                            url: data?.[0]?.fileUrl,
                          },
                        ],
                      };

                      await updateFile(submittedValue).unwrap();
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
            <div className="text-white flex flex-wrap gap-4">
              {(data as IViewFolderORFileData)?.data?.folders?.map((folder) => {
                return (
                  <Folder
                    folder={folder}
                    handleFolderDoubleClick={handleFolderDoubleClick}
                  />
                );
              })}
              {(data as IViewFolderORFileData)?.data?.files?.map((file) => {
                console.log("file data: ",data)
                return <p key={file?.name}>Folder</p>;
              })}
            </div>
          </div>
        }
      />
    </div>
  );
}
