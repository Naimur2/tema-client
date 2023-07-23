import { useFormik } from "formik";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import Loader from "components/Loader";
import { useGetTeamsQuery } from "store/apis/team";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import MySwal from "components/MySwal";
import { useCreateEventMutation } from "store/apis/event";

interface ITeamInitialValues {
  name: string;
  team_id: string;
  starting_date: string;
  ending_date: string;
}

const CreateEvent = () => {
  const [addItem, { isLoading }] = useCreateEventMutation();
  const { data: teamsData, isLoading: teamsLoading } =
    useGetTeamsQuery(undefined);

  const navigate = useNavigate();
  const { getFieldProps, handleSubmit, errors, touched } =
    useFormik<ITeamInitialValues>({
      initialValues: {
        name: "",
        team_id: "",
        starting_date: "",
        ending_date: "",
      },
      onSubmit: async (values: any) => {
        try {
          await addItem({
            name: values.name,
            team_id: values.team_id,
            starting_date: new Date(values.starting_date),
            ending_date: new Date(values.ending_date),
          }).unwrap();
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
              type="date"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <Label htmlFor="ending_date">Event Start date</Label>
            <TextInput
              id="ending_date"
              placeholder="Enter starting date"
              helperText={touched.ending_date && errors.ending_date}
              {...getFieldProps("ending_date")}
              type="date"
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
