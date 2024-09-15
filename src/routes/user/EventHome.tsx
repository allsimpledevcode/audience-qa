import { supabase } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventPage from "./EventPage";
import EventQuestions from "./EventQuestions";
import EventLayout from "@/Layout/EventLayout";

function EventHome() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserIsExist = async () => {
        const userSession = localStorage.getItem("aq_auth_session")
        if(userSession === null) {
            const { data } = await supabase.from("participants").insert({ name: 'anonymous' }).select();

            if(data && data.length > 0) {
                localStorage.setItem("aq_auth_session", data[0]?.auth_id)
            }
        }
    }

    const fetchEventData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("events").select().eq("event_id", eventId)

        if (error) {
            setEvent(null);
            setLoading(false);
            return;
        }

        if (data && data.length > 0) {
            setEvent(data[0])
        }

        setLoading(false);
    }

    useEffect(() => {
        checkUserIsExist();
    }, [])

    useEffect(() => {
        fetchEventData()
    }, [eventId])

    if(loading) {
        return (
            <EventLayout>
                <p className="hidden">Loading...</p>
            </EventLayout>
        )
    }

    return (
        <>
            {event ? (
                <EventQuestions event={event}/>
            ) : (
                <EventPage />
            )}
        </>
    )
}

export default EventHome;