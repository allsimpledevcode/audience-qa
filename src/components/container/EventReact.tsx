import { supabase } from "@/utils";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface Count {
    count: number
}

function EventReact({ qId, count }: { qId: string, count: Count[] }) {
    const [isUpvoted, setUpvotes] = useState(false);
    const [currentCount, setCount] = useState(count.length > 0 ? count[0]?.count : 0);

    useEffect(() => {
        setCount(count.length > 0 ? count[0]?.count : 0)
    }, [count])

    const upVote = async (upVote: boolean) => {
        if (upVote) {
            await supabase.from("upvotes").insert({
                question_id: qId,
                participant_id: localStorage?.getItem("aq_auth_session")
            }).select();
        } else {
            await supabase.from("upvotes").delete().eq("participant_id", localStorage?.getItem("aq_auth_session")).eq("question_id", qId).select();
        }
    }

    return (
        <button className={`flex items-center gap-1 border ${isUpvoted ? `border-green-700 bg-green-200` : `border-gray-300`} px-3 py-0.5 rounded-full`} onClick={() => {
            setCount(!isUpvoted ? currentCount + 1 : currentCount - 1)
            upVote(!isUpvoted)
            setUpvotes(!isUpvoted);
        }}>
           {currentCount > 0 && currentCount } <TriangleUpIcon className={`${isUpvoted ? 'text-green-600' : 'text-gray-400'} w-6 h-6`} />
        </button>
    )
}

export default EventReact;