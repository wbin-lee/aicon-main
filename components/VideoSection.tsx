import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState, useRef } from 'react';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video" className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">


        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="relative aspect-video bg-black">
              {/* Actual Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                poster="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Controls (shown when video is not playing) */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                  {/* Play Button */}
                  <Button
                    onClick={handlePlayPause}
                    className="w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-110 bg-[#6FF28F] hover:bg-[#6FF28F]/90"
                  >
                    <Play className="w-8 h-8 ml-1 text-gray-900" />
                  </Button>
                </div>
              )}



              {/* Video Controls (always visible) */}
              <div className="absolute top-4 right-4 flex gap-2 z-30">
                <Button
                  onClick={handlePlayPause}
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={handleMuteToggle}
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={handleFullscreen}
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}