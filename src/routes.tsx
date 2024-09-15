import {
    createBrowserRouter,
} from "react-router-dom";

import App from './App.tsx';
import AdminDashboard from "@/routes/admin/Dashboard.tsx";
import AdminEvents from "@/routes/admin/Events.tsx";
import AdminTeam from "@/routes/admin/Team.tsx";
import Login from "@/routes/admin/Login.tsx";

import EventHome from "@/routes/user/EventHome.tsx";
import NotFoundPage from "./NotFound.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/app",
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "events",
                element: <AdminEvents />,
            },
            {
                path: "team",
                element: <AdminTeam />,
            }
        ]
    },
    {
        path: "/live",
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: ":eventId/questions",
                element: <EventHome />,
            }
        ]
    },
]);