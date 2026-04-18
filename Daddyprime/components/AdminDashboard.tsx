import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, TrendingUp, Shield, 
  AlertTriangle, Settings, BarChart3, Activity,
  Clock, Globe, Smartphone, Monitor, Ban,
  CheckCircle, XCircle, Eye, Download
} from 'lucide-react';
import { performanceMonitor } from '../utils/performance';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  messagesLast24h: number;
  totalChats: number;
  reportedContent: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  serverLoad: number;
  storageUsed: number;
  bandwidthUsed: number;
}

interface UserActivity {
  id: string;
  name: string;
  email: string;
  lastActive: Date;
  messageCount: number;
  status: 'online' | 'offline' | 'banned';
  deviceType: 'mobile' | 'desktop' | 'web';
  location: string;
}

interface ContentReport {
  id: string;
  reportedBy: string;
  reportedUser: string;
  messageId: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: Date;
  content: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'analytics' | 'settings'>('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 12847,
    activeUsers: 3421,
    totalMessages: 1284756,
    messagesLast24h: 15632,
    totalChats: 8934,
    reportedContent: 23,
    systemHealth: 'healthy',
    serverLoad: 67,
    storageUsed: 45,
    bandwidthUsed: 78
  });
  
  const [users, setUsers] = useState<UserActivity[]>([
    {
      id: '1',
      name: 'Adebayo Johnson',
      email: 'adebayo@example.com',
      lastActive: new Date(Date.now() - 300000),
      messageCount: 1247,
      status: 'online',
      deviceType: 'mobile',
      location: 'Lagos, Nigeria'
    },
    {
      id: '2',
      name: 'Fatima Ibrahim',
      email: 'fatima@example.com',
      lastActive: new Date(Date.now() - 1800000),
      messageCount: 892,
      status: 'offline',
      deviceType: 'web',
      location: 'Abuja, Nigeria'
    }
  ]);
  
  const [reports, setReports] = useState<ContentReport[]>([
    {
      id: '1',
      reportedBy: 'user123',
      reportedUser: 'user456',
      messageId: 'msg789',
      reason: 'Spam',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000),
      content: 'Suspicious promotional content...'
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState<any>({});

  useEffect(() => {
    // Load performance metrics
    const metrics = performanceMonitor.getSummary();
    setPerformanceMetrics(metrics);
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      const newMetrics = performanceMonitor.getSummary();
      setPerformanceMetrics(newMetrics);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'banned' as const } : user
    ));
  };

  const handleResolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: action } : report
    ));
  };

  const exportData = (type: 'users' | 'messages' | 'reports') => {
    // In a real app, this would generate and download CSV/JSON
    console.log(`Exporting ${type} data...`);
    alert(`${type} data export started. You'll receive an email when ready.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Daddy Messaging Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                stats.systemHealth === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                stats.systemHealth === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {stats.systemHealth === 'healthy' && <CheckCircle size={16} className="inline mr-1" />}
                {stats.systemHealth === 'warning' && <AlertTriangle size={16} className="inline mr-1" />}
                {stats.systemHealth === 'critical' && <XCircle size={16} className="inline mr-1" />}
                System {stats.systemHealth}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'content', label: 'Content', icon: Shield },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="text-blue-500" size={32} />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  +12% from last month
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeUsers.toLocaleString()}</p>
                  </div>
                  <Activity className="text-green-500" size={32} />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  +8% from yesterday
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages (24h)</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.messagesLast24h.toLocaleString()}</p>
                  </div>
                  <MessageSquare className="text-purple-500" size={32} />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  +15% from yesterday
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reports</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.reportedContent}</p>
                  </div>
                  <AlertTriangle className="text-red-500" size={32} />
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Needs attention
                </p>
              </div>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Server Load</span>
                      <span className="font-medium">{stats.serverLoad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.serverLoad}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Storage Used</span>
                      <span className="font-medium">{stats.storageUsed}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.storageUsed}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Bandwidth</span>
                      <span className="font-medium">{stats.bandwidthUsed}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.bandwidthUsed}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  {Object.entries(performanceMetrics).slice(0, 5).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {typeof value === 'object' ? `${value.avg?.toFixed(2)}ms` : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h2>
              <button
                onClick={() => exportData('users')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Export Users
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Messages
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              {user.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            user.status === 'offline' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div className="flex items-center gap-1">
                            {user.deviceType === 'mobile' && <Smartphone size={16} />}
                            {user.deviceType === 'desktop' && <Monitor size={16} />}
                            {user.deviceType === 'web' && <Globe size={16} />}
                            {user.deviceType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.messageCount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.lastActive.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <Eye size={16} />
                            </button>
                            {user.status !== 'banned' && (
                              <button 
                                onClick={() => handleBanUser(user.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Ban size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Content Moderation</h2>
              <button
                onClick={() => exportData('reports')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Export Reports
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Report
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {report.reason}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Reported by: {report.reportedBy}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Against: {report.reportedUser}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {report.content}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            report.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {report.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {report.status === 'pending' && (
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleResolveReport(report.id, 'resolved')}
                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button 
                                onClick={() => handleResolveReport(report.id, 'dismissed')}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};