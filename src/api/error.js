import storage from '../services/storageService';

export const handleError = (snackbar, closer, setter) => err => {
  if (setter) setter(false)
  let error = 'Unknown error occurred!'
  if (err?.response?.data) {
    const errors = Object.keys(err.response.data)
    if (errors.length) {
      if (errors.indexOf('detail') !== -1) {
        // Token error
        storage?.remove('user')
        error = 'Session expired, please login again!'
      } else {
        const key = errors[0]
        error = `${key}: ${err.response.data[key]}`
      }
    }
  }
  const key = snackbar(error, {
    variant: 'error', onClick: () => {
      closer(key)
    }
  })
  return error
}