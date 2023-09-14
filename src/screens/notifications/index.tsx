import { useFormik } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import Loader from "components/Loader";
import { useCreateTeamMutation } from "store/apis/team";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import { useCreateNotificationMutation } from "store/apis/notification";
import { INotificationInitialValues } from "types/notification";

export default function Notification() {
  const [createNotification, { isLoading }] = useCreateNotificationMutation();

  const navigate = useNavigate();
  const { getFieldProps, handleSubmit, errors, touched } =
    useFormik<INotificationInitialValues>({
      initialValues: {
        title: "",
        body: "",
      },
      onSubmit: async (values) => {
        try {
          // const submittedValue = {
          //   title: values.title,
          //   body: values.message,
          // };

          await createNotification(values).unwrap();
          MySwal.fire({
            title: "Success",
            text: "Notification created successfully",
            icon: "success",
          });
          // navigate(-1);
        } catch (error: any) {
          MySwal.fire({
            title: "Error",
            text: error?.data?.message || "Something went wrong",
            icon: "error",
          });
        }
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Required"),
        body: Yup.string().required("Required"),
      }),
    });

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        Create Notification
      </h2>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="Enter title"
            helperText={touched.title && errors.title}
            {...getFieldProps("title")}
          />
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="message">Message</Label>
          <TextInput
            id="message"
            placeholder="Enter message"
            helperText={touched.body && errors.body}
            {...getFieldProps("body")}
          />
        </div>

        <div className="mb-6 mt-10">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Send Notification
          </Button>
        </div>
        <Loader isLoading={isLoading} />
      </form>
    </div>
  );
}
