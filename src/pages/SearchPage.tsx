import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, Heart, List, Map, Search, Shield } from 'lucide-react'
import { HeroSearchForm } from '../components/search/HeroSearchForm'
import { SearchFiltersPanel } from '../components/search/SearchFiltersPanel'
import { SearchFilterBar } from '../components/search/SearchFilterBar'
import { SearchResultRow } from '../components/search/SearchResultRow'
import { ResultsMap } from '../components/map/ResultsMap'
import {
  DEFAULT_FILTERS,
  filtersFromSearchParams,
  filtersToSearchParams,
  sortFromSearchParams,
} from '../utils/searchParams'
import type { SearchFilters, SortOption } from '../types/provider'
import { filterAndSortProviders } from '../utils/filterProviders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './SearchPage.css'

const CALGARY_DEFAULT: SearchFilters = {
  ...DEFAULT_FILTERS,
  q: 'Calgary, AB',
  distanceKm: 2500,
}

type MobileView = 'list' | 'map'

export function SearchPage() {
  const placeLabel = 'Calgary, AB'

  useDocumentTitle(
    `Childcare near ${placeLabel} — Kiddly`,
    'Search licensed childcare centres and family dayhomes near Calgary. Compare on the map and view profiles.',
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const bootstrapped = useRef(false)
  const [draftFilters, setDraftFilters] = useState<SearchFilters>(() =>
    filtersFromSearchParams(searchParams),
  )
  const [sort, setSort] = useState<SortOption>(() => sortFromSearchParams(searchParams))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<MobileView>('list')
  const [mobileUi, setMobileUi] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set())

  const appliedFilters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  )

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true
    if (!searchParams.get('q')) {
      setSearchParams(filtersToSearchParams(CALGARY_DEFAULT, sort), { replace: true })
    }
  }, [searchParams, setSearchParams, sort])

  useEffect(() => {
    setDraftFilters(appliedFilters)
    setSort(sortFromSearchParams(searchParams))
  }, [appliedFilters, searchParams])

  const results = useMemo(
    () => filterAndSortProviders(appliedFilters, sort),
    [appliedFilters, sort],
  )

  useEffect(() => {
    if (!results.length) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !results.some((p) => p.id === selectedId)) {
      setSelectedId(results[0].id)
    }
  }, [results, selectedId])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => {
      const narrow = mq.matches
      setMobileUi(narrow)
      if (narrow) setMobileView('map')
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const lock = mobileUi && mobileView === 'map'
    const html = document.documentElement
    const body = document.body

    if (lock) {
      const scrollY = window.scrollY
      body.dataset.searchScrollY = String(scrollY)
      body.style.top = scrollY ? `-${scrollY}px` : ''
      body.classList.add('search-map-active')
      html.classList.add('search-map-active')
    } else {
      const y = Number(body.dataset.searchScrollY || 0)
      body.classList.remove('search-map-active')
      html.classList.remove('search-map-active')
      body.style.top = ''
      delete body.dataset.searchScrollY
      if (y) window.scrollTo(0, y)
    }

    return () => {
      body.classList.remove('search-map-active')
      html.classList.remove('search-map-active')
      body.style.top = ''
      delete body.dataset.searchScrollY
    }
  }, [mobileUi, mobileView])

  const syncUrl = useCallback(
    (filters: SearchFilters, nextSort: SortOption) => {
      setSearchParams(filtersToSearchParams(filters, nextSort), { replace: true })
    },
    [setSearchParams],
  )

  function applyFilters(filters: SearchFilters = draftFilters) {
    syncUrl(filters, sort)
    setDrawerOpen(false)
  }

  function resetFilters() {
    setDraftFilters(CALGARY_DEFAULT)
    syncUrl(CALGARY_DEFAULT, sort)
    setDrawerOpen(false)
  }

  const displayQ = appliedFilters.q || placeLabel
  const childAge = searchParams.get('childAge') ?? ''

  function handleSortChange(next: SortOption) {
    setSort(next)
    syncUrl(appliedFilters, next)
  }

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const trustHero = [
    { icon: Shield, label: 'Licensed providers' },
    { icon: Check, label: 'Verified information' },
    { icon: Heart, label: 'Trusted by Canadian families' },
  ]

  return (
    <div
      className={`search-page${mobileView === 'map' ? ' search-page--map-mode' : ' search-page--list-mode'}${mobileUi ? ' search-page--mobile-ui' : ''}`}
    >
      <section className="search-hero">
        <div className="search-hero__bg" role="presentation">
          <img src="/images/search/hero-calgary.jpg" alt="" />
        </div>
        <div className="search-hero__fade" aria-hidden />
        <div className="search-hero__sign" aria-hidden>
          <div className="search-hero__sign-board">
            <span>Stronger Families</span>
            <span>Brighter Communities</span>
          </div>
        </div>
        <div className="container search-hero__inner">
          <h1>Childcare near {displayQ}</h1>
          <p className="search-hero__lead">
            Search licensed centres and family dayhomes, compare programs on the map, and connect
            with providers that fit your family.
          </p>
          <HeroSearchForm landing initialQ={displayQ} initialChildAge={childAge} />
          <ul className="search-hero__trust">
            {trustHero.map((item) => (
              <li key={item.label}>
                <item.icon size={18} strokeWidth={2.25} aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="search-results-frame">
        <div className="search-results-frame__chrome">
          <section className="search-toolbar search-toolbar--top">
            <div className="container search-toolbar__inner">
              <SearchFilterBar
                filters={appliedFilters}
                onChange={(f) => syncUrl(f, sort)}
                onMoreFilters={() => {
                  setDraftFilters(appliedFilters)
                  setDrawerOpen(true)
                }}
              />
            </div>
          </section>

          <section className="container search-results-bar">
            <p className="search-results-bar__count">
              <strong>{results.length}</strong> near {displayQ}
            </p>
            <div className="search-results-bar__actions">
              <div
                className="search-view-toggle search-view-toggle--desktop"
                role="tablist"
                aria-label="Results view"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileView === 'list'}
                  className={mobileView === 'list' ? 'is-active' : ''}
                  onClick={() => setMobileView('list')}
                >
                  <List size={18} aria-hidden /> List
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileView === 'map'}
                  className={mobileView === 'map' ? 'is-active' : ''}
                  onClick={() => setMobileView('map')}
                >
                  <Map size={18} aria-hidden /> Map
                </button>
              </div>
              <label className="search-results-bar__sort search-results-bar__sort--desktop">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  aria-label="Sort results"
                >
                  <option value="distance">Distance</option>
                  <option value="availability">Availability</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
          </section>
        </div>

        <section className="container search-layout search-results-frame__body">
        <div className={`search-layout__grid ${mobileView === 'map' ? 'search-layout__grid--map' : ''}`}>
          <div className="search-layout__list">
            {results.length === 0 ? (
              <div className="search-empty card">
                <h2>No providers match your filters</h2>
                <p>Try widening distance or clearing filters.</p>
                <button type="button" className="btn btn--primary" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              results.map((p) => (
                <SearchResultRow
                  key={p.id}
                  provider={p}
                  selected={selectedId === p.id}
                  saved={savedIds.has(p.id)}
                  onSelect={() => setSelectedId(p.id)}
                  onToggleSave={() => toggleSave(p.id)}
                />
              ))
            )}
          </div>

          <div className="search-layout__map-col">
            <div className="search-map-wrap card">
              <button type="button" className="search-map__search-area">
                Search this area
              </button>
              <ResultsMap
                providers={results}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </div>
        </section>
      </div>

      <nav className="search-mobile-dock" aria-label="Filters and results view">
        <div className="search-mobile-dock__filters">
          <SearchFilterBar
            filters={appliedFilters}
            onChange={(f) => syncUrl(f, sort)}
            onMoreFilters={() => {
              setDraftFilters(appliedFilters)
              setDrawerOpen(true)
            }}
          />
        </div>
        <div className="search-mobile-dock__meta">
          <p className="search-mobile-dock__count">
            <strong>{results.length}</strong> near {displayQ}
          </p>
          <label className="search-mobile-dock__sort">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              aria-label="Sort results"
            >
              <option value="distance">Distance</option>
              <option value="availability">Availability</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
        <div className="search-mobile-dock__toggle" role="tablist" aria-label="Switch results view">
          <button
            type="button"
            role="tab"
            aria-selected={mobileView === 'list'}
            className={`search-mobile-dock__tab${mobileView === 'list' ? ' is-active' : ''}`}
            onClick={() => setMobileView('list')}
          >
            <List size={20} aria-hidden />
            List
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileView === 'map'}
            className={`search-mobile-dock__tab${mobileView === 'map' ? ' is-active' : ''}`}
            onClick={() => setMobileView('map')}
          >
            <Map size={20} aria-hidden />
            Map
          </button>
        </div>
      </nav>

      <section className="search-cta" aria-labelledby="search-cta-title">
        <img src="/images/search/cta-lake.jpg" alt="" className="search-cta__bg" />
        <div className="search-cta__overlay" aria-hidden />
        <div className="container search-cta__inner">
          <div className="search-cta__copy">
            <h2 id="search-cta-title">Ready to find the right childcare?</h2>
            <p>Join thousands of Canadian families using Kiddly to search, compare, and connect.</p>
            <Link to="/search" className="btn btn--primary btn--lg">
              <Search size={20} aria-hidden />
              Search Childcare
            </Link>
          </div>
          <p className="search-cta__script" aria-hidden>
            Stronger Brighter Kinder Canada
          </p>
        </div>
      </section>

      {drawerOpen && (
        <div className="filter-drawer" role="presentation" onClick={() => setDrawerOpen(false)}>
          <div
            className="filter-drawer__panel"
            role="dialog"
            aria-label="More filters"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>More filters</h2>
            <SearchFiltersPanel filters={draftFilters} onChange={setDraftFilters} />
            <div className="filter-drawer__actions">
              <button type="button" className="btn btn--primary" onClick={() => applyFilters()}>
                Apply
              </button>
              <button type="button" className="btn btn--secondary" onClick={resetFilters}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
