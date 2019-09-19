import axios from 'axios'
export default async function search(query) {
  if (!query) {
    return []
  }
  const result = await axios.get(
    `https://www.melon.com/search/keyword/index.json?query=${query}`
  )
  if (result.data.ERROR) {
    return []
  }
  return result.data.SONGCONTENTS.slice(0, 5)
}
