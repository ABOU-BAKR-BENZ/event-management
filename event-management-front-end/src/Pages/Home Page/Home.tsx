import "./Home.css";
import { EventsSection } from "../../Sections/Home Page Sections";
import axiosClient from "../../API/axios-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingAnimation } from "../../Components";

const Home = () => {
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
            {loading ? (
                <LoadingAnimation />
            ) : (
                events && <EventsSection eventsObject={events} />
            )}
        </>
    );
};

export default Home;
