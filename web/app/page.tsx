import { Metadata } from 'next';
import PortfolioClient from './components/PortfolioClient';
import FooterSection from './components/FooterSection';

export const metadata: Metadata = {
  title: 'Nur Aziz Tri Indrawan | AI & Frontend Developer',
  description: 'Portfolio of Nur Aziz Tri Indrawan, specializing in building intelligent & creative solutions.',
};

export default function Page() {
  return (
    <>
      <PortfolioClient />
      <FooterSection />
    </>
  );
}
