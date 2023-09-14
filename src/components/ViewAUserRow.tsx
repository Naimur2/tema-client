import { Label } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IUser } from "types/user";
import { formatShortSocialDateTime } from "utils/date-formatter";

interface IViewAUserRow {
  row?: IUser;
}

const AvailableStatus = ({ row }: IViewAUserRow) => {
  if (row?.is_active) return <FaCheck className="w-4 h-4" color="green" />;
  else if (row?.is_active === false)
    return <FaTimes className="w-4 h-4" color="red" />;
  else return <span>N/A</span>;
};

const ViewAUserRow = ({ row }: IViewAUserRow) => {
  return (
    <div>
      {/* <Label className="font-bold underline underline-offset-4">
        Detaile
      </Label> */}
      <div className="grid gap-5 xl:grid-cols-3">
        {/* <div>
          <Label>Name</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {`${row?.first_name || ""} ${row?.last_name || ""}`}
          </p>
        </div> */}
        <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
          <img
            className="w-10 h-10 rounded-full"
            src={row?.image_path}
            alt={row?.first_name}
          />
          <h5 className="">
            {row?.first_name || ""} {row?.last_name || ""}
          </h5>
        </div>
        <div>
          <Label>User Name</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.username || ""}
          </p>
        </div>
        <div>
          <Label>Email</Label>
          <p className="text-gray-600 dark:text-gray-400">{row?.email || ""}</p>
        </div>
        <div>
          <Label>Mobile Number</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.mobile_number || ""}
          </p>
        </div>
        <div>
          <Label>Shirt Size</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.shirt_size || ""}
          </p>
        </div>
        <div>
          <Label>Arrival Date</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {formatShortSocialDateTime(row?.arrival_date || "")}
          </p>
        </div>
        <div>
          <Label>Departure Date</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {formatShortSocialDateTime(row?.departure_date || "")}
          </p>
        </div>
        <div>
          <Label>Bed Preference</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.bed_preference || ""}
          </p>
        </div>
        {/* <div>
          <Label>Role</Label>
          <p className="text-gray-600 dark:text-gray-400">{row?.role || ""}</p>
        </div> */}
        <div>
          <Label>Active</Label>
          <p className="text-gray-600 dark:text-gray-400">
            <AvailableStatus row={row} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAUserRow;
