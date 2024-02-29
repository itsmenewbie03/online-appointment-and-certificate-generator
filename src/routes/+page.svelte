<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'
    import { goto } from '$app/navigation'
    import { get_session_status, get_new_access_token } from '$lib/session.js'
    /** @type {import('./$types').PageData} */
    export let data
    let loaded = false
    onMount(async () => {
        // INFO: the code below is a mess, this needs to be rewritten
        // I will rewrite this soon xD
        if (data.a) {
            const parsed = atob(data.a)
            const [access_token, refresh_token] = parsed.split(':')
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
            console.log(
                `we got ${access_token} and ${refresh_token} from ${data.a}`,
            )

            const { status, body } = await get_session_status(access_token)
            const success = status == 200
            if (!success) {
                console.log('access token is invalid in data.a')
                // try to generate new access token
                // if no refresh token is available redirect the user to /login
                if (!refresh_token) {
                    toast.error(body.message)
                    setTimeout(() => {
                        goto('/login')
                    }, 1000)
                    return
                }
                const { status, body } =
                    await get_new_access_token(refresh_token)
                const success = status == 200
                // if the refresh token is invalid redirect the user to /login
                if (!success) {
                    toast.error(body.message)
                    setTimeout(() => {
                        goto('/login')
                    }, 1000)
                    return
                }
                // access token generated successfully
                toast.success(`${body.message}`)
                loaded = true
                // update the access token in localStorage
                return
            }
            toast.success(`${body.message}\n${body.role}\n${body.email}`)
            loaded = true
            goto(`/dashboard/${body.role}`)
            return
        }
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        if (!access_token) {
            if (!refresh_token) {
                let t_id = toast.error('Please login first! xD')
                // add a bit of delay
                setTimeout(() => {
                    toast.remove(t_id)
                    goto('/login')
                }, 1000)
                return
            }
            const { status, body } = await get_new_access_token(refresh_token)
            const success = status == 200
            // if the refresh token is invalid redirect the user to /login
            if (!success) {
                toast.error(body.message)
                setTimeout(() => {
                    goto('/login')
                }, 1000)
                return
            }
            // access token generated successfully
            toast.success(`${body.message}`)
            loaded = true
            // update the access token in localStorage
            localStorage.setItem('access_token', body.access_token)
        }
        // I NEED TS 😭
        const { status, body } = await get_session_status(access_token)
        const success = status == 200
        if (!success) {
            console.log('access token is invalid without data.a')
            // try to generate new access token
            const refresh_token = localStorage.getItem('refresh_token')
            console.log('refresh_token: ', refresh_token)
            // if no refresh token is available redirect the user to /login
            if (!refresh_token) {
                console.log('no refresh token')
                let t_id = toast.error(body.message)
                setTimeout(() => {
                    toast.remove(t_id)
                    goto('/login')
                }, 1000)
                return
            }
            const { status, body } = await get_new_access_token(refresh_token)
            const success = status == 200
            // if the refresh token is invalid redirect the user to /login
            if (!success) {
                let t_id = toast.error(body.message)
                setTimeout(() => {
                    goto('/login')
                    toast.remove(t_id)
                }, 1000)
                return
            }
            // access token generated successfully
            toast.success(`${body.message}`)
            loaded = true
            // update the access token in localStorage
            localStorage.setItem('access_token', body.access_token)
            goto(`/`)
            return
        }
        loaded = true
        toast.success(`${body.message}\n${body.role}\n${body.email}`)
        goto(`/dashboard/${body.role}`)
    })
</script>

<!-- NOTE: please create some good looking loading stuff here xD  -->
<Toaster />
<h1>REDIRECTING PLEASE WAIT...</h1>
