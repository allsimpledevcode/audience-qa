import { ReactNode } from "react";

function EventLayout({ children, title }: { children: ReactNode, title?: string }) {
    return (
        <>
            <header className="p-6 bg-green-700 text-white min-h-[78px]">
                <div className="container flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">{title}</h1>
                    </div>
                </div>
            </header>
            <main className="max-w-[560px] m-auto py-10">
                {children}
            </main>
            <footer></footer>
        </>
    )
}

export default EventLayout;