import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu, Save, X, Plus, Trash2, Upload, MapPin, DollarSign, Clock, Calendar, Star, Check, AlertCircle } from 'lucide-react';

export default function AdminPackageDetailForm() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const [packageData, setPackageData] = useState({
    // Basic Info
    title: '',
    location: '',
    category: 'Ekskursiya',
    price: '',
    originalPrice: '',
    duration: '',
    description: '',
    
    // Images
    images: [],
    
    // Highlights
    highlights: ['', '', '', '', '', ''],
    
    // Included Services
    included: ['', '', '', '', '', '', ''],
    
    // Not Included
    notIncluded: ['', '', '', '', ''],
    
    // Itinerary
    itinerary: [
      { day: 1, title: '', activities: ['', '', '', '', ''] }
    ],
    
    // Facilities
    facilities: {
      hotel: false,
      transfer: false,
      meals: false,
      guide: false,
      insurance: false,
      visa: false
    },
    
    // Additional Info
    minGuests: 1,
    maxGuests: 10,
    cancellationPolicy: '',
    importantNotes: '',
    status: 'active'
  });

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Package, label: 'Paketlar', active: true },
    { icon: ShoppingCart, label: 'Buyurtmalar', active: false },
    { icon: Users, label: 'Mijozlar', active: false },
    { icon: Settings, label: 'Sozlamalar', active: false }
  ];

  const categories = ['Ekskursiya', 'Plyaj', 'Tarix', 'Luxe', 'Avantüra', 'Oilaviy', 'Romantik', 'Tabiat'];

  const addItineraryDay = () => {
    setPackageData({
      ...packageData,
      itinerary: [
        ...packageData.itinerary,
        { day: packageData.itinerary.length + 1, title: '', activities: ['', '', '', '', ''] }
      ]
    });
  };

  const removeItineraryDay = (index) => {
    const newItinerary = packageData.itinerary.filter((_, idx) => idx !== index);
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const updateItinerary = (dayIndex, field, value) => {
    const newItinerary = [...packageData.itinerary];
    newItinerary[dayIndex][field] = value;
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const newItinerary = [...packageData.itinerary];
    newItinerary[dayIndex].activities[activityIndex] = value;
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const updateHighlight = (index, value) => {
    const newHighlights = [...packageData.highlights];
    newHighlights[index] = value;
    setPackageData({ ...packageData, highlights: newHighlights });
  };

  const updateIncluded = (index, value) => {
    const newIncluded = [...packageData.included];
    newIncluded[index] = value;
    setPackageData({ ...packageData, included: newIncluded });
  };

  const updateNotIncluded = (index, value) => {
    const newNotIncluded = [...packageData.notIncluded];
    newNotIncluded[index] = value;
    setPackageData({ ...packageData, notIncluded: newNotIncluded });
  };

  const handleSave = () => {
    // Validation
    if (!packageData.title || !packageData.price || !packageData.duration) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return;
    }
    
    console.log('Package Data:', packageData);
    alert('Paket muvaffaqiyatli saqlandi!');
  };

  const steps = [
    { number: 1, title: 'Asosiy Ma\'lumot' },
    { number: 2, title: 'Tavsif va Jihozlar' },
    { number: 3, title: 'Marshirut' },
    { number: 4, title: 'Narx va Shartlar' }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Yangi Paket Yaratish</h1>
                <p className="text-gray-600">To'liq paket ma'lumotlarini kiriting</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Saqlash</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, idx) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${
                        currentStep >= step.number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-4 mb-8 transition ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Asosiy Ma'lumotlar</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paket Nomi *
                    </label>
                    <input
                      type="text"
                      value={packageData.title}
                      onChange={(e) => setPackageData({...packageData, title: e.target.value})}
                      placeholder="Masalan: Dubai Premium Safari"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Manzil *
                      </label>
                      <input
                        type="text"
                        value={packageData.location}
                        onChange={(e) => setPackageData({...packageData, location: e.target.value})}
                        placeholder="Dubai, BAA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategoriya *
                      </label>
                      <select
                        value={packageData.category}
                        onChange={(e) => setPackageData({...packageData, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Narx (so'm) *
                      </label>
                      <input
                        type="number"
                        value={packageData.price}
                        onChange={(e) => setPackageData({...packageData, price: e.target.value})}
                        placeholder="2500000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Eski Narx (so'm)
                      </label>
                      <input
                        type="number"
                        value={packageData.originalPrice}
                        onChange={(e) => setPackageData({...packageData, originalPrice: e.target.value})}
                        placeholder="3000000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Chegirma ko'rsatish uchun</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Davomiyligi *
                      </label>
                      <input
                        type="text"
                        value={packageData.duration}
                        onChange={(e) => setPackageData({...packageData, duration: e.target.value})}
                        placeholder="5 kun / 4 tun"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rasmlar Yuklash *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">Rasmlarni yuklash uchun bosing</p>
                      <p className="text-sm text-gray-500">PNG, JPG (max. 5MB har biri, 5 tagacha)</p>
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Description & Features */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tavsif</h2>
                <textarea
                  value={packageData.description}
                  onChange={(e) => setPackageData({...packageData, description: e.target.value})}
                  placeholder="Paket haqida batafsil ma'lumot yozing..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Asosiy Jihozlar</h2>
                <div className="space-y-3">
                  {packageData.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateHighlight(idx, e.target.value)}
                        placeholder={`Jihoz ${idx + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Narxga Kiritilgan</h2>
                <div className="space-y-3">
                  {packageData.included.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateIncluded(idx, e.target.value)}
                        placeholder={`Xizmat ${idx + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Narxga Kiritilmagan</h2>
                <div className="space-y-3">
                  {packageData.notIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateNotIncluded(idx, e.target.value)}
                        placeholder={`Xizmat ${idx + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mavjud Xizmatlar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'hotel', label: 'Mehmonxona', icon: '🏨' },
                    { key: 'transfer', label: 'Transfer', icon: '🚗' },
                    { key: 'meals', label: 'Ovqat', icon: '🍽️' },
                    { key: 'guide', label: 'Gid', icon: '👤' },
                    { key: 'insurance', label: 'Sug\'urta', icon: '🛡️' },
                    { key: 'visa', label: 'Viza', icon: '📄' }
                  ].map((facility) => (
                    <label
                      key={facility.key}
                      className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                    >
                      <input
                        type="checkbox"
                        checked={packageData.facilities[facility.key]}
                        onChange={(e) => setPackageData({
                          ...packageData,
                          facilities: { ...packageData.facilities, [facility.key]: e.target.checked }
                        })}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-2xl">{facility.icon}</span>
                      <span className="font-medium text-gray-900">{facility.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Itinerary */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Kunlik Marshirut</h2>
                  <button
                    onClick={addItineraryDay}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Kun Qo'shish</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {packageData.itinerary.map((day, dayIdx) => (
                    <div key={dayIdx} className="border-2 border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => updateItinerary(dayIdx, 'title', e.target.value)}
                            placeholder="Kun sarlavhasi"
                            className="text-lg font-semibold px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        {packageData.itinerary.length > 1 && (
                          <button
                            onClick={() => removeItineraryDay(dayIdx)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tadbirlar:</label>
                        {day.activities.map((activity, actIdx) => (
                          <div key={actIdx} className="flex items-center space-x-2">
                            <span className="text-gray-500">•</span>
                            <input
                              type="text"
                              value={activity}
                              onChange={(e) => updateActivity(dayIdx, actIdx, e.target.value)}
                              placeholder={`Tadbir ${actIdx + 1}`}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing & Policies */}
          {currentStep === 4 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mehmonlar Soni</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimal mehmonlar
                    </label>
                    <input
                      type="number"
                      value={packageData.minGuests}
                      onChange={(e) => setPackageData({...packageData, minGuests: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maksimal mehmonlar
                    </label>
                    <input
                      type="number"
                      value={packageData.maxGuests}
                      onChange={(e) => setPackageData({...packageData, maxGuests: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Bekor Qilish Siyosati</h2>
                <textarea
                  value={packageData.cancellationPolicy}
                  onChange={(e) => setPackageData({...packageData, cancellationPolicy: e.target.value})}
                  placeholder="Bekor qilish shartlari..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Muhim Eslatmalar</h2>
                <textarea
                  value={packageData.importantNotes}
                  onChange={(e) => setPackageData({...packageData, importantNotes: e.target.value})}
                  placeholder="Mijozlar uchun muhim ma'lumotlar..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Status</h2>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={packageData.status === 'active'}
                      onChange={(e) => setPackageData({...packageData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Faol</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={packageData.status === 'inactive'}
                      onChange={(e) => setPackageData({...packageData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Nofaol</span>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Eslatma</h3>
                    <p className="text-sm text-blue-800">
                      Barcha ma'lumotlarni to'ldirgandan so'ng "Saqlash" tugmasini bosing. 
                      Saqlangan paket foydalanuvchilarga ko'rinadi va buyurtma qilish mumkin bo'ladi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="max-w-4xl mx-auto mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Orqaga
              </button>
            )}
            <div className="ml-auto">
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Davom etish
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Saqlash va Tugatish</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
