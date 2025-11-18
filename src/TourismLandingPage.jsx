import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, TrendingUp, Shield, Headphones, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TourismLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    guests: ''
  });

  const popularPackages = [
    {
      id: 1,
      title: "Dubai Premium Safari",
      agency: "Grand Tours",
      location: "Dubai, BAA",
      price: "2,500,000",
      duration: "5 kun / 4 tun",
      rating: 4.8,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Istanbul Tarixiy Sayohati",
      agency: "Silk Road Travel",
      location: "Istanbul, Turkiya",
      price: "1,800,000",
      duration: "4 kun / 3 tun",
      rating: 4.9,
      reviews: 218,
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80"
    },
    {
      id: 3,
      title: "Parij Romantik Tour",
      agency: "Europe Express",
      location: "Parij, Fransiya",
      price: "3,200,000",
      duration: "6 kun / 5 tun",
      rating: 4.7,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
    },
    {
      id: 4,
      title: "Bali Tropik Ta'tili",
      agency: "Asia Dreams",
      location: "Bali, Indoneziya",
      price: "2,100,000",
      duration: "7 kun / 6 tun",
      rating: 4.9,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Ishonchli Xavfsizlik",
      description: "Barcha agentliklar tekshirilgan va sertifikatlangan"
    },
    {
      icon: TrendingUp,
      title: "Eng Yaxshi Narxlar",
      description: "Bir joyda barcha narxlarni solishtiring"
    },
    {
      icon: Headphones,
      title: "24/7 Qo'llab-quvvatlash",
      description: "Har qanday vaqtda yordam olishingiz mumkin"
    }
  ];

  const stats = [
    { value: "500+", label: "Sayohat Paketlari" },
    { value: "150+", label: "Agentliklar" },
    { value: "10,000+", label: "Xursand Mijozlar" },
    { value: "4.8", label: "O'rtacha Reyting" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelHub
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Bosh sahifa</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Paketlar</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Agentliklar</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Biz haqimizda</Link>
              <button className="text-gray-700 hover:text-blue-600 transition">Kirish</button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                Ro'yxatdan o'tish
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-700">Bosh sahifa</a>
              <a href="#" className="block text-gray-700">Paketlar</a>
              <a href="#" className="block text-gray-700">Agentliklar</a>
              <a href="#" className="block text-gray-700">Biz haqimizda</a>
              <button className="block w-full text-left text-gray-700">Kirish</button>
              <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              O'zingizga Mos{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sayohatni
              </span>{' '}
              Toping
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              150+ ta agentlikning 500+ dan ortiq sayohat paketlari bir joyda. 
              Eng yaxshi narxlarni taqqoslang va orzuingizdagi sayohatni boshlang.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Manzil
                  </label>
                  <input
                    type="text"
                    placeholder="Qayerga?"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Sana
                  </label>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Mehmonlar
                  </label>
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tanlang</option>
                    <option value="1">1 kishi</option>
                    <option value="2">2 kishi</option>
                    <option value="3-5">3-5 kishi</option>
                    <option value="6+">6+ kishi</option>
                  </select>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition flex items-center justify-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Qidirish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nima uchun biz?</h2>
            <p className="text-gray-600">Sayohatingizni oson va xavfsiz qilish uchun</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Packages */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Mashhur Sayohatlar</h2>
              <p className="text-gray-600">Eng ko'p buyurtma qilingan paketlar</p>
            </div>
            <button className="text-blue-600 font-semibold flex items-center hover:gap-2 transition-all">
              Barchasini ko'rish <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {pkg.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ TOP
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{pkg.rating}</span>
                      <span className="text-gray-500 text-xs">({pkg.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-blue-600 mb-1">{pkg.agency}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                      <div className="text-xs text-gray-500">so'm / odam</div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition text-sm">
                      Tanlash
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sayohatingizni bugun boshlang!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ro'yxatdan o'ting va maxsus chegirmalardan foydalaning
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-2xl transition transform hover:scale-105">
            Bepul Ro'yxatdan O'tish
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-xl font-bold">TravelHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                O'zbekistonning eng yirik markazlashgan sayyohlik platformasi
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Xizmatlar</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Sayohat paketlari</a></li>
                <li><a href="#" className="hover:text-white transition">Agentliklar</a></li>
                <li><a href="#" className="hover:text-white transition">Qidiruv</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kompaniya</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-white transition">Aloqa</a></li>
                <li><a href="#" className="hover:text-white transition">Yordam</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Aloqa</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>+998 71 123 45 67</li>
                <li>info@travelhub.uz</li>
                <li>Toshkent, O'zbekiston</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2025 TravelHub. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
}