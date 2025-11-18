import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Search, Filter, Eye, Download, Calendar, DollarSign, User, MapPin, Phone, Mail, CheckCircle, XCircle, Clock, Menu, ChevronDown } from 'lucide-react';

export default function OrdersManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'Kamola Rahimova',
        email: 'kamola.rahimova@email.com',
        phone: '+998 90 123 45 67',
        avatar: 'https://ui-avatars.com/api/?name=Kamola+Rahimova&background=4F46E5&color=fff'
      },
      package: {
        title: 'Dubai Premium Safari',
        location: 'Dubai, BAA',
        duration: '5 kun / 4 tun'
      },
      bookingDate: '2024-10-05',
      travelDate: '2024-12-15',
      guests: 2,
      amount: 5000000,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'card'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Sardor Karimov',
        email: 'sardor.karimov@email.com',
        phone: '+998 91 234 56 78',
        avatar: 'https://ui-avatars.com/api/?name=Sardor+Karimov&background=10B981&color=fff'
      },
      package: {
        title: 'Istanbul Tarixiy Sayohati',
        location: 'Istanbul, Turkiya',
        duration: '4 kun / 3 tun'
      },
      bookingDate: '2024-10-04',
      travelDate: '2024-11-20',
      guests: 3,
      amount: 5400000,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'payme'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Dilnoza Aliyeva',
        email: 'dilnoza.aliyeva@email.com',
        phone: '+998 93 345 67 89',
        avatar: 'https://ui-avatars.com/api/?name=Dilnoza+Aliyeva&background=F59E0B&color=fff'
      },
      package: {
        title: 'Bali Tropik Ta\'tili',
        location: 'Bali, Indoneziya',
        duration: '7 kun / 6 tun'
      },
      bookingDate: '2024-10-03',
      travelDate: '2024-11-10',
      guests: 2,
      amount: 4200000,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'card'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Bobur Toshmatov',
        email: 'bobur.toshmatov@email.com',
        phone: '+998 94 456 78 90',
        avatar: 'https://ui-avatars.com/api/?name=Bobur+Toshmatov&background=EF4444&color=fff'
      },
      package: {
        title: 'Parij Romantik Tour',
        location: 'Parij, Fransiya',
        duration: '6 kun / 5 tun'
      },
      bookingDate: '2024-10-02',
      travelDate: '2024-12-01',
      guests: 2,
      amount: 6400000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'card'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Nodira Saidova',
        email: 'nodira.saidova@email.com',
        phone: '+998 95 567 89 01',
        avatar: 'https://ui-avatars.com/api/?name=Nodira+Saidova&background=8B5CF6&color=fff'
      },
      package: {
        title: 'Maldiv Orollari Lux',
        location: 'Maldivlar',
        duration: '5 kun / 4 tun'
      },
      bookingDate: '2024-10-01',
      travelDate: '2024-12-20',
      guests: 2,
      amount: 9000000,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'click'
    },
    {
      id: 'ORD-006',
      customer: {
        name: 'Aziz Qodirov',
        email: 'aziz.qodirov@email.com',
        phone: '+998 97 678 90 12',
        avatar: 'https://ui-avatars.com/api/?name=Aziz+Qodirov&background=3B82F6&color=fff'
      },
      package: {
        title: 'Dubai Premium Safari',
        location: 'Dubai, BAA',
        duration: '5 kun / 4 tun'
      },
      bookingDate: '2024-09-30',
      travelDate: '2024-11-15',
      guests: 4,
      amount: 10000000,
      status: 'completed',
      paymentStatus: 'paid',
      paymentMethod: 'card'
    }
  ]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Package, label: 'Paketlar', active: false },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: true },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: Settings, label: 'Sozlamalar', active: false }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Kutilmoqda' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Tasdiqlangan' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Tugallangan' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Bekor qilingan' }
    };
    const style = styles[status];
    return (
      <span className={`px-3 py-1 ${style.bg} ${style.text} rounded-full text-xs font-semibold`}>
        {style.label}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const styles = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'To\'langan' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Kutilmoqda' },
      refunded: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Qaytarilgan' }
    };
    const style = styles[status];
    return (
      <span className={`px-3 py-1 ${style.bg} ${style.text} rounded-full text-xs font-semibold`}>
        {style.label}
      </span>
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    alert(`Buyurtma holati "${newStatus}" ga o'zgartirildi`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.package.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.bookingDate);
      const today = new Date();
      const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === 'today') matchesDate = diffDays === 0;
      else if (dateFilter === 'week') matchesDate = diffDays <= 7;
      else if (dateFilter === 'month') matchesDate = diffDays <= 30;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.amount, 0)
  };

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
        <div className="bg-white shadow-sm">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Buyurtmalarni Boshqarish</h1>
                <p className="text-gray-600">Barcha buyurtmalarni kuzatib boring</p>
              </div>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Eksport</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="text-sm text-gray-600 mb-1">Jami</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
              <div className="text-sm text-yellow-700 mb-1">Kutilmoqda</div>
              <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
            </div>
            <div className="bg-blue-50 rounded-xl shadow-sm p-4">
              <div className="text-sm text-blue-700 mb-1">Tasdiqlangan</div>
              <div className="text-2xl font-bold text-blue-700">{stats.confirmed}</div>
            </div>
            <div className="bg-green-50 rounded-xl shadow-sm p-4">
              <div className="text-sm text-green-700 mb-1">Tugallangan</div>
              <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
            </div>
            <div className="bg-red-50 rounded-xl shadow-sm p-4">
              <div className="text-sm text-red-700 mb-1">Bekor qilingan</div>
              <div className="text-2xl font-bold text-red-700">{stats.cancelled}</div>
            </div>
            <div className="bg-purple-50 rounded-xl shadow-sm p-4">
              <div className="text-sm text-purple-700 mb-1">Daromad</div>
              <div className="text-lg font-bold text-purple-700">{(stats.revenue / 1000000).toFixed(1)}M</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buyurtma, mijoz yoki paket qidirish..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha statuslar</option>
                  <option value="pending">Kutilmoqda</option>
                  <option value="confirmed">Tasdiqlangan</option>
                  <option value="completed">Tugallangan</option>
                  <option value="cancelled">Bekor qilingan</option>
                </select>
              </div>

              <div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha sanalar</option>
                  <option value="today">Bugun</option>
                  <option value="week">So'nggi hafta</option>
                  <option value="month">So'nggi oy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Buyurtma ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Mijoz</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Paket</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Sana</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Mehmonlar</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Summa</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">To'lov</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Harakat</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm font-semibold text-blue-600">{order.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img src={order.customer.avatar} alt="" className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-medium text-gray-900">{order.customer.name}</div>
                            <div className="text-sm text-gray-500">{order.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{order.package.title}</div>
                        <div className="text-sm text-gray-500">{order.package.location}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">{order.travelDate}</div>
                        <div className="text-xs text-gray-500">Buyurtma: {order.bookingDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-900">{order.guests} kishi</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{order.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">so'm</div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-4 px-6">
                        {getPaymentBadge(order.paymentStatus)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Tasdiqlash"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {(order.status === 'pending' || order.status === 'confirmed') && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Bekor qilish"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Buyurtma topilmadi</h3>
                <p className="text-gray-600">Qidiruv natijasi bo'yicha hech narsa topilmadi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Buyurtma Tafsilotlari</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Buyurtma ID</div>
                    <div className="text-xl font-mono font-bold text-blue-600">{selectedOrder.id}</div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Buyurtma sanasi</div>
                    <div className="font-medium text-gray-900">{selectedOrder.bookingDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Sayohat sanasi</div>
                    <div className="font-medium text-gray-900">{selectedOrder.travelDate}</div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Mijoz Ma'lumotlari
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={selectedOrder.customer.avatar} alt="" className="w-16 h-16 rounded-full" />
                    <div>
                      <div className="font-bold text-xl text-gray-900">{selectedOrder.customer.name}</div>
                      <div className="text-gray-600">{selectedOrder.customer.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedOrder.customer.phone}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedOrder.customer.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Paket Ma'lumotlari
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{selectedOrder.package.title}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedOrder.package.location}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedOrder.package.duration}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2" />
                      {selectedOrder.guests} mehmon
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  To'lov Ma'lumotlari
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">To'lov usuli</span>
                      <span className="font-medium text-gray-900 capitalize">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">To'lov holati</span>
                      {getPaymentBadge(selectedOrder.paymentStatus)}
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="font-bold text-lg text-gray-900">Jami summa</span>
                      <span className="font-bold text-2xl text-blue-600">
                        {selectedOrder.amount.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'confirmed');
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Tasdiqlash
                  </button>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'completed');
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Tugallangan
                  </button>
                )}
                {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'cancelled');
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
