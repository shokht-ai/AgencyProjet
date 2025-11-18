import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu, TrendingUp, TrendingDown, Download, Calendar, DollarSign, MapPin, Star, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminReportsAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Package, label: 'Paketlar', active: false },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: false },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: BarChart3, label: 'Hisobotlar', active: true },
    { icon: Settings, label: 'Sozlamalar', active: false }
  ];

  // Revenue by month
  const revenueData = [
    { month: 'Yanvar', revenue: 85000000, target: 75000000 },
    { month: 'Fevral', revenue: 92000000, target: 80000000 },
    { month: 'Mart', revenue: 108000000, target: 95000000 },
    { month: 'Aprel', revenue: 96000000, target: 90000000 },
    { month: 'May', revenue: 125000000, target: 100000000 },
    { month: 'Iyun', revenue: 142000000, target: 110000000 },
    { month: 'Iyul', revenue: 165000000, target: 120000000 },
    { month: 'Avgust', revenue: 158000000, target: 125000000 },
    { month: 'Sentabr', revenue: 135000000, target: 115000000 },
    { month: 'Oktabr', revenue: 148000000, target: 120000000 }
  ];

  // Bookings by destination
  const destinationData = [
    { name: 'Dubai', bookings: 145, revenue: 362500000 },
    { name: 'Istanbul', bookings: 112, revenue: 201600000 },
    { name: 'Bali', bookings: 89, revenue: 186900000 },
    { name: 'Paris', bookings: 76, revenue: 243200000 },
    { name: 'Maldives', bookings: 54, revenue: 243000000 },
    { name: 'Rome', bookings: 48, revenue: 134400000 },
    { name: 'Thailand', bookings: 42, revenue: 88200000 }
  ];

  // Customer demographics
  const ageGroupData = [
    { name: '18-25', value: 18, color: '#3B82F6' },
    { name: '26-35', value: 42, color: '#10B981' },
    { name: '36-45', value: 25, color: '#F59E0B' },
    { name: '46-55', value: 12, color: '#EF4444' },
    { name: '55+', value: 3, color: '#8B5CF6' }
  ];

  // Booking trends
  const bookingTrendsData = [
    { week: 'Hafta 1', bookings: 12, revenue: 28500000 },
    { week: 'Hafta 2', bookings: 15, revenue: 36000000 },
    { week: 'Hafta 3', bookings: 18, revenue: 42300000 },
    { week: 'Hafta 4', bookings: 21, revenue: 51200000 },
    { week: 'Hafta 5', bookings: 17, revenue: 39800000 },
    { week: 'Hafta 6', bookings: 24, revenue: 58400000 },
    { week: 'Hafta 7', bookings: 19, revenue: 45100000 },
    { week: 'Hafta 8', bookings: 22, revenue: 52800000 }
  ];

  // Top customers
  const topCustomers = [
    { name: 'Kamola Rahimova', bookings: 8, spent: 42000000, lastBooking: '2024-10-15' },
    { name: 'Sardor Karimov', bookings: 6, spent: 35000000, lastBooking: '2024-10-12' },
    { name: 'Dilnoza Aliyeva', bookings: 5, spent: 28000000, lastBooking: '2024-10-08' },
    { name: 'Bobur Toshmatov', bookings: 5, spent: 31000000, lastBooking: '2024-10-05' },
    { name: 'Nodira Saidova', bookings: 4, spent: 24000000, lastBooking: '2024-10-01' }
  ];

  // Package performance
  const packagePerformance = [
    { 
      name: 'Dubai Premium Safari',
      bookings: 145,
      revenue: 362500000,
      avgRating: 4.8,
      conversionRate: 24,
      trend: 'up'
    },
    {
      name: 'Istanbul Tarixiy Sayohati',
      bookings: 112,
      revenue: 201600000,
      avgRating: 4.9,
      conversionRate: 22,
      trend: 'up'
    },
    {
      name: 'Bali Tropik Ta\'tili',
      bookings: 89,
      revenue: 186900000,
      avgRating: 4.7,
      conversionRate: 18,
      trend: 'down'
    },
    {
      name: 'Paris Romantik Tour',
      bookings: 76,
      revenue: 243200000,
      avgRating: 4.8,
      conversionRate: 21,
      trend: 'up'
    },
    {
      name: 'Maldiv Orollari Lux',
      bookings: 54,
      revenue: 243000000,
      avgRating: 5.0,
      conversionRate: 15,
      trend: 'up'
    }
  ];

  // Monthly comparison
  const monthlyComparison = {
    currentMonth: {
      revenue: 148000000,
      bookings: 124,
      newCustomers: 47,
      avgBookingValue: 1193548
    },
    previousMonth: {
      revenue: 135000000,
      bookings: 112,
      newCustomers: 42,
      avgBookingValue: 1205357
    }
  };

  const calculateGrowth = (current, previous) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <span className="text-xl font-bold">Grand Tours</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                  item.active ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Chiqish</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hisobotlar va Analitika</h1>
                <p className="text-gray-600">Batafsil biznes ko'rsatkichlari</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">So'nggi hafta</option>
                  <option value="month">So'nggi oy</option>
                  <option value="quarter">So'nggi 3 oy</option>
                  <option value="year">So'nggi yil</option>
                </select>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Eksport</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Report Type Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="flex space-x-1 p-2">
              {[
                { id: 'overview', label: 'Umumiy Ko\'rsatkichlar' },
                { id: 'revenue', label: 'Daromad Tahlili' },
                { id: 'packages', label: 'Paketlar' },
                { id: 'customers', label: 'Mijozlar' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                    reportType === type.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {reportType === 'overview' && (
            <div className="space-y-6">
              {/* Monthly Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Daromad</span>
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {(monthlyComparison.currentMonth.revenue / 1000000).toFixed(1)}M
                  </div>
                  <div className={`flex items-center text-sm ${
                    calculateGrowth(monthlyComparison.currentMonth.revenue, monthlyComparison.previousMonth.revenue) > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+{calculateGrowth(monthlyComparison.currentMonth.revenue, monthlyComparison.previousMonth.revenue)}%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Buyurtmalar</span>
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {monthlyComparison.currentMonth.bookings}
                  </div>
                  <div className={`flex items-center text-sm ${
                    calculateGrowth(monthlyComparison.currentMonth.bookings, monthlyComparison.previousMonth.bookings) > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+{calculateGrowth(monthlyComparison.currentMonth.bookings, monthlyComparison.previousMonth.bookings)}%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Yangi Mijozlar</span>
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {monthlyComparison.currentMonth.newCustomers}
                  </div>
                  <div className={`flex items-center text-sm ${
                    calculateGrowth(monthlyComparison.currentMonth.newCustomers, monthlyComparison.previousMonth.newCustomers) > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+{calculateGrowth(monthlyComparison.currentMonth.newCustomers, monthlyComparison.previousMonth.newCustomers)}%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">O'rtacha Check</span>
                    <Activity className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {(monthlyComparison.currentMonth.avgBookingValue / 1000).toFixed(0)}K
                  </div>
                  <div className={`flex items-center text-sm ${
                    calculateGrowth(monthlyComparison.currentMonth.avgBookingValue, monthlyComparison.previousMonth.avgBookingValue) > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span>{calculateGrowth(monthlyComparison.currentMonth.avgBookingValue, monthlyComparison.previousMonth.avgBookingValue)}%</span>
                  </div>
                </div>
              </div>

              {/* Booking Trends Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Buyurtmalar Tendensiyasi</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bookingTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="bookings" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} name="Buyurtmalar" />
                    <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Daromad (so'm)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Destination Performance & Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Yo'nalishlar Bo'yicha</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={destinationData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bookings" fill="#3B82F6" name="Buyurtmalar" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Yosh Guruhlari</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Tab */}
          {reportType === 'revenue' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Daromad Dinamikasi (2024)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} name="Haqiqiy daromad" />
                    <Line type="monotone" dataKey="target" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Maqsad" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Yo'nalishlar Bo'yicha Daromad</h3>
                <div className="space-y-4">
                  {destinationData.map((dest, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{dest.name}</div>
                          <div className="text-sm text-gray-600">{dest.bookings} buyurtma</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {(dest.revenue / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-gray-600">so'm</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {reportType === 'packages' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Paketlar Performansi</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Paket</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Buyurtmalar</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Daromad</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Reyting</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Konversiya</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packagePerformance.map((pkg, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-900">{pkg.name}</td>
                        <td className="py-4 px-6 text-gray-700">{pkg.bookings}</td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-900">
                            {(pkg.revenue / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-xs text-gray-500">so'm</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold">{pkg.avgRating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-900">{pkg.conversionRate}%</span>
                        </td>
                        <td className="py-4 px-6">
                          {pkg.trend === 'up' ? (
                            <span className="flex items-center text-green-600">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              O'sish
                            </span>
                          ) : (
                            <span className="flex items-center text-red-600">
                              <TrendingDown className="w-4 h-4 mr-1" />
                              Pasayish
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {reportType === 'customers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Mijozlar</h3>
                <div className="space-y-4">
                  {topCustomers.map((customer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-600">
                            So'nggi buyurtma: {customer.lastBooking}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {(customer.spent / 1000000).toFixed(1)}M so'm
                        </div>
                        <div className="text-sm text-gray-600">{customer.bookings} buyurtma</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Mijozlar Demografiyasi</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Mijozlar Statistikasi</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Jami mijozlar</span>
                      <span className="text-2xl font-bold text-blue-600">342</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Yangi mijozlar (oy)</span>
                      <span className="text-2xl font-bold text-green-600">47</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Qaytgan mijozlar</span>
                      <span className="text-2xl font-bold text-purple-600">68%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700">O'rtacha buyurtmalar</span>
                      <span className="text-2xl font-bold text-yellow-600">3.6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
