import { prisma } from "@/lib/prisma";
import StatCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";
import { Users, Activity, Calendar, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await prisma.dashboardStat.findMany();
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  const growth = await prisma.growthMetric.findMany({
    orderBy: { date: 'asc' },
    take: 12 // Matches the chart bars count roughly
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'Users': return Users;
      case 'Activity': return Activity;
      case 'Calendar': return Calendar;
      case 'Zap': return Zap;
      default: return Users;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Users': return '#6366f1';
      case 'Activity': return '#ec4899';
      case 'Calendar': return '#14b8a6';
      case 'Zap': return '#f59e0b';
      default: return '#6366f1';
    }
  };

  // Calculate max value for chart scaling
  const maxVal = Math.max(...growth.map((g: { value: number }) => g.value), 100);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <button className="glass-button flex items-center gap-2">
          <Zap size={18} />
          <span>Quick Create</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid-cols-4">
        {stats.length > 0 ? stats.map((stat: { id: string; title: string; value: string; trend: string; trendUp: boolean; type: string }) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendUp={stat.trendUp}
            icon={getIcon(stat.type)}
            color={getColor(stat.type)}
          />
        )) : (
          <p>Loading stats...</p>
        )}
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Main Content Area */}
        <div className="glass-panel card p-6 animate-fade-in" style={{ minHeight: '400px' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Growth Overview</h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg p-2.5">
              <option>Last 12 Days</option>
            </select>
          </div>

          {/* Chart Area */}
          <div className="w-full h-64 flex items-end justify-between px-4 gap-2">
            {growth.map((g: { id: string; date: Date; value: number }, i: number) => {
              const heightPct = (g.value / maxVal) * 100;
              return (
                <div key={g.id} className="flex flex-col items-center gap-2 group w-full" title={`Date: ${new Date(g.date).toLocaleDateString()}, Value: ${g.value}`}>
                  <div
                    className="w-full bg-indigo-500/20 rounded-t-sm relative group-hover:bg-indigo-500/40 transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="absolute top-0 w-full h-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 px-2">
            {/* Simplified labels */}
            <span>{growth.length > 0 ? new Date(growth[0].date).toLocaleDateString() : 'Start'}</span>
            <span>{growth.length > 0 ? new Date(growth[growth.length - 1].date).toLocaleDateString() : 'End'}</span>
          </div>
        </div>

        {/* Sidebar Widgets - Now using real data */}
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
