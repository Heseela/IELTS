'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ArrowRight, Target, Clock, Users, Award, Headphones, BookOpen, Mic, PenTool, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Target,
      title: 'Target Band 9',
      description: 'Comprehensive preparation for your target band score with personalized study plans',
      color: 'primary',
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to all materials and practice tests',
      color: 'secondary',
    },
    {
      icon: Users,
      title: 'Expert Teachers',
      description: 'Learn from certified IELTS instructors with years of experience',
      color: 'primary',
    },
    {
      icon: Award,
      title: 'Mock Tests',
      description: 'Real exam simulations with detailed feedback and performance analytics',
      color: 'secondary',
    },
  ];

  const modules = [
    { icon: Headphones, title: 'Listening', description: 'Practice with authentic audio recordings', color: 'primary', href: '/practice/listening' },
    { icon: BookOpen, title: 'Reading', description: 'Master skimming and scanning techniques', color: 'secondary', href: '/practice/reading' },
    { icon: PenTool, title: 'Writing', description: 'Get AI feedback on your essays', color: 'primary', href: '/practice/writing' },
    { icon: Mic, title: 'Speaking', description: 'Record and evaluate your speaking', color: 'secondary', href: '/practice/speaking' },
  ];

  const stats = [
    { value: '50,000+', label: 'Active Students' },
    { value: '98%', label: 'Success Rate' },
    { value: '500+', label: 'Practice Tests' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-linear-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/50 text-primary-300 text-sm mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Join 50,000+ Successful Students
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Master IELTS</span>
              <br />
              <span className="text-gray-100">Achieve Your Dream Score</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Comprehensive IELTS preparation platform with AI-powered feedback, live classes, and personalized study plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="primary" className='flex items-center'>
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  Explore Courses
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Why Choose IELTS Prep Pro?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to succeed in your IELTS journey, all in one platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClass = feature.color === 'primary' 
                ? 'bg-primary-900/50 text-primary-400' 
                : 'bg-secondary-900/50 text-secondary-400';
              
              return (
                <Card key={index} hover>
                  <CardBody className="text-center">
                    <div className={`${colorClass} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Master Every Section
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive practice for all four IELTS modules with real test simulations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Link href={module.href} key={index}>
                  <Card hover className="cursor-pointer h-full">
                    <CardBody className="text-center">
                      <div className={`w-20 h-20 rounded-full bg-${module.color}-900/50 flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-10 h-10 text-${module.color}-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-100 mb-2">{module.title}</h3>
                      <p className="text-sm text-gray-300">{module.description}</p>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="gradient-bg py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your IELTS Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get access to all courses, mock tests, live classes, and AI feedback today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-white/90">
              Start 7-Day Free Trial
            </Button>
            {/* <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
              View Pricing
            </Button> */}
          </div>
          <p className="text-white/70 text-sm mt-6">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </div>
  );
}