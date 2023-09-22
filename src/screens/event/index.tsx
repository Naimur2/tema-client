import { Button } from "flowbite-react";
import { useNavigate } from "react-router";

import DataTable, { TableColumn } from "react-data-table-component";
import MySwal from "components/MySwal";
import { useDeleteEventMutation, useGetEventsQuery } from "store/apis/event";

import { IEvent, IEventAction } from "types/event";
import dayjs from "dayjs";

// interface IEvent {
//   _id?: string;
//   name?: string;
//   team_id?: string;
//   starting_date?: string;
//   ending_date?: string;
//   __v?: number;
// }

// interface IEventAction {
//   row?: IEvent;
// }

// interface ITeamData {
//   message?: string;
//   data?: IEvent[];
// }

const Actions = ({ row }: IEventAction) => {
  const navigate = useNavigate();
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  const handleDelete = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this event!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteEvent(row?._id).unwrap();
        MySwal.fire("Deleted!", "Event has been deleted.", "success");
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Event is safe :)", "error");
      }
    });
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Button
        onClick={() => navigate(`/dashboard/events/${row?._id}`)}
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

const columns: TableColumn<IEvent>[] = [
  {
    name: "Name",
    selector: (row) => row?.name || "",
    width: "180px",
    wrap: true,
  },
  {
    name: "Team ID",
    // @ts-ignore
    selector: (row) => row?.team_id?.name || 0,
    wrap: true,
  },
  {
    name: "Starting Date",
    selector: (row) => dayjs(row?.starting_date || "").format('YYYY-MM-DD'),
    minWidth: "200px",
    wrap: true,
  },
  {
    name: "Ending Date",
    selector: (row) => dayjs(row?.ending_date || "").format('YYYY-MM-DD'),
    minWidth: "200px",
    wrap: true,
  },
  {
    name: "Actions",
    cell: (row) => <Actions row={row} />,
    width: "180px",
  },
];

export default function Data() {
  const { data, isLoading, isError } = useGetEventsQuery();
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
          data={data?.data ?? []}
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
