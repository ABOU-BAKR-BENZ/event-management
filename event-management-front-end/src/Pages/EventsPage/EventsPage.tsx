import { useEffect, useState } from "react";
import "./EventsPage.css";
import axiosClient from "../../API/axios-client";
import { toast } from "react-toastify";
import EventCard from "../../Components/EventCard/EventCard";
import { LoadingAnimation } from "../../Components";

const EventsPage = () => {
    const [events, setEvents] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Loading state to track the request

    const fetchEvents = async () => {
        try {
            const response = await axiosClient.get(`/events`);
            setEvents(response.data.data.events);
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
            toast.error(error.response?.data?.message || error.message, {
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
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []); // Fetch events on mount

    return (
        <>
            <div className="events-page">
                <h1 className="events-title">Upcoming Events</h1>
                {loading ? (
                    <LoadingAnimation />
                ) : (
                    <div className="events-cards-container">
                        {events && events.length > 0 ? (
                            events.map((event: any) => (
                                <EventCard event={event} />
                            ))
                        ) : (
                            <p>No events found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default EventsPage;
