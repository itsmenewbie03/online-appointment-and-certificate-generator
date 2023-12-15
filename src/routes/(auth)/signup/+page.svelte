<script>
    let email
    let password
    let first_name
    let last_name
    let gender
    let date_of_birth
    let address
    let period_of_residency
    let phone_number
    import toast, { Toaster } from 'svelte-french-toast'
    const handle_submit = async (event) => {
        event.preventDefault()

        const url =
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/auth/admin/login'
        console.log(`logging in with ${email}:${password}`)

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status == 200 ? toast.success : toast.error


        if (status == 200) {

            const { access_token, refresh_token } = body

        }
        _alert(body.message)

    }
</script>

<Toaster />

<div class="grid h-screen place-items-center">
    <div
        class=" max-w-sm py-[60px] w-2/3 px-12 bg-white border border-gray-200 rounded-lg shadow"
    >
        <form
            class="auth-form"
            method="post"
            action="?/OAuth2"
            on:submit={handle_submit}
        >
            <div class="grid mb-8 place-items-center">
                <img src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png" alt="" />
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={email}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Email address</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={first_name}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >First name</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={last_name}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Last name</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={gender}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Gender</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={date_of_birth}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Date of birth</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={address}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Address</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={period_of_residency}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Period of residency</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        bind:value={phone_number}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Phone number</label
                    >
                </div>
                <div class="relative z-0 group">
                    <input
                        bind:value={password}
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_password"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Password</label
                    >
                </div>
                <div class="relative z-0 group">
                    <input
                        bind:value={password}
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="confirm_password"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Confirm Password</label
                    >
                </div>
            </div>
            <button
                type="submit"
                class="text-white mt-5 bg-green-400 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
                >Submit</button
            >
        </form>
    </div>
</div>
