import { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Facebook,
  Chrome,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthPage() {
  
  const API_URL = process.env.REACT_APP_API_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [autoLogin, setAutoLogin] = useState(false);


  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    remember_me: false,
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  useEffect(() => {
    if (autoLogin) {
      handleLogin({ preventDefault: () => {} });
      setAutoLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLogin]);

  // ------------------- LOGIN -------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const data = await res.json(); // await kerak!
      // success
      localStorage.setItem("access_token", data.access);

      toast.success("Muvaffaqiyatli kirildi!");
      navigate("/home");
      return;
    }

    // ERROR STATUSES
    if (res.status === 400) {
      toast.error(res.data?.message || "Yaroqsiz ma'lumot!");
    } else if (res.status === 401) {
      toast.error("Email yoki parol noto'g'ri!");
    } else {
      toast.error("Server xatosi!");
    }

  };
  
  // ------------------- REGISTER -------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.warn("Parollar mos kelmaydi!");
      return;
    }
    if (!registerData.agreeTerms) {
      toast.warn("Iltimos, shartlar bilan tanishing va rozilik belgilang!");
      return;
    }

    const { confirmPassword, agreeTerms, phone, ...dataToSend } = registerData;

    try {
      // Register

      const t = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (t.ok) {
        toast.success("Ro'yxatdan o'tish muvaffaqiyatli!");

        // Auto login
        setLoginData(
          {
            username: registerData.username,
            password: registerData.password,
            remember_me: false,
          }
        );
        setAutoLogin(true);
        return;
      } else {
        toast.error(
          "Ro'yxatdan o'tishda xatolik! API " + t.response?.data?.message || ""
        );
        return;
      }
    } catch (err) {
      toast.error(
        "Ro'yxatdan o'tishda xatolik! " + err.response?.data?.message || ""
      );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <div className="flex items-center space-x-2 mb-8">
                <MapPin className="w-10 h-10" />
                <span className="text-3xl font-bold">TravelHub</span>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Orzuingizdagi sayohatni boshlang
              </h2>

              <p className="text-blue-100 text-lg mb-8">
                150+ agentlik, 500+ sayohat paketi. Eng yaxshi narxlar va xizmat
                sifati bir joyda.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ishonchli Xavfsizlik</h4>
                    <p className="text-blue-100 text-sm">
                      Barcha to'lovlar himoyalangan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Eng Yaxshi Narxlar</h4>
                    <p className="text-blue-100 text-sm">
                      Narxlarni solishtiring va tejaing
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      24/7 Qo'llab-quvvatlash
                    </h4>
                    <p className="text-blue-100 text-sm">
                      Har doim yordam berishga tayyormiz
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-blue-100 text-sm">Paketlar</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">150+</div>
                    <div className="text-blue-100 text-sm">Agentliklar</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">10k+</div>
                    <div className="text-blue-100 text-sm">Mijozlar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelHub
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  isLogin
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Kirish
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  !isLogin
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            {isLogin ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Xush kelibsiz!
                  </h2>
                  <p className="text-gray-600">
                    Hisobingizga kiring va sayohatni boshlang
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taxallus
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                      }
                      placeholder="Asadbek"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginData.remember}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          remember: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Meni eslab qol
                    </span>
                  </label>
                  {/*<button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Parolni unutdingizmi?
                  </button>*/}
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Kirish
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Yoki davom eting
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
                  >
                    <Chrome className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-700">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Hisob yarating
                  </h2>
                  <p className="text-gray-600">
                    Bir daqiqada ro'yxatdan o'ting
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taxallus
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                      placeholder="Taxallusingiz"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email manzil
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      placeholder="email@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon raqam
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+998 90 123 45 67"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Kamida 6 ta belgi
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parolni tasdiqlang
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registerData.agreeTerms}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        agreeTerms: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Men{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                    >
                      Foydalanish shartlari
                    </button>{" "}
                    va{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                    >
                      Maxfiylik siyosati
                    </button>{" "}
                    bilan tanishdim va roziman
                  </span>
                </label>

                <button
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Ro'yxatdan o'tish
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Yoki davom eting
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
                  >
                    <Chrome className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-700">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Hisobingiz yo'qmi? "
                  : "Allaqachon hisobingiz bormi? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {isLogin ? "Ro'yxatdan o'ting" : "Kirish"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
