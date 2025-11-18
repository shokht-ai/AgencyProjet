import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Plus, Edit, Trash2, Eye, Search, Filter, X, Upload, MapPin, Calendar, DollarSign, Clock, Star, Check, Menu } from 'lucide-react';

export default function PackagesManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [packages, setPackages] = useState([
    {
      id: 1,
      title: 'Dubai Premium Safari',
      location: 'Dubai, BAA',
      price: 2500000,
      duration: '5 kun / 4 tun',
      category: 'Luxe',
      status: 'active',
      bookings: 47,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Istanbul Tarixiy Sayohati',
      location: 'Istanbul, Turkiya',
      price: 1800000,
      duration: '4 kun / 3 tun',
      category: 'Tarix',
      status: 'active',
      bookings: 38,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80',
      createdDate: '2024-02-20'
    },
    {
      id: 3,
      title: 'Bali Tropik Ta\'tili',
      location: 'Bali, Indoneziya',
      price: 2100000,
      duration: '7 kun / 6 tun',
      category: 'Plyaj',
      status: 'active',
      bookings: 32,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
      createdDate: '2024-03-10'
    },
    {
      id: 4,
      title: 'Parij Romantik Tour',
      location: 'Parij, Fransiya',
      price: 3200000,
      duration: '6 kun / 5 tun',
      category: 'Ekskursiya',
      status: 'inactive',
      bookings: 28,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
      createdDate: '2024-04-05'
    },
    {
      id: 5,
      title: 'Maldiv Orollari Lux',
      location: 'Maldivlar',
      price: 4500000,
      duration: '5 kun / 4 tun',
      category: 'Luxe',
      status: 'active',
      bookings: 24,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
      createdDate: '2024-05-12'
    }
  ]);

  const [newPackage, setNewPackage] = useState({
    title: '',
    location: '',
    price: '',
    duration: '',
    category: 'Ekskursiya',
    description: '',
    highlights: '',
    included: '',
    notIncluded: '',
    status: 'active'
  });

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Package, label: 'Paketlar', active: true },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: false },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: Star, label: 'Sharhlar', active: false },
    { icon: Settings, label: 'Sozlamalar', active: false }
  ];

  const categories = ['Ekskursiya', 'Plyaj', 'Tarix', 'Luxe', 'Avantüra', 'Oilaviy'];

  const handleAddPackage = () => {
    if (!newPackage.title || !newPackage.price || !newPackage.duration) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return;
    }
    
    const packageToAdd = {
      id: packages.length + 1,
      ...newPackage,
      price: parseInt(newPackage.price),
      bookings: 0,
      rating: 0,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setPackages([...packages, packageToAdd]);
    setShowAddModal(false);
    setNewPackage({
      title: '',
      location: '',
      price: '',
      duration: '',
      category: 'Ekskursiya',
      description: '',
      highlights: '',
      included: '',
      notIncluded: '',
      status: 'active'
    });
    alert('Paket muvaffaqiyatli qo\'shildi!');
  };

  const handleEditPackage = () => {
    if (!selectedPackage) return;
    
    const updatedPackages = packages.map(pkg => 
      pkg.id === selectedPackage.id ? selectedPackage : pkg
    );
    setPackages(updatedPackages);
    setShowEditModal(false);
    setSelectedPackage(null);
    alert('Paket muvaffaqiyatli yangilandi!');
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Haqiqatan ham bu paketni o\'chirmoqchimisiz?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
      alert('Paket o\'chirildi!');
    }
  };

  const toggleStatus = (id) => {
    const updatedPackages = packages.map(pkg => 
      pkg.id === id ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active' } : pkg
    );
    setPackages(updatedPackages);
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pkg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
        Faol
      </span>
    ) : (
      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
        Nofaol
      </span>
    );
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
                <h1 className="text-2xl font-bold text-gray-900">Paketlarni Boshqarish</h1>
                <p className="text-gray-600">Sayohat paketlaringizni yarating va boshqaring</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Yangi Paket</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="px-8 py-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Paket yoki joy bo'yicha qidirish..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Barchasi ({packages.length})
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Faol ({packages.filter(p => p.status === 'active').length})
                </button>
                <button
                  onClick={() => setFilterStatus('inactive')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterStatus === 'inactive' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Nofaol ({packages.filter(p => p.status === 'inactive').length})
                </button>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
                <div className="relative h-48">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(pkg.status)}
                  </div>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{pkg.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {pkg.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {pkg.price.toLocaleString()} so'm
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold text-sm">{pkg.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {pkg.bookings} buyurtma
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowEditModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Tahrirlash</span>
                    </button>
                    <button
                      onClick={() => toggleStatus(pkg.id)}
                      className={`px-4 py-2 rounded-lg transition ${
                        pkg.status === 'active' 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paket topilmadi</h3>
              <p className="text-gray-600">Qidiruv natijasi bo'yicha hech narsa topilmadi</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Yangi Paket Qo'shish</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paket nomi *</label>
                <input
                  type="text"
                  value={newPackage.title}
                  onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                  placeholder="Masalan: Dubai Premium Safari"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Joy *</label>
                  <input
                    type="text"
                    value={newPackage.location}
                    onChange={(e) => setNewPackage({...newPackage, location: e.target.value})}
                    placeholder="Dubai, BAA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategoriya *</label>
                  <select
                    value={newPackage.category}
                    onChange={(e) => setNewPackage({...newPackage, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Narx (so'm) *</label>
                  <input
                    type="number"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                    placeholder="2500000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Davomiyligi *</label>
                  <input
                    type="text"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                    placeholder="5 kun / 4 tun"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif</label>
                <textarea
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                  placeholder="Paket haqida batafsil ma'lumot..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rasm yuklash</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Rasm yuklash uchun bosing yoki tortib qo'ying</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG (max. 5MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={newPackage.status === 'active'}
                      onChange={(e) => setNewPackage({...newPackage, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Faol</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={newPackage.status === 'inactive'}
                      onChange={(e) => setNewPackage({...newPackage, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Nofaol</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddPackage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Paket qo'shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showEditModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Paketni Tahrirlash</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paket nomi</label>
                <input
                  type="text"
                  value={selectedPackage.title}
                  onChange={(e) => setSelectedPackage({...selectedPackage, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Joy</label>
                  <input
                    type="text"
                    value={selectedPackage.location}
                    onChange={(e) => setSelectedPackage({...selectedPackage, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategoriya</label>
                  <select
                    value={selectedPackage.category}
                    onChange={(e) => setSelectedPackage({...selectedPackage, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Narx (so'm)</label>
                  <input
                    type="number"
                    value={selectedPackage.price}
                    onChange={(e) => setSelectedPackage({...selectedPackage, price: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Davomiyligi</label>
                  <input
                    type="text"
                    value={selectedPackage.duration}
                    onChange={(e) => setSelectedPackage({...selectedPackage, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleEditPackage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
