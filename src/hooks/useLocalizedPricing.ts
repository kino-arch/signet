import { useState, useEffect } from "react"

interface LocalizedPricing {
  currency: string
  symbol: string
  rate: number
  loading: boolean
  isEstimate: boolean
}

const DEFAULT_CURRENCY = "USD"
const DEFAULT_SYMBOL = "$"

// ── Timezone → Currency mapping (works offline, no network needed) ──────────
const timezoneToCurrency: Record<string, string> = {
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",
  "Asia/Colombo": "LKR",
  "Asia/Dhaka": "BDT",
  "Asia/Karachi": "PKR",
  "Asia/Kathmandu": "NPR",
  "Europe/London": "GBP",
  "Europe/Paris": "EUR",
  "Europe/Berlin": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Amsterdam": "EUR",
  "Europe/Brussels": "EUR",
  "Europe/Vienna": "EUR",
  "Europe/Lisbon": "EUR",
  "Europe/Dublin": "EUR",
  "Europe/Helsinki": "EUR",
  "Europe/Warsaw": "PLN",
  "Europe/Stockholm": "SEK",
  "Europe/Oslo": "NOK",
  "Europe/Copenhagen": "DKK",
  "Europe/Zurich": "CHF",
  "Europe/Prague": "CZK",
  "Europe/Budapest": "HUF",
  "Europe/Bucharest": "RON",
  "Europe/Istanbul": "TRY",
  "Europe/Moscow": "RUB",
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "America/Edmonton": "CAD",
  "America/Winnipeg": "CAD",
  "America/Halifax": "CAD",
  "Australia/Sydney": "AUD",
  "Australia/Melbourne": "AUD",
  "Australia/Perth": "AUD",
  "Australia/Brisbane": "AUD",
  "Pacific/Auckland": "NZD",
  "Asia/Tokyo": "JPY",
  "Asia/Seoul": "KRW",
  "Asia/Shanghai": "CNY",
  "Asia/Hong_Kong": "HKD",
  "Asia/Singapore": "SGD",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Bangkok": "THB",
  "Asia/Jakarta": "IDR",
  "Asia/Manila": "PHP",
  "Asia/Ho_Chi_Minh": "VND",
  "Asia/Taipei": "TWD",
  "Asia/Dubai": "AED",
  "Asia/Riyadh": "SAR",
  "Asia/Qatar": "QAR",
  "Asia/Kuwait": "KWD",
  "Africa/Johannesburg": "ZAR",
  "Africa/Lagos": "NGN",
  "Africa/Nairobi": "KES",
  "Africa/Cairo": "EGP",
  "America/Sao_Paulo": "BRL",
  "America/Argentina/Buenos_Aires": "ARS",
  "America/Mexico_City": "MXN",
  "America/Bogota": "COP",
  "America/Santiago": "CLP",
  "America/Lima": "PEN",
}

// ── Hardcoded approximate rates (updated periodically, used as fallback) ────
// These are approximate USD→X rates. They don't need to be perfect because
// the disclaimer tells users "exact pricing is calculated at checkout".
const fallbackRates: Record<string, number> = {
  USD: 1,
  INR: 95,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.38,
  AUD: 1.55,
  JPY: 157,
  KRW: 1380,
  CNY: 7.25,
  HKD: 7.82,
  SGD: 1.35,
  MYR: 4.72,
  THB: 35,
  IDR: 16200,
  PHP: 58,
  VND: 25400,
  TWD: 32.5,
  BRL: 5.65,
  MXN: 17.2,
  ARS: 900,
  COP: 4300,
  CLP: 980,
  PEN: 3.75,
  ZAR: 18.5,
  NGN: 1600,
  KES: 155,
  EGP: 48,
  TRY: 34,
  PLN: 4.05,
  SEK: 10.8,
  NOK: 10.9,
  DKK: 6.9,
  CHF: 0.88,
  CZK: 23.5,
  HUF: 375,
  RON: 4.7,
  RUB: 92,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  NZD: 1.68,
  LKR: 300,
  BDT: 120,
  PKR: 280,
  NPR: 136,
}

const getSymbolForCurrency = (currency: string): string => {
  try {
    return (0)
      .toLocaleString("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim()
  } catch {
    return "$"
  }
}

/**
 * Detects the user's local currency from their browser timezone (no network
 * call needed), then optionally fetches live exchange rates. If the rate API
 * is blocked (ad-blockers, Enhanced Tracking Protection, VPN, etc.) it falls
 * back to hardcoded approximate rates so the user always sees prices in their
 * local currency.
 */
export function useLocalizedPricing(): LocalizedPricing {
  const [data, setData] = useState<LocalizedPricing>({
    currency: DEFAULT_CURRENCY,
    symbol: DEFAULT_SYMBOL,
    rate: 1,
    loading: true,
    isEstimate: true,
  })

  useEffect(() => {
    let isMounted = true

    async function resolve() {
      // ── Step 1: Detect currency from timezone (always works, zero network) ─
      let userCurrency = DEFAULT_CURRENCY
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (tz && timezoneToCurrency[tz]) {
          userCurrency = timezoneToCurrency[tz]
        }
      } catch {
        // Intl not supported — stay USD
      }

      // ── Step 2: Optionally try IP API to override (may be blocked) ─────────
      try {
        const res = await fetch("https://ipapi.co/currency/", {
          signal: AbortSignal.timeout(3000),
        })
        if (res.ok) {
          const text = (await res.text()).trim()
          if (text && text.length === 3) {
            userCurrency = text
          }
        }
      } catch {
        // Blocked or timed out — no problem, timezone detection is sufficient
      }

      // ── Step 3: Get exchange rate (live → fallback) ────────────────────────
      let rate = fallbackRates[userCurrency] ?? 1
      let isEstimate = true

      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`,
          { signal: AbortSignal.timeout(4000) }
        )
        if (res.ok) {
          const json = await res.json()
          if (json.rates?.[userCurrency]) {
            rate = json.rates[userCurrency]
            isEstimate = false
          }
        }
      } catch {
        // Blocked or timed out — use hardcoded fallback rate
      }

      if (isMounted) {
        setData({
          currency: userCurrency,
          symbol: getSymbolForCurrency(userCurrency),
          rate,
          loading: false,
          isEstimate,
        })
      }
    }

    resolve()
    return () => {
      isMounted = false
    }
  }, [])

  return data
}

export function formatPrice(
  basePriceUsd: number,
  localization: LocalizedPricing
): string {
  if (localization.loading) {
    return "…"
  }

  if (localization.currency === "USD") {
    return `$${basePriceUsd.toFixed(2)}`
  }

  const converted = basePriceUsd * localization.rate

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: localization.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted)
  } catch {
    // Unknown currency code — fall back to USD
    return `$${basePriceUsd.toFixed(2)}`
  }
}
