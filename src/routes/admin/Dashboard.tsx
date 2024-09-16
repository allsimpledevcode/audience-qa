import AdminLayout from "@/Layout/AdminLayout";
import { withAuth } from "@/components/hoc/withAuth";

function AdminDashboard(){
    return (
        <AdminLayout title="Dashboard">
            <h1>Admin Dashboard</h1>
        </AdminLayout>
    )
}

export default withAuth(AdminDashboard);