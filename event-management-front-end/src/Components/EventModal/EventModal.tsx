import React from "react";
import "./EventModal.css";

const EventModal = ({
    event,
    closeModal,
}: {
    event: any;
    closeModal: () => void;
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{event.title}</h3>
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
                <p>
                    <strong>Status:</strong> {event.status}
                </p>

                <div className="modal-actions">
                    <button onClick={closeModal}>Close</button>
                    <button>Join Event</button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
