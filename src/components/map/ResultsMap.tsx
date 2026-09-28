import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { ProviderResult } from '../../utils/filterProviders'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './ResultsMap.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const defaultMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const highlightedIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  className: 'map-marker--active',
})

interface FitBoundsProps {
  providers: ProviderResult[]
}

function FitBounds({ providers }: FitBoundsProps) {
  const map = useMap()
  useEffect(() => {
    if (!providers.length) return
    const bounds = L.latLngBounds(providers.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds.pad(0.15))
  }, [map, providers])
  return null
}

interface ResultsMapProps {
  providers: ProviderResult[]
  selectedId: string | null
  onSelect: (id: string) => void
  fallback?: boolean
}

export function ResultsMap({ providers, selectedId, onSelect, fallback }: ResultsMapProps) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setMapReady(true)
  }, [])

  const center = useMemo(() => {
    if (!providers.length) return { lat: 53.546, lng: -113.494 }
    const lat = providers.reduce((s, p) => s + p.lat, 0) / providers.length
    const lng = providers.reduce((s, p) => s + p.lng, 0) / providers.length
    return { lat, lng }
  }, [providers])

  if (fallback) {
    return (
      <div className="map-fallback" role="img" aria-label="Map preview with sample markers">
        <p className="map-fallback__note">
          Map tiles unavailable — showing sample positions for this demo.
        </p>
        <div className="map-fallback__canvas">
          {providers.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`map-fallback__pin ${selectedId === p.id ? 'is-active' : ''}`}
              style={{
                left: `${15 + (i % 4) * 22}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
              }}
              onClick={() => onSelect(p.id)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (!mapReady) {
    return <div className="results-map results-map--placeholder" aria-hidden />
  }

  return (
    <MapContainer
      key={`map-${providers.map((p) => p.id).join('-')}`}
      center={[center.lat, center.lng]}
      zoom={10}
      className="results-map"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds providers={providers} />
      {providers.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={selectedId === p.id ? highlightedIcon : defaultMarkerIcon}
          eventHandlers={{
            click: () => onSelect(p.id),
          }}
        >
          <Popup>
            <strong>{p.name}</strong>
            <br />
            {p.areaLabel}
            <br />
            <Link to={`/providers/${p.slug}`}>View profile</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
