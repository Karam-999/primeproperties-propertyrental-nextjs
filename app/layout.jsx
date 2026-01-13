import '@/assets/styles/globals.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { GlobalContexttProvider } from '@/context/GlobalContext';
export const metadata = {
  title: 'Property App',
  description: 'A property listing application built with Next.js',
  keywords: 'property, real estate, listings, Next.js',
};
import AuthProviderComponent from '@/components/AuthProvider';

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProviderComponent>
          <GlobalContexttProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster
              position='top-right'
              richColors
              expand
              visibleToasts={1}
              closeButton
            />
          </GlobalContexttProvider>
        </AuthProviderComponent>
      </body>
    </html>
  );
};

export default MainLayout;
