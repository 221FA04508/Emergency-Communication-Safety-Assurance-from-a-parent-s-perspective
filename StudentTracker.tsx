import React, { useState } from 'react';
import { Users, MapPin, CheckCircle, AlertCircle, Clock, Search, Filter, Download } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  homeroom: string;
  location: string;
  status: 'safe' | 'evacuated' | 'checked-in' | 'unknown' | 'absent';
  lastUpdate: string;
  guardian: string;
  guardianNotified: boolean;
  photo: string;
}

const StudentTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const students: Student[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: '10',
      homeroom: '10A',
      location: 'Main Building - Safe Zone A',
      status: 'safe',
      lastUpdate: '14:25',
      guardian: 'Sarah Johnson',
      guardianNotified: true,
      photo: 'https://images.pexels.com/photos/3771071/pexels-photo-3771071.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '2',
      name: 'Michael Chen',
      grade: '11',
      homeroom: '11B',
      location: 'Gymnasium',
      status: 'evacuated',
      lastUpdate: '14:20',
      guardian: 'Lisa Chen',
      guardianNotified: true,
      photo: 'https://images.pexels.com/photos/3771690/pexels-photo-3771690.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      grade: '9',
      homeroom: '9C',
      location: 'Library - Safe Zone B',
      status: 'safe',
      lastUpdate: '14:23',
      guardian: 'Mark Williams',
      guardianNotified: true,
      photo: 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '4',
      name: 'David Rodriguez',
      grade: '12',
      homeroom: '12A',
      location: 'Science Building - Evacuated',
      status: 'evacuated',
      lastUpdate: '14:18',
      guardian: 'Maria Rodriguez',
      guardianNotified: false,
      photo: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '5',
      name: 'Ashley Thompson',
      grade: '10',
      homeroom: '10B',
      location: 'Main Office',
      status: 'checked-in',
      lastUpdate: '14:15',
      guardian: 'Jennifer Thompson',
      guardianNotified: true,
      photo: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '6',
      name: 'James Wilson',
      grade: '11',
      homeroom: '11A',
      location: 'Unknown',
      status: 'unknown',
      lastUpdate: '13:45',
      guardian: 'Robert Wilson',
      guardianNotified: true,
      photo: 'https://images.pexels.com/photos/3785082/pexels-photo-3785082.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '7',
      name: 'Madison Brown',
      grade: '9',
      homeroom: '9A',
      location: 'N/A - Absent',
      status: 'absent',
      lastUpdate: '08:00',
      guardian: 'Amanda Brown',
      guardianNotified: false,
      photo: 'https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'checked-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'evacuated': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'unknown': return 'bg-red-100 text-red-800 border-red-200';
      case 'absent': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'checked-in': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'evacuated': return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'unknown': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'absent': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.includes(searchTerm);
    const matchesGrade = !filterGrade || student.grade === filterGrade;
    const matchesStatus = !filterStatus || student.status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const statusCounts = students.reduce((acc, student) => {
    acc[student.status] = (acc[student.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const grades = [...new Set(students.map(s => s.grade))].sort();

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Safe</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.safe || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Checked In</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts['checked-in'] || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-amber-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Evacuated</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.evacuated || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Unknown</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.unknown || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-gray-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.absent || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="safe">Safe</option>
              <option value="checked-in">Checked In</option>
              <option value="evacuated">Evacuated</option>
              <option value="unknown">Unknown</option>
              <option value="absent">Absent</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Student Status ({filteredStudents.length} of {students.length})
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Refresh All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade/Homeroom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guardian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={student.photo}
                        alt={student.name}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Grade {student.grade}</div>
                    <div className="text-sm text-gray-500">{student.homeroom}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {student.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      <span className="ml-1 capitalize">{student.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.guardian}</div>
                    <div className="flex items-center text-xs">
                      {student.guardianNotified ? (
                        <span className="text-green-600">✓ Notified</span>
                      ) : (
                        <span className="text-red-600">⚠ Not notified</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {student.lastUpdate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Update
                      </button>
                      <button className="text-green-600 hover:text-green-800 font-medium">
                        Notify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No students found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTracker;