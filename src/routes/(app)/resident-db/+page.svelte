<script>
  import { onMount } from 'svelte';

  let residents = [];

  onMount(async () => {
    try {
      const response = await fetch("https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/data/resident/list");

      //Getting Unauthorized access 401 errors
      //might need to make it that it is the admin looking O.O
      if (response.ok) {
        residents = await response.json();
      } else {
        console.error("Failed to fetch resident data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching resident data:", error.message);
    }
  });
</script>

<div class="relative py-12 place-items-center">
  <div class="flex justify-between items-center w-full mb-4">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
      Search
    </label>
    <div class="relative mb-4 mr-[60%]">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search Resident Database"
        required
      />
    </div>
    <div class="flex justify-end mb-2">
      <a href="/create">
        <button type="button" class="text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800">
          Create New Account
        </button>
      </a>
    </div>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-50 uppercase bg-green-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> Date of Birth </th>
          <th scope="col" class="px-6 py-3"> Address </th>
          <th scope="col" class="px-6 py-3"> Period of Residency </th>
          <th scope="col" class="px-6 py-3"> Email </th>
          <th scope="col" class="px-6 py-3"> Phone Number </th>
          <th scope="col" class="px-6 py-3">
            Actions
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each residents as resident (resident._id)}
          <tr>
            <td class="px-6 py-3">{resident.name}</td>
            <td class="px-6 py-3">{resident.dateOfBirth}</td>
            <td class="px-6 py-3">{resident.address}</td>
            <td class="px-6 py-3">{resident.periodOfResidency}</td>
            <td class="px-6 py-3">{resident.email}</td>
            <td class="px-6 py-3">{resident.phoneNumber}</td>
            <td class="px-6 py-3">Actions</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
