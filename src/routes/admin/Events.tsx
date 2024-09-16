import AdminLayout from "@/Layout/AdminLayout";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import EventForm from "@/components/container/EventForm";
import EventList from "@/components/container/EventList";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import { withAuth } from "@/components/hoc/withAuth";

interface Event {
    name: string,
    id: string,
    event_id: string;
    created_at: string;
}

function AdminEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggleSheet = useCallback(() => {
        setOpen(open => !open)
    }, [])

    const refreshEvents = () => {
        toggleSheet();
        fetchEvents()
    }

    const fetchEvents = async () => {
        setLoading(true);
        const { data } = await supabase.from("events").select().order("created_at", { ascending: false })

        if(data && data.length > 0) {
            setEvents(data);
        }
        setLoading(false);
    }


    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <AdminLayout title="Events">
            <div className="flex justify-end max-w-[780px] m-auto">
                <div>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Button onClick={toggleSheet} variant="default">New Event</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-left text-xl font-semibold">Create New Event?</SheetTitle>
                                <SheetDescription className="text-left">
                                    <EventForm refreshEvents={refreshEvents} closeSheet={toggleSheet} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="mt-4">
                {
                    loading ? (
                        <div className="max-w-[780px] m-auto">
                            <Card className="shadow-none p-5">
                                <Skeleton className="h-3 w-[250px]" />
                                <Skeleton className="h-2 mt-2 w-[150px]" />
                            </Card>
                        </div>
                    ): (
                        <EventList events={events} refreshList={fetchEvents}/>
                    )
                }
            </div>
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Testing event</TableCell>
                    </TableRow>
                </TableBody>
            </Table> */}
        </AdminLayout>
    )
}

export default withAuth(AdminEvents);