import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AnnouncementBar />
      <Header />
      <CartDrawer />
      <main className="flex-1 pt-28">{children}</main>
      <Footer />
    </CartProvider>
  );
}
