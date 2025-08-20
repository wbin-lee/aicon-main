import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CommonSection } from './components/CommonSection';
import { VideoSection } from './components/VideoSection';
import { GuestbookSection } from './components/GuestbookSection';
import { RegistrationSection } from './components/RegistrationSection';
import { FloatingRegisterButton } from './components/FloatingRegisterButton';
import { AnimatedSection } from './components/AnimatedSection';
import { Footer } from './components/Footer';

// Forum components
import { ForumScheduleSection } from './components/ForumScheduleSection';
import { ForumSpeakersSection } from './components/ForumSpeakersSection';
import { ForumFAQSection } from './components/ForumFAQSection';

// Conference components
import { ConferenceScheduleSection } from './components/ConferenceScheduleSection';
import { ConferenceSpeakersSection } from './components/ConferenceSpeakersSection';
import { BoothSection } from './components/BoothSection';
import { NetworkingSection } from './components/NetworkingSection';
import { OnSiteEventsSection } from './components/OnSiteEventsSection';
// import { EventsSection } from './components/EventsSection';
import { FAQSection } from './components/FAQSection';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<'forum' | 'conference' | null>('conference');
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleEventSelect = (eventType: 'forum' | 'conference') => {
    setSelectedEvent(eventType);
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 80;
      const rect = element.getBoundingClientRect();
      const elementPosition = window.pageYOffset + rect.top - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // Handle scroll position for button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 1080);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-300 to-blue-200">
              <Header onNavigate={handleNavigate} onEventSelect={handleEventSelect} />
      <main>
        {/* Hero Section - Always shown */}
        <AnimatedSection>
          <HeroSection onNavigate={handleNavigate} />
        </AnimatedSection>

        {/* Common Section - Always visible */}
        <AnimatedSection delay={0.1}>
          <CommonSection 
            onEventSelect={handleEventSelect} 
            selectedEvent={selectedEvent} 
          />
        </AnimatedSection>

        {/* Samsung AI Forum Sections */}
        {selectedEvent === 'forum' && (
          <>
            <AnimatedSection delay={0.2}>
              <ForumScheduleSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <ForumSpeakersSection />
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <ForumFAQSection />
            </AnimatedSection>
          </>
        )}

        {/* DS AI Conference Sections */}
        {selectedEvent === 'conference' && (
          <>
            <AnimatedSection delay={0.1}>
              <VideoSection />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ConferenceScheduleSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <ConferenceSpeakersSection />
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <BoothSection />
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <NetworkingSection />
            </AnimatedSection>
            {/* <AnimatedSection delay={0.6}>
              <EventsSection />
            </AnimatedSection> */}
            <AnimatedSection delay={0.6}>
              <OnSiteEventsSection />
            </AnimatedSection>
            <AnimatedSection delay={0.7}>
              <FAQSection />
            </AnimatedSection>
          </>
        )}

        {/* Common Sections - Only shown when event is selected */}
        { (
          <>
            <AnimatedSection delay={selectedEvent === 'forum' ? 0.5 : 0.9}>
              <RegistrationSection />
            </AnimatedSection>
            <AnimatedSection delay={selectedEvent === 'forum' ? 0.6 : 1.0}>
              <GuestbookSection />
            </AnimatedSection>
          </>
        )}

        {/* Navigate to Common Section Button */}
        <div className={`fixed bottom-20 left-6 z-40 transition-all duration-300 ${
          showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <button
            onClick={() => handleNavigate('common')}
            className="bg-white text-[#5325BA] border-2 border-[#5325BA] hover:bg-[#5325BA] hover:text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            ↑ 행사 선택
          </button>
        </div>
      </main>
      
      {selectedEvent && <FloatingRegisterButton onNavigate={handleNavigate} />}
      
      <Footer />
    </div>
  );
}