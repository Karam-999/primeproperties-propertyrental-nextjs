import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomePropertiesPage from '@/components/HomePage';
import FeaturedProperties from '@/components/FeaturedProperties';
// import Footer from '@/components/Footer';
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomePropertiesPage />
    </>
  );
};

export default HomePage;
