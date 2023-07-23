import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { useDeleteTeamMutation, useGetTeamsQuery } from "store/apis/team";
import DataTable from "react-data-table-component";
import MySwal from "components/MySwal";
import { useDeleteEventMutation } from "store/apis/event";
import Loader from "components/Loader";

const Actions = ({ row }: any) => {
  const navigate = useNavigate();
  const [deleteItem, { isLoading }] = useDeleteEventMutation();

  const handleDelete = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem(row._id).unwrap();
        MySwal.fire("Deleted!", "Team has been deleted.", "success");
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Team is safe :)", "error");
      }
    });
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Button
        onClick={() => navigate(`/dashboard/teams/${row._id}`)}
        className="bg-primary-900 hover:bg-primary-700"
      >
        Edit
      </Button>
      <Button onClick={handleDelete} className="bg-red-800 hover:bg-red-600">
        Delete
      </Button>
      <Loader isLoading={isLoading} />
    </div>

  );
};

const columns = [
  {
    name: "Team name",
    selector: (row: any) => row.name,
  },
  {
    name: "Score",
    selector: (row: any) => row.score,
  },
  {
    name: "Color",
    selector: (row: any) => {
      return (
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: row.color }}
        ></div>
      );
    },
  },
  {
    name: "Image",
    selector: (row: any) => {
      if (row.image) {
        return (
          <img src={row.image} alt="" className="w-10 h-10 rounded-full" />
        );
      }
      return null;
    },
  },
  {
    name: "Actions",
    selector: (row: any) => <Actions row={row} />,
  },
];

export default function Data() {
  const { data, isLoading, isError } = useGetTeamsQuery(undefined);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/dashboard/events/create")}
          className="bg-primary-900 hover:bg-primary-700"
        >
          Create Event
        </Button>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={data?.data || []}
          progressPending={isLoading}
          progressComponent={
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          }
          theme="dark"
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          customStyles={{
            headCells: {
              style: {
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "#1F2937",
                color: "#fff",
                minHeight: "72px",
              },
            },
            cells: {
              style: {
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                minHeight: "80px",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
