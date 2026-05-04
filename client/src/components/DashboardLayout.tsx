import { ReactNode } from "react";
import Sidebar from "./Sidebar";

/**
 * Dashboard Layout - Neo-Playful Modernism
 * Two-column layout with sidebar and main content
 */
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
