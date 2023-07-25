import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import Loader from "components/Loader";
import { useGetTeamsQuery } from "store/apis/team";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "store/apis/event";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useUploadImageMutation } from "store/apis/uploadImage";

interface TeamId {
  _id?: string;
  name?: string;
  color?: string;
  score?: number;
  __v?: number;
}
interface IEvent {
  _id?: string;
  name?: string;
  team_id?: TeamId;
  starting_date?: string;
  ending_date?: string;
  location: string;
  image: File | string;
  __v?: number;
}

export interface ISingleEventData {
  message?: string;
  data?: IEvent;
}

interface IEventInitialValues {
  name: string;
  team_id: string;
  starting_date: string;
  ending_date: string;
  location: string;
  image: File | string;
}

const EditEvent = () => {
  const { id } = useParams();
  const { data } = useGetEventByIdQuery(id, {
    skip: !id,
  });

  const [uploadImage] = useUploadImageMutation();
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data: teamsData, isLoading: teamsLoading } =
    useGetTeamsQuery(undefined);

  const navigate = useNavigate();
  const {
    getFieldProps,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<IEventInitialValues>({
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
        const formData = new FormData();
        formData.append("image", values.image);
        const { data } = await uploadImage(formData).unwrap();
        await updateEvent({
          id,
          name: values.name,
          team_id: values.team_id,
          starting_date: new Date(values.starting_date),
          ending_date: new Date(values.ending_date),
          location: values?.location,
          image: data?.[0]?.fileUrl,
        }).unwrap();
        MySwal.fire({
          title: "Success",
          text: "Event edited successfully",
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
      image: Yup.mixed().required("Required"),
    }),
  });

  const teamArray = teamsData?.data?.map((team: any) => ({
    label: team.name,
    value: team._id,
  }));

  console.log("edit event form values: ", values);

  useEffect(() => {
    console.log("get single event data: ", data);
    if (data) {
      setFieldValue("name", data?.data?.name);
      setFieldValue("team_id", data?.data?.team_id);
      setFieldValue(
        "starting_date",
        dayjs(data?.data?.starting_date).format("YYYY-MM-DD")
      );
      setFieldValue(
        "ending_date",
        dayjs(data?.data?.ending_date).format("YYYY-MM-DD")
      );

      // convert image url to file
      if (data?.data?.image) {
        fetch(data?.data?.image as RequestInfo | URL)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "image.png", { type: "image/png" });
            setFieldValue("image", file);
          });
      }
      setFieldValue("location", data?.data?.location);
      // console.log(data?.data?.image);
    }
  }, [data]);

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        Edit event
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
              type="date"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="ending_date">Event End date</Label>
            <TextInput
              id="ending_date"
              placeholder="Enter starting date"
              helperText={touched.ending_date && errors.ending_date}
              {...getFieldProps("ending_date")}
              type="date"
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
            Edit event
          </Button>
        </div>

        <Loader isLoading={isLoading || teamsLoading} />
      </form>
    </div>
  );
};

export default EditEvent;
