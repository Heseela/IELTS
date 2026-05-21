'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, User, Search, LogOut, Settings, BookOpen, FileText, Video, Award, ChevronDown, Headphones, BookMarked, Mic, PenTool } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BookOpen },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/mock-tests', label: 'Mock Tests', icon: FileText },
    { href: '/live-classes', label: 'Live Classes', icon: Video },
  ];

  const practiceItems = [
    { href: '/practice/listening', label: 'Listening', icon: Headphones },
    { href: '/practice/reading', label: 'Reading', icon: BookMarked },
    { href: '/practice/writing', label: 'Writing', icon: PenTool },
    { href: '/practice/speaking', label: 'Speaking', icon: Mic },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      <div className="w-11/12 mx-auto py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="gradient-bg w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">IELTS</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text hidden sm:block">
              IELTS Prep Pro
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'gradient-bg text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Practice Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowPracticeDropdown(true)}
                onMouseLeave={() => setShowPracticeDropdown(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                  pathname?.startsWith('/practice')
                    ? 'gradient-bg text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>Practice</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showPracticeDropdown && (
                <div 
                  onMouseEnter={() => setShowPracticeDropdown(true)}
                  onMouseLeave={() => setShowPracticeDropdown(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in"
                >
                  {practiceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        pathname === item.href ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link
              href="/achievements"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === '/achievements'
                  ? 'gradient-bg text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Achievements
            </Link>
          </nav>
          
          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 min-w-[300px]">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses, tests, vocabulary..." 
              className="bg-transparent ml-2 outline-none w-full text-gray-800 dark:text-gray-200 placeholder:text-gray-500"
            />
          </div> */}
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link href="/notifications">
              <button className="relative hover:scale-105 transition-transform">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden lg:inline font-medium text-gray-700 dark:text-gray-300">John Smith</span>
              </button>
              
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">John Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">john.smith@example.com</p>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <Link href="/subscriptions" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Award className="w-4 h-4 mr-3" />
                      Subscription
                    </Link>
                    <Link href="/vocabulary" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <BookOpen className="w-4 h-4 mr-3" />
                      Vocabulary
                    </Link>
                    <button className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Button size="sm" variant="primary">Upgrade to Pro</Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 dark:text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href
                      ? 'gradient-bg text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Practice Section in Mobile */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Practice</p>
                <div className="space-y-2">
                  {practiceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                        pathname === item.href
                          ? 'gradient-bg text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                href="/achievements"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === '/achievements'
                    ? 'gradient-bg text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Award className="w-5 h-5" />
                <span className="font-medium">Achievements</span>
              </Link>
              
              <Link
                href="/vocabulary"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === '/vocabulary'
                    ? 'gradient-bg text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Vocabulary</span>
              </Link>
              
              {/* <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 mt-2">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent ml-2 outline-none flex-1 text-gray-800 dark:text-gray-200"
                />
              </div> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};