import { FormikHelpers, useFormik } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import Loader from "components/Loader";
import * as Yup from "yup";
// import { useNavigate } from "react-router";
// import MySwal from "components/MySwal";
// import { useCreateFolderMutation } from "store/apis/folder";

interface ICreateFileFormInitialValues {
  file: File | string;
}

export type TCreateFileOnSubmit = (
  values: ICreateFileFormInitialValues,
  formikHelpers: FormikHelpers<ICreateFileFormInitialValues>
) => void | Promise<any>;

interface ICreateFileForm {
  // setOpenModal?: React.Dispatch<React.SetStateAction<"default" | undefined>>;
  isShowFormTitle?: boolean;
  onSubmit?: TCreateFileOnSubmit;
  isLoading?: boolean;
}

const CreateFileForm = ({
  isShowFormTitle,
  onSubmit = async () => {},
  isLoading,
}: ICreateFileForm) => {
  // const [CreateFolder, { isLoading }] = useCreateFolderMutation();
  // const navigate = useNavigate();

  const { getFieldProps, setFieldValue, handleSubmit, errors, touched } =
    useFormik<ICreateFileFormInitialValues>({
      initialValues: {
        file: "",
      },
      onSubmit,
      validationSchema: Yup.object({
        file: Yup.mixed().required("Required"),
      }),
    });

  return (
    <div className="grid gap-4">
      {isShowFormTitle && (
        <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
          Create file
        </h2>
      )}
      <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="image">File</Label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="file"
            // accept="image/*"
            onChange={(event: any) => {
              setFieldValue("file", event.currentTarget.files[0]);
            }}
            // value={formik?.values?.image?.name}
          />
          {touched.file && errors.file && (
            <p className="text-red-500">{errors.file}</p>
          )}
        </div>

        <div className="mb-6 mt-20">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Create File
          </Button>
        </div>

        <Loader isLoading={isLoading as boolean} />
      </form>
    </div>
  );
};

export default CreateFileForm;
