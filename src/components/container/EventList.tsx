import {
    Card
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import EventAction from "./EventAction";
import { formatDistance, subDays } from "date-fns";

interface Event {
    name: string,
    id: string,
    event_id: string;
    created_at: string;
}

interface EventListProps {
    events: Event[],
    refreshList: Function
}

function EventList({ events, refreshList }: EventListProps) {
    return (
        <>
            {events?.length > 0 ? (
                <section className="flex flex-col gap-4 max-w-[780px] m-auto">
                    {events.map((event) => (
                        <Card key={event.id} className="w-full flex justify-between p-4 shadow-none">
                            <div>
                                <h3>{event.name}</h3>
                                <Label className="text-xs font-light">Create at: {formatDistance(subDays(new Date(event.created_at), 0), new Date(), { addSuffix: true })}</Label>
                            </div>
                            <div>
                                <EventAction event={event} refreshList={refreshList}/>
                            </div>
                        </Card>
                    ))}
                </section>
            ) : (
                <h2>No Data found</h2>
            )
            }
        </>
    )
}

export default EventList;