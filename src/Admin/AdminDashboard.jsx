import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, TrendingUp, TrendingDown, Eye, DollarSign, Calendar, Star, Menu, X, Bell, Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      title: 'Jami Sotuvlar',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      amount: '125,430,000 so\'m'
    },
    {
      title: 'Faol Paketlar',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Jami Mijozlar',
      value: '342',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'O\'rtacha Reyting',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    }
  ];

  const salesData = [
    { month: 'Yan', sales: 15000000, bookings: 12 },
    { month: 'Fev', sales: 18000000, bookings: 15 },
    { month: 'Mar', sales: 22000000, bookings: 18 },
    { month: 'Apr', sales: 19000000, bookings: 16 },
    { month: 'May', sales: 25000000, bookings: 21 },
    { month: 'Iyun', sales: 28000000, bookings: 23 },
    { month: 'Iyul', sales: 32000000, bookings: 27 },
    { month: 'Avg', sales: 30000000, bookings: 25 },
    { month: 'Sen', sales: 27000000, bookings: 22 },
    { month: 'Okt', sales: 29000000, bookings: 24 }
  ];

  const packagePerformance = [
    { name: 'Dubai Safari', value: 35 },
    { name: 'Istanbul Tour', value: 25 },
    { name: 'Bali Beach', value: 20 },
    { name: 'Paris Romance', value: 15 },
    { name: 'Boshqalar', value: 5 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const recentBookings = [
    {
      id: 1,
      customer: 'Kamola Rahimova',
      package: 'Dubai Premium Safari',
      date: '2024-10-05',
      amount: 5000000,
      status: 'confirmed',
      guests: 2
    },
    {
      id: 2,
      customer: 'Sardor Karimov',
      package: 'Istanbul Tarixiy Sayohati',
      date: '2024-10-04',
      amount: 5400000,
      status: 'pending',
      guests: 3
    },
    {
      id: 3,
      customer: 'Dilnoza Aliyeva',
      package: 'Bali Tropik Ta\'tili',
      date: '2024-10-03',
      amount: 4200000,
      status: 'confirmed',
      guests: 2
    },
    {
      id: 4,
      customer: 'Bobur Toshmatov',
      package: 'Parij Romantik Tour',
      date: '2024-10-02',
      amount: 6400000,
      status: 'cancelled',
      guests: 2
    },
    {
      id: 5,
      customer: 'Nodira Saidova',
      package: 'Maldiv Orollari Lux',
      date: '2024-10-01',
      amount: 9000000,
      status: 'confirmed',
      guests: 2
    }
  ];

  const topPackages = [
    { name: 'Dubai Premium Safari', bookings: 47, revenue: 117500000, rating: 4.8 },
    { name: 'Istanbul Tarixiy Sayohati', bookings: 38, revenue: 68400000, rating: 4.9 },
    { name: 'Bali Tropik Ta\'tili', bookings: 32, revenue: 67200000, rating: 4.7 },
    { name: 'Parij Romantik Tour', bookings: 28, revenue: 89600000, rating: 4.8 },
    { name: 'Maldiv Orollari Lux', bookings: 24, revenue: 108000000, rating: 5.0 }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    const labels = {
      confirmed: 'Tasdiqlangan',
      pending: 'Kutilmoqda',
      cancelled: 'Bekor qilingan'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Package, label: 'Paketlar', active: false },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: false },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: Star, label: 'Sharhlar', active: false },
    { icon: Settings, label: 'Sozlamalar', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all travelingDate-300 flex flex-col`}>
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
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Xush kelibsiz, Admin!</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff"
                    alt="Admin"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Time Range Filter */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range === 'week' && 'Hafta'}
                  {range === 'month' && 'Oy'}
                  {range === 'year' && 'Yil'}
                </button>
              ))}
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Hisobot yuklash
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.amount && <p className="text-sm text-gray-500 mt-1">{stat.amount}</p>}
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sotuvlar Dinamikasi</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Sotuvlar (so'm)" />
                  <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} name="Buyurtmalar" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Package Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Paketlar Taqsimoti</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={packagePerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {packagePerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Packages */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Eng Ko'p Sotiladigan Paketlar</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Paket nomi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Buyurtmalar</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Daromad</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reyting</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Harakat</th>
                  </tr>
                </thead>
                <tbody>
                  {topPackages.map((pkg, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-medium text-gray-900">{pkg.name}</td>
                      <td className="py-3 px-4 text-gray-700">{pkg.bookings}</td>
                      <td className="py-3 px-4 text-gray-700">{pkg.revenue.toLocaleString()} so'm</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{pkg.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Ko'rish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">So'nggi Buyurtmalar</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Barchasini ko'rish →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Mijoz</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Paket</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Sana</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Mehmonlar</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Summa</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Harakat</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${booking.customer}&background=random`}
                            alt={booking.customer}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">{booking.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{booking.package}</td>
                      <td className="py-3 px-4 text-gray-700">{booking.date}</td>
                      <td className="py-3 px-4 text-gray-700">{booking.guests} kishi</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {booking.amount.toLocaleString()} so'm
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
