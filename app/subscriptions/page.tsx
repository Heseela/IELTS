'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Check, Crown, Sparkles, Zap, CreditCard, Calendar, Award, Star, TrendingUp } from 'lucide-react';
import { mockPlans, mockSubscriptions } from '@/data/mockData';

interface Plan {
  id: number;
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    duration: 30,
    features: [
      '5 Mock Tests',
      'Basic Course Access',
      'Community Support',
      'Email Support',
      'Basic Analytics'
    ],
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 2,
    name: 'Pro',
    price: 59,
    duration: 90,
    popular: true,
    features: [
      'Unlimited Mock Tests',
      'All Courses Access',
      'AI Feedback on Writing',
      'AI Feedback on Speaking',
      'Live Classes Access',
      'Priority Support',
      'Advanced Analytics',
      'Vocabulary Builder'
    ],
    icon: <Crown className="w-8 h-8" />
  },
  {
    id: 3,
    name: 'Premium',
    price: 99,
    duration: 180,
    features: [
      'Everything in Pro',
      '1-on-1 Tutoring (4 sessions)',
      'Teacher Review on Essays',
      'Speaking Session with Teacher',
      'Personal Study Plan',
      'Certificate of Completion',
      '24/7 Priority Support',
      'Downloadable Resources'
    ],
    icon: <Zap className="w-8 h-8" />
  }
];

const currentSubscription = {
  plan: 'Pro',
  status: 'active',
  startDate: 'Jan 15, 2024',
  endDate: 'Apr 15, 2024',
  daysLeft: 24,
  features: mockPlans.find(p => p.name === 'Pro')?.features || []
};

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };
  
  const handlePayment = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Select the perfect plan to accelerate your IELTS journey
          </p>
        </div>
        
        {/* Current Subscription */}
        {currentSubscription.status === 'active' && (
          <Card className="mb-12 gradient-bg">
            <CardBody className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Current Plan</p>
                    <h3 className="text-2xl font-bold">{currentSubscription.plan}</h3>
                    <p className="text-white/80 text-sm">
                      Valid until {currentSubscription.endDate} • {currentSubscription.daysLeft} days remaining
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Manage Subscription
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card key={plan.id} hover className={`relative ${plan.popular ? 'border-2 border-primary-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-bg px-4 py-1 rounded-full text-white text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              <CardBody className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'gradient-bg' : 'bg-gray-800'
                }`}>
                  <div className={plan.popular ? 'text-white' : 'text-primary-500'}>
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-100">${plan.price}</span>
                  <span className="text-gray-500">/{plan.duration} days</span>
                </div>
                
                <ul className="space-y-3 mb-6 text-left">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="w-5 h-5 text-success-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-sm text-primary-500 ml-7">
                      +{plan.features.length - 5} more features
                    </li>
                  )}
                </ul>
                
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  fullWidth
                  onClick={() => handleSubscribe(plan)}
                  disabled={currentSubscription.plan === plan.name && currentSubscription.status === 'active'}
                >
                  {currentSubscription.plan === plan.name && currentSubscription.status === 'active' 
                    ? 'Current Plan' 
                    : `Subscribe to ${plan.name}`}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
        
        {/* Features Comparison */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Compare All Features</CardTitle>
            <CardDescription>Everything you need to succeed in your IELTS journey</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Feature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-100">Basic</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-100">Pro</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-100">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">Mock Tests</td>
                    <td className="px-4 py-3 text-center">5</td>
                    <td className="px-4 py-3 text-center">Unlimited</td>
                    <td className="px-4 py-3 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">Course Access</td>
                    <td className="px-4 py-3 text-center">Basic</td>
                    <td className="px-4 py-3 text-center">All Courses</td>
                    <td className="px-4 py-3 text-center">All Courses</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">AI Writing Feedback</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">✓</td>
                    <td className="px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">AI Speaking Feedback</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">✓</td>
                    <td className="px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">Live Classes</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">✓</td>
                    <td className="px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">1-on-1 Tutoring</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">4 sessions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-300">Teacher Review</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        
        {/* Payment Modal */}
        <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Complete Payment" size="md">
          {selectedPlan && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-100">{selectedPlan.name} Plan</span>
                  <span className="text-2xl font-bold text-primary-600">${selectedPlan.price}</span>
                </div>
                <p className="text-sm text-gray-500">Valid for {selectedPlan.duration} days</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-100">Payment Method</h4>
                <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="mr-3" />
                  <CreditCard className="w-5 h-5 text-primary-500 mr-2" />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>PayPal</span>
                </label>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handlePayment}>
                  Pay ${selectedPlan.price}
                </Button>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Success Modal */}
        <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Payment Successful" size="sm">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Thank You!</h3>
            <p className="text-gray-400">
              Your subscription has been activated successfully.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}