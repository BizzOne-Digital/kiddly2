import type { AvailabilityStatus, LicensingStatus } from '../../types/provider'
import {
  AVAILABILITY_LABELS,
  LICENSING_LABELS,
} from '../../types/provider'
import './StatusBadges.css'

export function LicensingBadge({ status }: { status: LicensingStatus }) {
  const isLicensed = status === 'licensed'
  return (
    <span
      className={`badge badge--licensing ${isLicensed ? 'badge--licensed' : 'badge--private'}`}
      title={
        isLicensed
          ? 'Licensed care meets provincial licensing requirements (sample label).'
          : 'Private care is not presented as provincially licensed — confirm details with the provider.'
      }
    >
      {LICENSING_LABELS[status]}
    </span>
  )
}

export function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span
      className={`badge badge--availability badge--${status}`}
      title={
        status === 'spots-now'
          ? 'Provider indicated openings in this sample profile.'
          : status === 'upcoming'
            ? 'Openings expected soon — contact the provider to confirm timing.'
            : 'Waitlist — families may join a list; availability is not immediate.'
      }
    >
      {AVAILABILITY_LABELS[status]}
    </span>
  )
}

export function BadgeLegend() {
  return (
    <div className="badge-legend" role="note">
      <p>
        <strong>Licensed</strong> means the sample profile is marked as meeting provincial
        licensing. <strong>Private care</strong> is shown separately and is not labelled as
        licensed. <strong>Spots available now</strong>, <strong>Upcoming openings</strong>, and{' '}
        <strong>Waitlist</strong> describe sample availability only — always confirm with the
        provider.
      </p>
    </div>
  )
}
