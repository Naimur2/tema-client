import React from "react";
import { useFormik } from "formik";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import Loader from "components/Loader";
import { useCreateTeamMutation } from "store/apis/team";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import { useUploadImageMutation } from "store/apis/uploadImage";

interface ITeamInitialValues {
  name: string;
  color: string;
  score: number;
  image: undefined | File | string;
}

export default function CreateItem() {
  const [addTeam, { isLoading }] = useCreateTeamMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const navigate = useNavigate();
  const { getFieldProps, handleSubmit, setFieldValue, errors, touched } =
    useFormik<ITeamInitialValues>({
      initialValues: {
        name: "",
        color: "",
        score: 0,
        image: undefined,
      },
      onSubmit: async (values: any) => {
        try {
          const formData = new FormData();
          formData.append("image", values.image);

          const { data } = await uploadImage(formData).unwrap();

          const submitedValue = {
            name: values.name,
            color: values.color,
            score: values.score,
            image: data?.[0].fileUrl,
          };

          await addTeam(submitedValue).unwrap();
          MySwal.fire({
            title: "Success",
            text: "Team created successfully",
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
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Required"),
        color: Yup.string().required("Required"),
        score: Yup.string().required("Required"),
        image: Yup.string().required("Required"),
      }),
    });

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        Create Team
      </h2>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-4 flex flex-col">
          <Label htmlFor="name">Team Name</Label>
          <TextInput
            id="name"
            placeholder="Enter team name"
            helperText={touched.name && errors.name}
            {...getFieldProps("name")}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <Label htmlFor="color">Team color</Label>
          <input
            id="color"
            placeholder="Enter team color"
            className="w-full  border border-gray-300 rounded-md h-10"
            type="color"
            {...getFieldProps("color")}
          />
          {touched.color && errors.color && (
            <p className="text-red-500">{errors.color}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col">
          <Label htmlFor="score">Team score</Label>
          <TextInput
            id="score"
            placeholder="Enter team score"
            helperText={touched.score && errors.score}
            {...getFieldProps("score")}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <Label htmlFor="image">Team image</Label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event: any) => {
              setFieldValue("image", event.currentTarget.files[0]);
            }}
            // value={formik?.values?.image?.name}
          />
          {touched.image && errors.image && (
            <p className="text-red-500">{errors.image}</p>
          )}
        </div>

        <div className="mb-6 mt-20">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Create Team
          </Button>
        </div>
        <Loader isLoading={isLoading || isUploading} />
      </form>
    </div>
  );
}
