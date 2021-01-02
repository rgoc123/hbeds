export const getFloors = async () => {
  const res = await fetch('http://localhost:7001/v1/floors')

  const resJSON = await res.json()
  return resJSON.data
}
