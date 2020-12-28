import React, { useState, useEffect } from 'react'

import { getRooms } from '../util/roomApiUtil'

export default function Room() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    async function getRoomsData() {
      const rooms = await getRooms()
      setRooms(rooms)
    }

    getRoomsData()
  }, [])

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
                  {
                    room.Beds.map(bed => {
                      return (
                        <div className="bed-cont" key={bed.uuid}>
                          <h5>Bed {bed.number}</h5>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
