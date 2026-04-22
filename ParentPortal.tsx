import React, { useState } from 'react';
import { User, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail, MessageSquare, Shield } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  location: string;
  status: 'safe' | 'evacuated' | 'checked-in' | 'unknown';
  lastUpdate: string;
  photo: string;
}

interface Notification {
  id: string;
  type: 'emergency' | 'update' | 'resolved';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

const ParentPortal: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('1');
  
  const students: Student[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: '10th Grade',
      location: 'Main Building - Room 205',
      status: 'safe',
      lastUpdate: '14:25',
      photo: 'https://images.pexels.com/photos/3771071/pexels-photo-3771071.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Michael Johnson',
      grade: '7th Grade',
      location: 'Gymnasium',
      status: 'checked-in',
      lastUpdate: '14:20',
      photo: 'https://images.pexels.com/photos/3771690/pexels-photo-3771690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'emergency',
      title: 'Fire Alarm - Science Building',
      message: 'A fire alarm has been activated in the Science Building. Emma is safe and has been evacuated to the designated safe zone. Emergency responders are on scene.',
      timestamp: '14:23',
      priority: 'high',
      read: false
    },
    {
      id: '2',
      type: 'update',
      title: 'Weather Advisory Update',
      message: 'The severe weather warning has been updated. Both children are safely sheltering in their respective buildings. Activities will resume once conditions improve.',
      timestamp: '13:45',
      priority: 'medium',
      read: false
    },
    {
      id: '3',
      type: 'resolved',
      title: 'All Clear - Normal Operations Resumed',
      message: 'The earlier medical emergency has been resolved. All students have returned to regular activities. Both Emma and Michael are accounted for and safe.',
      timestamp: '12:15',
      priority: 'low',
      read: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'checked-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'evacuated': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'unknown': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'checked-in': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'evacuated': return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'unknown': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const currentStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome, Sarah Johnson</h2>
            <p className="text-blue-100">Stay informed about your children's safety in real-time</p>
          </div>
          <Shield className="h-12 w-12 text-blue-200" />
        </div>
      </div>

      {/* Quick Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Children Safe</p>
              <p className="text-2xl font-bold text-gray-900">2/2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Unread Updates</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Last Update</p>
              <p className="text-2xl font-bold text-gray-900">14:25</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Children</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                selectedStudent === student.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.grade}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                    {getStatusIcon(student.status)}
                    <span className="ml-1 capitalize">{student.status}</span>
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Updated {student.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Details */}
      {currentStudent && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={currentStudent.photo}
              alt={currentStudent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{currentStudent.name}</h3>
              <p className="text-gray-600">{currentStudent.grade}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="font-medium text-gray-900">{currentStudent.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Last Status Update</p>
                  <p className="font-medium text-gray-900">Today at {currentStudent.lastUpdate}</p>
                </div>
              </div>

              <div className="flex items-center">
                {getStatusIcon(currentStudent.status)}
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Safety Status</p>
                  <p className="font-medium text-gray-900 capitalize">{currentStudent.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Quick Actions</h4>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                Request Status Update
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message to Child
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Contact School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        </div>
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-6 border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'font-medium' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                    {!notification.read && (
                      <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{notification.message}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Today at {notification.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;