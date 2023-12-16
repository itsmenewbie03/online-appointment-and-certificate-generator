<script>
    import { onMount } from 'svelte'
    let documents = []
    let date
    let document_id
    const handle_submit = async (event) => {
        event.preventDefault()
        const endpoint =
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/transactions/create'

        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                document_id: document_id,
                date: date,
            }),
        }
        // console.log(`WE ARE SENDING THIS TO BACKEND: ${opts.body}`)
        const resp = await fetch(endpoint, opts).then((res) => res.json())
        console.log(`[CREATE_APPOINTMENT_RESP]: ${JSON.stringify(resp)}`)
    }
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
</script>

<div class="max-w-xl mx-auto mt-10 px-4">
    <div class="bg-white border border-gray-200 rounded-lg shadow-md">
        <form class="p-4 md:p-6 space-y-4 md:space-y-6" on:submit={handle_submit}>
            <div>
                <label for="dropdown1" class="block text-sm font-medium text-gray-700">Select document type</label>
                <select
                    bind:value={document_id}
                    id="dropdown1"
                    class="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 border p-2.5"
                    required
                >
                    <option value="" disabled selected>Select document type...</option>
                    {#each documents as document}
                        <option value={document._id}>{document.type}</option>
                    {/each}
                    <!-- TODO: load document list from API -->
                </select>
            </div>
            <div>
                <label for="date" class="block text-sm font-medium text-gray-700">Date and Time</label>
                <input
                    type="datetime-local"
                    name="date"
                    bind:value={date}
                    class="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 border p-2.5"
                    required
                />
            </div>

            <!-- CALENDAR STUFF -->

            <div class="flex flex-col md:flex-row md:justify-center md:space-x-4">
                <button
                    type="button"
                    class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-2 md:mt-0"
                >Cancel</button>
                <button
                    id="create-account"
                    type="submit"
                    class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-2 md:mt-0"
                >Create Appointment</button>
            </div>
        </form>
    </div>
</div>

