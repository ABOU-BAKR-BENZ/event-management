import { useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/calendar.css";
import "./EventsSection.css";
import { Event } from "../../../Interfaces";
import { LoadingAnimation } from "../../../Components";

const EventsSection = ({ eventsObject }: { eventsObject: any }) => {
    const eventsService = useState(() => createEventsServicePlugin())[0];

    const calendarApp = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: eventsObject.map((event: Event) => ({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            duration: event.duration,
            location: event.location,
            status: event.status,
        })),
        plugins: [eventsService],
    });

    return (
        <div className="calendarApp mt-4">
            <h2>Event Calendar</h2>
            <ScheduleXCalendar calendarApp={calendarApp} />
        </div>
    );
};

export default EventsSection;
