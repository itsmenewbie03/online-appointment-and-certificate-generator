/**
 * This function is for validating access token
 * @param {*} access_token The access token to be validate
 * @returns
 */
const get_session_status = async (access_token) => {
    const endpoint =
        'https://itsmenewbie03.is-a.dev/appt/api/auth/session/status'
    const opts = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    }
    return await fetch(endpoint, opts).then(async (res) => {
        return { status: res.status, body: await res.json() }
    })
}
// fuck JS i really need TS
/**
 * This function is for generating new access token using a refresh token
 * @param {*} refresh_token The refresh token that will be used to generate new access token
 * @returns
 */
const get_new_access_token = async (refresh_token) => {
    const endpoint =
        'https://itsmenewbie03.is-a.dev/appt/api/auth/session/refresh'
    const opts = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${refresh_token}`,
        },
    }
    return await fetch(endpoint, opts).then(async (res) => {
        return { status: res.status, body: await res.json() }
    })
}
export { get_session_status, get_new_access_token }
