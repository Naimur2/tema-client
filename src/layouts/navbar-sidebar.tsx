import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { selectAuth } from "store/features/auth";
import { useEffect } from "react";

export default function Layout() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[20rem,auto] h-full w-full">
        <Sidebar />
        <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container px-8 pt-10">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
