<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'

    let notifications = []

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

    // Function to mark notification as read
    const markAsRead = async (id) => {
        const endpoint =
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/user/notifications/mark_as_read'
        const opts = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                notification_id: id,
            }),
        }
        const resp = await fetch(endpoint, opts).then((res) => res.json())
        toast.success(resp.message)
        // INFO: mark notification as read based on the id
        notifications = notifications.map((notification) => {
            if (notification._id == id) {
                notification.read = true
            }
            return notification
        })
    }
    // Simulating fetching notifications from an API or database
    onMount(async () => {
        const resp = await fetch(
            'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/user/notifications/list',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'access_token',
                    )}`,
                },
            },
        ).then((res) => res.json())
        console.log(`[NOTIFICATION_LIST]: ${JSON.stringify(resp)}`)
        notifications = resp.data
    })
</script>

<Toaster />
<table class="min-w-full divide-y divide-green-300">
    <thead class="bg-green-500">
        <tr>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
            >
                Notifications
            </th>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
            >
                Status
            </th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each notifications as notification}
            <tr class={!notification.read ? 'bg-yellow-100' : ''}>
                <td class="px-6 py-4 whitespace-nowrap flex flex-col gap-2">
                    <div class="text-sm text-gray-900">
                        {notification.message}
                    </div>
                    <div class="text-sm text-gray-900">
                        {format_date(notification.timestamp)}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {#if !notification.read}
                        <button
                            class="text-sm font-medium text-blue-600 hover:text-blue-900 focus:outline-none"
                            on:click={async () =>
                                await markAsRead(notification._id)}
                        >
                            Mark as Read
                        </button>
                    {:else}
                        <span class="text-sm font-medium text-gray-500"
                            >Read</span
                        >
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>
