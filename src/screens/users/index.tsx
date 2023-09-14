import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import DataTable, { TableColumn } from "react-data-table-component";
import { useDeleteAUserMutation, useGetUsersQuery } from "store/apis/auth";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { formatShortSocialDateTime } from "utils/date-formatter";
import CustomModal from "components/common/CustomModal";
import { AiFillEye, AiTwotoneDelete } from "react-icons/ai";
import ViewAUserRow from "components/ViewAUserRow";
import { IUser } from "types/user";
import MySwal from "components/MySwal";

const Actions = ({ row }: { row: IUser }) => {
  const [deleteAUser] = useDeleteAUserMutation();
  const navigate = useNavigate();
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
        await deleteAUser(row?._id ?? "").unwrap();
        MySwal.fire("Deleted!", "User has been deleted.", "success");
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "User is safe :)", "error");
      }
    });
  };

  return (
    <div className="flex gap-1 items-center">
      <CustomModal
        title={`Detailed Row View For User: ${row?.username ?? "N/A"}`}
        trigger={
          <AiFillEye className="w-5 h-5 fill-white cursor-pointer mr-1" />
        }
      >
        <ViewAUserRow row={row} />
      </CustomModal>
      <FaPencilAlt
        onClick={() => {
          navigate(`/dashboard/assign-team/${row?._id}`);
        }}
        className="w-5 h-5 fill-white cursor-pointer mr-1"
      />
      <AiTwotoneDelete
        onClick={handleDelete}
        className="w-5 h-5 fill-white cursor-pointer mr-1"
      />
    </div>
  );
};

const columns: TableColumn<IUser>[] = [
  {
    name: "Name",
    // selector: (row) => `${row?.first_name || ""} ${row?.last_name || ""}`,
    cell(row, rowIndex, column, id) {
      return (
        <div className="flex gap-4 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={row?.image_path}
            alt={row?.first_name}
          />
          <h5 className="">
            {row?.first_name || ""} {row?.last_name || ""}
          </h5>
        </div>
      );
    },
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "User Name",
    selector: (row) => row?.username || "",
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "Email",
    selector: (row) => row?.email || "",
    minWidth: "200px",
    wrap: true,
  },
  {
    name: "Mobile Number",
    selector: (row) => row?.mobile_number || "",
    minWidth: "150px",
    wrap: true,
  },
  // {
  //   name: "Shirt Size",
  //   selector: (row) => row?.shirt_size || "",
  //   minWidth: "30px",
  //   wrap: true,
  // },
  // {
  //   name: "Arrival Date",
  //   selector: (row) => formatShortSocialDateTime(row?.arrival_date || ""),
  //   minWidth: "200px",
  //   wrap: true,
  // },
  // {
  //   name: "Departure Date",
  //   selector: (row) => formatShortSocialDateTime(row?.departure_date || ""),
  //   minWidth: "200px",
  //   wrap: true,
  // },
  // {
  //   name: "Bed Preference",
  //   selector: (row) => row?.bed_preference || "",
  //   width: "130px",
  //   wrap: true,
  // },
  // {
  //   name: "Role",
  //   selector: (row) => row?.role || "",
  // },
  // {
  //   name: "Active",
  //   cell: (row) => {
  //     if (row?.is_active) return <FaCheck className="w-4 h-4" color="green" />;
  //     else if (row?.is_active === false)
  //       return <FaTimes className="w-4 h-4" color="red" />;
  //     else return "N/A";
  //   },
  //   width: "80px",
  // },
  {
    name: "View More",
    cell: (row) => <Actions row={row} />,
    width: "110px",
    wrap: true,
  },
];

const UsersTable = () => {
  const { data, isLoading } = useGetUsersQuery(undefined);
  // console.log("users table data: ", data);
  // const navigate = useNavigate();

  return (
    <div>
      {/* <div className="flex justify-end">
        <Button
          onClick={() => navigate("/dashboard/users/create")}
          className="bg-primary-900 hover:bg-primary-700"
        >
          Create User
        </Button>
      </div> */}
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
};

export default UsersTable;
