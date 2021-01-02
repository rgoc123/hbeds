export const addPatientToBed = async (body) => {
  const res = await fetch('http://localhost:7001/v1/patients', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resJSON = await res.json()
  return resJSON
}
