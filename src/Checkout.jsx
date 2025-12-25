import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  CreditCard,
  Lock,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
  AlertCircle,
  User,
  Mail,
  Phone,
  Home,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "./api";

import tourPackageData from "./packagesdata.json";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isSelf, setIsSelf] = useState(false);

  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);

  const initialGuests = Number(query.get("guests"));

  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
  });

  const [travelersInfo, setTravelersInfo] = useState(
    Array.from({ length: initialGuests }, (_, index) => ({
      id: index + 1,
      fullName: "",
      passportNumber: "",
      birthDate: "",
      nationality: "Uzbekistan",
    }))
  );

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const rawPackage = tourPackageData.find((pkg) => pkg.id === parseInt(id));

  const packageData = {
    title: rawPackage.title,
    agency: rawPackage.agency,
    location: rawPackage.location,
    discount: rawPackage.discount,
    image: rawPackage.images?.[0] ?? "",

    travelingDate:
      new Date(rawPackage.travelingDate).toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) ?? "Muddat ko'rsatilmagan",

    guests: Number(initialGuests),

    price: rawPackage.price,

    facilities: rawPackage.facilities.map((f) => f.name) ?? [
      "Mehmonxona",
      "Transfer",
      "Ovqat",
      "Gid",
      "Sug'urta",
      "Viza",
    ],
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SUMMER2024") {
      setDiscount(packageData.discount);
      toast.success(
        `Promo kod qo'llandi! ${packageData.discount}% chegirma oldiz.`
      );
    } else if (promoCode.toUpperCase() === "FIRST50") {
      setDiscount(50);
      toast.success("Promo kod qo'llandi! 50% chegirma oldingiz.");
    } else {
      toast.warn("Noto'g'ri promo kod!");
    }
  };

  const totalPrice = packageData.price * packageData.guests;
  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount;
  const serviceFee = 0;

  function validateBookingInfo(bookingInfo) {
    const { fullName, email, phone } = bookingInfo;

    if (isSelf) {
      return true; // O'zim bo'lsa, tekshirish shart emas
    }

    // 1. Full Name tekshirish (bo‘sh bo‘lmasligi)
    if (!fullName || fullName.trim().length === 0) {
      return false;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return false;
    }

    // 3. Phone format validation (faqat raqamlar, +, -, bo‘sh joylar)
    const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return false;
    }

    // Agar hammasi to‘g‘ri bo‘lsa
    return true;
  }

  function validateTravelers(travelersInfo) {
    if (isSelf) {
      return true; // O'zim bo'lsa, tekshirish shart emas
    }
    const passportRules = {
      Uzbekistan: /^[A-Z]{2}[0-9]{7}$/, // EX1234567
      Kazakhstan: /^[A-Z]{2}[0-9]{6,7}$/,
      Kyrgyzstan: /^[A-Z]{2}[0-9]{6,7}$/,
      Tajikistan: /^[A-Z]{2}[0-9]{7}$/,
      Other: /^[A-Z0-9]{6,10}$/,
    };

    return travelersInfo.every((t) => {
      // 1. Full Name tekshirish
      if (!t.fullName || t.fullName.trim() === "") return false;

      // 2. Birth Date tekshirish (YYYY-MM-DD)
      if (!t.birthDate || isNaN(Date.parse(t.birthDate))) return false;

      // 3. Passport format nationality bo‘yicha
      const rule = passportRules[t.nationality] || passportRules.Other;
      if (!t.passportNumber || !rule.test(t.passportNumber)) return false;

      return true;
    });
  }

  function validatePayment(paymentInfo) {
    if (isSelf) {
      return true; // O'zim bo'lsa, tekshirish shart emas
    }
    const { cardNumber, cardHolder, expiryDate, cvv } = paymentInfo;

    // 1. Card Number: faqat raqamlar, 13-19 raqam
    const cardNumberRegex = /^\d{13,19}$/;
    if (!cardNumber || !cardNumberRegex.test(cardNumber)) return false;

    // 2. Card Holder: bo‘sh bo‘lmasligi
    if (!cardHolder || cardHolder.trim() === "") return false;

    // 3. Expiry Date: YYYY-MM yoki MM/YY format
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/;
    if (!expiryDate || !expiryRegex.test(expiryDate)) return false;

    // 4. CVV: 3 yoki 4 raqam
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvv || !cvvRegex.test(cvv)) return false;

    return true; // hammasi to‘g‘ri
  }

  const handleSubmitBooking = async () => {
    if (currentStep === 1) {
      if (!validateBookingInfo(bookingInfo)) {
        toast.warn("Iltimos, majburiy maydonlarni to'ldiring!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateTravelers(travelersInfo)) {
        toast.warn("Iltimos, barcha sayohatchilar ma'lumotlarini to'ldiring!");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (paymentMethod === "card") {
        if (!validatePayment(paymentInfo)) {
          toast.warn("Iltimos, barcha karta ma'lumotlarini to'ldiring!");
          return;
        }
      }
      // 🔥 YUBORISH UCHUN PAYLOAD TAYYORLASH
      const payload = {
        tour: Number(id),
        status: 2,
        is_self: isSelf,
        guests: packageData.guests,
        price: finalPrice,

        // 🔹 BUYURTMACHI MA'LUMOTI
        purchase_customer_information: isSelf
          ? []
          : [
              {
                full_name: bookingInfo.fullName,
                email: bookingInfo.email,
                phone: bookingInfo.phone,
                location: bookingInfo.address,
                special_requests: bookingInfo.specialRequests,
              },
            ],

        // 🔹 SAYOHATCHILAR
        purchase_travelers_information: travelersInfo.map((traveler) => ({
          country: traveler.nationality === "Uzbekistan" ? 1 : 0, // backend ID bo‘lsa moslang
          passport_full_name: traveler.fullName,
          passport_number: traveler.passportNumber,
          birth_date: traveler.birthDate,
        })),

        // 🔹 TO‘LOV
        purchase_payment:
          paymentMethod === "card"
            ? [
                {
                  card_number: paymentInfo.cardNumber,
                  card_owner: paymentInfo.cardHolder,
                  card_validity_period: paymentInfo.expiryDate,
                  card_cvv: paymentInfo.cvv,
                },
              ]
            : [],
      };
      console.log(payload);

      // 🔥 API GA YUBORISH
      const response = await api({
        endpoint: "purchase-travelers/",
        method: "POST",
        data: payload,
        is_auth_required: true,
      });

      if (response.ok) {
        toast.success(
          "To'lov muvaffaqiyatli amalga oshirildi! Tez orada sizga tasdiqlash emaili yuboriladi."
        );
        console.log(response.data);

        // navigate("/success");
      } else {
        toast.error(response.data?.message || "Xatolik yuz berdi!");
        console.log(response.data);
      }

      // Here would be actual payment processing
    }
  };

  const steps = [
    { number: 1, title: "Buyurtmachi ma'lumotlari", icon: User },
    { number: 2, title: "Sayohatchilar", icon: Users },
    { number: 3, title: "To'lov", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center space-x-2"
            >
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TravelHub</span>
            </button>
            <div className="flex items-center space-x-2 text-green-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold">Xavfsiz to'lov</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${
                        currentStep >= step.number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium text-center ${
                        currentStep >= step.number
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 mb-8 transition ${
                        currentStep > step.number
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

       {/* <div className="flex gap-3">

          <button
            onClick={() => setIsSelf(true)}
            className={`px-4 py-2 rounded-lg border transition
          ${isSelf ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
        `}
          >
            O'zim
          </button>


          <button
            onClick={() => setIsSelf(false)}
            className={`px-4 py-2 rounded-lg border transition
          ${!isSelf ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
        `}
          >
            Boshqa
          </button>
        </div>*/}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Booking Info */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Buyurtmachi Ma'lumotlari
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ism Familiya *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={bookingInfo.fullName}
                        onChange={(e) =>
                          setBookingInfo({
                            ...bookingInfo,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="To'liq ismingizni kiriting"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email manzil *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={bookingInfo.email}
                        onChange={(e) =>
                          setBookingInfo({
                            ...bookingInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="email@example.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon raqam *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={bookingInfo.phone}
                        onChange={(e) =>
                          setBookingInfo({
                            ...bookingInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+998 90 123 45 67"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manzil
                    </label>
                    <div className="relative">
                      <Home className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={bookingInfo.address}
                        onChange={(e) =>
                          setBookingInfo({
                            ...bookingInfo,
                            address: e.target.value,
                          })
                        }
                        placeholder="Manzilingizni kiriting"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maxsus so'rovlar (ixtiyoriy)
                    </label>
                    <textarea
                      value={bookingInfo.specialRequests}
                      onChange={(e) =>
                        setBookingInfo({
                          ...bookingInfo,
                          specialRequests: e.target.value,
                        })
                      }
                      placeholder="Maxsus talablar yoki izohlaringizni yozing..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Travelers Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Sayohatchilar Ma'lumotlari
                </h2>
                {travelersInfo.map((traveler, index) => (
                  <div
                    key={traveler.id}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Sayohatchi {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          To'liq ism *
                        </label>
                        <input
                          type="text"
                          value={traveler.fullName}
                          onChange={(e) => {
                            const updated = [...travelersInfo];
                            updated[index].fullName = e.target.value;
                            setTravelersInfo(updated);
                          }}
                          placeholder="Pasportdagi ism"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pasport raqami *
                        </label>
                        <input
                          type="text"
                          value={traveler.passportNumber}
                          onChange={(e) => {
                            const updated = [...travelersInfo];
                            updated[index].passportNumber = e.target.value;
                            setTravelersInfo(updated);
                          }}
                          placeholder="AA1234567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tug'ilgan sana *
                        </label>
                        <input
                          type="date"
                          value={traveler.birthDate}
                          onChange={(e) => {
                            const updated = [...travelersInfo];
                            updated[index].birthDate = e.target.value;
                            setTravelersInfo(updated);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fuqarolik *
                        </label>
                        <select
                          value={traveler.nationality}
                          onChange={(e) => {
                            const updated = [...travelersInfo];
                            updated[index].nationality = e.target.value;
                            setTravelersInfo(updated);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Uzbekistan">O'zbekiston</option>
                          <option value="Kazakhstan">Qozog'iston</option>
                          <option value="Kyrgyzstan">Qirg'iziston</option>
                          <option value="Tajikistan">Tojikiston</option>
                          <option value="Other">Boshqa</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    Iltimos, barcha ma'lumotlarni pasportingizdagi ma'lumotlar
                    bilan bir xil kiriting. Noto'g'ri ma'lumotlar viza olishda
                    muammoga olib kelishi mumkin.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  To'lov Ma'lumotlari
                </h2>

                {/* Payment Method Selection */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    To'lov usulini tanlang
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="ml-4 flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Bank kartasi
                          </div>
                          <div className="text-sm text-gray-600">
                            Visa, Mastercard, Humo, Uzcard
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="payme"
                        checked={paymentMethod === "payme"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="ml-4 flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Payme
                          </div>
                          <div className="text-sm text-gray-600">
                            Tezkor to'lov
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="click"
                        checked={paymentMethod === "click"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="ml-4 flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          C
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Click
                          </div>
                          <div className="text-sm text-gray-600">
                            Tezkor to'lov
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Karta ma'lumotlari
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Karta raqami *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: e.target.value,
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Karta egasi *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardHolder}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardHolder: e.target.value,
                            })
                          }
                          placeholder="JOHN DOE"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amal qilish muddati *
                          </label>
                          <input
                            type="text"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiryDate: e.target.value,
                              })
                            }
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value,
                              })
                            }
                            placeholder="123"
                            maxLength="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-green-50 rounded-xl p-4 flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Xavfsiz to'lov
                    </h4>
                    <p className="text-sm text-green-800">
                      Barcha to'lovlar SSL shifrlash orqali himoyalangan.
                      Sizning karta ma'lumotlaringiz bizning serverlarimizda
                      saqlanmaydi.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Orqaga
                </button>
              )}
              <button
                onClick={handleSubmitBooking}
                className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition font-semibold flex items-center space-x-2"
              >
                <span>
                  {currentStep === 3
                    ? "To'lovni amalga oshirish"
                    : "Davom etish"}
                </span>
                {currentStep < 3 && <ChevronRight className="w-5 h-5" />}
                {currentStep === 3 && <Lock className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Buyurtma xulasasi
              </h3>

              {/* Package Info */}
              <div className="mb-6">
                <img
                  src={packageData.image}
                  alt={packageData.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-900 mb-1">
                  {packageData.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {packageData.agency}
                </p>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {packageData.location}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sayohat sanasi</span>
                  <span className="font-medium text-gray-900">
                    {packageData.travelingDate}
                  </span>
                </div>
                {/*                 <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Davomiyligi</span>
                  <span className="font-medium text-gray-900">
                    {packageData.travelingDate}
                  </span>
                </div> */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mehmonlar</span>
                  <span className="font-medium text-gray-900">
                    {packageData.guests} kishi
                  </span>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Kiritilgan xizmatlar
                </h4>
                <div className="space-y-2">
                  {packageData.facilities.map((facility, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo kod
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Kodni kiriting"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Qo'llash
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Narx ({packageData.guests} kishi)
                  </span>
                  <span className="font-medium text-gray-900">
                    {totalPrice.toLocaleString()} so'm
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Chegirma ({discount}%)</span>
                    <span>-{discountAmount.toLocaleString()} so'm</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Xizmat to'lovi</span>
                  <span className="font-medium text-gray-900">
                    {serviceFee.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">
                  Jami to'lov
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {finalPrice.toLocaleString()} so'm
                </span>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                  Xavfsiz to'lov kafolati
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-5 h-5 text-blue-500 mr-2" />
                  Eng yaxshi narx kafolati
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Bepul bekor qilish (7 kun oldin)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
