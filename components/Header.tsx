'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onEventSelect: (eventType: 'forum' | 'conference') => void;
}

export function Header({ onNavigate, onEventSelect }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  const handleSubItemClick = (eventType: 'forum' | 'conference', section: string) => {
    onEventSelect(eventType);
    setTimeout(() => {
      onNavigate(section);
    }, 100);
    setHoveredMenu(null);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { 
      id: 'forum', 
      label: 'Samsung AI Forum',
      subItems: [
        { id: 'forum-schedule', label: '세션안내' },
        { id: 'forum-speakers', label: '연사소개' },
        { id: 'forum-faq', label: 'FAQ' }
      ]
    },    
    { 
      id: 'conference', 
      label: 'DS AI Conference',
      subItems: [
        { id: 'schedule', label: '세션안내' },
        { id: 'speakers', label: '연사소개' },
        { id: 'booth', label: '현장부스' },
        { id: 'networking', label: '네트워킹' },
        { id: 'on-site-events', label: '이벤트' },
        { id: 'faq', label: 'FAQ' }
      ]
    },
    { id: 'register', label: '참가 신청' },
    { id: 'guestbook', label: '방명록' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span 
              className={`font-bold text-xl transition-colors duration-300 cursor-pointer ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
              onClick={() => onNavigate('home')}
            >
              DS AI Week 2025
            </span>
          </div>

          {/* Right side - Navigation Menu + Visitor Counter */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Menu */}
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <li 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => item.subItems && handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.subItems ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className={`transition-all duration-300 hover:bg-white/10 hover:font-bold flex items-center gap-1 text-base ${
                          isScrolled 
                            ? 'text-gray-700 hover:text-gray-900' 
                            : 'text-white hover:text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      
                      {/* Dropdown Menu */}
                      {hoveredMenu === item.id && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleSubItemClick(
                                item.id === 'forum' ? 'forum' : 'conference', 
                                subItem.id
                              )}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5325BA] transition-colors duration-200"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className={`transition-all duration-300 hover:bg-white/10 hover:font-bold text-base ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-gray-900' 
                          : 'text-white hover:text-white'
                      }`}
                      onClick={() => onNavigate(item.id)}
                    >
                      {item.label}
                    </Button>
                  )}
                </li>
              ))}
            </ul>

            {/* Visitor Counter */}
            <VisitorCounter />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}