import { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

interface VisitorData {
  total_visitors: number;
  today_visitors: number;
  this_week_visitors: number;
  this_month_visitors: number;
}

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasTrackedVisitor = useRef(false);

  // Function to track a visitor
  const trackVisitor = async () => {
    // Prevent duplicate tracking
    if (hasTrackedVisitor.current) {
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      await fetch(`${baseUrl}/api/visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      hasTrackedVisitor.current = true;
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  // Function to get visitor count
  const getVisitorCount = async () => {
    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/visitor/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: VisitorData = await response.json();
        setVisitorCount(data.total_visitors);
      }
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Track visitor on component mount (homepage visit)
    trackVisitor();
    
    // Get current visitor count
    getVisitorCount();

    // Optional: Refresh visitor count every 30 seconds
    const interval = setInterval(getVisitorCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
        <Users className="w-4 h-4 text-[#5325BA]" />
        <span className="text-sm font-medium text-gray-700">...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 hover:bg-white/95 transition-all duration-300">
      <Users className="w-4 h-4 text-[#5325BA]" />
      <span className="text-sm font-medium text-gray-700">
        방문자: {visitorCount.toLocaleString()}
      </span>
    </div>
  );
} 