import { Event } from "../../Interfaces";
import "./EventCard.css";
import axiosClient from "../../API/axios-client";
import { toast } from "react-toastify";

const EventCard = ({ event }: { event: Event }) => {
    const joinEvent = async (eventId: number) => {
        try {
            const response = await axiosClient.post(`/events/${eventId}/join`);
            toast.success(response.data.message, {
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
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to join event", {
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
        }
    };

    return (
        <div className="event-card">
            <div className="event-card-header">
                <h3>{event.title}</h3>
                <p
                    className={`event-status ${
                        event.status === "live" ? "bg-success" : "bg-warning"
                    }`}
                >
                    {event.status}
                </p>
            </div>
            <div className="event-details">
                <p>
                    <strong>Location:</strong> {event.location}
                </p>
                <p>
                    <strong>Start:</strong> {event.start}
                </p>
                <p>
                    <strong>End:</strong> {event.end}
                </p>
                <p>
                    <strong>Duration:</strong> {event.duration} minutes
                </p>
            </div>
            {event.is_joined ? (
                <p className="text-green-600 fw-bold text-center font-semibold bg-green-100 px-3 py-2 rounded-md shadow-sm justify-center">
                    Already joined!
                </p>
            ) : (
                <button
                    className="join-button"
                    onClick={() => joinEvent(event.id)}
                >
                    Join Event
                </button>
            )}
        </div>
    );
};

export default EventCard;
