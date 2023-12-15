<script>
    let isDropdownVisible = false

    function toggleDropdown() {
        isDropdownVisible = !isDropdownVisible
    }

    import { onMount } from 'svelte';
  
  let notification = {
    unread: true, // Initially, the message is unread
  };

  function markAsRead() {
    notification.unread = false; // Mark the message as read
  }

  onMount(() => {
    // Simulating an API call or some delay to receive the message
    setTimeout(() => {
      // Set notification to unread after some delay (simulating new message)
      notification.unread = true;
    }, 3000);
  });
</script>

<nav class="bg-green-500 border-green-500 dark:bg-gray-900">
    <div class="flex items-center justify-between py-4 px-6 bg-gray-200">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {#if notification.unread}
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="18" cy="6" r="3" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10.5V12a3 3 0 01-3 3H9.5m9.5-6v6m0 0v6m0-6h6m-6 0H12a3 3 0 00-3 3v1.5"/>
              </svg>
              <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
          {/if}
        </div>
        <button
          on:click={markAsRead}
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          disabled={!notification.unread}
        >
          Mark as Read
        </button>
    <div class="flex items-center justify-between mx-auto p-4">
        <button
            data-drawer-target="sidebar-multi-level-sidebar"
            data-drawer-toggle="sidebar-multi-level-sidebar"
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
            <span class="sr-only">Open sidebar</span>
            <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <img src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png" alt="" />
            </svg>
        </button>
        
        <div class="ml-auto">
            <a href="profile">
                <button
                    type="button"
                    class="text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                >
                    <span class="sr-only">Open user menu</span>
                    <img
                        class="w-8 h-8 rounded-full"
                        src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png"
                        alt="user photo"
                    />
                </button>
            </a>
        </div>
    </div>
</nav>

<aside
    id="sidebar-multi-level-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
>
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
            <li>
                <div class="flex items-center pl-8">
                    <img
                        src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png"
                        alt=""
                    />
                </div>
            </li>
            <li>
                <a
                    href="/create-appointment"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="ml-3">Create Appointment</span>
                </a>
            </li>
            <li>
                <a
                    href="/follow-up"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="ml-3">Follow Up</span>
                </a>
            </li>
            <li>
                <a
                    href="/status"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="ml-3">Status</span>
                </a>
            </li>
            <li>
                <a
                    href="/transaction"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="flex-1 ml-3 whitespace-nowrap"
                        >Transaction</span
                    >
                </a>
            </li>
        </ul>
    </div>
</aside>

<div class="p-4 pt-10 sm:ml-64">
    <slot />
</div>
