<script>
    import { onMount } from 'svelte'
    import { invalidateAll } from '$app/navigation'
    import toast, { Toaster } from 'svelte-french-toast'

    let infos = []

    onMount(async () => {
        try {
            const response = await fetch(
                'https://itsmenewbie03.is-a.dev/appt/api/user/pending/list',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token',
                        )}`,
                    },
                },
            )

            if (response.ok) {
                let json_response = await response.json()
                infos = json_response.data
            } else {
                console.error(
                    'Failed to fetch transaction data:',
                    response.status,
                    response.statusText,
                )
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error.message)
        }
    })
    const approve = async (id) => {
        const endpoint = `https://itsmenewbie03.is-a.dev/appt/api/user/pending/approve`
        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                id: id,
            }),
        }
        const resp = await fetch(endpoint, opts).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status === 200 ? toast.success : toast.error
        _alert(body.message)
        if (status === 200) {
            // TODO: delete the approved entry from the list
            infos = infos.filter((info) => info._id !== id)
        }
    }
    const reject = async (id) => {
        const endpoint = `https://itsmenewbie03.is-a.dev/appt/api/user/pending/reject`
        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                id: id,
            }),
        }
        const resp = await fetch(endpoint, opts).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status === 200 ? toast.success : toast.error
        _alert(body.message)
        if (status === 200) {
            // TODO: delete the approved entry from the list
            infos = infos.filter((info) => info._id !== id)
        }
    }
</script>

<Toaster />
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-50 uppercase bg-green-400">
            <tr>
                <th scope="col" class="px-6 py-3"> Name </th>
                <th scope="col" class="px-6 py-3"> Gender </th>
                <th scope="col" class="px-6 py-3"> Birthday </th>
                <th scope="col" class="px-6 py-3"> Address </th>
                <th scope="col" class="px-6 py-3"> Period of Residency </th>
                <th scope="col" class="px-6 py-3"> Contact </th>
                <th scope="col" class="px-6 py-3"> Action </th>
            </tr>
        </thead>
        <!-- Example tbody 
      Now do the integration magik  -->

        {#each infos as info (info._id)}
            <tr>
                <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                    <div class="pl-3">
                        <div class="text-base font-semibold">
                            <!-- NOTE: print the name properly even when middle_name is missing -->
                            {` ${info.info[0].first_name} ${
                                info.info[0].middle_name
                                    ? info.info[0].middle_name + ' '
                                    : ' '
                            }${info.info[0].last_name}`}
                        </div>
                    </div>
                </th>
                <td class="px-6 py-3">
                    {info.info[0].gender}
                </td>
                <td class="px-6 py-3">
                    {info.info[0].date_of_birth}
                </td>
                <td class="px-6 py-3">
                    {info.info[0].address}
                </td>
                <td class="px-6 py-3">
                    {info.info[0].period_of_residency}
                </td>
                <td class="px-6 py-3">
                    {info.info[0].phone_number}
                </td>
                <a
                    href="#"
                    on:click={approve(info._id)}
                    class="font-medium pr-2 text-green-600 dark:text-green-400 hover:underline"
                    >Approve</a
                >
                <a
                    href="#"
                    on:click={reject(info._id)}
                    class="font-medium pr-2 text-red-600 dark:text-red-400 hover:underline"
                    >Reject</a
                >
            </tr>
        {/each}
    </table>
</div>
