import { prisma } from "@/lib/prisma";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function Schedule() {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    // Fetch posts within range
    const posts = await prisma.post.findMany({
        where: {
            scheduledFor: {
                not: null
            }
        }
    });

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'twitter': return 'bg-sky-500';
            case 'linkedin': return 'bg-blue-700';
            case 'instagram': return 'bg-pink-600';
            case 'facebook': return 'bg-blue-600';
            default: return 'bg-slate-600';
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in h-full">
            <header className="flex justify-between items-center">
                <div>
                    <h1>Schedule</h1>
                    <p>Plan your content calendar for maximum impact.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 rounded-md shadow-sm">Month</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white">Week</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white">List</button>
                </div>
            </header>

            <div className="glass-panel w-full flex-1 flex flex-col p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white uppercase">{format(today, 'MMMM yyyy')}</h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-full"><ChevronLeft size={20} /></button>
                        <button className="p-2 hover:bg-slate-700 rounded-full"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="flex-1 w-full rounded-lg border border-slate-700/50 overflow-hidden flex flex-col">
                    <div className="flex-1 w-full overflow-x-auto">
                        <div className="grid grid-cols-7 gap-px bg-slate-700/50 min-h-full" style={{ minWidth: '800px' }}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="bg-slate-900/80 p-4 text-center text-sm font-semibold text-slate-400 border-b border-slate-700/50">
                                    {day}
                                </div>
                            ))}

                            {calendarDays.map((date, i) => {
                                const dayNum = format(date, 'd');
                                const isOtherMonth = !isSameMonth(date, monthStart);
                                const isToday = isSameDay(date, today);

                                // Filter posts for this day
                                const dayPosts = posts.filter((p: { scheduledFor: Date | null }) => p.scheduledFor && isSameDay(new Date(p.scheduledFor), date));

                                return (
                                    <div key={i} className={`bg-slate-900/40 p-2 min-h-[100px] border-b border-r border-slate-700/20 hover:bg-slate-800/30 transition-colors group relative ${isOtherMonth ? 'opacity-30' : ''}`}>
                                        <span className={`text-sm ${isToday ? 'text-indigo-400 font-bold bg-indigo-500/20 px-2 py-0.5 rounded-full' : 'text-slate-500'}`}>{dayNum}</span>

                                        <div className="mt-2 flex flex-col gap-1">
                                            {dayPosts.map((post: { id: string; platform: string; title: string | null; content: string; scheduledFor: Date | null }) => (
                                                <div key={post.id} className={`text-xs p-1.5 rounded-md ${getPlatformColor(post.platform)} text-white shadow-sm truncate cursor-pointer hover:opacity-90`} title={post.title || post.content}>
                                                    {post.scheduledFor ? format(new Date(post.scheduledFor), 'HH:mm') : ''} - {post.title}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
