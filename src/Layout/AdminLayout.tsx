import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import UserAvatar from "@/components/container/AuthButton";

interface AdminLayoutProps {
    children: ReactNode,
    title: string
}

const menus = [
    {
        name: 'Dashboard',
        path: '/app/dashboard'
    },
    {
        name: 'Event',
        path: '/app/events'
    },
    {
        name: 'Team',
        path: '/app/team'
    }
]

function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <>
            <header className="fixed left-[280px] right-0 top-0 h-[70px] border-b border-b-slate-300 p-6">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-semibold text-xl">{title}</h2>
                    </div>
                    <div>
                        <UserAvatar />
                    </div>
                </div>
            </header>
            <aside className="w-[280px] border-r border-r-slate-300 fixed top-0 bottom-0 left-0 p-6">
                <h1 className="font-bold text-2xl text-green-800">Audience QA</h1>
                <div className="flex flex-col gap-2 mt-8">
                    {
                        menus.map((menu, index) => (
                            <NavLink key={index.toString()} className={({ isActive }: { isActive: boolean }) =>
                                [
                                    isActive ? "bg-green-700 text-white" : "",
                                    "px-4 py-2 hover:bg-green-700 hover:text-white rounded-sm",
                                ].join(" ")
                            } to={menu.path}>{menu.name}</NavLink>
                        ))
                    }
                </div>
            </aside>
            <main className="absolute left-[280px] right-0 top-[70px] p-6">
                {children}
            </main>
        </>
    )
}

export default AdminLayout;