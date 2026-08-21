/**
 * دوال تحويل العملات
 * يُدخل التاجر الأسعار بالدولار، ويُعرض للعميل بالليرة السورية
 */

import { fetchAppSettings } from '@/lib/settings';

let cachedExchangeRate: number | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

/**
 * الحصول على سعر الصرف الحالي (مع التخزين المؤقت)
 */
export async function getExchangeRate(): Promise<number> {
  const now = Date.now();
  
  // إذا كان لدينا قيمة مخزنة ولم تنتهِ مدة الصلاحية
  if (cachedExchangeRate !== null && now - cacheTimestamp < CACHE_DURATION) {
    return cachedExchangeRate;
  }

  try {
    const settings = await fetchAppSettings();
    cachedExchangeRate = settings.usd_to_syp_exchange_rate;
    cacheTimestamp = now;
    return cachedExchangeRate;
  } catch (error) {
    console.warn('[currency] Failed to fetch exchange rate, using default', error);
    // العودة إلى القيمة المخزنة إن وجدت أو القيمة الافتراضية
    return cachedExchangeRate ?? 130;
  }
}

/**
 * تحويل السعر من دولار إلى ليرة سورية
 * @param usdPrice - السعر بالدولار
 * @returns السعر بالليرة السورية
 */
export async function convertToSyp(usdPrice: number): Promise<number> {
  const rate = await getExchangeRate();
  return Math.round(usdPrice * rate * 100) / 100; // تقريب لـ 2 منزلة عشرية
}

/**
 * تحويل السعر من دولار إلى ليرة سورية بشكل متزامن (للاستخدام مع معدل معروف)
 * @param usdPrice - السعر بالدولار
 * @param exchangeRate - سعر الصرف
 * @returns السعر بالليرة السورية
 */
export function convertToSypSync(usdPrice: number, exchangeRate: number = 130): number {
  return Math.round(usdPrice * exchangeRate * 100) / 100;
}

/**
 * تحويل مبلغ من الليرة السورية إلى الدولار بشكل متزامن (للاستخدام مع معدل معروف)
 * @param sypAmount - المبلغ بالليرة السورية
 * @param exchangeRate - سعر الصرف (دولار -> ليرة)
 * @returns المبلغ بالدولار
 */
export function convertSypToUsdSync(sypAmount: number, exchangeRate: number = 130): number {
  if (!exchangeRate) return 0;
  return Math.round((sypAmount / exchangeRate) * 100) / 100;
}

/**
 * تنسيق العملة بالليرة السورية
 */
export function formatSyp(amount: number): string {
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ل.س`;
}

/**
 * تنسيق العملة بالدولار
 */
export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * مسح التخزين المؤقت (يُستخدم عند تحديث الإعدادات)
 */
export function clearExchangeRateCache(): void {
  cachedExchangeRate = null;
  cacheTimestamp = 0;
}
