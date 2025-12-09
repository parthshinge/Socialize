import { MessageCircle, Heart, Share2, UserPlus, Activity } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

type ActivityItem = {
    id: string;
    user: string;
    action: string;
    type: string;
    createdAt: Date;
};

interface RecentActivityProps {
    activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'comment': return { icon: MessageCircle, color: '#6366f1' };
            case 'like': return { icon: Heart, color: '#ec4899' };
            case 'share': return { icon: Share2, color: '#14b8a6' };
            case 'follow': return { icon: UserPlus, color: '#8b5cf6' };
            default: return { icon: Activity, color: '#cbd5e1' };
        }
    };

    return (
        <div className="glass-panel card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold mb-6 text-white">Recent Activity</h3>
            <div className="flex flex-col gap-4">
                {activities.map((activity) => {
                    const { icon: Icon, color } = getIcon(activity.type);
                    return (
                        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700">
                                <Icon size={18} color={color} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-200">
                                    <span className="font-semibold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}</p>
                            </div>
                        </div>
                    );
                })}
                {activities.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
