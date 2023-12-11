import { useFormik } from "formik";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import Loader from "components/Loader";
import { useGetTeamsQuery } from "store/apis/team";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import { useCreateEventMutation } from "store/apis/event";
import { useUploadImageMutation } from "store/apis/uploadImage";
import { IEventInitialValues } from "types/event";

// interface IEventInitialValues {
//   name: string;
//   team_id: string;
//   starting_date: string;
//   ending_date: string;
//   location: string;
//   image: File | string;
// }

const CreateEvent = () => {
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data: teamsData, isLoading: teamsLoading } =
    useGetTeamsQuery(undefined);
  const [uploadImage] = useUploadImageMutation();
  const navigate = useNavigate();
  const { getFieldProps, setFieldValue, handleSubmit, errors, touched } =
    useFormik<IEventInitialValues>({
      initialValues: {
        name: "",
        team_id: "",
        starting_date: "",
        ending_date: "",
        location: "",
        image: "",
      },
      onSubmit: async (values) => {
        try {
          MySwal.fire({
            title: "Please wait...",
            text: "Creating event",
            icon: "info",
            allowOutsideClick: false,
            didOpen: () => {
              MySwal.showLoading();
            },
          });

          const eventData: any = {
            name: values.name,
            team_id: values.team_id,
            starting_date: values.starting_date as any,
            ending_date: values.ending_date as any,
            location: values?.location,
          };

          if (values.image) {
            const formData = new FormData();
            formData.append("image", values.image);

            const { data } = await uploadImage(formData).unwrap();
            eventData.image = data?.[0]?.fileUrl;
          }

          await createEvent(eventData).unwrap();
          MySwal.fire({
            title: "Success",
            text: "Event aded successfully",
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
        team_id: Yup.string().required("Required"),
        starting_date: Yup.string().required("Required"),
        ending_date: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        image: Yup.mixed().optional(),
      }),
    });

  const teamArray = teamsData?.data?.map((team: any) => ({
    label: team.name,
    value: team._id,
  }));

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        Create event
      </h2>
      <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="name">Event Name</Label>
          <TextInput
            id="name"
            placeholder="Enter event name"
            helperText={touched.name && errors.name}
            {...getFieldProps("name")}
          />
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="team_id">Team Name</Label>
          <Select
            {...getFieldProps("team_id")}
            helperText={touched.team_id && errors.team_id}
            id="team_id"
          >
            <option value="">Select team</option>
            {teamArray?.map((team: any) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="starting_date">Event Start date</Label>
            <TextInput
              id="starting_date"
              placeholder="Enter starting date"
              helperText={touched.starting_date && errors.starting_date}
              {...getFieldProps("starting_date")}
              type="datetime-local"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="ending_date">Event End date</Label>
            <TextInput
              id="ending_date"
              placeholder="Enter starting date"
              helperText={touched.ending_date && errors.ending_date}
              {...getFieldProps("ending_date")}
              type="datetime-local"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="image">Event image</Label>
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
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="location">Location</Label>
            <TextInput
              id="location"
              placeholder="Enter location"
              helperText={touched.location && errors.location}
              {...getFieldProps("location")}
              type="text"
            />
          </div>
        </div>

        <div className="mb-6 mt-20">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Create event
          </Button>
        </div>

        <Loader isLoading={isLoading || teamsLoading} />
      </form>
    </div>
  );
};

export default CreateEvent;
