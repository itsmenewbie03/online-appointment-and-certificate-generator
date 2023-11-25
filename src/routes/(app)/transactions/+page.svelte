<script>
  import { onMount } from "svelte";

  let transactions = [];
  onMount(async () => {
    try {
      const response = await fetch(
        "https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/transactions/list",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        let json_response = await response.json();
        transactions = json_response.data;
      } else {
        console.error(
          "Failed to fetch transaction data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error.message);
    }
  });

  const format_date = (dateString) => {
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  //Edit Modal
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-50 uppercase bg-green-400">
      <tr>
        <th scope="col" class="px-6 py-3"> Name & Document </th>
        <th scope="col" class="px-6 py-3"> Appointment Status </th>
        <th scope="col" class="px-6 py-3"> Date </th>
        <th scope="col" class="px-6 py-3 text-right"> Actions </th>
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
        <td class="px-6 py-4 text-right">
          <a
            on:click={toggleModal}
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

  </table>
</div>

<!-- Edit Modal -->

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl mb-4">Modal Content</h2>
      <p>This is a simple modal.</p>
      {#each transactions as transaction (transaction._id)}
        <select bind:value={transaction.status}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="waiting for payment">Waiting for Payment</option>
        </select>
      {/each}
      <button
        class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        on:click={toggleModal}
      >
        Close Modal
      </button>
    </div>
  </div>
{/if}
