'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Video, 
  User, 
  Settings, 
  HelpCircle,
  Award,
  Calendar,
  Target,
  TrendingUp,
  LogOut,
  Headphones,
  BookMarked,
  Mic,
  PenTool,
  Library,
  CreditCard,
  Bell,
  Home
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  
  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'My Courses', icon: BookOpen },
    { href: '/mock-tests', label: 'Mock Tests', icon: FileText },
    { href: '/practice/listening', label: 'Listening Practice', icon: Headphones },
    { href: '/practice/reading', label: 'Reading Practice', icon: BookMarked },
    { href: '/practice/writing', label: 'Writing Practice', icon: PenTool },
    { href: '/practice/speaking', label: 'Speaking Practice', icon: Mic },
    { href: '/vocabulary', label: 'Vocabulary Builder', icon: Library },
    { href: '/live-classes', label: 'Live Classes', icon: Video },
    { href: '/progress', label: 'Progress Report', icon: TrendingUp },
    { href: '/achievements', label: 'Achievements', icon: Award },
    { href: '/calendar', label: 'Study Calendar', icon: Calendar },
    { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help & Support', icon: HelpCircle },
  ];
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    if (href === '/dashboard') return pathname === href;
    return pathname?.startsWith(href);
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-2xl z-50
        transition-transform duration-300 ease-in-out w-80
        md:relative md:translate-x-0 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header - Clickable Logo */}
        <Link href="/" onClick={onClose} className="gradient-bg p-6 sticky top-0 z-10 block">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">IELTS</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">IELTS Prep Pro</h2>
              <p className="text-white/70 text-xs">Premium Account</p>
            </div>
          </div>
        </Link>
        
        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img 
              src="https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff"
              alt="John Smith"
              className="w-12 h-12 rounded-full border-2 border-primary-500"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">John Smith</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Student since Jan 2024</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'gradient-bg text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <IconComponent className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-white' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900">
          <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors group">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
          
          {/* Study Streak Card */}
          <div className="mt-4 p-3 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Study Streak</p>
              <Target className="w-4 h-4 text-primary-500" />
            </div>
            <p className="text-2xl font-bold gradient-text">15 days 🔥</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div className="gradient-bg h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">48 hours of learning</p>
          </div>
        </div>
      </aside>
    </>
  );
};