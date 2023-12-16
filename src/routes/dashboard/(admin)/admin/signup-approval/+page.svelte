<script>
    import { onMount } from 'svelte'
    import { invalidateAll } from '$app/navigation'
    import toast, { Toaster } from 'svelte-french-toast'

    let info = [];

    onMount(async () => {
        try {
            const response = await fetch(
                'API LINK',
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
                info = json_response.data
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
</script>

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

            {#each info as tinfo (info._id)}
                <tr>
                    <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <div class="pl-3">
                            <div class="text-base font-semibold">
                                {` ${info.user_data.first_name} ${info.middle_name} ${info.user_data.last_name}`}
                            </div>
                        </div>
                    </th>
                    <td class="px-6 py-3">
                        {info.gender}
                    </td>
                    <td class="px-6 py-3">
                        {info.birthday}
                    </td>
                    <td class="px-6 py-3">
                        {info.address}
                    </td>
                    <td class="px-6 py-3">
                        {info.period_of_residency}
                    </td>
                    <td class="px-6 py-3">
                        {info.contact}
                    </td>
                    <a
                        href="#"
                        on:click={approve}
                        class="font-medium pr-2 text-green-600 dark:text-green-400 hover:underline"
                        >Approve</a
                    >
                    <a
                    href="#"
                    on:click={reject}
                    class="font-medium pr-2 text-red-600 dark:text-red-400 hover:underline"
                    >Reject</a
                >
                </tr>
            {/each}
        </table>
</div>