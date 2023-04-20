const getTokenLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenLocalStorage.token}`,
    Accept: 'application/json'
  }
}
