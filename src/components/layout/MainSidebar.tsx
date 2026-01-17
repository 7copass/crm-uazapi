"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    MessageSquare,
    Users,
    BarChart2,
    Settings,
    Target
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

const NAV_ITEMS = [
    { icon: MessageSquare, href: "/", label: "Inbox" },
    { icon: Target, href: "/leads", label: "Leads" }, // Using Target for Kanban/Leads focus
    { icon: Users, href: "/contacts", label: "Contatos" },
    { icon: BarChart2, href: "/analytics", label: "Relatórios" },
]

export function MainSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-[60px] flex-col items-center bg-white border-r border-border py-4 dark:bg-zinc-950">
            {/* Brand Logo - Green Square 'L' */}
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold font-sans">
                L
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                            )}
                            title={item.label}
                        >
                            <item.icon className="h-5 w-5" />
                            {isActive && (
                                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-4 items-center">
                <ModeToggle />
                <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                    <Settings className="h-5 w-5" />
                </button>
                <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                    {/* Placeholder Avatar */}
                    <img src="https://github.com/shadcn.png" alt="User" />
                </div>
            </div>
        </aside>
    )
}
