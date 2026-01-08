"use client";

import React, { useState } from 'react';
import { Users, MessageSquare, CheckCircle, Activity, Search, Filter, MoreVertical, TrendingUp, Clock } from 'lucide-react';

export default function AIEmployeesDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'Sarah AI',
      role: 'Customer Support',
      status: 'online',
      avatar: 'bg-blue-500',
      conversationsToday: 47,
      tasksCompleted: 32,
      responseTime: '1.2s',
      satisfaction: 4.8
    },
    {
      id: 2,
      name: 'Marcus AI',
      role: 'Sales Assistant',
      status: 'online',
      avatar: 'bg-purple-500',
      conversationsToday: 34,
      tasksCompleted: 28,
      responseTime: '0.9s',
      satisfaction: 4.9
    },
    {
      id: 3,
      name: 'Emma AI',
      role: 'Technical Support',
      status: 'online',
      avatar: 'bg-green-500',
      conversationsToday: 23,
      tasksCompleted: 19,
      responseTime: '2.1s',
      satisfaction: 4.7
    },
    {
      id: 4,
      name: 'Alex AI',
      role: 'HR Assistant',
      status: 'offline',
      avatar: 'bg-orange-500',
      conversationsToday: 15,
      tasksCompleted: 12,
      responseTime: '1.5s',
      satisfaction: 4.6
    },
    {
      id: 5,
      name: 'Jordan AI',
      role: 'Customer Support',
      status: 'online',
      avatar: 'bg-pink-500',
      conversationsToday: 41,
      tasksCompleted: 35,
      responseTime: '1.0s',
      satisfaction: 4.9
    },
    {
      id: 6,
      name: 'Taylor AI',
      role: 'Sales Assistant',
      status: 'offline',
      avatar: 'bg-indigo-500',
      conversationsToday: 8,
      tasksCompleted: 6,
      responseTime: '1.3s',
      satisfaction: 4.5
    }
  ];

  const stats = [
    {
      label: 'Active AI Employees',
      value: employees.filter(e => e.status === 'online').length,
      total: employees.length,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+2 from yesterday'
    },
    {
      label: 'Total Conversations',
      value: employees.reduce((sum, e) => sum + e.conversationsToday, 0),
      icon: MessageSquare,
      color: 'bg-[#3b82f6]',
      trend: '+12% from yesterday'
    },
    {
      label: 'Tasks Completed',
      value: employees.reduce((sum, e) => sum + e.tasksCompleted, 0),
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+8% from yesterday'
    },
    {
      label: 'Avg Response Time',
      value: '1.3s',
      icon: Clock,
      color: 'bg-orange-500',
      trend: '-0.2s improvement'
    }
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || emp.role === filterRole;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
        rounded-xl p-6
        bg-slate-50
        border border-slate-200
        shadow-sm hover:shadow-2xl
        transition-shadow
      "
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-black text-sm font-medium mb-2">
                    {stat.label}
                  </p>

                  <p className="text-xl font-bold text-slate-900">
                    {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                  </p>

                  <div className="flex items-center mt-3 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.trend}
                  </div>
                </div>

                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="mb-6 border-slate-300" />
           {/* Filters and Search */}
      <div className="mt-6 max-w-7xl mx-auto px-6 flex items-end justify-end gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 border border-[#3b82f6] rounded-lg focus:ring-1 text-black focus:ring-[#3b82f6] focus:outline-none bg-gray-100"
          >
            <option value="all">All Roles</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Sales Assistant">Sales Assistant</option>
            <option value="Technical Support">Technical Support</option>
            <option value="HR Assistant">HR Assistant</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-[#3b82f6] rounded-lg focus:ring-1 text-black focus:ring-[#3b82f6] focus:outline-none bg-gray-100"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-lg transition-all hover:border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{employee.name}</h3>
                    <p className="text-sm text-slate-600">{employee.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${employee.status === 'online'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${employee.status === 'online' ? 'bg-green-500' : 'bg-red-400'
                      }`} />
                    {employee.status}
                  </div>                
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">Conversations</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{employee.conversationsToday}</p>
                  <p className="text-xs text-blue-700 mt-1">today</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-900">Tasks</span>
                  </div>
                  <p className="text-lg font-bold text-green-900">{employee.tasksCompleted}</p>
                  <p className="text-xs text-green-700 mt-1">completed</p>
                </div>
              </div>

              <div className="flex  justify-end mt-3">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline mt-2">
                  View Details →
                </button>
                
              </div>
              
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No AI employees found</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}