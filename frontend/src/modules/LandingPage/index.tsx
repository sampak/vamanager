import Header from '../../components/Header';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import LastPireps from './components/LastPireps';
import WhyUs from './components/WhyUs';
import LiveMap from './components/LiveMap';

const Homepage = () => {
  return (
    <>
      <Header />
      <WhyUs />
      <AboutUs />
      <LiveMap />
      {/* @ts-ignore */}
      <LastPireps />
      <Footer />
    </>
  );
};

export default Homepage;
