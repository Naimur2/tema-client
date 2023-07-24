import { useCallback } from "react";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import { useCreateFolderMutation } from "store/apis/folder";
import CreateFolderForm, {
  TCreateFolderOnSubmit,
} from "components/folder/CreateFolderForm";

// interface ICreateFolderInitialValues {
//   name: string;
// }

// interface ICreateFolder {
//   setOpenModal?: React.Dispatch<React.SetStateAction<"default" | undefined>>;
//   isShowFormTitle?: boolean;
// }

const CreateFolder = () => {
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const navigate = useNavigate();

  const onSubmit: TCreateFolderOnSubmit = useCallback(async (values) => {
    try {
      await createFolder({
        name: values.name,
      }).unwrap();
      MySwal.fire({
        title: "Success",
        text: "Folder added successfully",
        icon: "success",
      });
      navigate(-1);
    } catch (error: any) {
      MySwal.fire({
        title: "Error",
        text: error?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  }, []);

  // const { getFieldProps, handleSubmit, errors, touched } =
  //   useFormik<ICreateFolderInitialValues>({
  //     initialValues: {
  //       name: "",
  //     },
  //     onSubmit: async (values) => {
  //       try {
  //         await createFolder({
  //           name: values.name,
  //         }).unwrap();
  //         MySwal.fire({
  //           title: "Success",
  //           text: "Folder added successfully",
  //           icon: "success",
  //         });
  //         setOpenModal?.(undefined);
  //         navigate(-1);
  //       } catch (error: any) {
  //         MySwal.fire({
  //           title: "Error",
  //           text: error?.data?.message || "Something went wrong",
  //           icon: "error",
  //         });
  //       }
  //     },
  //     validationSchema: Yup.object({
  //       name: Yup.string().required("Required"),
  //     }),
  //   });

  return (
    // <div className="grid gap-4">
    //   {isShowFormTitle && (
    //     <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
    //       Create event
    //     </h2>
    //   )}
    //   <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
    //     <div className="mb-4 flex flex-col gap-4">
    //       <Label htmlFor="folder_name">File Name</Label>
    //       <TextInput
    //         id="folder_name"
    //         placeholder="Enter folder name"
    //         helperText={touched.name && errors.name}
    //         {...getFieldProps("name")}
    //       />
    //     </div>

    //     <div className="mb-6 mt-20">
    //       <Button
    //         type="submit"
    //         className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
    //       >
    //         Create Folder
    //       </Button>
    //     </div>

    //     <Loader isLoading={isLoading} />
    //   </form>
    // </div>
    <CreateFolderForm
      isLoading={isLoading}
      isShowFormTitle
      onSubmit={onSubmit}
    />
  );
};

export default CreateFolder;
