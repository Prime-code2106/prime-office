import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, MessageSquare, Clock, 
  Globe, Smartphone, Monitor, BarChart3,
  PieChart, Activity, Calendar, Download
} from 'lucide-react';

interface AnalyticsData {
  userGrowth: { date: string; users: number; active: number }[];
  messageVolume: { date: string; messages: number; chats: number }[];
  deviceBreakdown: { device: string; percentage: number; count: number }[];
  locationData: { country: string; users: number; percentage: number }[];
  peakHours: { hour: number; messages: number }[];
  retentionRate: { day: number; percentage: number }[];
}

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    userGrowth: [
      { date: '2024-01-01', users: 1000, active: 750 },
      { date: '2024-01-02', users: 1050, active: 800 },
      { date: '2024-01-03', users: 1100, active: 850 },
      { date: '2024-01-04', users: 1200, active: 900 },
      { date: '2024-01-05', users: 1300, active: 950 },
      { date: '2024-01-06', users: 1400, active: 1000 },
      { date: '2024-01-07', users: 1500, active: 1100 }
    ],
    messageVolume: [
      { date: '2024-01-01', messages: 5000, chats: 200 },
      { date: '2024-01-02', messages: 5500, chats: 220 },
      { date: '2024-01-03', messages: 6000, chats: 250 },
      { date: '2024-01-04', messages: 6500, chats: 280 },
      { date: '2024-01-05', messages: 7000, chats: 300 },
      { date: '2024-01-06', messages: 7500, chats: 320 },
      { date: '2024-01-07', messages: 8000, chats: 350 }
    ],
    deviceBreakdown: [
      { device: 'Mobile', percentage: 65, count: 8125 },
      { device: 'Desktop', percentage: 25, count: 3125 },
      { device: 'Web', percentage: 10, count: 1250 }
    ],
    locationData: [
      { country: 'Nigeria', users: 8500, percentage: 68 },
      { country: 'Ghana', users: 2000, percentage: 16 },
      { country: 'Kenya', users: 1200, percentage: 9.6 },
      { country: 'South Africa', users: 800, percentage: 6.4 }
    ],
    peakHours: [
      { hour: 0, messages: 200 },
      { hour: 1, messages: 150 },
      { hour: 2, messages: 100 },
      { hour: 3, messages: 80 },
      { hour: 4, messages: 60 },
      { hour: 5, messages: 100 },
      { hour: 6, messages: 300 },
      { hour: 7, messages: 500 },
      { hour: 8, messages: 800 },
      { hour: 9, messages: 1000 },
      { hour: 10, messages: 1200 },
      { hour: 11, messages: 1100 },
      { hour: 12, messages: 1300 },
      { hour: 13, messages: 1400 },
      { hour: 14, messages: 1200 },
      { hour: 15, messages: 1100 },
      { hour: 16, messages: 1000 },
      { hour: 17, messages: 900 },
      { hour: 18, messages: 800 },
      { hour: 19, messages: 700 },
      { hour: 20, messages: 600 },
      { hour: 21, messages: 500 },
      { hour: 22, messages: 400 },
      { hour: 23, messages: 300 }
    ],
    retentionRate: [
      { day: 1, percentage: 100 },
      { day: 7, percentage: 75 },
      { day: 14, percentage: 60 },
      { day: 30, percentage: 45 },
      { day: 60, percentage: 35 },
      { day: 90, percentage: 30 }
    ]
  });

  const exportAnalytics = () => {
    const data = {
      timeRange,
      generatedAt: new Date().toISOString(),
      ...analytics
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daddy-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const maxMessages = Math.max(...analytics.peakHours.map(h => h.messages));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Insights into your platform's performance</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={exportAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.userGrowth[analytics.userGrowth.length - 1]?.users.toLocaleString()}
              </p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 dark:text-green-400">
              +{((analytics.userGrowth[analytics.userGrowth.length - 1]?.users - analytics.userGrowth[0]?.users) / analytics.userGrowth[0]?.users * 100).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Messages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.messageVolume[analytics.messageVolume.length - 1]?.messages.toLocaleString()}
              </p>
            </div>
            <MessageSquare className="text-green-500" size={32} />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 dark:text-green-400">
              +{((analytics.messageVolume[analytics.messageVolume.length - 1]?.messages - analytics.messageVolume[0]?.messages) / analytics.messageVolume[0]?.messages * 100).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.userGrowth[analytics.userGrowth.length - 1]?.active.toLocaleString()}
              </p>
            </div>
            <Activity className="text-purple-500" size={32} />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {((analytics.userGrowth[analytics.userGrowth.length - 1]?.active / analytics.userGrowth[analytics.userGrowth.length - 1]?.users) * 100).toFixed(1)}% engagement rate
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Retention (30d)</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.retentionRate.find(r => r.day === 30)?.percentage}%
              </p>
            </div>
            <Calendar className="text-orange-500" size={32} />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              User retention after 30 days
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {analytics.userGrowth.map((data, index) => {
              const maxUsers = Math.max(...analytics.userGrowth.map(d => d.users));
              const height = (data.users / maxUsers) * 100;
              const activeHeight = (data.active / maxUsers) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full relative bg-gray-200 dark:bg-gray-700 rounded-t">
                    <div 
                      className="w-full bg-blue-500 rounded-t transition-all duration-300"
                      style={{ height: `${height * 2}px` }}
                    />
                    <div 
                      className="w-full bg-blue-300 absolute bottom-0 rounded-t transition-all duration-300"
                      style={{ height: `${activeHeight * 2}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(data.date).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Total Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-300 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Active Users</span>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Usage</h3>
          <div className="space-y-4">
            {analytics.deviceBreakdown.map((device, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
              const icons = [Smartphone, Monitor, Globe];
              const Icon = icons[index];
              
              return (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${colors[index]} transition-all duration-300`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Devices: {analytics.deviceBreakdown.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Peak Hours (UTC)</h3>
          <div className="h-48 flex items-end justify-between gap-1">
            {analytics.peakHours.map((hour, index) => {
              const height = (hour.messages / maxMessages) * 100;
              const isPeak = hour.messages === maxMessages;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className={`w-full rounded-t transition-all duration-300 ${
                      isPeak ? 'bg-red-500' : 'bg-blue-500'
                    } group-hover:bg-blue-600`}
                    style={{ height: `${height * 1.5}px` }}
                    title={`${hour.hour}:00 - ${hour.messages} messages`}
                  />
                  {index % 4 === 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {hour.hour}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Peak: {maxMessages.toLocaleString()} messages at {analytics.peakHours.find(h => h.messages === maxMessages)?.hour}:00
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Geographic Distribution</h3>
          <div className="space-y-3">
            {analytics.locationData.map((location, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
              
              return (
                <div key={location.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                    <span className="text-gray-900 dark:text-white font-medium">{location.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {location.users.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                      {location.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Retention Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Retention</h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {analytics.retentionRate.map((retention, index) => {
            const height = retention.percentage;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative">
                  <div 
                    className="w-full bg-gradient-to-t from-red-500 to-green-500 rounded-t transition-all duration-300"
                    style={{ height: `${height * 2}px` }}
                  />
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {retention.percentage}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Day {retention.day}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Percentage of users who return after N days from signup
        </div>
      </div>
    </div>
  );
};