import React from 'react'

import Room from './room'

export default function Floor({ floor }) {
  const marginTop = (floor.number - 1) * 40
  const zIndex = floor.number * -1 + 1

  return (
    <div className="floor" style={{ marginTop, zIndex }}>
      <h3>Floor {floor.number}</h3>

      <div className="rooms-cont">
        {floor.Rooms.map(room => <Room key={room.uuid} room={room} />)}
      </div>
    </div>
  )
}
