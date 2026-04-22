import React, { useState } from 'react';
import { AlertTriangle, Shield, Users, Phone, Mail, MessageSquare, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import EmergencyDashboard from './components/EmergencyDashboard';
import ParentPortal from './components/ParentPortal';
import NotificationCenter from './components/NotificationCenter';
import StudentTracker from './components/StudentTracker';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'parent-portal' | 'notifications' | 'tracker'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Campus SafeGuard AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'dashboard' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <AlertTriangle className="inline h-4 w-4 mr-2" />
              Emergency Dashboard
            </button>
            <button
              onClick={() => setActiveView('parent-portal')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'parent-portal' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="inline h-4 w-4 mr-2" />
              Parent Portal
            </button>
            <button
              onClick={() => setActiveView('notifications')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'notifications' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="inline h-4 w-4 mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveView('tracker')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'tracker' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="inline h-4 w-4 mr-2" />
              Student Tracker
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeView === 'dashboard' && <EmergencyDashboard />}
        {activeView === 'parent-portal' && <ParentPortal />}
        {activeView === 'notifications' && <NotificationCenter />}
        {activeView === 'tracker' && <StudentTracker />}
      </main>
    </div>
  );
}

export default App;