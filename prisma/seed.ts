import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log("DB URL:", process.env.DATABASE_URL);

async function main() {
    // Clear existing data
    await prisma.activity.deleteMany();
    await prisma.dashboardStat.deleteMany();
    await prisma.post.deleteMany();
    await prisma.demographic.deleteMany();
    await prisma.growthMetric.deleteMany();

    // Dashboard Stats
    await prisma.dashboardStat.createMany({
        data: [
            { title: "Total Followers", value: "124.5K", trend: "+12.5%", trendUp: true, type: "Users" },
            { title: "Engagement Rate", value: "4.8%", trend: "-0.5%", trendUp: false, type: "Activity" },
            { title: "Scheduled Posts", value: "12", trend: "+4", trendUp: true, type: "Calendar" },
            { title: "Interest Score", value: "89.2", trend: "+5.1%", trendUp: true, type: "Zap" },
        ]
    });

    // Recent Activity
    await prisma.activity.createMany({
        data: [
            { user: 'Alex Morgan', action: 'commented on your post', type: 'comment', createdAt: new Date(Date.now() - 2 * 60 * 1000) }, // 2 mins ago
            { user: 'Sarah Lee', action: 'liked your photo', type: 'like', createdAt: new Date(Date.now() - 15 * 60 * 1000) }, // 15 mins ago
            { user: 'TechDaily', action: 'shared your article', type: 'share', createdAt: new Date(Date.now() - 60 * 60 * 1000) }, // 1 hour ago
            { user: 'Mike Chen', action: 'started following you', type: 'follow', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) }, // 3 hours ago
        ]
    });

    // Posts
    // Using dates for coming days
    const today = new Date();
    const d1 = new Date(); d1.setDate(today.getDate() + 2); d1.setHours(10, 0, 0, 0);
    const d2 = new Date(); d2.setDate(today.getDate() + 5); d2.setHours(14, 0, 0, 0);
    const d3 = new Date(); d3.setDate(today.getDate() + 8); d3.setHours(17, 30, 0, 0);
    const d4 = new Date(); d4.setDate(today.getDate() + 12); d4.setHours(11, 0, 0, 0);

    await prisma.post.createMany({
        data: [
            { title: "Product Launch Teaser", content: "Big things coming soon!", platform: "twitter", scheduledFor: d1, status: "scheduled" },
            { title: "Weekly Blog Share", content: "Check out our latest post.", platform: "linkedin", scheduledFor: d2, status: "scheduled" },
            { title: "Behind the Scenes", content: "Office tour!", platform: "instagram", scheduledFor: d3, status: "scheduled" },
            { title: "Customer Spotlight", content: "Meeting our top users.", platform: "facebook", scheduledFor: d4, status: "scheduled" },
        ]
    });

    // Demographics
    await prisma.demographic.createMany({
        data: [
            { country: "United States", percentage: 45 },
            { country: "United Kingdom", percentage: 20 },
            { country: "Canada", percentage: 15 },
            { country: "Germany", percentage: 10 },
            { country: "Other", percentage: 10 },
        ]
    });

    // Growth Chart
    const growthData = [20, 30, 45, 40, 50, 60, 55, 70, 80, 75, 90, 100];
    // Create entries for last 12 days
    for (let i = 0; i < growthData.length; i++) {
        const d = new Date();
        d.setDate(today.getDate() - (growthData.length - 1 - i));
        await prisma.growthMetric.create({
            data: {
                date: d,
                value: growthData[i]
            }
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
