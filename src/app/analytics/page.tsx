import { prisma } from "@/lib/prisma";
import { PieChart, TrendingUp, Users, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Analytics() {
    const growth = await prisma.growthMetric.findMany({ orderBy: { date: 'asc' } });
    const demographics = await prisma.demographic.findMany({ orderBy: { percentage: 'desc' } });

    const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'];

    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <header>
                <h1>Analytics</h1>
                <p>Deep dive into your social media performance.</p>
            </header>

            <div className="grid-cols-2">
                {/* Growth Chart */}
                <div className="glass-panel card flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Audience Growth</h3>
                            <p className="text-sm text-slate-400">Net followers gained over time</p>
                        </div>
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <TrendingUp className="text-indigo-400" />
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 px-2 pb-2 border-b border-slate-700/50">
                        {growth.map((g, i) => (
                            <div key={g.id} className="flex-1 bg-indigo-500/30 hover:bg-indigo-500/60 rounded-t-sm transition-all relative group" style={{ height: `${g.value}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 whitespace-nowrap z-10">
                                    {new Date(g.date).toLocaleDateString()}: +{g.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demographics */}
                <div className="glass-panel card">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white">Demographics</h3>
                            <p className="text-sm text-slate-400">Audience by location</p>
                        </div>
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                            <Users className="text-pink-500" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {demographics.map((item, i) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <span className="w-6 text-sm text-slate-400">{i + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{item.country}</span>
                                        <span className="text-slate-400">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${colors[i % colors.length]}`} style={{ width: `${item.percentage}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {demographics.length === 0 && <p className="text-slate-500">No demographic data available.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
