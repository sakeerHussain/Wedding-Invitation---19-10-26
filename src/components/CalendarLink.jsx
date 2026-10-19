import { invitation } from '../data/invitation'
import { Icon } from './Ornament'

export default function CalendarLink({ event }) {
  const startDateTime = event?.dateTime || invitation.dateTime
  if (!startDateTime) return null
  const date = new Date(startDateTime)
  if (Number.isNaN(date.getTime())) return null
  const endDateTime = event ? event.endDateTime : invitation.endDateTime
  // An editable calendar slot; the invitation never claims an event end time.
  const end = endDateTime
    ? new Date(endDateTime)
    : new Date(date.getTime() + 2 * 60 * 60 * 1000)
  if (Number.isNaN(end.getTime()) || end <= date) return null

  const format = value => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${invitation.bride.name} & ${invitation.groom.name} — ${event?.title || 'Wedding'}`,
    dates: `${format(date)}/${format(end)}`,
    location: [invitation.venue.name, invitation.venue.address].filter(Boolean).join(', '),
    ctz: 'Asia/Kolkata',
    details: `${event ? `${event.title}: ${event.date}, ${event.time} (India Standard Time).\n` : ''}${endDateTime ? '' : 'An event end time has not been specified. Adjust the calendar end time as needed.'}`,
  })

  return (
    <a className="button button-outline" href={`https://calendar.google.com/calendar/render?${params}`} target="_blank" rel="noreferrer">
      <Icon name="calendar" /> {event ? `Save ${event.title} date` : 'Save the date'}
    </a>
  )
}
