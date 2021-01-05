import React from 'react'

import Bed from './bed'

export default function Room({ room }) {
  return (
    <div className="room" key={room.uuid}>
      <p>{room.number}</p>

      <div>
        {room.Beds.map(bed => <Bed bed={bed} key={bed.uuid} />)}
      </div>
    </div>
  )
}
