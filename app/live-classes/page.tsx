'use client';

import { useState } from 'react';
import { Card, CardBody} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Calendar, Clock, Users, Video, Star, ChevronRight, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { mockLiveClasses } from '@/data/mockData';
import { LiveClass } from '@/types';

interface LiveClassWithTeacher extends LiveClass {
  teacherName: string;
  teacherAvatar: string;
  teacherRating: number;
  studentsEnrolled: number;
}

const extendedLiveClasses: LiveClassWithTeacher[] = [
  {
    ...mockLiveClasses[0],
    teacherName: 'Sarah Johnson',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=d946ef&color=fff',
    teacherRating: 4.9,
    studentsEnrolled: 156,
  },
  {
    ...mockLiveClasses[1],
    teacherName: 'Michael Chen',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=0ea5e9&color=fff',
    teacherRating: 4.8,
    studentsEnrolled: 203,
  },
  {
    id: 3,
    title: 'Speaking Fluency Masterclass',
    description: 'Advanced techniques to improve your speaking fluency and coherence',
    start_time: new Date('2024-03-29T16:00:00'),
    end_time: new Date('2024-03-29T17:30:00'),
    teacher_id: 4,
    created_at: new Date('2024-03-22'),
    teacherName: 'Emma Watson',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Emma+Watson&background=d946ef&color=fff',
    teacherRating: 4.9,
    studentsEnrolled: 312,
  },
  {
    id: 4,
    title: 'Vocabulary for Band 7+',
    description: 'Learn high-frequency academic words and phrases for IELTS',
    start_time: new Date('2024-04-01T11:00:00'),
    end_time: new Date('2024-04-01T12:30:00'),
    teacher_id: 2,
    created_at: new Date('2024-03-23'),
    teacherName: 'Sarah Johnson',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=d946ef&color=fff',
    teacherRating: 4.9,
    studentsEnrolled: 189,
  },
];

const pastClasses = [
  {
    id: 5,
    title: 'IELTS Writing Task 1: Graphs and Charts',
    date: 'March 20, 2024',
    teacher: 'Michael Chen',
    duration: '1.5 hours',
    recordingUrl: '#',
  },
  {
    id: 6,
    title: 'Listening Section 4 Strategies',
    date: 'March 18, 2024',
    teacher: 'Sarah Johnson',
    duration: '1 hour',
    recordingUrl: '#',
  },
];

export default function LiveClassesPage() {
  const [selectedClass, setSelectedClass] = useState<LiveClassWithTeacher | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedClass, setBookedClass] = useState<number | null>(null);
  
  const upcomingClasses = extendedLiveClasses.filter(c => new Date(c.start_time) > new Date());
  const upcomingThisWeek = upcomingClasses.filter(c => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return new Date(c.start_time) <= weekFromNow;
  });
  
  const handleBookClass = (classItem: LiveClassWithTeacher) => {
    setSelectedClass(classItem);
    setShowBookingModal(true);
  };
  
  const confirmBooking = () => {
    if (selectedClass) {
      setBookedClass(selectedClass.id);
      setShowBookingModal(false);
      setTimeout(() => setBookedClass(null), 3000);
    }
  };
  
  const addToCalendar = (classItem: LiveClassWithTeacher) => {
    alert(`Added "${classItem.title}" to your calendar!`);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Live Classes</h1>
          <p className="text-gray-300">Join interactive sessions with expert IELTS instructors</p>
        </div>
        
        {upcomingThisWeek.length > 0 && (
          <Card className="mb-8 gradient-bg">
            <CardBody className="p-6 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{upcomingThisWeek.length} Classes This Week</h3>
                    <p className="text-white/80 text-sm">Don't miss out on upcoming sessions</p>
                  </div>
                </div>
                <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                  View All
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
        
        {bookedClass && (
          <div className="fixed top-20 right-4 z-50 animate-slide-up">
            <Card className="bg-success-500 text-white">
              <CardBody className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Class booked successfully!</span>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
        
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Upcoming Classes</h2>
            <div className="gradient-bg px-4 py-2 rounded-full text-white text-sm font-semibold">
              {upcomingClasses.length} classes available
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingClasses.map((classItem) => (
              <Card key={classItem.id} hover>
                <div className="gradient-bg h-1 rounded-t-xl"></div>
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={classItem.teacherAvatar} 
                        alt={classItem.teacherName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-100">{classItem.teacherName}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-400 ml-1">{classItem.teacherRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs font-semibold">Live</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{classItem.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{classItem.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{new Date(classItem.start_time).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-primary-500" />
                      <span>
                        {new Date(classItem.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(classItem.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{classItem.studentsEnrolled} students enrolled</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={() => handleBookClass(classItem)}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => addToCalendar(classItem)}
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Recorded Sessions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pastClasses.map((classItem) => (
              <Card key={classItem.id}>
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-100">{classItem.title}</h3>
                        <p className="text-sm text-gray-400">
                          {classItem.date} • {classItem.duration}
                        </p>
                        <p className="text-xs text-gray-400">Teacher: {classItem.teacher}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Recording
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
        
        <Modal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} title="Confirm Booking" size="md">
          {selectedClass && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-100 mb-2">{selectedClass.title}</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>📅 {new Date(selectedClass.start_time).toLocaleDateString()}</p>
                  <p>🕐 {new Date(selectedClass.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p>👨‍🏫 Teacher: {selectedClass.teacherName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                You will receive a notification 15 minutes before the class starts.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmBooking}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}