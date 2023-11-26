<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let residents = [];
  const format_date = (dateString) => {
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
  onMount(async () => {
    try {
      const response = await fetch(
        "https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/data/resident/list",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (response.ok) {
        let json_response = await response.json();
        residents = json_response.data;
      } else {
        console.error(
          "Failed to fetch resident data:",
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Error fetching resident data:", error.message);
    }
  });
  const edit_resident = (id) => {
    console.log(`EDIT RESIDENT DIZZ: ${id}`);
    goto(`/create/${id}`);
  };

  //Edit Modal
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<div class="relative py-12 place-items-center">
  <div class="flex justify-between items-center w-full mb-4">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div class="relative mb-4 mr-[60%]">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
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
        <button
          type="button"
          class="text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
        >
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
          <th scope="col" class="px-6 py-3 text-right">
            Actions
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each residents as resident (resident._id)}
          <tr>
            <td class="px-6 py-3"
              >{`${resident.first_name} ${
                resident?.middle_name ? resident?.middle_name + " " : ""
              }${resident.last_name}`}</td
            >
            <td class="px-6 py-3">{format_date(resident.date_of_birth)}</td>
            <td class="px-6 py-3">{resident.address}</td>
            <td class="px-6 py-3">{resident.period_of_residency}</td>
            <td class="px-6 py-3">{resident.email}</td>
            <td class="px-6 py-3">{resident.phone_number}</td>
            <td class="px-6 py-4 text-right">
              <a
                on:click={() => {
                  edit_resident(resident._id);
                }}
                href="#"
                class="font-medium pr-2 text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >Delete</a
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<!-- Edit Modal -->

<!-- Edit Modal -->
{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl mb-4">Edit Resident</h2>
      <form>
        <!-- <label for="firstName">First Name:</label>
        <input type="text" id="firstName" bind:value={Resident.first_name} />

        <label for="middleName">Middle Name:</label>
        <input type="text" id="middleName" bind:value={editedResident.middle_name} />

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" bind:value={editedResident.last_name} />

        <label for="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" bind:value={editedResident.date_of_birth} />

        <label for="address">Address:</label>
        <input type="text" id="address" bind:value={editedResident.address} />

        <label for="periodOfResidency">Period of Residency:</label>
        <input type="text" id="periodOfResidency" bind:value={editedResident.period_of_residency} />

        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={editedResident.email} />

        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" bind:value={editedResident.phone_number} /> -->

        <button
          class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
          on:click={toggleModal}
        >
          Save Changes
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
          on:click={toggleModal}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
{/if}
