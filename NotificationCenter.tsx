import React, { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, Users, Target, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'push' | 'all';
  subject: string;
  content: string;
  audience: 'all-parents' | 'affected-parents' | 'grade-specific' | 'custom';
}

interface NotificationLog {
  id: string;
  template: string;
  type: 'sms' | 'email' | 'push';
  recipients: number;
  sent: number;
  delivered: number;
  timestamp: string;
  status: 'sending' | 'completed' | 'failed';
}

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'templates' | 'logs'>('send');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedAudience, setSelectedAudience] = useState<'all-parents' | 'affected-parents' | 'grade-specific' | 'custom'>('all-parents');
  const [notificationTypes, setNotificationTypes] = useState({
    sms: true,
    email: true,
    push: true
  });

  const templates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'Fire Emergency Alert',
      type: 'all',
      subject: '🚨 URGENT: Fire Emergency at School',
      content: 'A fire alarm has been activated at {location}. All students are safely evacuating to designated areas. Emergency responders are on scene. Your child\'s safety is our priority. Updates will follow every 15 minutes.',
      audience: 'all-parents'
    },
    {
      id: '2',
      name: 'Severe Weather Warning',
      type: 'all',
      subject: '⛈️ Weather Alert: Severe Storm Approaching',
      content: 'Due to approaching severe weather, all students are sheltering safely in designated areas. Outdoor activities are suspended until conditions improve. Your child is safe and secure.',
      audience: 'all-parents'
    },
    {
      id: '3',
      name: 'Medical Emergency',
      type: 'all',
      subject: '🏥 Medical Emergency Response',
      content: 'Medical assistance is being provided at {location}. The situation is contained and emergency services are responding. All students not directly involved continue normal activities safely.',
      audience: 'affected-parents'
    },
    {
      id: '4',
      name: 'Lockdown Notification',
      type: 'all',
      subject: '🔐 Campus Lockdown - Precautionary Measure',
      content: 'Campus is under precautionary lockdown. All students and staff are secure in current locations. Law enforcement is coordinating response. Updates every 10 minutes.',
      audience: 'all-parents'
    },
    {
      id: '5',
      name: 'All Clear - Situation Resolved',
      type: 'all',
      subject: '✅ All Clear: Normal Operations Resumed',
      content: 'The earlier emergency has been resolved. All students are safe and accounted for. Normal school activities have resumed. Thank you for your patience during this incident.',
      audience: 'all-parents'
    }
  ];

  const notificationLogs: NotificationLog[] = [
    {
      id: '1',
      template: 'Fire Emergency Alert',
      type: 'sms',
      recipients: 312,
      sent: 312,
      delivered: 308,
      timestamp: '14:23:45',
      status: 'completed'
    },
    {
      id: '2',
      template: 'Fire Emergency Alert',
      type: 'email',
      recipients: 312,
      sent: 312,
      delivered: 294,
      timestamp: '14:23:47',
      status: 'completed'
    },
    {
      id: '3',
      template: 'Severe Weather Warning',
      type: 'push',
      recipients: 2847,
      sent: 2847,
      delivered: 2831,
      timestamp: '13:45:12',
      status: 'completed'
    },
    {
      id: '4',
      template: 'Custom Emergency Update',
      type: 'sms',
      recipients: 156,
      sent: 145,
      delivered: 0,
      timestamp: '14:25:30',
      status: 'sending'
    }
  ];

  const getAudienceSize = (audience: string) => {
    switch (audience) {
      case 'all-parents': return 2847;
      case 'affected-parents': return 156;
      case 'grade-specific': return 420;
      case 'custom': return 0;
      default: return 0;
    }
  };

  const sendNotification = () => {
    const message = selectedTemplate 
      ? templates.find(t => t.id === selectedTemplate)?.content 
      : customMessage;
    
    if (!message) return;

    // Simulate sending notification
    alert(`Notification sent to ${getAudienceSize(selectedAudience)} recipients via ${
      Object.entries(notificationTypes).filter(([_, enabled]) => enabled).map(([type]) => type).join(', ')
    }`);

    // Reset form
    setSelectedTemplate('');
    setCustomMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Notification Center</h2>
        <p className="text-gray-600">Rapidly disseminate critical information to parents and guardians using AI-powered messaging</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('send')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'send' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Send className="inline h-4 w-4 mr-2" />
              Send Notifications
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'templates' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="inline h-4 w-4 mr-2" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'logs' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Clock className="inline h-4 w-4 mr-2" />
              Delivery Logs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Send Notifications Tab */}
          {activeTab === 'send' && (
            <div className="space-y-6">
              {/* Notification Types */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Methods</h3>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationTypes.sms}
                      onChange={(e) => setNotificationTypes({...notificationTypes, sms: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Phone className="h-4 w-4 ml-2 mr-1 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationTypes.email}
                      onChange={(e) => setNotificationTypes({...notificationTypes, email: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Mail className="h-4 w-4 ml-2 mr-1 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationTypes.push}
                      onChange={(e) => setNotificationTypes({...notificationTypes, push: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <MessageSquare className="h-4 w-4 ml-2 mr-1 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Push</span>
                  </label>
                </div>
              </div>

              {/* Audience Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Audience</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      value="all-parents"
                      checked={selectedAudience === 'all-parents'}
                      onChange={(e) => setSelectedAudience(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                      selectedAudience === 'all-parents' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Users className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">All Parents</p>
                      <p className="text-xs text-gray-600">2,847 recipients</p>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      value="affected-parents"
                      checked={selectedAudience === 'affected-parents'}
                      onChange={(e) => setSelectedAudience(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                      selectedAudience === 'affected-parents' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">Affected Parents</p>
                      <p className="text-xs text-gray-600">156 recipients</p>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      value="grade-specific"
                      checked={selectedAudience === 'grade-specific'}
                      onChange={(e) => setSelectedAudience(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                      selectedAudience === 'grade-specific' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Target className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">Grade Specific</p>
                      <p className="text-xs text-gray-600">420 recipients</p>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      value="custom"
                      checked={selectedAudience === 'custom'}
                      onChange={(e) => setSelectedAudience(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                      selectedAudience === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Users className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">Custom List</p>
                      <p className="text-xs text-gray-600">Select recipients</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Message Content</h3>
                
                {/* Template Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Template (Optional)
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter your emergency message here..."
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Preview */}
                {(selectedTemplate || customMessage) && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Message Preview</h4>
                    <p className="text-gray-700">
                      {selectedTemplate 
                        ? templates.find(t => t.id === selectedTemplate)?.content 
                        : customMessage
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Ready to send to <span className="font-medium">{getAudienceSize(selectedAudience)}</span> recipients
                </div>
                <button
                  onClick={sendNotification}
                  disabled={!selectedTemplate && !customMessage}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Emergency Alert
                </button>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              {templates.map(template => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                      <p className="text-gray-700 text-sm">{template.content}</p>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <span className="mr-4">Audience: {template.audience.replace('-', ' ')}</span>
                        <span>Type: {template.type}</span>
                      </div>
                    </div>
                    <button className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              {notificationLogs.map(log => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-900 mr-3">{log.template}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 'completed' ? 'bg-green-100 text-green-800' :
                          log.status === 'sending' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {log.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {log.status === 'sending' && <Clock className="h-3 w-3 mr-1" />}
                          {log.status === 'failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {log.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Type</p>
                          <p className="font-medium text-gray-900 uppercase">{log.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Recipients</p>
                          <p className="font-medium text-gray-900">{log.recipients}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sent</p>
                          <p className="font-medium text-gray-900">{log.sent}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Delivered</p>
                          <p className="font-medium text-gray-900">{log.delivered}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right text-sm text-gray-600">
                      <Clock className="inline h-4 w-4 mr-1" />
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;