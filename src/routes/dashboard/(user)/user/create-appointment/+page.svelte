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

<div
    class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow"
>
    <div>
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
                            <!-- content here -->
                        {/each}
                        <!-- TODO: load document list from API -->
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <!-- TODO: add style here pls -->
                    <label for="date">DATE and TIME</label>
                    <input
                        type="datetime-local"
                        name="date"
                        bind:value={date}
                        required
                    />
                </div>
            </div>

            <!-- CALANDER STUFF (do we api or nah) -->

            <div class="col-span-2 flex justify-center">
                <button
                    type="button"
                    class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4"
                    >Cancel</button
                >
                <button
                    id="create-account"
                    type="submit"
                    class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-4"
                    >Create Appointment</button
                >
            </div>
        </form>
    </div>
</div>
