import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Loader from "components/Loader";
import Layout from "layouts/navbar-sidebar";

const LoginScreen = lazy(() => import("./screens/auth/sign-in"));

const EventsList = lazy(() => import("./screens/event"));
const EditEvent = lazy(() => import("./screens/event/edit-event"));
const CreateEvent = lazy(() => import("./screens/event/create-event"));

const TeamList = lazy(() => import("./screens/team"));
const EditTeam = lazy(() => import("./screens/team/edit-team"));
const CreateTeam = lazy(() => import("./screens/team/create-team"));
const FolderList = lazy(() => import("./screens/folder"));
const ViewFolder = lazy(() => import("./screens/folder/view-folder"));
const CreateFolder = lazy(() => import("./screens/folder/create-folder"));
const Dashboard = lazy(() => import("./screens/dashboard"));
const UsersList = lazy(() => import("./screens/users"));
const Notification = lazy(() => import("screens/notifications"));
const Calender = lazy(() => import("screens/calender"));
const AssignTeam = lazy(() => import("screens/users/assign-team"));
const SendNotification = lazy(
    () => import("screens/notifications/create-notification")
);

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loader isLoading />}>
                            <LoginScreen />
                        </Suspense>
                    }
                />
                <Route path="dashboard/*" element={<Layout />}>
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <Dashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <UsersList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="events"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <EventsList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="assign-team/:id"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <AssignTeam />
                            </Suspense>
                        }
                    />
                    <Route
                        path="events/:id"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <EditEvent />
                            </Suspense>
                        }
                    />
                    <Route
                        path="events/create"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <CreateEvent />
                            </Suspense>
                        }
                    />
                    <Route
                        path="teams"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <TeamList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="teams/:id"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <EditTeam />
                            </Suspense>
                        }
                    />
                    <Route
                        path="teams/create"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <CreateTeam />
                            </Suspense>
                        }
                    />
                    <Route
                        path="folders"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <FolderList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="folders/:id"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <ViewFolder />
                            </Suspense>
                        }
                    />
                    <Route
                        path="folders/create"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <CreateFolder />
                            </Suspense>
                        }
                    />
                    <Route
                        path="notification"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <Notification />
                            </Suspense>
                        }
                    />
                    <Route
                        path="calender"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <Calender />
                            </Suspense>
                        }
                    />
                    <Route
                        path="send-notification"
                        element={
                            <Suspense fallback={<Loader isLoading />}>
                                <SendNotification />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}
