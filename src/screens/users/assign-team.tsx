import { Label, TextInput, Select, Button } from "flowbite-react";
import Loader from "components/Loader";
import { useGetTeamsQuery } from "store/apis/team";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useAssignTeamMutation, useGetAUserQuery } from "store/apis/auth";
import { useEffect, useState } from "react";
import MySwal from "components/MySwal";

const AssignTeam = () => {
  const [teamId, setTeamId] = useState("");
  const { id } = useParams();
  const [assignEvent] = useAssignTeamMutation();
  const { data: getAUserRes, isLoading: getAUserLoading } = useGetAUserQuery(
    id ?? "",
    {
      skip: !id,
    }
  );

  const { data: getTeamsRes } = useGetTeamsQuery(undefined, {
    refetchOnFocus: true,
  });
  const navigate = useNavigate();

  const teamArray = getTeamsRes?.data?.map((team) => ({
    label: team?.name ?? "",
    value: team?._id ?? "",
  }));

  useEffect(() => {
    if (getAUserRes?.data?.team_id?._id)
      setTeamId(getAUserRes?.data?.team_id?._id ?? "");
  }, [getAUserRes?.data?.team_id?._id]);

  const handleSubmit = async () => {
    try {
      await assignEvent({
        id: id ?? "",
        data: {
          teamId,
        },
      }).unwrap();
      MySwal.fire({
        title: "Success",
        text: "Team assigned successfully",
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
  };

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
        Assign Team
      </h2>

      <div>
        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="name">Name</Label>
          <TextInput
            value={`${getAUserRes?.data?.first_name ?? ""} ${
              getAUserRes?.data?.last_name ?? ""
            }`}
            id="name"
            placeholder="Enter name"
            type="name"
            disabled
          />
        </div>

        <div className="mb-4 flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <TextInput
            value={getAUserRes?.data?.email ?? ""}
            id="email"
            placeholder="Enter email"
            type="email"
            disabled
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <Label htmlFor="team_id">Team Name</Label>
        <Select
          onChange={(e) => setTeamId(e.target.value)}
          value={teamId}
          id="team_id"
        >
          <option value="">Select team</option>
          {teamArray?.map((team) => (
            <option key={team.value} value={team.value}>
              {team.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="mb-6 mt-20">
        <Button
          onClick={handleSubmit}
          className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          disabled={!teamId || !id}
        >
          Assign Team
        </Button>
      </div>

      <Loader isLoading={getAUserLoading} />
    </div>
  );
};

export default AssignTeam;
