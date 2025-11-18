import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Edit2, Save, X, Upload, MapPin, Phone, Mail, Globe, Clock, Star, Award, Shield, Camera, Building, FileText, CreditCard, Menu } from 'lucide-react';

export default function AgencyProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);

  const [agencyData, setAgencyData] = useState({
    name: 'Grand Tours',
    description: 'O\'zbekistonning eng yirik va ishonchli sayyohlik agentliklaridan biri. 2015 yildan beri mijozlarimizga eng yaxshi xizmat ko\'rsatib kelamiz.',
    email: 'info@grandtours.uz',
    phone: '+998 71 123 45 67',
    website: 'www.grandtours.uz',
    address: 'Toshkent shahar, Amir Temur ko\'chasi, 108-uy',
    workingHours: 'Dushanba-Juma: 9:00-18:00, Shanba: 10:00-15:00',
    license: 'TUR-2015-001234',
    established: '2015',
    logo: 'https://ui-avatars.com/api/?name=Grand+Tours&size=200&background=3B82F6&color=fff&bold=true',
    banner: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    rating: 4.8,
    totalReviews: 342,
    totalBookings: 1247,
    activePackages: 23
  });

  const [editData, setEditData] = useState({...agencyData});

  const [bankData, setBankData] = useState({
    bankName: 'O\'zsanoatqurilishbank',
    accountNumber: '20208000000000000000',
    mfo: '00424',
    inn: '123456789',
    oked: '79110'
  });

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Kamola Rahimova',
      position: 'Direktor',
      avatar: 'https://ui-avatars.com/api/?name=Kamola+Rahimova&background=4F46E5&color=fff',
      phone: '+998 90 123 45 67',
      email: 'kamola@grandtours.uz'
    },
    {
      id: 2,
      name: 'Sardor Karimov',
      position: 'Bosh Menejer',
      avatar: 'https://ui-avatars.com/api/?name=Sardor+Karimov&background=10B981&color=fff',
      phone: '+998 91 234 56 78',
      email: 'sardor@grandtours.uz'
    },
    {
      id: 3,
      name: 'Dilnoza Aliyeva',
      position: 'Marketing Menejer',
      avatar: 'https://ui-avatars.com/api/?name=Dilnoza+Aliyeva&background=F59E0B&color=fff',
      phone: '+998 93 345 67 89',
      email: 'dilnoza@grandtours.uz'
    },
    {
      id: 4,
      name: 'Bobur Toshmatov',
      position: 'Tur Koordinator',
      avatar: 'https://ui-avatars.com/api/?name=Bobur+Toshmatov&background=EF4444&color=fff',
      phone: '+998 94 456 78 90',
      email: 'bobur@grandtours.uz'
    }
  ]);

  const [achievements] = useState([
    { icon: Award, title: 'Yilning Eng Yaxshi Agentligi', year: '2023', color: 'yellow' },
    { icon: Star, title: '5000+ Qoniqarli Mijoz', year: '2023', color: 'blue' },
    { icon: Shield, title: 'Sertifikatlangan Agentlik', year: '2022', color: 'green' }
  ]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Package, label: 'Paketlar', active: false },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: false },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: Settings, label: 'Sozlamalar', active: true }
  ];

  const handleSave = () => {
    setAgencyData(editData);
    setIsEditing(false);
    alert('Ma\'lumotlar muvaffaqiyatli saqlandi!');
  };

  const handleCancel = () => {
    setEditData(agencyData);
    setIsEditing(false);
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
            <h1 className="text-2xl font-bold text-gray-900">Agentlik Profili</h1>
            <p className="text-gray-600">Agentlik ma'lumotlarini boshqaring</p>
          </div>
        </div>

        {/* Banner */}
        <div className="relative h-64">
          <img
            src={agencyData.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center space-x-2 shadow-lg">
            <Camera className="w-4 h-4" />
            <span>Bannerni o'zgartirish</span>
          </button>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={agencyData.logo}
                alt={agencyData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 mt-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-yellow-500" />
                <span className="text-sm text-gray-500">Reyting</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{agencyData.rating}</div>
              <div className="text-sm text-gray-600">{agencyData.totalReviews} ta sharh</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="w-8 h-8 text-blue-500" />
                <span className="text-sm text-gray-500">Buyurtmalar</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{agencyData.totalBookings}</div>
              <div className="text-sm text-gray-600">Jami</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-green-500" />
                <span className="text-sm text-gray-500">Paketlar</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{agencyData.activePackages}</div>
              <div className="text-sm text-gray-600">Faol</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-purple-500" />
                <span className="text-sm text-gray-500">Tajriba</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{new Date().getFullYear() - parseInt(agencyData.established)}</div>
              <div className="text-sm text-gray-600">yil</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b px-6">
              <div className="flex space-x-8">
                {[
                  { id: 'info', label: 'Asosiy Ma\'lumot', icon: Building },
                  { id: 'bank', label: 'Bank Rekvizitlari', icon: CreditCard },
                  { id: 'team', label: 'Jamoa', icon: Users },
                  { id: 'achievements', label: 'Yutuqlar', icon: Award }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 transition ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'info' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Agentlik Ma'lumotlari</h2>
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

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agentlik nomi
                      </label>
                      <input
                        type="text"
                        value={isEditing ? editData.name : agencyData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tavsif
                      </label>
                      <textarea
                        value={isEditing ? editData.description : agencyData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        disabled={!isEditing}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={isEditing ? editData.email : agencyData.email}
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
                          value={isEditing ? editData.phone : agencyData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Veb-sayt
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editData.website : agencyData.website}
                          onChange={(e) => setEditData({...editData, website: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Litsenziya
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editData.license : agencyData.license}
                          onChange={(e) => setEditData({...editData, license: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Manzil
                      </label>
                      <input
                        type="text"
                        value={isEditing ? editData.address : agencyData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Ish vaqti
                      </label>
                      <input
                        type="text"
                        value={isEditing ? editData.workingHours : agencyData.workingHours}
                        onChange={(e) => setEditData({...editData, workingHours: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bank' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Bank Rekvizitlari</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank nomi</label>
                      <input
                        type="text"
                        value={bankData.bankName}
                        onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hisob raqami</label>
                        <input
                          type="text"
                          value={bankData.accountNumber}
                          onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">MFO</label>
                        <input
                          type="text"
                          value={bankData.mfo}
                          onChange={(e) => setBankData({...bankData, mfo: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">INN</label>
                        <input
                          type="text"
                          value={bankData.inn}
                          onChange={(e) => setBankData({...bankData, inn: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">OKED</label>
                        <input
                          type="text"
                          value={bankData.oked}
                          onChange={(e) => setBankData({...bankData, oked: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                      Saqlash
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Jamoa A'zolari</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      A'zo qo'shish
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex items-start space-x-4">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                            <p className="text-blue-600 text-sm mb-3">{member.position}</p>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                {member.phone}
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                {member.email}
                              </div>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Yutuqlar va Sertifikatlar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, idx) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition">
                          <div className={`w-16 h-16 rounded-full bg-${achievement.color}-100 flex items-center justify-center mb-4`}>
                            <Icon className={`w-8 h-8 text-${achievement.color}-600`} />
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{achievement.title}</h3>
                          <p className="text-gray-600">{achievement.year}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="font-bold text-lg text-blue-900 mb-4">Yangi Yutuq Qo'shish</h3>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                      <Upload className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-700">Sertifikat yoki mukofot rasmini yuklang</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
