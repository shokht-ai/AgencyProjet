import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Heart, ShoppingBag, Settings, Bell, Shield, CreditCard, LogOut, Edit2, Save, X, Star, Clock, CheckCircle, Hourglass, Lock } from 'lucide-react';
import api from './api'; // Assume api is a utility for making API calls
import { toast } from "react-toastify";


export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: 'Ism Familiya',
    firstName: 'Ism',
    lastName: 'Familiya',
    email: 'example@mail.com',
    phone: '+998 90 123 45 67',
    birthDate: '1900-01-01',
    address: "Toshkent, O'zbekiston",
    avatar: 'https://ui-avatars.com/api/?name=Kamola+Rahimova&size=200&background=4F46E5&color=fff'
  });

  const [editData, setEditData] = useState({...userData});

    // --- Normalizatsiya: .0 /   .1 ---
  const normalize = (r) => {
    const whole = Math.floor(r);
    const dec = r - whole;

    if (dec < 0.5) return whole;       // .0
    return whole + 1;                   // keyingi butun son
  };
  const handleSave = async () => {
    try {
      const payload = {
        user: {
          first_name: editData.firstName,
          last_name: editData.lastName,
          email: editData.email,
        },
        phone: editData.phone,
        birth_date: editData.birthDate,
        address: editData.address,
      };

      const response = await api({
        endpoint: "user/profile/",
        method: "PATCH",
        data: payload
      });

      if (response.ok) {
        // Frontni yangilash
        setUserData(editData);
        setIsEditing(false);

        toast.success("Ma'lumotlar muvaffaqiyatli saqlandi!");
      } else {
        toast.error(response.data.message || "Saqlashda xatolik yuz berdi!");
      }
    } catch (error) {
      toast.error("Server bilan bog'lanishda xatolik!");
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const [bookingHistory, setBookingHistory] = useState([]);

  const handleDeleteBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("Bu tur paket topilmadi!");
      return;
    }

    try {
      const response = await api({
        endpoint: `user/booking/${bookingId}/`,
        method: "PATCH",
        data: { status: "cancelled" }
      });

      if (response.ok) {
        toast.success("Buyurtmalar ro'yxatidan muvaffaqiyatli o'chirildi!");
        await fetchBookings(); 
        // Shu yerda state update yoki UI update qilishingiz mumkin
        setActiveTab('bookings'); // favorites tabini yangilash uchun
      } else {
        toast.error(response.data?.message || "Buyurtmani o'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko'ring!");
    }
  };

  const [favoritePackages, setFavoritePackages] = useState([]);

  // favorite ni o'chirish funksiyasi
  const handleDeleteFavorite = async (favoriteId) => {
    if (!favoriteId) {
      toast.error("Bu tur paket topilmadi!");
      return;
    }

    try {
      const response = await api({
        endpoint: `user/favorite/${favoriteId}/`,
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Sevimlilar ro'yxatidan muvaffaqiyatli o'chirildi!");
        await fetchFavorites(); 
        // Shu yerda state update yoki UI update qilishingiz mumkin
        setActiveTab('favorites'); // favorites tabini yangilash uchun
      } else {
        toast.error(response.data?.message || "Favorite o'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko‘ring!");
    }
  };


  const [notifications, setNotifications] = useState([]);

  const markAsRead = async () => {
  // 🔹 1) read=false bo‘lgan ids
  const unreadIds = notifications
    .filter((n) => n.read === false)
    .map((n) => n.id);

  if (unreadIds.length === 0) return; // Hech narsa qilmaydi

  try {
    // 🔹 2) Backendga yuborish
    const res = await api({
      endpoint: "user/notification/",
      method: "PATCH",
      data: { ids: unreadIds },
    });

    if (res.ok) {
      // 🔹 3) Local state'ni yangilash
      setNotifications((prev) =>
        prev.map((n) =>
          unreadIds.includes(n.id) ? { ...n, read: true } : n
        )
      );
    }
  } catch (e) {
    toast.error("Xatolik yuz berdi, qayta urinib ko'ring");
  }
};

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
  const fetchUserData = async () => {
    // 1) USER PROFILE API
    const profileRes = await api({
      endpoint: "user/profile/",
      method: "GET"
    });

    // 2) USER AVATAR API
    const avatarRes = await api({
      endpoint: "user/avatar/",
      method: "GET"
    });

    if (profileRes.ok) {
      const p = profileRes.data;

      setUserData(prev => ({
        ...prev,
        firstName: p.profile.user.first_name,
        lastName: p.profile.user.last_name,
        fullName: `${p.profile.user.first_name} ${p.profile.user.last_name}`,
        email: p.profile.user.email,
        phone: p.profile.phone,
        birthDate: p.profile.birth_date,
        address: p.profile.address,
      }));
    }

    if (avatarRes.ok) {
      const avatarUrl = `${process.env.REACT_APP_API_URL}${avatarRes.data.avatar}`;
      setUserData(prev => ({
        ...prev,
        avatar: avatarUrl
      }));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  const fetchBookings = useCallback(async () => {
    const res = await api({ endpoint: "user/booking/", method: "GET" });

    if (res.ok) {
      const mapped = res.data.map(item => ({
        id: item.id,
        title: item.tour.title,
        tourId: item.tour.id,
        agency: item.tour.agency,
        date: item.tour.traveling_date,
        guests: item.guests,
        price: item.price,
        status: item.status.toLowerCase(),
        image: item.tour.images || "",
        bookingDate: item.booking_date,
        rating: normalize(item.rating),
      }));

      setBookingHistory(mapped);
    } else {
      console.log("API ERROR:", res.data);
    }
  }, [setBookingHistory]); // setBookingHistory ga bog'liq bo'lsa, uni qo'shish

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]); // fetchBookingsni dependency arrayga qo'shish


  const fetchFavorites = async () => {
    try {
      const res = await api({ endpoint: "user/favorite/", method: "GET" });

      if (res.ok) {
        // API array ichidagi "tour" obyektlarini state uchun map qilish
        const formatted = res.data.map((item) => ({
          id: item.id,
          packageId: item.tour.id,
          title: item.tour.title,
          location: item.tour.location,
          price: item.tour.price,
          rating: item.tour.rating,
          image: item.tour.image,
        }));

        setFavoritePackages(formatted);
      } else {
        toast.error(res.data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Server bilan bog'lanishda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api({ endpoint: "user/notification/", method: "GET" });

      if (res.ok) {
        // API response fieldlarini front-end formatiga map qilish
        const formatted = res.data.map((item) => ({
          id: item.id,
          type: item.notif_type,       // booking / promo / reminder / confirmation
          title: item.title,
          message: item.message,
          time: item.time_since,       // frontend da 'time' field ishlatiladi
          read: item.read,
        }));

        setNotifications(formatted);
      } else {
        toast.error(res.data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Server bilan bog'lanishda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <Link to="/home"  className="text-gray-700 hover:text-blue-600 transition"><span className="text-xl font-bold text-gray-900">TravelHub</span></Link>
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
                      Ism
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.firstName : userData.firstName}
                      onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {/* <User className="w-4 h-4 inline mr-2" /> */}
                      Familiya
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.lastName : userData.lastName}
                      onChange={(e) => setEditData({...editData, lastName: e.target.value})}
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
                            {/* <RatingStars rating={booking.rating} /> */}
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
                              <Link to={`/package/${booking.tourId}?date=${booking.date}&guests=${booking.guests}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                                Tafsilotlar
                              </Link>
                              <button onClick={() => handleDeleteBooking(booking.id)} className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition text-sm">
                                Bekor qilish
                              </button>
                            </>
                          )}
                          {/* {booking.status === 'completed' && !booking.rating && (
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
                              Sharh qoldirish
                            </button>
                          )} */}
                          {/* {booking.status === 'completed' && (
                            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm">
                              Qayta buyurtma qilish
                            </button>
                          )} */}
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
                          className="w-full h-full object-cover group-hover:scale-110 transition travelingDate-500"
                        />
                        <button onClick={() => handleDeleteFavorite(pkg.id)} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
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
                          <Link to={`/packages/`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                            Ko'rish
                          </Link>
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
                  <button onClick={markAsRead} className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
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
                            {notif.type === 'confirmation' && <Hourglass className="w-5 h-5 text-blue-500" />}
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
