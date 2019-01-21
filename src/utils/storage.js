import Cookies from 'js-cookie'

const prefix = 'XX-XX-'
const TokenKey = prefix + 'TOKEN'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getCookies(key) {
    return Cookies.get(prefix + key)
}

export function setCookies(key, val) {
    return Cookies.set(prefix + key, val)
}

export function removeCookies(key) {
    return Cookies.remove(prefix + key)
}

export function getLs(key) {
    return localStorage.getItem(prefix + key)
}

export function setLs(key, val) {
    return localStorage.setItem(prefix + key, val)
}

export function removeLs(key) {
    return localStorage.removeItem(prefix + key)
}
