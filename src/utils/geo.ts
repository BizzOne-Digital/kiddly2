const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  edmonton: { lat: 53.546, lng: -113.494 },
  calgary: { lat: 51.045, lng: -114.072 },
  vancouver: { lat: 49.283, lng: -123.121 },
  toronto: { lat: 43.653, lng: -79.383 },
  mississauga: { lat: 43.589, lng: -79.644 },
  ottawa: { lat: 45.421, lng: -75.697 },
  victoria: { lat: 48.428, lng: -123.365 },
  saskatoon: { lat: 52.133, lng: -106.67 },
  winnipeg: { lat: 49.895, lng: -97.138 },
  halifax: { lat: 44.648, lng: -63.575 },
}

export function resolveSearchOrigin(query: string): { lat: number; lng: number } | null {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return null

  const postal = trimmed.replace(/\s/g, '')
  if (/^[a-z]\d[a-z]\d[a-z]\d$/i.test(postal)) {
    const letter = postal[0]
    const regionMap: Record<string, { lat: number; lng: number }> = {
      t: { lat: 53.546, lng: -113.494 },
      v: { lat: 49.283, lng: -123.121 },
      m: { lat: 43.653, lng: -79.383 },
      k: { lat: 45.421, lng: -75.697 },
      r: { lat: 49.895, lng: -97.138 },
      s: { lat: 52.133, lng: -106.67 },
      b: { lat: 44.648, lng: -63.575 },
    }
    return regionMap[letter] ?? { lat: 56.13, lng: -106.346 }
  }

  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (trimmed.includes(city)) return coords
  }

  return { lat: 53.546, lng: -113.494 }
}

export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
