import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { FeaturesProvider } from '@/contexts/FeaturesContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <FeaturesProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </FeaturesProvider>
  );
}
