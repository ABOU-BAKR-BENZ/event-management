import { useState, useEffect } from "react";
import axiosClient from "../../API/axios-client";
import "./DashboardPage.css";
import { DashboardCard } from "../../Components";
import { UserStatistics } from "../../Interfaces";
import { toast } from "react-toastify";
import { EventsTable } from "../../Sections";

const DashboardPage = () => {
    const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(
        null
    );

    useEffect(() => {
        axiosClient
            .get("/getStats")
            .then((response) => {
                setUserStatistics(response.data.data);
                toast.success(String(response.data.message), {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        width: "165%",
                        fontWeight: "700",
                        color: "#000",
                    },
                });
            })
            .catch((error) => {
                toast.error(String(error.response), {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        width: "165%",
                        fontWeight: "700",
                        color: "#000",
                    },
                });
            });
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <a
                    href="/create-event"
                    className="btn btn-outline-info ms-5 fw-bold"
                >
                    Create an Event
                </a>
            </div>
            <div className="dashboard-cards">
                <DashboardCard
                    number={`${userStatistics?.allEvents}`}
                    title="Number of all events"
                    imageName="monthly-revenue.webp"
                />
                <DashboardCard
                    number={`${userStatistics?.createdEvents}`}
                    title="Number of your created events"
                    imageName="monthly-revenue.webp"
                />
                <DashboardCard
                    number={`${userStatistics?.allUsers}`}
                    title="Number of users in the system"
                    imageName="monthly-revenue.webp"
                />
            </div>
            <EventsTable />
        </div>
    );
};

export default DashboardPage;
