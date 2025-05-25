import React, { useState } from 'react';
import { FaCalendar, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const complaintsData = [
  { name: 'Day', complaints: 20 },
  { name: 'Week', complaints: 80 },
  { name: 'Month', complaints: 150 },
  { name: 'Day', complaints: 50 },
  { name: 'Week', complaints: 120 },
  { name: 'Month', complaints: 180 }
];

const TroubleShoot = () => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    todaysIssues: '',
    weeksIssues: '',
    monthsIssues: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Trouble Shoot
        </h2>
        
        {/* Complaints Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Total Number of Complaints</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complaintsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="complaints" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issue Tracker */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Customer Problems / Issues</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="todaysIssues"
              value={formData.todaysIssues}
              onChange={handleChange}
              placeholder="Today's Issues"
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              name="weeksIssues"
              value={formData.weeksIssues}
              onChange={handleChange}
              placeholder="Week's Issues"
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              name="monthsIssues"
              value={formData.monthsIssues}
              onChange={handleChange}
              placeholder="Month's Issues"
              className="border p-3 rounded w-full"
            />
          </div>
        </div>
        
        {/* Closed Tickets */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h3 className="text-lg font-semibold mb-4">Closed Tickets</h3>
          <ul className="list-disc pl-6">
            <li>Yesterday</li>
            <li>Last Week</li>
            <li>Last Month</li>
          </ul>
        </div>

        {/* Calendar Filter */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h3 className="text-lg font-semibold mb-4">Calendar</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <FaCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="border p-3 pl-10 rounded w-full"
              />
            </div>
            <div className="relative">
              <FaCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="border p-3 pl-10 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Unresolved Issues */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h3 className="text-lg font-semibold mb-4">Unresolved / Open Issues</h3>
          <p className="text-gray-600">Tracking open and unresolved customer issues.</p>
        </div>
      </div>
    </div>
  );
};

export default TroubleShoot;
