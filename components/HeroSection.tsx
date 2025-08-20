import { Button } from './ui/button';
import { Calendar, MapPin, Users, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onNavigate?: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/1481903/1481903-hd_1920_1080_25fps.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-white/40 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center mt-16">
        <div className="max-w-4xl mx-auto text-center text-black">
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight text-white">
            DS AI Week 2025
          </h1>
          
          {/* Date and Venue */}
          <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto text-[32px]">
            <span className="text-white/90 text-lg font-medium text-[24px] text-[20px] text-[16px]">
              2025.09.15(월) - 09.17(수)
            </span>
            <span className="text-white/90 text-lg font-medium text-[24px]">
              @The UniverSE
            </span>
          </div>
          
          {/* Description */}
          <p className="text-[20px] mb-6 text-[rgba(255,255,255,1)] max-w-3xl mx-auto leading-relaxed font-bold">
            Sync Up, Step Up, Power Up<br></br>
            삼성전자 DS부문 AI Week, 3일 간의 특별한 여정이 시작됩니다.
          </p>



          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium rounded-full"
              onClick={() => onNavigate?.('register')}
            >
              사전 등록하기
            </Button>
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium rounded-full"
            >
               동료 초대하기
            </Button>
          </div> */}

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-white/70 text-sm font-medium animate-pulse">
                Scroll Down
              </div>
              <div className="animate-bounce">
                <ChevronDown className="w-8 h-8 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}