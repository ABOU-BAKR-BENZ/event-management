import React, { useState } from "react";
import axiosClient from "../../API/axios-client";
import { toast } from "react-toastify";
import "./CreateEventPage.css";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
    // Form data states
    const [eventName, setEventName] = useState<string>("");
    const [eventDateTime, setEventDateTime] = useState<string>("");
    const [eventDuration, setEventDuration] = useState<number>(0);
    const [eventLocation, setEventLocation] = useState<string>("");
    const [eventCapacity, setEventCapacity] = useState<number>(0);
    const [eventWaitlistCapacity, setEventWaitlistCapacity] =
        useState<number>(0);
    const [eventStatus, setEventStatus] = useState<string>("live");
    const navigate = useNavigate();

    const createEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            name: eventName,
            date_time: eventDateTime,
            duration: eventDuration,
            location: eventLocation,
            capacity: eventCapacity,
            waitlist_capacity: eventWaitlistCapacity,
            status: eventStatus,
        };

        axiosClient
            .post("/events", eventData)
            .then((response) => {
                toast.success(String(response.data.message), {
                    position: "top-center",
                    autoClose: 2000,
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

                setEventName("");
                setEventDateTime("");
                setEventDuration(0);
                setEventLocation("");
                setEventCapacity(0);
                setEventWaitlistCapacity(0);
                setEventStatus("live");
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || "Error creating event",
                    {
                        position: "top-center",
                        autoClose: 2000,
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
        <div className="create-event-form">
            <h2>Create a New Event</h2>
            <form onSubmit={createEvent}>
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
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
