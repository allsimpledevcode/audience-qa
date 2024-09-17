import {
    Card
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import EventAction from "./EventAction";
import { formatDistance, subDays } from "date-fns";
import { RocketIcon } from "@radix-ui/react-icons";

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
                                <EventAction event={event} refreshList={refreshList} />
                            </div>
                        </Card>
                    ))}
                </section>
            ) : (
                <div className="max-w-[780px] m-auto text-center">
                    <div className="min-h-[320px] w-full text-center flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <RocketIcon className="w-14 h-14 text-slate-400 text-center" />
                            <p className="text-slate-400 mt-3">Start your events here!</p>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default EventList;