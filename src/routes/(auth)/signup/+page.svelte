<script>
    let form

    let email
    let password
    let confirm_password
    let first_name
    let middle_name
    let last_name
    let gender
    let date_of_birth
    let address
    let period_of_residency
    let phone_number

    import toast, { Toaster } from 'svelte-french-toast'
    const handle_submit = async (event) => {
        event.preventDefault()
        if (confirm_password !== password) {
            toast.error('Password does not match')
            return
        }

        const url =
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/user/signup'

        const req_body = {
            email: email,
            password: password,
            info: {
                first_name: first_name,
                last_name: last_name,
                middle_name: middle_name,
                gender: gender,
                date_of_birth: date_of_birth,
                period_of_residency: period_of_residency,
                phone_number: phone_number,
                address: address,
            },
        }

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(req_body),
        }).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status == 200 ? toast.success : toast.error

        _alert(body.message)
        if (status === 200) {
            // clear the form
            form.reset()
        }
    }
</script>

<Toaster />

<div class="grid h-screen place-items-center">
    <div
        class=" max-w-sm py-[60px] w-2/3 px-12 bg-white border border-gray-200 rounded-lg shadow"
    >
        <form class="auth-form" bind:this={form} on:submit={handle_submit}>
            <div class="grid mb-8 place-items-center">
                <img src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png" alt="" />
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        required
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
                        required
                        bind:value={first_name}
                        type="text"
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
                        bind:value={middle_name}
                        type="text"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Middle name</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        required
                        bind:value={last_name}
                        type="text"
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
                    <select
                        required
                        bind:value={gender}
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    >
                        <option value="" selected disabled
                            >Select gender...</option
                        >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Others</option>
                        <option value="prefer not to say"
                            >Prefer not to say</option
                        >
                    </select>
                    <label
                        for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Gender</label
                    >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        required
                        bind:value={date_of_birth}
                        type="date"
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
                        required
                        bind:value={address}
                        type="text"
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
                        required
                        bind:value={period_of_residency}
                        type="text"
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
                        required
                        bind:value={phone_number}
                        type="tel"
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
                        required
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
                        required
                        bind:value={confirm_password}
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
