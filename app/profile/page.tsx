'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { User, Mail, Phone, MapPin, Calendar as CalendarIcon, Award, Clock, Target, Edit2, Camera, Lock, Bell, FileText, TrendingUp } from 'lucide-react';
import { mockUsers, dashboardStats } from '@/data/mockData';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const currentUser = mockUsers[0];
  
  const stats = [
    { label: 'Courses Enrolled', value: dashboardStats.totalCourses.toString(), icon: Target, color: 'primary' },
    { label: 'Hours Studied', value: dashboardStats.totalStudyHours.toString(), icon: Clock, color: 'secondary' },
    { label: 'Certificate Earned', value: '3', icon: Award, color: 'success' },
    { label: 'Mock Tests', value: dashboardStats.mockTestsTaken.toString(), icon: FileText, color: 'warning' },
  ];
  
  const recentAchievements = [
    { title: '7-Day Study Streak', earned: 'March 20, 2024', icon: TrendingUp },
    { title: 'Band 7+ Achieved', earned: 'March 15, 2024', icon: Award },
    { title: 'Vocabulary Master', earned: 'March 10, 2024', icon: Target },
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">My Profile</h1>
          <p className="text-gray-300">Manage your account settings and view your progress</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details and preferences</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="text-center">
                    <div className="relative">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-500"
                      />
                      <button className="absolute bottom-4 right-4 p-1 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <User className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="text-sm text-gray-400">Full Name</p>
                          <p className="font-semibold text-gray-100">{currentUser.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <Mail className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="text-sm text-gray-400">Email Address</p>
                          <p className="font-semibold text-gray-100">{currentUser.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <Phone className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="text-sm text-gray-400">Phone Number</p>
                          <p className="font-semibold text-gray-100">{currentUser.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="text-sm text-gray-400">Country</p>
                          <p className="font-semibold text-gray-100">{currentUser.country}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="font-semibold text-gray-100">
                          {new Date(currentUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Subscription Details */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Your current plan and benefits</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="gradient-bg rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    <div>
                      <p className="text-white/80 text-sm">Current Plan</p>
                      <h3 className="text-2xl font-bold">Pro Plan</h3>
                      <p className="text-white/80 text-sm">Valid until December 31, 2024</p>
                    </div>
                    <Award className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                      Manage Plan
                    </Button>
                    <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                      View Invoices
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', description: 'Receive email updates about your progress' },
                    { label: 'Push Notifications', description: 'Get real-time notifications on your device' },
                    { label: 'Class Reminders', description: 'Receive reminders before live classes' },
                    { label: 'Achievement Alerts', description: 'Get notified when you earn achievements' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-100">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300  rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
          
          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
                <CardDescription>Your progress at a glance</CardDescription>
              </CardHeader>
              <CardBody className="space-y-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  const colorClass = stat.color === 'primary' ? 'bg-primary-900 text-primary-400' :
                                   stat.color === 'secondary' ? 'bg-secondary-900 text-secondary-400' :
                                   stat.color === 'success' ? 'bg-green-900 text-green-400' :
                                   'bg-yellow-900 text-yellow-400';
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`${colorClass} p-2 rounded-lg`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-gray-300">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-100">{stat.value}</span>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
            
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Latest badges you've earned</CardDescription>
              </CardHeader>
              <CardBody className="space-y-3">
                {recentAchievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-100">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.earned}</p>
                      </div>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardBody className="space-y-3">
                <Button variant="primary" className="w-full" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowChangePassword(true)}>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
        
        {/* Edit Profile Modal */}
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Profile" size="lg">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={currentUser.name} />
              <Input label="Email" defaultValue={currentUser.email} />
              <Input label="Phone" defaultValue={currentUser.phone} />
              <Input label="Country" defaultValue={currentUser.country} />
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsEditing(false)}>Save Changes</Button>
            </div>
          </div>
        </Modal>
        
        {/* Change Password Modal */}
        <Modal isOpen={showChangePassword} onClose={() => setShowChangePassword(false)} title="Change Password" size="md">
          <div className="space-y-4">
            <Input type="password" label="Current Password" />
            <Input type="password" label="New Password" />
            <Input type="password" label="Confirm New Password" />
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowChangePassword(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setShowChangePassword(false)}>Update Password</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}