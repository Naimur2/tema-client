import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiFolder,
  HiBell,
  HiCalendar,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation, useLogoutMutation } from "store/apis/auth";
import MySwal from "./MySwal";
import Loader from "./Loader";

const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: HiChartPie,
  },
  {
    path: "/dashboard/users",
    title: "Users",
    icon: HiUsers,
  },
  {
    path: "/dashboard/teams",
    title: "Teams",
    icon: HiClipboard,
  },
  {
    path: "/dashboard/events",
    title: "Events",
    icon: HiCollection,
  },
  {
    path: "/dashboard/folders",
    title: "Gallery",
    icon: HiFolder,
  },
  {
    path: "/dashboard/notification",
    title: "Notification",
    icon: HiBell,
  },
  {
    path: "/dashboard/calender",
    title: "Calender",
    icon: HiCalendar,
  },
];

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [logOutFn, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const handleShignOut = async () => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "No, keep me here!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logOutFn(undefined);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {routes.map((route) => (
                <Sidebar.Item
                  icon={route.icon}
                  key={route.path}
                  className={`${
                    pathName === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "" + "cursor-pointer"
                  } ${pathName?.includes(route.path) && "dark:bg-gray-700"}`}
                  onClick={() => navigate(route.path)}
                >
                  {route.title}
                </Sidebar.Item>
              ))}

              <Sidebar.Item
                icon={HiLogin}
                onClick={handleShignOut}
                className="cursor-pointer"
              >
                Sign out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </Sidebar>
  );
};

export default ExampleSidebar;
