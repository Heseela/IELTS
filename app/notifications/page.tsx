'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, CheckCircle, Clock, Award, Calendar, MessageCircle, Trash2, CheckCheck } from 'lucide-react';
import { Notification } from '@/types';

const mockNotificationsData: (Notification & { type?: 'achievement' | 'reminder' | 'feedback' | 'update' })[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Test Completed',
    message: 'You completed IELTS Academic Mock Test 1 with a score of 7.5',
    is_read: false,
    created_at: new Date('2024-03-15T13:30:00'),
    type: 'update',
  },
  {
    id: 2,
    user_id: 1,
    title: 'New Live Class Available',
    message: 'Join our Writing Workshop tomorrow at 10 AM',
    is_read: false,
    created_at: new Date('2024-03-26T09:00:00'),
    type: 'reminder',
  },
  {
    id: 3,
    user_id: 1,
    title: 'New Achievement Unlocked!',
    message: 'You have earned the "Practice Makes Perfect" badge for completing 10 practice sessions.',
    is_read: false,
    created_at: new Date('2024-03-25T08:00:00'),
    type: 'achievement',
  },
  {
    id: 4,
    user_id: 1,
    title: 'Writing Feedback Ready',
    message: 'Your essay has been reviewed by our AI system. Check your feedback now!',
    is_read: true,
    created_at: new Date('2024-03-24T14:30:00'),
    type: 'feedback',
  },
  {
    id: 5,
    user_id: 1,
    title: 'Class Reminder',
    message: 'Your live class "IELTS Listening Tips" starts in 30 minutes.',
    is_read: false,
    created_at: new Date('2024-03-26T14:30:00'),
    type: 'reminder',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotificationsData);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.is_read;
    if (filter === 'read') return notif.is_read;
    return true;
  });
  
  const unreadCount = notifications.filter(n => !n.is_read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getNotificationIcon = (type?: string) => {
    switch(type) {
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-primary-500" />;
      case 'feedback':
        return <MessageCircle className="w-5 h-5 text-secondary-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-300">Stay updated with your progress and reminders</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {['all', 'unread', 'read'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f as any)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`transition-all ${!notification.is_read ? 'border-l-4 border-l-primary-500' : ''}`}>
                <CardBody className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        !notification.is_read ? 'bg-primary-50 dark:bg-primary-950' : 'bg-gray-50 dark:bg-gray-800'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                            {notification.title}
                          </h3>
                          {!notification.is_read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeAgo(new Date(notification.created_at))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.is_read && (
                        <Button 
                          size="xs" 
                          variant="ghost" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-primary-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="xs" 
                        variant="ghost" 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardBody className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up! Check back later for updates.</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}