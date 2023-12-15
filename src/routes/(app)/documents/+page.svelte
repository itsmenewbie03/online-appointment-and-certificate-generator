<script>
    let document;
</script>

<main>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-50 uppercase bg-green-400">
                <tr>
                    <th scope="col" class="px-6 py-3"> Document Name </th>
                    <th scope="col" class="px-6 py-3 text-right"> Actions </th>
                </tr>
            </thead>
            <tr>
                <td class="px-6 py-3">
                    {` ${document} `}
                </td>
                <td class="px-6 py-4 text-right">
                    <a
                        on:click={() => {
                            show_delete_modal(document)
                        }}
                        href="#"
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >Delete</a
                    >
                </td>
            </tr>
        </table>
    </div>
</main>