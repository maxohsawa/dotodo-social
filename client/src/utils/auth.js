import decode from 'jwt-decode'
import { setCookie, getCookie, removeCookie } from './cookies'

class AuthService {
  getProfile() {
    return decode(this.getToken())
  }

  loggedIn() {
    const token = this.getToken()

    return token && !this.isTokenExpired(token) ? true : false
  }

  isTokenExpired(token) {

    const decoded = decode(token)

    if (decoded.exp < Date.now() / 1000) {
      removeCookie('id_token')
      return true
    }

    return false
  }

  getToken() {
    return getCookie('id_token')
  }

  login(idToken) {
    setCookie('id_token', idToken)
    window.location.assign('/')
  }

  logout() {
    removeCookie('id_token')
    window.location.reload()
  }
}

export default new AuthService()
