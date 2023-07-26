import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import DataTable, { TableColumn } from "react-data-table-component";
import { useGetUsersQuery } from "store/apis/auth";
import { FaCheck, FaTimes } from "react-icons/fa";
import { formatShortSocialDateTime } from "utils/date-formatter";
import CustomModal from "components/common/CustomModal";
import { AiFillEye } from "react-icons/ai";
import ViewAUserRow from "components/ViewAUserRow";
import { IUser } from "types/user";

const columns: TableColumn<IUser>[] = [
  {
    name: "Name",
    selector: (row) => `${row?.first_name || ""} ${row?.last_name || ""}`,
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
    cell: (row) => {
      return (
        <CustomModal
          title={`Detailed Row View For User: ${row?.username ?? "N/A"}`}
          trigger={
            <AiFillEye className="w-5 h-5 fill-white cursor-pointer mr-1" />
          }
        >
          <ViewAUserRow row={row} />
        </CustomModal>
      );
    },
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
