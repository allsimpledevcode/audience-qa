import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon, TrashIcon, Share1Icon, CopyIcon } from "@radix-ui/react-icons";
import { supabase } from "@/utils";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast"


function EventAction({ refreshList, event }: { refreshList: Function, event: { id: string; event_id: string } }) {
    const [openDelete, setOpenDelete] = useState(false);
    const { toast } = useToast()

    const toggleDelete = useCallback(() => {
        setOpenDelete(openDelete => !openDelete)
    }, [])


    const deleteEvent = async (id: string) => {
        const { data } = await supabase.from("events").delete().eq('id', id).select();

        if (data?.length) {
            toggleDelete()
            refreshList()
        }
    }

    const eventURL = `${window.origin}/live/${event.event_id}/questions`;

    const copyURL = () => {
        navigator.clipboard.writeText(eventURL).then(() => {
             toast({
                title: "Success",
                description: "URL Copied successfully!!!",
                variant: "success"
              })
        })
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="link"><Share1Icon /></Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                    <div className="relative">
                        <pre className="overflow-auto text-sm bg-gray-200 p-2 rounded-sm">{eventURL}</pre>
                        <Button onClick={copyURL} variant="outline" size="sm" className="p-2 absolute top-[2px] right-[2px]"><CopyIcon /></Button>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover open={openDelete} onOpenChange={setOpenDelete}>
                <PopoverTrigger asChild className="ml-2">
                    <Button onClick={toggleDelete} variant="link"><DotsVerticalIcon /></Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                    <a onClick={() => {
                        deleteEvent(event.id)
                    }} className="text-red-600 flex items-center gap-2 hover:bg-red-100 p-1 rounded"><TrashIcon className="w-5 h-5"/> Delete</a>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default EventAction;