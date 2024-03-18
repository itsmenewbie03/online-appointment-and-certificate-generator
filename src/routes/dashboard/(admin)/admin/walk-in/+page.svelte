<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'
    let period_of_residency_unit
    let period_of_residency_value
    let info = {}
    let documents = []
    let residents = []
    let document_id
    let or_number
    let read_only = false

    const select_resident = (event) => {
        const resident_id = event.target.value
        if (resident_id === 'new_resident') {
            read_only = false
            info = {}
            return
        }
        const resident = residents.find(
            (resident) => resident._id === resident_id,
        )
        const [value, unit] = resident.period_of_residency.split(' ')
        period_of_residency_unit = unit
        period_of_residency_value = value
        info = resident
        info.date_of_birth = resident.date_of_birth.split('T')[0]
        read_only = true
    }

    onMount(async () => {
        const endpoint =
            'https://itsmenewbie03.is-a.dev/appt/api/documents/list'
        const opts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }
        const resp = await fetch(endpoint, opts).then((res) => res.json())
        documents = resp.data
        console.log(`WE GOT [DOCUMENT_LIST]: ${JSON.stringify(resp)}`)
        const endpoint2 = `https://itsmenewbie03.is-a.dev/appt/api/data/resident/list`
        const resp2 = await fetch(endpoint2, opts).then((res) => res.json())
        residents = resp2.data
        console.log(`WE GOT [RESIDENT_LIST]: ${JSON.stringify(resp2)}`)
    })
    const handle_submit = async (event) => {
        event.preventDefault()
        console.log('[INIT]: WALKIN SUBMITTED')

        info.period_of_residency = `${period_of_residency_value} ${period_of_residency_unit}`
        const endpoint = `https://itsmenewbie03.is-a.dev/appt/api/documents/walkin/generate`
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
        if (status === 200) {
            // get name of document based on _id
            const name = documents.find((doc) => doc._id === document_id).type
            download(body.document, `${info.last_name}_${name}.docx`)
        }
    }

    // NOTE: convert base64 to blob
    const base64ToBlob = (base64) => {
        const raw = window.atob(base64)
        const rawLength = raw.length
        const uInt8Array = new Uint8Array(rawLength)
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }
        const contentType = 'application/docx'
        return new Blob([uInt8Array], { type: contentType })
    }

    // NOTE: creat a function that takes a base 64 string and converts it to a blob and downloads it
    const download = (base64, filename) => {
        const blob = base64ToBlob(base64)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }
</script>

<Toaster />
<div
    class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow"
>
    <div class="flex justify-center mt-10 p-4 sm:p-6">
        <form
            class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full"
            on:submit={handle_submit}
        >
            <div>
                <div class="mb-2">
                    <select
                        id="dropdown1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        on:change={select_resident}
                    >
                        <option value="" disabled selected
                            >Select a resident...</option
                        >
                        <option value="new_resident">Add new resident</option>
                        {#each residents as resident}
                            <option value={resident._id}
                                >{`${resident.first_name} ${resident.last_name}`}</option
                            >
                        {/each}
                    </select>
                </div>

                <div class="mb-2">
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
                        readonly={read_only}
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
                        readonly={read_only}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Last Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <select
                        bind:value={info.gender}
                        disabled={read_only}
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
                        readonly={read_only}
                        bind:value={info.date_of_birth}
                        max={new Date().toISOString().split('T')[0]}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Date of Birth*"
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
                        readonly={read_only}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Middle Name"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="suffix"
                        bind:value={info.name_suffix}
                        readonly={read_only}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Suffix"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="address"
                        bind:value={info.address}
                        readonly={read_only}
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
                        readonly={read_only}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Phone Number*"
                        minlength="11"
                        maxlength="13"
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

                <div class="mb-2">
                    <div class="flex w-full">
                        <input
                            type="number"
                            id="residency-value"
                            bind:value={period_of_residency_value}
                            readonly={read_only}
                            class="form-input rounded-l-md bg-gray-50 border border-gray-300 text-gray-900"
                            placeholder="Period of Residency*"
                            min="1"
                            required
                        />
                        <select
                            id="residency-unit"
                            bind:value={period_of_residency_unit}
                            disabled={read_only}
                            class="form-select rounded-r-md bg-gray-50 border border-gray-300 text-gray-900 w-full"
                            required
                        >
                            <option value="" disabled selected
                                >Select Unit*</option
                            >
                            <option value="days">Day(s)</option>
                            <option value="weeks">Week(s)</option>
                            <option value="months">Month(s)</option>
                            <option value="years">Year(s)</option>
                        </select>
                    </div>
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
