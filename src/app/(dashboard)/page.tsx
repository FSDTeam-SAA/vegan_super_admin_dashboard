import DashboardPageHeader from "./_components/dash-page-header";
import AdminOverviewStats from "./_components/overview";

export default function Home() {
  return (
    <div>
      <DashboardPageHeader
        title="Overview"
        desc="Get an overview of your performance, earnings, and progress"
      />

      <AdminOverviewStats />
    </div>
  );
}
