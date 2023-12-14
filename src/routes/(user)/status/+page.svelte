<script>
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
  </div>
  
  <style>
    /* You can add additional styling here if needed */
  </style>
  