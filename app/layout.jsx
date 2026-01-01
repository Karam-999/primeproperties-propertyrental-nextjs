import '@/assets/styles/globals.css';
export const metadata = {
  title: 'Property App',
  description: 'A property listing application built with Next.js',
  keywords: 'property, real estate, listings, Next.js',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
