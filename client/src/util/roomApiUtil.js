export const getRooms = async () => {
  const res = await fetch('http://localhost:7001/v1/rooms')

  const resJSON = await res.json()
  return resJSON.data
}
