import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }: StatCardProps) => {
    return (
        <div className="glass-panel card p-6 animate-fade-in hover:bg-slate-800/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-opacity-20 ${color} bg-white bg-opacity-5`}>
                    {/* The color prop is expected to be a text class like text-indigo-500, but we need bg opacity. 
                For simplicity in vanilla/globals usage, let's style inline or use specific classes if Tailwind was on.
                Since we are using Vanilla CSS mostly with some utility helpers I added in globals:
            */}
                    <Icon size={20} style={{ color: color }} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trend}
                </span>
                <span className="text-xs text-slate-500">vs last month</span>
            </div>
        </div>
    );
};

export default StatCard;
