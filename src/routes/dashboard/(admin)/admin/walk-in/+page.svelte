<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'
    let info = {}
    let documents = []
    let document_id
    let or_number

    onMount(async () => {
        const endpoint =
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/documents/list'
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }
        const resp = await fetch(endpoint, opts).then((res) => res.json())
        documents = resp.data
        console.log(`WE GOT [DOCUMENT_LIST]: ${JSON.stringify(resp)}`)
    })
    const handle_submit = async (event) => {
        event.preventDefault()
        console.log('[INIT]: WALKIN SUBMITTED')
        const endpoint = `https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/documents/walkin/generate`
        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                document_id: document_id,
                resident_data: info,
                or_number: or_number,
            }),
        }

        const resp = await fetch(endpoint, opts).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status === 200 ? toast.success : toast.error
        _alert(body.message)
    }
</script>

<Toaster />
<div
    class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow"
>
    <div class="">
        <form class="grid grid-cols-2 gap-6" on:submit={handle_submit}>
            <div>
                <div>
                    <select
                        bind:value={document_id}
                        id="dropdown1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        required
                    >
                        <option value="" disabled selected
                            >Select document type...</option
                        >
                        {#each documents as document}
                            <option value={document._id}>{document.type}</option
                            >
                        {/each}
                    </select>
                </div>

                <div class="mb-2">
                    <input
                        type="text"
                        id="first_name"
                        bind:value={info.first_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="First Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="last_name"
                        bind:value={info.last_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Last Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <select
                        bind:value={info.gender}
                        id="genders"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="" selected>Select gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Others</option>
                        <option value="prefer not to say"
                            >Prefer not to say</option
                        >
                    </select>
                </div>
                <div class="mb-2">
                    <input
                        type="date"
                        id="birth"
                        bind:value={info.date_of_birth}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Date of Birth*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="residency"
                        bind:value={info.period_of_residency}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Period of Residency*"
                        required
                    />
                </div>
            </div>
            <div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="middle_name"
                        bind:value={info.middle_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Middle Name"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="suffix"
                        bind:value={info.name_suffix}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Suffix"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="address"
                        bind:value={info.address}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Address*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="contact"
                        bind:value={info.phone_number}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Phone Number*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="contact"
                        bind:value={or_number}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="OR NUMBER"
                    />
                </div>
            </div>

            <button
                id="create-account"
                type="submit"
                class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >Generate</button
            >
        </form>
    </div>
</div>

