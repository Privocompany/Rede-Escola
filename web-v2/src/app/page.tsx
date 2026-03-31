import AppSidebar from "@/components/layout/AppSidebar";
import BottomNav from "@/components/layout/BottomNav";
import MainFeed from "@/components/feed/MainFeed";
import SidebarWidgets from "@/components/widgets/SidebarWidgets";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-ui-wash">
      {/* Left Sidebar (desktop) */}
      <AppSidebar />

      {/* Main content area - offset for sidebar */}
      <div className="md:pl-[72px] xl:pl-[260px] pb-20 md:pb-0">
        <div className="max-w-[1100px] mx-auto px-4 py-6">
          <div className="flex gap-6 items-start">
            {/* Feed column */}
            <div className="flex-1 min-w-0 max-w-[630px] mx-auto xl:mx-0">
              <MainFeed />
            </div>

            {/* Right Widgets (desktop only) */}
            <aside className="hidden xl:block w-[320px] flex-shrink-0 sticky top-6">
              <SidebarWidgets />
            </aside>
          </div>
        </div>
      </div>

      {/* Bottom Nav (mobile only) */}
      <BottomNav />
    </div>
  );
}
