import axios from "axios"

const API_URL = "http://localhost:1337/api"

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axios.get<T>(`${API_URL}${url}`)
  return res.data
}
