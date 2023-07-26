import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { useDeleteTeamMutation, useGetTeamsQuery } from "store/apis/team";
import DataTable, { TableColumn } from "react-data-table-component";
import MySwal from "components/MySwal";
import { ITeam, ITeamAction } from "types/team";

//
// interface ITeam {
//   _id?: string;
//   name?: string;
//   color?: string;
//   score?: number;
//   __v?: number;
//   image?: string;
// }

// interface ITeamAction {
//   row?: ITeam;
// }

// interface ITeamData {
//   message?: string;
//   data?: ITeam[];
// }

const Actions = ({ row }: ITeamAction) => {
  const navigate = useNavigate();
  const [deleteItem, { isLoading }] = useDeleteTeamMutation();

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
        await deleteItem(row?._id).unwrap();
        MySwal.fire("Deleted!", "Team has been deleted.", "success");
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Team is safe :)", "error");
      }
    });
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Button
        onClick={() => navigate(`/dashboard/teams/${row?._id}`)}
        className="bg-primary-900 hover:bg-primary-700"
      >
        Edit
      </Button>
      <Button onClick={handleDelete} className="bg-red-800 hover:bg-red-600">
        Delete
      </Button>
    </div>
  );
};

const columns: TableColumn<ITeam>[] = [
  {
    name: "Team name",
    selector: (row) => row?.name || "",
  },
  {
    name: "Score",
    selector: (row) => row?.score || 0,
  },
  {
    name: "Color",
    cell: (row) => {
      console.log("team row: ", row);
      return (
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: row?.color ?? "#000" }}
        ></div>
      );
    },
  },
  {
    name: "Image",
    cell: (row) => {
      if (row.image) {
        return (
          <img
            src={row?.image || ""}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        );
      }
      return null;
    },
  },
  {
    name: "Actions",
    cell: (row) => <Actions row={row} />,
  },
];

export default function Data() {
  const { data, isLoading, isError } = useGetTeamsQuery();
  console.log("team table data: ", data);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/dashboard/teams/create")}
          className="bg-primary-900 hover:bg-primary-700"
        >
          Create Team
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
