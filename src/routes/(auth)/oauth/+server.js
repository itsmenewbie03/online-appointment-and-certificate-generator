import { redirect } from '@sveltejs/kit'
import { OAuth2Client } from 'google-auth-library'

import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private'

async function getUserData(access_token) {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    )
    console.log('response', response)
    const data = await response.json()
    console.log('data', data)
}

export const GET = async ({ url }) => {
    const redirectURL = 'http://localhost:5173/oauth'
    const code = await url.searchParams.get('code')
    // TODO: send this `code` to backend
    console.log('url is', url)

    const login_endpoint =
        'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/oauth/google/login'
    // INFO: make sure to change the role accordingly
    const opts = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            code: code,
            role: 'admin',
        }),
    }
    const resp = await fetch(login_endpoint, opts).then(async (res) => {
        return { status: res.status, body: await res.json() }
    })
    const { status, body } = resp
    if (status !== 200) {
        console.log(`LOGIN ERROR:  cause => ${body.message}`)
        // TODO: provided a feedback to the user what happened
        throw redirect(303, '/login')
    }
    // INFO: this part is reached if the login is successfull
    // we need to set the token now
    const { access_token, refresh_token } = body
    // INFO: since we can access `localStorage` in the server, we would just pass it as a querystring
    const auth_param = `${access_token}:${refresh_token}`
    throw redirect(300, `/?a=${btoa(auth_param)}`)
    console.log('returned code', code)

    try {
        const oAuth2Client = new OAuth2Client(
            SECRET_CLIENT_ID,
            SECRET_CLIENT_SECRET,
            redirectURL,
        )
        const r = await oAuth2Client.getToken(code)
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens)
        console.info('Tokens acquired.')
        const user = oAuth2Client.credentials
        console.log('credentials', user)

        await getUserData(user.access_token)
    } catch (err) {
        console.log('Error logging in with OAuth2 user', err)
    }

    throw redirect(303, '/')
}
