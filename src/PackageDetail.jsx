import React, { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Clock,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Headphones,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import packageDatas from "./packagesdata.json";
import { toast } from "react-toastify";

export default function PackageDetailPage() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);

  const selectedDate = query.get("date");

  const initialGuests = query.get("guests") ? parseInt(query.get("guests")) : 1;

  const [guests, setGuests] = useState(initialGuests);

  const packageData = packageDatas.find((pkg) => pkg.id === parseInt(id));

  const [likedPackages, setLikedPackages] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPackages")) || [];
  });

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    localStorage.setItem("likedPackages", JSON.stringify(likedPackages));
  }, [likedPackages]);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paket topilmadi
          </h1>
          <p className="text-gray-600">So'ralgan sayohat paketi mavjud emas.</p>
        </div>
      </div>
    );
  }

  const reviews = [
    {
      id: 1,
      name: "Kamola Rahimova",
      rating: 5,
      date: "2024-09-15",
      avatar:
        "https://ui-avatars.com/api/?name=Kamola+Rahimova&background=4F46E5&color=fff",
      comment:
        "Ajoyib sayohat! Hammasi juda yaxshi tashkil qilingan. Gid juda professional va do'stona edi. Dubai haqiqatan ham go'zal shahar. Albatta yana qaytaman!",
      helpful: 24,
    },
    {
      id: 2,
      name: "Sardor Karimov",
      rating: 5,
      date: "2024-09-10",
      avatar:
        "https://ui-avatars.com/api/?name=Sardor+Karimov&background=10B981&color=fff",
      comment:
        "Oilam bilan bordik, hamma narsa zo'r o'tdi. Mehmonxona juda hashamatli, xizmat ko'rsatish eng yuqori darajada. Safari unutilmas tajriba bo'ldi!",
      helpful: 18,
    },
    {
      id: 3,
      name: "Dilnoza Aliyeva",
      rating: 4,
      date: "2024-09-05",
      avatar:
        "https://ui-avatars.com/api/?name=Dilnoza+Aliyeva&background=F59E0B&color=fff",
      comment:
        "Juda yaxshi uyushtirilgan sayohat. Yagona kamchilik - ba'zi joylar juda gavjum edi. Lekin umuman olganda, juda yoqdi!",
      helpful: 12,
    },
  ];

  // Funktsiya massivni aralashtiradi
  function shuffleArray(array) {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }
  // Tasodifiy 3 ta paket olish
  const similarPackages = shuffleArray(
    packageDatas.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,

      location: pkg.location,
      price: pkg.price,

      travelingDate: pkg.travelingDate,
      rating: pkg.rating,

      image:
        pkg.images && pkg.images.length > 0
          ? pkg.images[0]
          : "/placeholder.jpg",
    }))
  ).slice(0, 3);


  const handleBack = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    if (history.length >= 2) {
      // Hozirgi sahifani olib tashlaymiz
      history.pop();

      // Oldingi sahifa
      const previousPage = history.pop();

      localStorage.setItem("history", JSON.stringify(history));

      navigate(previousPage);
    } else {
      navigate("/"); // fallback
    }
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handeBooking = (id) => {
    navigate(`/checkout/${id}?guests=${guests}`);
    console.log("OK");
    
  };

  const handleOpenDetails = (pkg) => {
    navigate(`/package/${pkg.id}?date=${pkg.travelingDate}&guests=1`);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % packageData.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + packageData.images.length) % packageData.images.length
    );
  };

  const toggleLike = (id) => {
    let updated;

    if (likedPackages.includes(id)) {
      updated = likedPackages.filter((x) => x !== id);
    } else {
      updated = [...likedPackages, id];
    }

    setLikedPackages(updated);
    localStorage.setItem("likedPackages", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Orqaga</span>
              </button>
              <button
                onClick={handleHomeClick}
                className="flex items-center space-x-2"
              >
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  ComeOn
                </span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleLike(packageData.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Heart
                  className={`w-4 h-4 
                            ${
                              likedPackages.includes(packageData.id)
                                ? "fill-red-500 stroke-red-500"
                                : "fill-none stroke-gray-700"
                            }`}
                />
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
                        idx === selectedImage ? "bg-white w-8" : "bg-white/50"
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
                      idx === selectedImage ? "ring-2 ring-blue-600" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-blue-600 mb-1">
                    {packageData.agency}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {packageData.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {packageData.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {packageData.travelingDate}
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
                  <span className="ml-1 text-lg font-semibold">
                    {packageData.rating}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({packageData.reviews} ta sharh)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {packageData.facilities.slice(0, 4).map((facility, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {facility.icon} {facility.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex space-x-8">
                  {["overview", "itinerary", "included", "reviews"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                        }}
                        className={`pb-4 font-semibold transition ${
                          activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab === "overview" && "Umumiy"}
                        {tab === "itinerary" && "Marshirut"}
                        {tab === "included" && "Kiritilgan"}
                        {tab === "reviews" && "Sharhlar"}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Tavsif
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {packageData.description}
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Asosiy Jihatlar
                  </h3>
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

              {activeTab === "itinerary" && (
                <div className="space-y-6">
                  {packageData.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="border-l-4 border-blue-600 pl-6"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {day.title}
                        </h4>
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

              {activeTab === "included" && (
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

              {activeTab === "reviews" && (
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
                              <h4 className="font-semibold text-gray-900">
                                {review.name}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
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
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Nima uchun bizni tanlash kerak?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Xavfsiz To'lov
                  </h4>
                  <p className="text-sm text-gray-600">
                    100% himoyalangan to'lov tizimi
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Eng Yaxshi Narx
                  </h4>
                  <p className="text-sm text-gray-600">
                    Narx farqi topilsa, qaytaramiz
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Headphones className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    24/7 Qo'llab-quvvatlash
                  </h4>
                  <p className="text-sm text-gray-600">
                    Har doim sizga yordam beramiz
                  </p>
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
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    so'm
                  </span>
                </div>
                <div className="text-sm text-gray-500">odam uchun</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sayohat sanasi
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100">
                    {formattedDate || "Tanlanmagan"}
                  </div>
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
                      onClick={() => setGuests(Math.min(15, guests + 1))}
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
                  <span className="font-semibold">
                    {(packageData.price * guests).toLocaleString()} so'm
                  </span>
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
                Buyurtma qoldirish
              </button>

              <button
                onClick={() => handeBooking(packageData.id)}
                className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Sotib olish
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            O'xshash sayohatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.travelingDate}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {pkg.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">so'm / odam</div>
                    </div>
                    <button
                      onClick={() => handleOpenDetails(pkg)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                    >
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
              <h3 className="text-2xl font-bold text-gray-900">
                Buyurtma qoldirish
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ism Familiya
                </label>
                <input
                  type="text"
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qo'shimcha izoh
                </label>
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
                <span className="font-semibold">
                  {selectedDate || "Tanlanmagan"}
                </span>
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
                toast.success(
                  "Buyurtma qabul qilindi! Tez orada siz bilan bog'lanamiz."
                );
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
