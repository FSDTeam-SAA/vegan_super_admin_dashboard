import { adminDashboardTabsList } from "@/data/dashboard";
import { ReactNode } from "react";
import DashboardNavbar from "./_components/dashboard-nav";
import Sidebar from "./_components/sidebar";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar lists={adminDashboardTabsList} />
      <main className="min-h-screen flex-1 overflow-y-auto bg-[#E8DFD6]">
        <DashboardNavbar />
        <div className="p-4 md:ml-[272px] md:p-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
