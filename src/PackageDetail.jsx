import React, { useState } from 'react';
import { MapPin, Calendar, Users, Star, Heart, Share2, Clock, Check, X, ChevronLeft, ChevronRight, Shield, Award, Headphones, ImageIcon } from 'lucide-react';

export default function PackageDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const packageData = {
    id: 1,
    title: "Dubai Premium Safari",
    agency: "Grand Tours",
    location: "Dubai, BAA",
    price: 2500000,
    originalPrice: 3000000,
    duration: "5 kun / 4 tun",
    rating: 4.8,
    reviews: 142,
    discount: 17,
    category: "Luxe",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
    ],
    description: "Dubai - Birlashgan Arab Amirliklarining eng mashhur shahri. Bu ajoyib sayohat sizga hashamatli mehmonxonalar, sahro safari, zamonaviy diqqatga sazovor joylar va noyob tajribalarni taqdim etadi.",
    highlights: [
      "Burj Khalifa - dunyodagi eng baland bino",
      "Sahro safari va uyqu lageri",
      "Dubai Mall va Dubai Fountain",
      "Palm Jumeirah va Atlantis",
      "Marina va plyaj kunlari",
      "An'anaviy bozor (souk) sayohati"
    ],
    included: [
      "5 yulduzli mehmonxonada 4 tunda turar joy",
      "Kunduzgi nonushta (shvedskiy stol)",
      "Aeroport transfer (kelish-ketish)",
      "Barcha kirish chiptalar",
      "Professional rus/ingliz tilida gid",
      "Sayohat sug'urtasi",
      "Viza rasmiylashtiruvi"
    ],
    notIncluded: [
      "Aviachiptalar",
      "Tushlik va kechki ovqat",
      "Shaxsiy xarajatlar",
      "Qo'shimcha ekskursiyalar",
      "Ichimliklar"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kelish va shaharga tanishuv",
        activities: [
          "Aeroportda kutib olish",
          "Mehmonxonaga joylashish",
          "Dubai Mall tashrif",
          "Dubai Fountain shousi",
          "Kechki ovqat (ixtiyoriy)"
        ]
      },
      {
        day: 2,
        title: "Burj Khalifa va shahar turi",
        activities: [
          "Nonushta mehmonxonada",
          "Burj Khalifa 124-125 qavatlarga chiqish",
          "Dubai Marina sayohati",
          "JBR Beach dam olish",
          "Kechki ovqat Marina da"
        ]
      },
      {
        day: 3,
        title: "Sahro Safari",
        activities: [
          "Nonushta mehmonxonada",
          "Sahro safari (16:00)",
          "Qumda uchish",
          "Tuya minish",
          "BBQ kechki ovqat lagerde",
          "An'anaviy raqslar"
        ]
      },
      {
        day: 4,
        title: "Palm Jumeirah va Atlantis",
        activities: [
          "Nonushta mehmonxonada",
          "Palm Jumeirah monorelsga sayohat",
          "Atlantis The Palm tashrif",
          "Aquaventure water park",
          "Erkin vaqt"
        ]
      },
      {
        day: 5,
        title: "Xayrlashuv",
        activities: [
          "Nonushta",
          "Mehmonxonadan chiqish",
          "Gold Souk va sovg'alar",
          "Aeroportga transfer"
        ]
      }
    ],
    facilities: [
      { name: "Mehmonxona", icon: "🏨" },
      { name: "Transfer", icon: "🚗" },
      { name: "Ovqat", icon: "🍽️" },
      { name: "Gid", icon: "👤" },
      { name: "Sug'urta", icon: "🛡️" },
      { name: "Viza", icon: "📄" }
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Kamola Rahimova",
      rating: 5,
      date: "2024-09-15",
      avatar: "https://ui-avatars.com/api/?name=Kamola+Rahimova&background=4F46E5&color=fff",
      comment: "Ajoyib sayohat! Hammasi juda yaxshi tashkil qilingan. Gid juda professional va do'stona edi. Dubai haqiqatan ham go'zal shahar. Albatta yana qaytaman!",
      helpful: 24
    },
    {
      id: 2,
      name: "Sardor Karimov",
      rating: 5,
      date: "2024-09-10",
      avatar: "https://ui-avatars.com/api/?name=Sardor+Karimov&background=10B981&color=fff",
      comment: "Oilam bilan bordik, hamma narsa zo'r o'tdi. Mehmonxona juda hashamatli, xizmat ko'rsatish eng yuqori darajada. Safari unutilmas tajriba bo'ldi!",
      helpful: 18
    },
    {
      id: 3,
      name: "Dilnoza Aliyeva",
      rating: 4,
      date: "2024-09-05",
      avatar: "https://ui-avatars.com/api/?name=Dilnoza+Aliyeva&background=F59E0B&color=fff",
      comment: "Juda yaxshi uyushtirilgan sayohat. Yagona kamchilik - ba'zi joylar juda gavjum edi. Lekin umuman olganda, juda yoqdi!",
      helpful: 12
    }
  ];

  const similarPackages = [
    {
      id: 2,
      title: "Abu Dhabi Lux Tour",
      location: "Abu Dhabi, BAA",
      price: 2200000,
      duration: "4 kun / 3 tun",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&q=80"
    },
    {
      id: 3,
      title: "Dubai + Abu Dhabi Kombo",
      location: "Dubai-Abu Dhabi",
      price: 3500000,
      duration: "7 kun / 6 tun",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80"
    },
    {
      id: 4,
      title: "Dubai Plyaj Dam Olish",
      location: "Dubai, BAA",
      price: 2800000,
      duration: "6 kun / 5 tun",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80"
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % packageData.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + packageData.images.length) % packageData.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-blue-600 hover:text-blue-700 flex items-center">
                <ChevronLeft className="w-5 h-5" />
                <span>Orqaga</span>
              </button>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TravelHub</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
              <div className="relative h-96">
                <img
                  src={packageData.images[selectedImage]}
                  alt={packageData.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {packageData.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === selectedImage ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 p-4">
                {packageData.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      idx === selectedImage ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-blue-600 mb-1">{packageData.agency}</div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{packageData.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {packageData.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {packageData.duration}
                    </div>
                  </div>
                </div>
                {packageData.discount && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                    -{packageData.discount}% Chegirma
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-semibold">{packageData.rating}</span>
                  <span className="text-gray-500 ml-2">({packageData.reviews} ta sharh)</span>
                </div>
                <div className="flex items-center space-x-2">
                  {packageData.facilities.slice(0, 4).map((facility, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                      {facility.icon} {facility.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex space-x-8">
                  {['overview', 'itinerary', 'included', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-semibold transition ${
                        activeTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'overview' && 'Umumiy'}
                      {tab === 'itinerary' && 'Marshirut'}
                      {tab === 'included' && 'Kiritilgan'}
                      {tab === 'reviews' && 'Sharhlar'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tavsif</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{packageData.description}</p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Asosiy Jihatlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {packageData.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  {packageData.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-blue-600 pl-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{day.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'included' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Narxga kiritilgan
                    </h3>
                    <ul className="space-y-3">
                      {packageData.included.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <X className="w-5 h-5 text-red-500 mr-2" />
                      Narxga kiritilmagan
                    </h3>
                    <ul className="space-y-3">
                      {packageData.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.name}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            👍 Foydali ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Barcha sharhlarni ko'rish →
                  </button>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Nima uchun bizni tanlash kerak?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Xavfsiz To'lov</h4>
                  <p className="text-sm text-gray-600">100% himoyalangan to'lov tizimi</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Eng Yaxshi Narx</h4>
                  <p className="text-sm text-gray-600">Narx farqi topilsa, qaytaramiz</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Headphones className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Qo'llab-quvvatlash</h4>
                  <p className="text-sm text-gray-600">Har doim sizga yordam beramiz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                {packageData.originalPrice && (
                  <div className="text-lg text-gray-400 line-through">
                    {packageData.originalPrice.toLocaleString()} so'm
                  </div>
                )}
                <div className="text-4xl font-bold text-gray-900">
                  {packageData.price.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600"> so'm</span>
                </div>
                <div className="text-sm text-gray-500">odam uchun</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sayohat sanasi
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mehmonlar soni
                  </label>
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="font-semibold">{guests} kishi</span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Narx ({guests} kishi)</span>
                  <span className="font-semibold">{(packageData.price * guests).toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Xizmat to'lovi</span>
                  <span className="font-semibold">0 so'm</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Jami</span>
                    <span className="font-bold text-lg text-blue-600">
                      {(packageData.price * guests).toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition mb-3"
              >
                Buyurtma berish
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Ma'lumot olish
              </button>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 flex items-start">
                  <Shield className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-green-500" />
                  Bepul bekor qilish 7 kun oldin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Packages */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">O'xshash sayohatlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
                <div className="relative h-48">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.duration}
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
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Buyurtma berish</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ism Familiya</label>
                <input
                  type="text"
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon raqam</label>
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qo'shimcha izoh</label>
                <textarea
                  rows="3"
                  placeholder="Savolingiz yoki xohishingiz bo'lsa yozing..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Sayohat paketi</span>
                <span className="font-semibold">{packageData.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Sana</span>
                <span className="font-semibold">{selectedDate || 'Tanlanmagan'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Mehmonlar</span>
                <span className="font-semibold">{guests} kishi</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Jami narx</span>
                  <span className="font-bold text-lg text-blue-600">
                    {(packageData.price * guests).toLocaleString()} so'm
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
                setShowBookingModal(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition"
            >
              Tasdiqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
