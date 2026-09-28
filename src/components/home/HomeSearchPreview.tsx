import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Crosshair, Search } from 'lucide-react'
import { SearchFilterBar } from '../search/SearchFilterBar'
import { SearchResultRow } from '../search/SearchResultRow'
import { ResultsMap } from '../map/ResultsMap'
import { getSearchListingImage } from '../../data/searchImages'
import { filtersToSearchParams } from '../../utils/searchParams'
import {
  getHomeMapPreviewProviders,
  HOME_PREVIEW_FILTERS,
} from '../../utils/homeMapPreview'
import type { SearchFilters } from '../../types/provider'
import './HomeSearchPreview.css'

export function HomeSearchPreview() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<SearchFilters>(HOME_PREVIEW_FILTERS)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set())

  const results = useMemo(() => getHomeMapPreviewProviders(filters), [filters])
  const selected = results.find((p) => p.id === selectedId) ?? null

  useEffect(() => {
    if (!results.length) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !results.some((p) => p.id === selectedId)) {
      setSelectedId(results[0].id)
    }
  }, [results, selectedId])

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const searchHref = `/search?${filtersToSearchParams(filters, 'distance').toString()}`

  return (
    <div className="home-search-preview card">
      <div className="home-search-preview__toolbar">
        <Link to={searchHref} className="home-search-preview__query">
          <Search size={20} aria-hidden />
          <span>Vancouver, BC</span>
        </Link>
        <div className="filter-scroll">
          <SearchFilterBar
            filters={filters}
            onChange={setFilters}
            onMoreFilters={() => navigate(searchHref)}
          />
        </div>
      </div>

      <div className="home-search-preview__split">
        <div className="home-search-preview__list">
          {results.map((p) => (
            <SearchResultRow
              key={p.id}
              provider={p}
              selected={selectedId === p.id}
              saved={savedIds.has(p.id)}
              onSelect={() => setSelectedId(p.id)}
              onToggleSave={() => toggleSave(p.id)}
            />
          ))}
        </div>

        <div className="home-search-preview__map-col">
          <div className="home-search-preview__map card">
            <button
              type="button"
              className="home-search-preview__locate"
              aria-label="Centre map on sample results (demo)"
              onClick={() => setSelectedId(results[0]?.id ?? null)}
            >
              <Crosshair size={18} aria-hidden />
            </button>
            <ResultsMap
              providers={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            {selected && (
              <Link
                to={`/providers/${selected.slug}`}
                className="home-search-preview__map-float"
              >
                <img src={getSearchListingImage(selected.id)} alt="" />
                <div>
                  <strong>{selected.name}</strong>
                  <span>
                    {selected.city}, {selected.province}
                    {selected.distance != null && ` · ${selected.distance.toFixed(1)} km`}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <p className="home-search-preview__sample" role="note">
        Sample listings for preview only — open search for the full experience.
      </p>
      <Link to={searchHref} className="home-search-preview__open">
        Open full search experience
      </Link>
    </div>
  )
}
