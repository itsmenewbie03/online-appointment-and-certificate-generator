<script>
    import { onMount } from 'svelte'
    import { invalidateAll } from '$app/navigation'
    import toast, { Toaster } from 'svelte-french-toast'
    let current_status
    let target_id
    let delete_target_id

    let transactions = []

    const format_date = (dateString) => {
        console.log(`[DATE_STRING]: ${dateString}`)
        const originalDate = new Date(dateString)
        const formattedDate = originalDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Manila',
            timeZoneName: 'short',
        })
        return formattedDate
    }

    onMount(async () => {
        try {
            const response = await fetch(
                'https://itsmenewbie03.is-a.dev/appt/api/transactions/user/list',
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
                transactions = json_response.data
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
                <th scope="col" class="px-6 py-3"> Name & Document </th>
                <th scope="col" class="px-6 py-3"> Appointment Status </th>
                <th scope="col" class="px-6 py-3"> Date </th>
            </tr>
        </thead>
        <!-- Example tbody 
      Now do the integration magik  -->

        <!-- Profile Picture, First Name Last Name, Document -->
        <!-- Dropdown with correct and incorrect -->
        <!-- Date -->
        <!-- Edit, Delete -->
        {#each transactions as transaction (transaction._id)}
            <tr>
                <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                    <div class="pl-3">
                        <div class="text-base font-semibold">
                            {` ${transaction.user_data.first_name} ${transaction.user_data.last_name}`}
                        </div>
                        <div class="font-normal text-gray-500">
                            {transaction.document_data.type}
                        </div>
                    </div>
                </th>
                <td class="px-6 py-3">
                    {transaction.status}
                </td>
                <td class="px-6 py-3">{format_date(transaction.date)}</td>
            </tr>
        {/each}
    </table>
</div>
