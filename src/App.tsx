import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { FoundersEdition } from './components/sections/FoundersEdition';
import { FoundersEditionAlt } from './components/sections/FoundersEditionAlt';
import { WhatsInside } from './components/sections/WhatsInside';
import { HowItWorks } from './components/sections/HowItWorks';
import { SoundpackUniverse } from './components/sections/SoundpackUniverse';
import { RemixWeek } from './components/sections/RemixWeek';
import { ArtistId } from './components/sections/ArtistId';
import { Community } from './components/sections/Community';
import LegacyLanding from './pages/LegacyLanding';

function NewLanding() {
  return (
    <div className="bg-brand-black text-white font-body min-h-screen antialiased overflow-x-hidden">
      <Sidebar />
      <main>
        <Hero />
        <FoundersEdition />
        <WhatsInside />
        <HowItWorks />
        <SoundpackUniverse />
        <RemixWeek />
        <ArtistId />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

function NewLandingAlt() {
  return (
    <div className="bg-brand-black text-white font-body min-h-screen antialiased overflow-x-hidden">
      <Sidebar />
      <main>
        <Hero />
        <FoundersEditionAlt />
        <WhatsInside />
        <HowItWorks />
        <SoundpackUniverse />
        <RemixWeek />
        <ArtistId />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLanding />} />
        <Route path="/v2" element={<NewLanding />} />
        <Route path="/v2a" element={<NewLandingAlt />} />
        <Route path="/v1" element={<LegacyLanding />} />
      </Routes>
    </BrowserRouter>
  );
}
