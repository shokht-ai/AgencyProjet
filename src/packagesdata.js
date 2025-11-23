// tourPackageData.js
import api from "./api";

let cachedPackages = null; // xotirada saqlanadigan o'zgaruvchi

// Async funksiyani eksport qilamiz
export async function tourPackages() {
  // Agar xotirada bo‘lsa → API’ga qaytadan bormaydi
  if (cachedPackages !== null) {
    return cachedPackages;
  }

  try {
    const response = await api({
      endpoint: "packages/tours/",
      method: "GET",
    });

    if (!response.ok) {
      console.error("API error:", response);
      throw new Error("Could not load tour packages");
    }

    // ❌ hozirgi kodda 'datata' deb yozilgan — to‘g‘ri: 'data'
    cachedPackages = response.data;

    return cachedPackages;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export default tourPackages;
