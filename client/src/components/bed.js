import React from 'react'

export default function Bed({ bed }) {
  return (
    <div className="bed-cont">
      <h5>Bed {bed.number}</h5>

      {
        bed.Patient &&
        <p>{bed.Patient.name}</p>
      }
    </div>
  )
}
