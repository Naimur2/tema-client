import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import Loader from "components/Loader";
import QueryDataHandler from "components/common/QueryDataHandler";
import { useCreateFolderMutation, useGetFoldersQuery } from "store/apis/folder";
import { useCallback } from "react";
import Folder from "components/folder/Folder";
import { useNavigate } from "react-router-dom";
import CustomModal from "components/common/CustomModal";
import { Button } from "flowbite-react";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import CreateFolderForm, {
  TCreateFolderOnSubmit,
} from "components/folder/CreateFolderForm";
import MySwal from "components/MySwal";

export type THandleDoubleClick = (
  e?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id?: string | number
) => void;
export interface IFile {
  name?: string;
  type?: string;
  url?: string;
}

export interface IFolder {
  _id?: string;
  name?: string;
  files?: IFile[];
  __v?: number;
}

interface IFoldersData {
  message?: string;
  data?: IFolder[];
}

export default function FolderList() {
  const { data, ...restRes } = useGetFoldersQuery(null);
  const [createFolder] = useCreateFolderMutation();
  const navigate = useNavigate();

  const handleFolderDoubleClick: THandleDoubleClick = useCallback((e, id) => {
    if (e?.detail === 2) {
      console.log("folder double clicked", e.detail);
      navigate(`/dashboard/folders/${id}`);
    }
  }, []);

  return (
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
              try {
                await createFolder({
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
                // isLoading={isLoading}
                onSubmit={onSubmit}
              />
            );
          }}
        </CustomModal>
      </div>
      <QueryDataHandler
        {...restRes}
        ui={
          <div className="flex flex-wrap gap-4">
            {(data as IFoldersData)?.data?.map((folder) => {
              return (
                <Folder
                  folder={folder}
                  handleFolderDoubleClick={handleFolderDoubleClick}
                />
              );
            })}
          </div>
        }
        loadingUi={<Loader isLoading={restRes?.isLoading} />}
        fetchingUi={<FetchingUi />}
        errorUi={<ApiError />}
      />
    </div>
  );
}
