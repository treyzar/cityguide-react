import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import FirstSection from './firstSection.jsx/firstSection';
import SliderSection from './sliderSection/sliderSection';
import CardSection from './cardSection/cardSection';

export default function Main() {
  return (
    <>
      <Header />
      <FirstSection />
      <SliderSection />
      <CardSection />
      <Footer />
    </>
  );
}
