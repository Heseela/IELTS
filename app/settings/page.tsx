'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { HelpCircle, Mail, MessageCircle, Phone, BookOpen, Video, FileText, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'payment' | 'learning';
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I start a course?',
    answer: 'To start a course, go to the Courses page, select a course you\'re interested in, and click on "Start Course". You can track your progress through the dashboard.',
    category: 'learning',
  },
  {
    id: 2,
    question: 'How are mock tests scored?',
    answer: 'Mock tests are automatically scored based on your answers. For writing and speaking, AI provides feedback and estimated band scores. Teacher reviews are also available for premium plans.',
    category: 'general',
  },
  {
    id: 3,
    question: 'Can I upgrade my subscription?',
    answer: 'Yes! Go to the Subscriptions page, choose your desired plan, and follow the payment process. The new plan will be activated immediately with prorated pricing.',
    category: 'payment',
  },
  {
    id: 4,
    question: 'How do I reset my password?',
    answer: 'Click on "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password. Follow the link to create a new password.',
    category: 'technical',
  },
  {
    id: 5,
    question: 'Can I download course materials?',
    answer: 'Yes, premium members can download course materials including lesson notes, practice exercises, and answer keys. Look for the download button within each lesson.',
    category: 'general',
  },
  {
    id: 6,
    question: 'How does the AI feedback work?',
    answer: 'Our AI analyzes your writing and speaking responses using natural language processing. It evaluates grammar, vocabulary, coherence, and pronunciation to provide detailed feedback and estimated band scores.',
    category: 'learning',
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Help & Support</h1>
          <p className="text-gray-300">Find answers to your questions or contact our support team</p>
        </div>
        
        {/* Search */}
        <Card className="mb-8">
          <CardBody className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardBody>
        </Card>
        
        {/* Quick Help Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card hover>
            <CardBody className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-300">Getting Started</p>
            </CardBody>
          </Card>
          <Card hover>
            <CardBody className="p-4 text-center">
              <Video className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-300">Video Tutorials</p>
            </CardBody>
          </Card>
          <Card hover>
            <CardBody className="p-4 text-center">
              <FileText className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-300">User Guide</p>
            </CardBody>
          </Card>
          <Card hover>
            <CardBody className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-warning-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-300">Live Chat</p>
            </CardBody>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-semibold text-gray-100">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Our support team is here to assist you</CardDescription>
          </CardHeader>
          <CardBody>
            {!showContactForm ? (
              <div className="grid md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="p-4 text-center border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Mail className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-100">Email Support</p>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </button>
                <button className="p-4 text-center border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                  <MessageCircle className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-100">Live Chat</p>
                  <p className="text-xs text-gray-500">Available 9 AM - 6 PM</p>
                </button>
                <button className="p-4 text-center border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                  <Phone className="w-8 h-8 text-success-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-100">Phone Support</p>
                  <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input label="Your Name" placeholder="John Smith" />
                <Input label="Email Address" placeholder="john@example.com" />
                <Input label="Subject" placeholder="Brief description of your issue" />
                <TextArea label="Message" rows={5} placeholder="Please describe your issue in detail..." />
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowContactForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary">
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}