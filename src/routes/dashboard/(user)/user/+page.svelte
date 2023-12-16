<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'
    import { goto } from '$app/navigation'
    import { get_session_status, get_new_access_token } from '$lib/session.js'
    /** @type {import('./$types').PageData} */
    const capitalize = (s) =>
        (s && s.charAt(0).toUpperCase() + s.slice(1)) || ''
    export let data
    let loaded = false
    let stuff_to_do
    let jokes
    let ip_data
    let weather_data

    onMount(async () => {
        // INFO: the code below is a mess, this needs to be rewritten
        // I will rewrite this soon xD

        const boredapi = await fetch(
            'http://www.boredapi.com/api/activity',
        ).then((res) => res.json())
        console.log(`[BOREDAPI]: ${JSON.stringify(boredapi)}`)

        stuff_to_do = boredapi.activity

        const joke = await fetch(
            'https://official-joke-api.appspot.com/random_joke',
        ).then((res) => res.json())
        jokes = joke

        const weather = await fetch(
            'https://openweathermap.org/data/2.5/onecall?lat=8&lon=125&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
        ).then((res) => res.json())
        weather_data = weather

        const ip = await fetch('http://ip-api.com/json/').then((res) =>
            res.json(),
        )
        ip_data = ip

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
                console.log('access token is invalid')
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
            return
        }
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        if (!access_token) {
            if (!refresh_token) {
                let err_toast_id = toast.error('Please login first!')
                // add a bit of delay
                setTimeout(() => {
                    toast.remove(err_toast_id)
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
            console.log('access token is invalid')
            // try to generate new access token
            const refresh_token = localStorage.getItem('refresh_token')
            // if no refresh token is available redirect the user to /login
            if (!refresh_token) {
                toast.error(body.message)
                setTimeout(() => {
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
            return
        }
        loaded = true
        toast.success(`${body.message}\n${body.role}\n${body.email}`)
    })
</script>

<Toaster />
<main>
    <div class="mx-auto max-w-screen-lg">
        {#if !loaded}
            <div
                class="text-4xl"
                role="status"
                style="    
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;"
            >
                <svg
                    aria-hidden="true"
                    class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        {:else}
            <div class="flex flex-wrap justify-between">
                <!-- Joke Card -->
                <div class="w-full md:w-1/2 p-4">
                    <div class="mb-4">
                        <div class="border rounded-lg p-4">
                            <h2 class="text-xl font-bold mb-2">Random Joke</h2>
                            <p class="text-gray-900">
                                {`${jokes.setup} ${jokes.punchline}`}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Motivational Quote Card -->
                <div class="w-full md:w-1/2 p-4">
                    <div class="border rounded-lg p-4">
                        <h2 class="text-xl font-bold mb-2">
                            Random Stuff To Do
                        </h2>
                        <p class="text-gray-900">{stuff_to_do}</p>
                    </div>
                </div>

                <!-- Weather Card -->
                <div class="w-full p-4">
                    <div class="border rounded-lg p-4">
                        <h2 class="text-xl font-bold mb-2">Current Weather</h2>
                        <p class="text-gray-900">
                            {`The temperature is ${
                                weather_data.current.temp
                            }°C feels like ${
                                weather_data.current.feels_like
                            }°C.\n ${capitalize(
                                weather_data.current.weather[0].description,
                            )}`}
                        </p>
                    </div>
                </div>

                <!-- Info Card -->
                <div class="w-full p-4">
                    <div class="border rounded-lg p-4">
                        <h2 class="text-xl font-bold mb-2">Your Information</h2>
                        <p class="text-gray-900">
                            {`Base on Your IP Address ${ip_data.query}, You are located in ${ip_data.city}, ${ip_data.regionName}, ${ip_data.country}.\nYour timezone is ${ip_data.timezone}.\nYour ISP is ${ip_data.isp}.`}
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>
