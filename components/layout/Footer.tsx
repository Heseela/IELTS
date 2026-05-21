'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">IELTS</span>
              </div>
              <h3 className="text-white font-bold text-lg">IELTS Prep Pro</h3>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your comprehensive platform for IELTS preparation. Join thousands of successful students who achieved their dream band score.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/courses" className="hover:text-primary-400 transition-colors">All Courses</Link></li>
              <li><Link href="/mock-tests" className="hover:text-primary-400 transition-colors">Mock Tests</Link></li>
              <li><Link href="/practice/listening" className="hover:text-primary-400 transition-colors">Listening Practice</Link></li>
              <li><Link href="/practice/reading" className="hover:text-primary-400 transition-colors">Reading Practice</Link></li>
              <li><Link href="/practice/writing" className="hover:text-primary-400 transition-colors">Writing Practice</Link></li>
              <li><Link href="/practice/speaking" className="hover:text-primary-400 transition-colors">Speaking Practice</Link></li>
              <li><Link href="/live-classes" className="hover:text-primary-400 transition-colors">Live Classes</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-primary-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400" />
                <span>123 Education Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>support@ieltspreppro.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="gradient-bg px-4 py-2 rounded-r-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">
              © {currentYear} IELTS Prep Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 mt-2 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for IELTS success</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};