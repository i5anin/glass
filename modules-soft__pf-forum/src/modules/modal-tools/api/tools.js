import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

const handleError = (error) => {
  throw error
}

export const fetchInstrumentData = (no, nomId) => {
  return api
    .get('instr_op_info', {
      params: { no, nom_id: nomId },
    })
    .then((response) => response.data)
    .catch(handleError)
}
