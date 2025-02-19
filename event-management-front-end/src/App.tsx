import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {
    CreateEventPage,
    DashboardPage,
    EventsPage,
    HomePage,
    PageNotFound,
    UpdateEventPage,
    UserAccess,
} from "./Pages/index";
import { AdminLayout, DefaultLayout } from "./Layouts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="Connexion" Component={UserAccess} key="userAccess" />,
            <Route
                path="/"
                Component={DefaultLayout}
                children={[
                    <Route
                        index
                        path="Home"
                        Component={HomePage}
                        key="HomePage"
                    />,
                    <Route
                        path="Events"
                        Component={EventsPage}
                        key="EventsPage"
                    />,
                ]}
            />
            <Route
                path="/"
                Component={AdminLayout}
                children={[
                    <Route
                        index
                        path="dashboard"
                        Component={DashboardPage}
                        key="DashboardPage"
                    />,
                    <Route
                        index
                        path="create-event"
                        Component={CreateEventPage}
                        key="DashboardPage"
                    />,
                    <Route
                        path="update-event/:event_id"
                        Component={UpdateEventPage}
                        key="addCommercialAgent"
                    />,
                ]}
            />
            <Route
                path="notFound"
                Component={PageNotFound}
                key="userDashboard"
            />
            <Route path="*" Component={PageNotFound} key="userDashboard" />
        </Route>
    )
);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
