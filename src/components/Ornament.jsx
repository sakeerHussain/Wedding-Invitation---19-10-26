export default function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} width="160" height="24" viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path d="M1 12h55m48 0h55M65 12c6-1 11-5 15-11 4 6 9 10 15 11-6 1-11 5-15 11-4-6-9-10-15-11Z" stroke="currentColor" strokeWidth=".7" />
      <path d="m80 7 4 5-4 5-4-5Z" fill="currentColor" />
      <circle cx="60" cy="12" r="1.5" fill="currentColor" /><circle cx="100" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function Icon({ name, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    down: <><path d="m7 10 5 5 5-5M12 4v11" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    sound: <><path d="m11 5-6 4H2v6h3l6 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></>,
    mute: <><path d="m11 5-6 4H2v6h3l6 4V5Zm5 4 5 6m0-6-5 6" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="1" /><path d="M8 3v4m8-4v4M4 11h16m-12 5h3" /></>,
    flower: <><path d="M12 12c-8-9 5-13 3-3 10-4 12 9 2 6 5 9-8 13-8 3-9 5-13-7-3-7-7-8 4-14 6 1Z" /><circle cx="12" cy="12" r="2" /></>,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}
