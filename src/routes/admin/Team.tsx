import AdminLayout from "@/Layout/AdminLayout";
import { withAuth } from "@/components/hoc/withAuth";
import { RocketIcon } from "@radix-ui/react-icons";

function AdminDashboard(){
    return (
        <AdminLayout title="Team">
            <div className="min-h-[320px] w-full text-center flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <RocketIcon className="w-14 h-14 text-slate-400 text-center" />
                    <p className="text-slate-400 mt-3">Coming soon in next Tutorial</p>
                </div>
            </div>
        </AdminLayout>
    )
}

export default withAuth(AdminDashboard);