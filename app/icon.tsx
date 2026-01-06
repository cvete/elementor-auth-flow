import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TV Body */}
          <rect x="10" y="20" width="80" height="60" rx="12" fill="#000" stroke="#000" strokeWidth="2"/>
          <rect x="15" y="25" width="70" height="50" rx="8" fill="#fff"/>

          {/* Play Button */}
          <path d="M45 40 L45 60 L62 50 Z" fill="#000"/>

          {/* TV Stand */}
          <rect x="35" y="80" width="30" height="3" rx="1.5" fill="#000"/>
          <rect x="47" y="75" width="6" height="8" rx="2" fill="#000"/>

          {/* Antennas */}
          <line x1="30" y1="20" x2="20" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
          <line x1="70" y1="20" x2="80" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="20" cy="5" r="3" fill="#000"/>
          <circle cx="80" cy="5" r="3" fill="#000"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
