import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, ShoppingBag, Settings, Bell, Shield, CreditCard, LogOut, Edit2, Save, X, Star, Clock, CheckCircle, XCircle, Lock } from 'lucide-react';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: 'Kamola Rahimova',
    email: 'kamola.rahimova@email.com',
    phone: '+998 90 123 45 67',
    birthDate: '1995-05-15',
    address: 'Toshkent, O\'zbekiston',
    avatar: 'https://ui-avatars.com/api/?name=Kamola+Rahimova&size=200&background=4F46E5&color=fff'
  });

  const [editData, setEditData] = useState({...userData});

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    alert('Ma\'lumotlar saqlandi!');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const bookingHistory = [
    {
      id: 1,
      title: 'Dubai Premium Safari',
      agency: 'Grand Tours',
      date: '2024-12-15',
      guests: 2,
      price: 5000000,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      bookingDate: '2024-10-01'
    },
    {
      id: 2,
      title: 'Istanbul Tarixiy Sayohati',
      agency: 'Silk Road Travel',
      date: '2024-09-20',
      guests: 3,
      price: 5400000,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80',
      bookingDate: '2024-08-15',
      rating: 5
    },
    {
      id: 3,
      title: 'Bali Tropik Ta\'tili',
      agency: 'Asia Dreams',
      date: '2024-08-10',
      guests: 2,
      price: 4200000,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
      bookingDate: '2024-07-01',
      rating: 4
    },
    {
      id: 4,
      title: 'Parij Romantik Tour',
      agency: 'Europe Express',
      date: '2024-06-05',
      guests: 2,
      price: 6400000,
      status: 'cancelled',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
      bookingDate: '2024-05-10'
    }
  ];

  const favoritePackages = [
    {
      id: 1,
      title: 'Maldiv Orollari Lux',
      location: 'Maldivlar',
      price: 4500000,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80'
    },
    {
      id: 2,
      title: 'Rim Antik Sayohati',
      location: 'Rim, Italiya',
      price: 2800000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80'
    },
    {
      id: 3,
      title: 'Tokio Modern Tour',
      location: 'Tokio, Yaponiya',
      price: 3500000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Buyurtma tasdiqlandi',
      message: 'Dubai Premium Safari sayohatingiz tasdiqlandi',
      time: '2 soat oldin',
      read: false
    },
    {
      id: 2,
      type: 'promo',
      title: 'Maxsus chegirma!',
      message: 'Istanbul turiga 20% chegirma - bugun oxirgi kun!',
      time: '1 kun oldin',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Sayohat eslatmasi',
      message: 'Dubai sayohatingizga 30 kun qoldi',
      time: '3 kun oldin',
      read: true
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    const labels = {
      upcoming: 'Kutilmoqda',
      completed: 'Tugallandi',
      cancelled: 'Bekor qilindi'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'bookings', label: 'Buyurtmalarim', icon: ShoppingBag },
    { id: 'favorites', label: 'Sevimlilar', icon: Heart },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
    { id: 'settings', label: 'Sozlamalar', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TravelHub</span>
            </div>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition">
              <LogOut className="w-5 h-5" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={userData.avatar}
                    alt={userData.fullName}
                    className="w-24 h-24 rounded-full mx-auto mb-3"
                  />
                  <button className="absolute bottom-2 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{userData.fullName}</h3>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">Sayohatlar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-xs text-gray-600">Sharhlar</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shaxsiy Ma'lumotlar</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Tahrirlash</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Saqlash</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Bekor qilish</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Ism Familiya
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.fullName : userData.fullName}
                      onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={isEditing ? editData.email : userData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={isEditing ? editData.phone : userData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Tug'ilgan sana
                    </label>
                    <input
                      type="date"
                      value={isEditing ? editData.birthDate : userData.birthDate}
                      onChange={(e) => setEditData({...editData, birthDate: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Manzil
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.address : userData.address}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Buyurtmalar Tarixi</h2>
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                        <img
                          src={booking.image}
                          alt={booking.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.title}</h3>
                            <p className="text-sm text-gray-600">{booking.agency}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Sayohat sanasi</div>
                            <div className="flex items-center text-sm font-medium text-gray-900">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.date}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Mehmonlar</div>
                            <div className="flex items-center text-sm font-medium text-gray-900">
                              <User className="w-4 h-4 mr-1" />
                              {booking.guests} kishi
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Narx</div>
                            <div className="text-sm font-bold text-gray-900">
                              {booking.price.toLocaleString()} so'm
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Buyurtma sanasi</div>
                            <div className="text-sm text-gray-700">{booking.bookingDate}</div>
                          </div>
                        </div>

                        {booking.status === 'completed' && booking.rating && (
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-sm text-gray-600">Sizning bahongiz:</span>
                            <div className="flex">
                              {[...Array(booking.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {booking.status === 'upcoming' && (
                            <>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                                Tafsilotlar
                              </button>
                              <button className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition text-sm">
                                Bekor qilish
                              </button>
                            </>
                          )}
                          {booking.status === 'completed' && !booking.rating && (
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
                              Sharh qoldirish
                            </button>
                          )}
                          {booking.status === 'completed' && (
                            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm">
                              Qayta buyurtma qilish
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sevimli Sayohatlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritePackages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
                      <div className="relative h-48">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{pkg.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {pkg.location}
                        </div>
                        <div className="flex items-center mb-4">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-semibold">{pkg.rating}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                          <div>
                            <div className="text-xl font-bold text-gray-900">
                              {pkg.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">so'm / odam</div>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                            Ko'rish
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Bildirishnomalar</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Hammasini o'qilgan deb belgilash
                  </button>
                </div>
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition ${
                        !notif.read ? 'border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {notif.type === 'booking' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {notif.type === 'promo' && <Star className="w-5 h-5 text-yellow-500" />}
                            {notif.type === 'reminder' && <Clock className="w-5 h-5 text-blue-500" />}
                            <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-2">{notif.message}</p>
                          <p className="text-sm text-gray-500">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Xavfsizlik</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Parolni o'zgartirish</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Ikki faktorli autentifikatsiya</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">To'lov Usullari</h2>
                  <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Yangi karta qo'shish</span>
                    </div>
                    <span className="text-blue-600 text-2xl">+</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Bildirishnomalar</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-900">Email bildirishnomalar</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-900">SMS bildirishnomalar</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-900">Aksiya va chegirmalar</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </label>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Hisobni o'chirish</h3>
                  <p className="text-red-700 text-sm mb-4">
                    Hisobingizni o'chirsangiz, barcha ma'lumotlaringiz butunlay yo'q qilinadi va uni qaytarib bo'lmaydi.
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Hisobni o'chirish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
