import React, { useEffect, useState } from "react";
import axiosClient from "../../API/axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./UpdateEventPage.css";

const UpdateEventPage = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();

    // Form data states
    const [eventName, setEventName] = useState<string>("");
    const [eventDateTime, setEventDateTime] = useState<string>("");
    const [eventDuration, setEventDuration] = useState<number>(90);
    const [eventLocation, setEventLocation] = useState<string>("");
    const [eventCapacity, setEventCapacity] = useState<number>(300);
    const [eventWaitlistCapacity, setEventWaitlistCapacity] =
        useState<number>(50);
    const [eventStatus, setEventStatus] = useState<string>("live");
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch the current event data when the page loads
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axiosClient.get(`/events/${event_id}`);
                const eventData = response.data.data;
                setEventName(eventData.title);
                setEventDateTime(eventData.start);
                setEventDuration(eventData.duration);
                setEventLocation(eventData.location);
                setEventCapacity(eventData.capacity);
                setEventWaitlistCapacity(eventData.waitlist_capacity);
                setEventStatus(eventData.status);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching event data", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setLoading(false);
            }
        };

        fetchEvent();
    }, [event_id]);

    const updateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventData = {
                name: eventName,
                date_time: eventDateTime,
                duration: eventDuration,
                location: eventLocation,
                capacity: eventCapacity,
                waitlist_capacity: eventWaitlistCapacity,
                status: eventStatus,
            };

            const response = await axiosClient.put(
                `/events/${event_id}`,
                eventData
            );

            if (response.status === 200) {
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

                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Error updating event",
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
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="create-event-form">
            <h2>Update Event</h2>
            <form onSubmit={updateEvent}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDateTime">Event Date & Time</label>
                    <input
                        type="datetime-local"
                        id="eventDateTime"
                        value={eventDateTime}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(e) => setEventDateTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDuration">
                        Event Duration (minutes)
                    </label>
                    <input
                        type="number"
                        id="eventDuration"
                        value={eventDuration}
                        onChange={(e) =>
                            setEventDuration(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                        type="text"
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventCapacity">Event Capacity</label>
                    <input
                        type="number"
                        id="eventCapacity"
                        value={eventCapacity}
                        onChange={(e) =>
                            setEventCapacity(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventWaitlistCapacity">
                        Waitlist Capacity
                    </label>
                    <input
                        type="number"
                        id="eventWaitlistCapacity"
                        value={eventWaitlistCapacity}
                        onChange={(e) =>
                            setEventWaitlistCapacity(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventStatus">Event Status</label>
                    <select
                        id="eventStatus"
                        value={eventStatus}
                        onChange={(e) => setEventStatus(e.target.value)}
                    >
                        <option value="live">Live</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default UpdateEventPage;
