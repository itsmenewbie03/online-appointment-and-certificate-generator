<script>
  import { onMount } from 'svelte';

  let notifications = [
    { id: 1, message: 'Notification 1', unread: true },
    { id: 2, message: 'Notification 2', unread: false },
    { id: 3, message: 'Notification 3', unread: true }
  ];

  // Function to mark notification as read
  function markAsRead(id) {
    const notificationIndex = notifications.findIndex((n) => n.id === id);
    if (notificationIndex !== -1) {
      notifications[notificationIndex].unread = false;
    }
  }

  // Simulating fetching notifications from an API or database
  onMount(async () => {
    // Here you could fetch notifications from an API/database
    // For demonstration purposes, using static data
    // Replace this with your actual fetching mechanism
    // For example:
    // const response = await fetch('your-api-endpoint');
    // notifications = await response.json();
  });
</script>

<table class="min-w-full divide-y divide-green-300">
  <thead class="bg-green-500">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
        Notifications
      </th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
        Status
      </th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each notifications as notification}
      <tr class={notification.unread ? 'bg-yellow-100' : ''}>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{notification.message}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          {#if notification.unread}
            <button
              class="text-sm font-medium text-blue-600 hover:text-blue-900 focus:outline-none"
              on:click={() => markAsRead(notification.id)}
            >
              Mark as Read
            </button>
          {:else}
            <span class="text-sm font-medium text-gray-500">Read</span>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
