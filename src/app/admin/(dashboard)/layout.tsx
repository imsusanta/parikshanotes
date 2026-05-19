import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-theme flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-[#F8F9FA] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
