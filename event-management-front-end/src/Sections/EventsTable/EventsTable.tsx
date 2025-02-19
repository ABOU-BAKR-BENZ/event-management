import { useEffect, useState } from "react";
import axiosClient from "../../API/axios-client";
import "./EventsTable.css";
import { Event } from "../../Interfaces";
import { LoadingAnimation } from "../../Components";
import { HashLink } from "react-router-hash-link";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const EventsTable = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosClient.get("/events");
                setEvents(response.data.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = (eventId: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (!confirmDelete) return;

        axiosClient
            .delete(`/events/${eventId}`)
            .then((response) => {
                setEvents((prevEvents) =>
                    prevEvents.filter((event) => event.id !== eventId)
                );
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

                console.log(events);
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || "Failed to delete event.",
                    {
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
                    }
                );
            });
    };

    return (
        <div className="events-table-container">
            <h2>All Events</h2>
            {loading ? (
                <LoadingAnimation />
            ) : (
                <table className="table table-striped table-hover table-bordered border-dark ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event Title</th>
                            <th>Date & Time (Start)</th>
                            <th>Date & Time (End)</th>
                            <th>Duration (min)</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Waitlist</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events ? (
                            events.map((event, index) => (
                                <tr key={event.id}>
                                    <td>{index + 1}</td>
                                    <td>{event.title}</td>
                                    <td>
                                        {new Date(event.start).toLocaleString()}
                                    </td>
                                    <td>
                                        {new Date(event.end).toLocaleString()}
                                    </td>
                                    <td>{event.duration}</td>
                                    <td>{event.location}</td>
                                    <td>{event.capacity}</td>
                                    <td>{event.waitlist_capacity}</td>
                                    <td
                                        className={(() => {
                                            switch (event.status) {
                                                case "live":
                                                    return "bg-primary";

                                                case "draft":
                                                    return "bg-warning";

                                                default:
                                                    return "";
                                            }
                                        })()}
                                    >
                                        {event.status}
                                    </td>
                                    <td>
                                        <ul className="list-group list-group-horizontal justify-content-around">
                                            <li className="list-group-item list-group-item-primary p-0 bg-transparent border-0 me-2">
                                                <HashLink
                                                    to={`/update-event/${event.id}`}
                                                >
                                                    <FaEdit
                                                        color="var(--secondary-color)"
                                                        size={30}
                                                    />
                                                </HashLink>
                                            </li>

                                            <li className="list-group-item list-group-item-primary p-0 bg-transparent border-0 me-2">
                                                <HashLink
                                                    to={""}
                                                    onClick={() =>
                                                        handleDelete(event.id)
                                                    }
                                                >
                                                    <MdDeleteForever
                                                        color="#FF1111"
                                                        size={30}
                                                    />
                                                </HashLink>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="no-data">
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EventsTable;
