import React, { useState } from 'react'

import Bed from './bed'

export default function Room({ rooms }) {
  return (
    <div>
      <h4>Floor 1</h4>
      <div className="floor">
        {
          rooms.map(room => {
            return (
              <div className="room" key={room.uuid}>
                <p>{room.number}</p>

                <div>
                  {room.Beds.map(bed => <Bed bed={bed} key={bed.uuid} />)}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
