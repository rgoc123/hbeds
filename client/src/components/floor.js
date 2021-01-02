import React from 'react'

import Room from './room'

export default function Floor({ floor }) {
  return (
    <div className="floor">
      <h3>This is Floor {floor.number}!</h3>
    </div>
  )
}
