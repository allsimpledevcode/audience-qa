import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { supabase } from "@/utils";

interface EventFormProps {
    closeSheet: Function
    refreshEvents: Function
}

function EventForm({ closeSheet, refreshEvents }: EventFormProps) {
    const [startDate, setStartDate] = React.useState<Date>()
    const [endDate, setEndDate] = React.useState<Date>()
    const [name, setName] = React.useState('')
    const [inProgress, setInprogress] = React.useState(false);

    const onSubmit = async () => {
        setInprogress(true);
        const payload = {
            name,
            start_date: startDate?.toISOString(),
            end_date: endDate?.toISOString()
        }
        const { error } = await supabase.from("events").insert(payload)

        if (!error) {
            setInprogress(true);
            refreshEvents();
        }

    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-6">
                <Label className="mb-2 block">Name</Label>
                <Input type="text" placeholder="Tech discussion 2024" value={name || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e?.target?.value)
                }} />
            </div>
            <div className="mt-4">
                <Label className="mb-2 block">Start date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="mt-4">
                <Label className="mb-2 block">End date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="mt-4">
                <Button onClick={onSubmit} disabled={inProgress} type="submit">{inProgress ? 'Saving...' : 'Save'}</Button>
                <Button onClick={() => {
                    closeSheet()
                }} variant='link' className="ml-4" type="submit">Cancel</Button>
            </div>
        </form>
    )
}

export default EventForm;
