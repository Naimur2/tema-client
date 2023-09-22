import dayjs from "dayjs";
import { Label } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import ReactImageFallback from "react-image-fallback";
import { IUser } from "types/user";


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
      <div className="grid gap-5 xl:grid-cols-2">
        {/* <div>
          <Label>Name</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {`${row?.first_name || ""} ${row?.last_name || ""}`}
          </p>
        </div> */}
        <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
          <ReactImageFallback
            className="w-10 h-10 rounded-full"
            src={row?.image_path}
            alt={row?.first_name}
            fallbackImage={"/dummy-profile.jpg"}
            initialImage={"/dummy-profile.jpg"}
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
            {dayjs(row?.arrival_date).format('YYYY-MM-DD')}
          </p>
        </div>
        <div>
          <Label>Departure Date</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {dayjs(row?.departure_date).format('YYYY-MM-DD')}
          </p>
        </div>
        <div>
          <Label>Bed Preference</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.bed_preference || ""}
          </p>
        </div>
        <div>
          <Label>Dietary Restrictions</Label>
          <p className="text-gray-600 dark:text-gray-400">
            {row?.alargeDesc || "N/A"}
          </p>
        </div>
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
