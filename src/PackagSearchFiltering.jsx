import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  Share2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import tourPackageData from "./packagesdata.json";

export default function SearchFilterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [likedPackages, setLikedPackages] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPackages")) || [];
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    travelingDate: "",
    rating: 0,
    categories: [],
    agencies: [],
    facilities: [],
  });

  const sortPackages = (packages) => {
    let sorted = [...packages];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      case "travelingDate":
        sorted.sort((a, b) => {
          const daysA = parseInt(a.travelingDate);
          const daysB = parseInt(b.travelingDate);
          return daysA - daysB;
        });
        break;

      case "popular":
      default:
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return sorted;
  };

  // Query params dan boshlang'ich qiymat olish
  const getInitialSearchParams = () => {
    const params = new URLSearchParams(location.search);
    const destination = params.get("destination");
    const date = params.get("date");
    const guests = params.get("guests");

    // Agar params bo'lmasa, default qiymat qaytarsin
    return {
      destination: destination || "",
      date: date || "",
      guests: guests || "",
    };
  };

  // Filtrlash funksiyasi
  const filterPackages = () => {
    const result = tourPackages.filter((pkg) => {
      // Price filter
      const withinPrice =
        pkg.price >= filters.priceRange[0] &&
        pkg.price <= filters.priceRange[1];

      // travelingDate filter (agar travelingDate tanlangan bo'lsa)
      const matchesTravelingDate = filters.travelingDate
        ? (() => {
            if (filters.travelingDate.includes("+")) {
              const minDays = parseInt(filters.travelingDate);
              const pkgDays = parseInt(pkg.travelingDate);
              return pkgDays >= minDays;
            } else {
              const [minDays, maxDays] = filters.travelingDate
                .split("-")
                .map((d) => parseInt(d));
              const pkgDays = parseInt(pkg.travelingDate);
              return pkgDays >= minDays && pkgDays <= maxDays;
            }
          })()
        : true;

      // Rating filter
      const meetsRating = pkg.rating >= filters.rating;

      // Category filter
      const matchesCategory = filters.categories.length
        ? filters.categories.includes(pkg.category)
        : true;

      // Agency filter
      const matchesAgency = filters.agencies.length
        ? filters.agencies.includes(pkg.agency)
        : true;

      // Facilities filter
      const matchesFacilities = filters.facilities.length
        ? filters.facilities.every((fac) => pkg.facilities.includes(fac))
        : true;

      // SearchParams filter
      const matchesDestination = searchParams.destination
        ? pkg.location
            .toLowerCase()
            .includes(searchParams.destination.toLowerCase())
        : true;

      const matchesDate = searchParams.date
        ? (() => {
            const searchDate = new Date(searchParams.date);
            const pkgDate = new Date(pkg.travelingDate);

            // ±1 oy oralig'ini tekshirish
            const oneMonthBefore = new Date(searchDate);
            oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);

            const oneMonthAfter = new Date(searchDate);
            oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);

            return pkgDate >= oneMonthBefore && pkgDate <= oneMonthAfter;
          })()
        : true;

      // Hammasi to'g'ri bo'lsa paketni olamiz
      return (
        withinPrice &&
        matchesTravelingDate &&
        meetsRating &&
        matchesCategory &&
        matchesAgency &&
        matchesFacilities &&
        matchesDestination &&
        matchesDate
      );
    });

    setFilteredPackages(sortPackages(result));
  };

  useEffect(() => {
    filterPackages();
    localStorage.setItem("likedPackages", JSON.stringify(likedPackages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, likedPackages]);

  const [searchParams, setSearchParams] = useState(getInitialSearchParams());

  // Qo'lda yaratish uchun eski formatga moslashtirish
  const tourPackages = tourPackageData.map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    agency: pkg.agency,
    location: pkg.location,
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    travelingDate: pkg.travelingDate,
    rating: pkg.rating,
    reviews: pkg.reviews,
    image: pkg.images && pkg.images.length > 0 ? pkg.images[0] : "",
    category: pkg.category,
    facilities: pkg.facilities.map((f) => f.name), // faqat nomlar
    description: pkg.description,
    featured: pkg.featured,
    discount: pkg.discount,
  }));

  const categories = [
    "Plyaj",
    "Tarix",
    "Ekskursiya",
    "Avantüra",
    "Luxe",
    "Oilaviy",
  ];
  const facilities = [
    "Mehmonxona",
    "Transfer",
    "Ovqat",
    "Gid",
    "Sug'urta",
    "Viza",
  ];
  const agencies = [
    "Grand Tours",
    "Silk Road Travel",
    "Europe Express",
    "Asia Dreams",
    "Ocean Travels",
  ];

  const [filteredPackages, setFilteredPackages] = useState(tourPackages);

  const handleSearch = () => {
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/packages?${query}`);

    // Qidirish tugmasi bosilganda ro'yxatni yangilash
    filterPackages();
  };

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

  const handleOpenDetails = (pkg) => {
    navigate(
      `/package/${pkg.id}?date=${pkg.travelingDate}&guests=${searchParams.guests}`
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
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

  const toggleCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleAgency = (agency) => {
    setFilters((prev) => ({
      ...prev,
      agencies: prev.agencies.includes(agency)
        ? prev.agencies.filter((a) => a !== agency)
        : [...prev.agencies, agency],
    }));
  };

  const toggleFacility = (facility) => {
    setFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

/*   const toggleCompare = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : prev.length < 3
        ? [...prev, packageId]
        : prev
    );
  }; */

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000000],
      travelingDate: "",
      rating: 0,
      categories: [],
      agencies: [],
      facilities: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2"
            >
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ComeOn</span>
            </button>
            <button
              onClick={handleBack}
              to="/home"
              className="text-blue-600 hover:text-blue-700"
            >
              Orqaga
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchParams.destination}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    destination: e.target.value,
                  })
                }
                placeholder="Manzil"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, date: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                value={searchParams.guests}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, guests: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">1 kishi</option>
                <option value="2">2 kishi</option>
                <option value="3-5">3-5 kishi</option>
                <option value="6+">6+ kishi</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Qidirish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {searchParams.destination} uchun sayohat paketlari
            </h1>
            <p className="text-gray-600">
              {filteredPackages.length} ta natija topildi
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtrlar</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Mashhur</option>
              <option value="price-low">Arzon narx</option>
              <option value="price-high">Qimmat narx</option>
              <option value="rating">Reyting</option>
              <option value="travelingDate">Davomiyligi</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filtrlar</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Tozalash
                  </button>
                </div>

                <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Narx oralig'i
                    </h3>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          handleFilterChange("priceRange", [
                            0,
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>0 so'm</span>
                        <span>
                          {filters.priceRange[1].toLocaleString()} so'm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/*<div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Davomiyligi
                    </h3>
                    <div className="space-y-2">
                      {travelingDates.map((travelingDate) => (
                        <label
                          key={travelingDate}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="travelingDate"
                            checked={filters.travelingDate === travelingDate}
                            onChange={() =>
                              handleFilterChange("travelingDate", travelingDate)
                            }
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700">{travelingDate}</span>
                        </label>
                      ))}
                    </div>
                  </div>*/}

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Reyting
                    </h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() =>
                              handleFilterChange("rating", rating)
                            }
                            className="w-4 h-4 text-blue-600"
                          />
                          <div className="flex items-center">
                            {[...Array(rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-2 text-gray-700">
                              va yuqori
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Kategoriyalar
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Agentliklar
                    </h3>
                    <div className="space-y-2">
                      {agencies.map((agency) => (
                        <label
                          key={agency}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.agencies.includes(agency)}
                            onChange={() => toggleAgency(agency)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-gray-700">{agency}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Xizmatlar
                    </h3>
                    <div className="space-y-2">
                      {facilities.map((facility) => (
                        <label
                          key={facility}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.facilities.includes(facility)}
                            onChange={() => toggleFacility(facility)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-gray-700">{facility}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition travelingDate-500"
                      />
                      {pkg.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ TOP
                        </div>
                      )}
                      {pkg.discount && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          -{pkg.discount}%
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 flex space-x-2">
                        <button
                          onClick={() => toggleLike(pkg.id)}
                          className={`bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition`}
                        >
                          <Heart
                            className={`w-4 h-4 
                            ${
                              likedPackages.includes(pkg.id)
                                ? "fill-red-500 stroke-red-500"
                                : "fill-none stroke-gray-700"
                            }`}
                          />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-blue-600 mb-1">
                        {pkg.agency}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pkg.location}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        {pkg.travelingDate}
                      </div>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-semibold">{pkg.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({pkg.reviews} ta sharh)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {pkg.facilities.slice(0, 3).map((facility, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-end pt-3 border-t">
                        <div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              {pkg.originalPrice.toLocaleString()} so'm
                            </div>
                          )}
                          <div className="text-2xl font-bold text-gray-900">
                            {pkg.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            so'm / odam
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {/*<button
                            onClick={() => toggleCompare(pkg.id)}
                            className={`px-3 py-1 text-sm rounded transition ${
                              selectedPackages.includes(pkg.id)
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {selectedPackages.includes(pkg.id)
                              ? "Tanlandi"
                              : "Solishtirish"}
                          </button>*/}
                          <button
                            onClick={() => handleOpenDetails(pkg)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                          >
                            Batafsil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex"
                  >
                    <div className="relative w-64 flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      {pkg.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ TOP
                        </div>
                      )}
                      {pkg.discount && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          -{pkg.discount}%
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="text-sm text-blue-600 mb-1">
                            {pkg.agency}
                          </div>
                          <h3 className="font-bold text-xl text-gray-900 mb-2">
                            {pkg.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600 text-sm mb-2">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {pkg.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {pkg.travelingDate}
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-semibold">
                              {pkg.rating}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({pkg.reviews} ta sharh)
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full transition">
                            <Heart
                              className={`w-4 h-4 
                            ${
                              likedPackages.includes(pkg.id)
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
                      <p className="text-gray-600 text-sm mb-4">
                        {pkg.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t">
                        <div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              {pkg.originalPrice.toLocaleString()} som
                            </div>
                          )}
                          <div className="text-3xl font-bold text-gray-900">
                            {pkg.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            som / odam
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {/*<button
                            onClick={() => toggleCompare(pkg.id)}
                            className={`px-4 py-2 rounded-lg transition ${
                              selectedPackages.includes(pkg.id)
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {selectedPackages.includes(pkg.id)
                              ? "Tanlandi"
                              : "Solishtirish"}
                          </button>*/}
                          <button
                            onClick={() => handleOpenDetails(pkg)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Batafsil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedPackages.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-900">
                    Solishtirish uchun tanlandi: {selectedPackages.length}/3
                  </span>
                  <button
                    onClick={() => setSelectedPackages([])}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Hammasini olib tashlash
                  </button>
                </div>
                <button
                  disabled={selectedPackages.length < 2}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Paketlarni solishtirish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
