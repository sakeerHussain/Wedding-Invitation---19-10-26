const petals = Array.from({ length: 10 }, (_, index) => ({
  left: `${(index * 31 + 7) % 100}%`,
  '--fall-duration': `${16 + ((index * 7) % 11)}s`,
  '--fall-delay': `${-(index * 4.7 + 2)}s`,
  '--petal-width': `${18 + (index % 3) * 6}px`,
  '--drift': `${((index * 47) % 151) - 75}px`,
  '--sway': `${14 + ((index * 13) % 27)}px`,
  '--sway-duration': `${3.6 + ((index * 7) % 19) / 10}s`,
  '--sway-delay': `${-index * 1.7}s`,
  '--turn-duration': `${5.2 + ((index * 11) % 29) / 10}s`,
  '--turn-delay': `${-index * 2.3}s`,
  '--tilt': `${((index * 37) % 100) - 50}deg`,
  '--direction': index % 2 ? 'reverse' : 'normal',
}))

export default function Petals() {
  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal, index) => (
        <span className="petal-path" key={index} style={petal}>
          <span className="petal-sway">
            <span className={`petal petal-${index % 3}`} />
          </span>
        </span>
      ))}
    </div>
  )
}
