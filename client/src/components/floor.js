import React from 'react'

import Room from './room'

export default function Floor({ floor }) {
  return (
    <div className="floor">
      <h3>Floor {floor.number}</h3>

      <div className="rooms-cont">
        {floor.Rooms.map(room => <Room key={room.uuid} room={room} />)}
      </div>
    </div>
  )
}
