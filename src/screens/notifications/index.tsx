import DataTable, { TableColumn } from "react-data-table-component";

import dayjs from "dayjs";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "store/apis/notification";
import { INotification } from "store/apis/notification/type";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import MySwal from "components/MySwal";

const DeleteAction = ({ row }: { row: INotification }) => {
  const [deleteNotification] = useDeleteNotificationMutation(undefined);

  const handleDelete = async (id: string) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            MySwal.showLoading();
            const res = await deleteNotification(id).unwrap();
            MySwal.fire("Deleted!", "Your file has been deleted.", "success");
          } catch (error) {
            MySwal.fire("Error!", "Something went wrong", "error");
          }
        }
      });
    } catch (error) {}
  };

  return (
    <div className="flex justify-end">
      <Button
        className="bg-red-500 hover:bg-red-700"
        onClick={() => handleDelete(row._id)}
      >
        Delete
      </Button>
    </div>
  );
};

const columns: TableColumn<INotification>[] = [
  {
    name: "Title",
    selector: (row) => row?.title || "",
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "Body",
    selector: (row) => row?.body || "",
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "Created At",
    selector: (row) => dayjs(row?.createdAt).format("DD/MM/YYYY"),
    minWidth: "150px",
    wrap: true,
  },{
    name: "Actions",
    cell: (row) => <DeleteAction row={row} />,
    minWidth: "150px",
    wrap: true,
  }
];

const UsersTable = () => {
  const { data, isLoading } = useGetNotificationsQuery(undefined);
  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-end py-4 mb-5">
          <Button
            onClick={() => navigate("/dashboard/send-notification")}
            className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
          >
            Create Notification
          </Button>
        </div>
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
};

export default UsersTable;
