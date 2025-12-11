# Socialize - Command Center

Socialize is a modern, AI-powered social media management dashboard designed to help users streamline their online presence. Features a premium "glassmorphism" aesthetic, real-time analytics, and a powerful content scheduling system.

## 🚀 Features

- **📊 Comprehensive Dashboard**: Get a high-level view of your social performance with real-time stats and growth charts.
- **📅 Content Scheduler**: Plan your content calendar with an intuitive monthly/weekly view.
- **📈 Advanced Analytics**: Deep dive into audience demographics, engagement trends, and growth metrics.
- **✨ Premium UI**: Fully responsive, dark-mode first design featuring modern glassmorphism effects.
- **🔄 Real-time Activity**: Track user interactions and system events as they happen.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database (ORM)**: [Prisma](https://www.prisma.io/) with SQLite (Development) / PostgreSQL (Production ready)
- **Styling**: Vanilla CSS (Custom Variables & Utilities) for maximum control and performance.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Time Management**: [date-fns](https://date-fns.org/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/parthshinge/Socialize.git
   cd Socialize
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   Initialize the SQLite database and seed it with initial data.
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations (creates dev.db)
   npx prisma migrate dev --name init

   # Seed the database
   npx prisma db seed
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components (StatCard, Sidebar, etc.).
- `src/lib`: Utility functions and Prisma instance.
- `prisma`: Database schema and seed scripts.

## 📱 Mobile Responsiveness

The application is fully optimized for mobile devices, featuring:
- Collapsible navigation
- Stacked grid layouts
- Touch-friendly scrollable calendars

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
