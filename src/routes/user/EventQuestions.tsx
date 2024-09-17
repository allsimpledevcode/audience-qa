import { Button } from "@/components/ui/button";
import EventLayout from "@/Layout/EventLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/utils";
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card";
import { formatDistance, subDays } from "date-fns";
import EventReact from "@/components/container/EventReact";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton"

interface Count {
    count: number;
}

interface Question { name: string; created_at: string; question: string, upvotes: Count[], id: string }

function EventQuestions({ event }: { event: { name: string, event_id: string } }) {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState('')
    const [name, setName] = useState('')
    const { toast } = useToast()

    const fetchQuestions = async (order: boolean = false) => {
        const { data } = await supabase.from("live_questions").select(`*, upvotes( count )`).eq("associated_event_id", event.event_id).order("created_at", { ascending: order });

        if (data && data.length > 0) {
            setQuestions(data)
        }
        setLoading(false)
    }

    const submitQuestion = async () => {
        const payload = {
            question,
            name,
            associated_event_id: event.event_id
        }
        const { data } = await supabase.from("live_questions").insert(payload).select();

        if (data && data.length > 0) {
            toast({
                title: "Success",
                description: "Question created successfully!!!",
                variant: "success"
            })
            setName('');
            setQuestion('');
            setLoading(true);
            fetchQuestions();
        }
    }

    const refreshData = (payload: { new: { associated_event_id: string } }) => {
        if(payload.new.associated_event_id === event.event_id) {
            fetchQuestions()
        }
    }

    useEffect(() => {
        // Listen to inserts
        supabase
            .channel('live_questions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'live_questions' }, refreshData)
            .subscribe()

        setLoading(true);
        fetchQuestions()
        
        return () => {
            supabase
            .channel('live_questions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'live_questions' }, refreshData)
            .unsubscribe()
        }
    }, [event.event_id])

    return (
        <EventLayout title={event?.name}>
            <form onSubmit={(e) => e.preventDefault()} className="relative shadow-md bg-white border border-gray-200 rounded-xl w-full p-4">
                <textarea value={question} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setQuestion(e.target.value)
                }} className="min-h-[70px] w-full outline-none resize-none" placeholder="Enter your question here!!"></textarea>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>{name[0]?.toUpperCase() || "A"}</AvatarFallback>
                        </Avatar>
                        <input value={name} className="text-sm border-none outline-none" placeholder="Your Name (Optional)" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value)
                        }} />
                    </div>
                    <div>
                        <Button onClick={submitQuestion} className="rounded-full py-2 px-8 bg-green-700 hover:bg-green-800">Submit</Button>
                    </div>
                </div>
            </form>
            <section className="mt-4">

                <Tabs defaultValue="recent" className="w-full" onValueChange={
                    (value: string) => {
                        setLoading(true);
                        fetchQuestions(value !== 'recent')
                    }}>
                    <TabsList className="w-full bg-transparent mb-4">
                        <TabsTrigger value="recent" className="w-[50%] py-3">Recent Questions</TabsTrigger>
                        <TabsTrigger value="old" className="w-[50%] py-3">Oldest Questions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent">
                        {
                            loading ? (
                                <Skeleton className="h-3 w-[250px]" />
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {questions.length > 0 ? questions.map((q: Question) => (
                                        <Card className="shadow-none p-5">
                                            <div className="flex gap-4 items-center">
                                                <Avatar>
                                                    <AvatarFallback>{q?.name[0]?.toUpperCase() || "A"}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p>{q.name}</p>
                                                    <span className="mt-1 block text-xs text-gray-500 font-light">{formatDistance(subDays(new Date(q.created_at), 0), new Date(), { addSuffix: true, })}</span>
                                                </div>
                                                <div>
                                                    <EventReact count={q?.upvotes} qId={q.id} />
                                                </div>
                                            </div>
                                            <div className="p-2 mt-2">
                                                <p className="text-sm text-slate-700">{q.question}</p>
                                            </div>
                                        </Card>
                                    )) : (
                                        <div className="min-h-[320px] w-full text-center flex justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <QuestionMarkCircledIcon className="w-14 h-14 text-slate-400 text-center" />
                                                <p className="text-slate-400 mt-3">Let us know your thoughts or ask a question.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </TabsContent>
                    <TabsContent value="old">
                        {
                            loading ? (
                                <Skeleton className="h-3 w-[250px]" />
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {questions.length > 0 ? questions.map((q: Question) => (
                                        <Card className="shadow-none p-5">
                                            <div className="flex gap-4 items-center">
                                                <Avatar>
                                                    <AvatarFallback>{q?.name[0]?.toUpperCase() || "A"}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p>{q.name}</p>
                                                    <span className="mt-1 block text-xs text-gray-500 font-light">{formatDistance(subDays(new Date(q.created_at), 0), new Date(), { addSuffix: true, })}</span>
                                                </div>
                                                <div>
                                                    <EventReact count={q?.upvotes} qId={q.id} />
                                                </div>
                                            </div>
                                            <div className="p-2 mt-2">
                                                <p className="text-sm text-slate-700">{q.question}</p>
                                            </div>
                                        </Card>
                                    )) : (
                                        <div className="min-h-[320px] w-full text-center flex justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <QuestionMarkCircledIcon className="w-14 h-14 text-slate-400 text-center" />
                                                <p className="text-slate-400 mt-3">Let us know your thoughts or ask a question.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </TabsContent>
                </Tabs>
            </section>
        </EventLayout >
    )
}

export default EventQuestions;