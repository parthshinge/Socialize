"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, BarChart2, PenTool, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Schedule", href: "/schedule", icon: Calendar },
        { name: "Analytics", href: "/analytics", icon: BarChart2 },
        { name: "Create", href: "/create", icon: PenTool },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                    <span className="font-bold text-white text-xl">S</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                    Socialize
                </span>
            </div>

            <nav className="flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? "active" : ""}`}
                        >
                            <item.icon size={20} className="mr-3" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-800">
                <button className="nav-item w-full hover:text-red-400">
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
