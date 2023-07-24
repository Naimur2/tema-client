import { FormikHelpers, useFormik } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import Loader from "components/Loader";
import * as Yup from "yup";
// import { useNavigate } from "react-router";
// import MySwal from "components/MySwal";
// import { useCreateFolderMutation } from "store/apis/folder";

interface ICreateFolderFormInitialValues {
  name: string;
}

export type TCreateFolderOnSubmit = (
  values: ICreateFolderFormInitialValues,
  formikHelpers: FormikHelpers<ICreateFolderFormInitialValues>
) => void | Promise<any>;

interface ICreateFolderForm {
  // setOpenModal?: React.Dispatch<React.SetStateAction<"default" | undefined>>;
  isShowFormTitle?: boolean;
  onSubmit?: TCreateFolderOnSubmit;
  isLoading?: boolean;
}

const CreateFolderForm = ({
  isShowFormTitle,
  onSubmit = async () => {},
  isLoading,
}: ICreateFolderForm) => {
  // const [CreateFolder, { isLoading }] = useCreateFolderMutation();
  // const navigate = useNavigate();

  const { getFieldProps, handleSubmit, errors, touched } =
    useFormik<ICreateFolderFormInitialValues>({
      initialValues: {
        name: "",
      },
      onSubmit,
      validationSchema: Yup.object({
        name: Yup.string().required("Required"),
      }),
    });

  return (
    <div className="grid gap-4">
      {isShowFormTitle && (
        <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
          Create event
        </h2>
      )}
      <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="folder_name">File Name</Label>
          <TextInput
            id="folder_name"
            placeholder="Enter folder name"
            helperText={touched.name && errors.name}
            {...getFieldProps("name")}
          />
        </div>

        <div className="mb-6 mt-20">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Create Folder
          </Button>
        </div>

        <Loader isLoading={isLoading as boolean} />
      </form>
    </div>
  );
};

export default CreateFolderForm;
