<script>
    let documents;
    let createDocument;
    let isDropdownVisible = false

    function toggleDropdown() {
        isDropdownVisible = !isDropdownVisible
    }
</script>

<nav class="bg-green-500 border-green-500 dark:bg-gray-900">
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
                    href="/"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="ml-3">Home</span>
                </a>
            </li>
            <li>
                    <select bind:value={documents} id="dropdown-example"    class="flex items-center w-full border-none text-base bg-gray-50 text-gray-600 transition duration-75 rounded-lg group hover:bg-green-300 dark:text-white dark:hover:bg-gray-700">
                        <option value="">
                            Documents
                        </option>

                        <option value={createDocument}>
                            <a
                                href="/create-document"
                                class="flex items-center w-full p-2 text-gray-600  transition duration-75 rounded-lg pl-11 group hover:bg-green-300 dark:text-white dark:hover:bg-gray-700"
                                >Create a document</a
                            >
                        </option>
                    </select>
            </li>
            <li>
                <a
                    href="/transactions"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="flex-1 ml-3 whitespace-nowrap"
                        >Transactions</span
                    >
                </a>
            </li>
            <li>
                <a
                    href="/concerns"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="flex-1 ml-3 whitespace-nowrap"
                        >Follow up concern/s</span
                    >
                </a>
            </li>
            <li>
                <a
                    href="/resident-db"
                    class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-gray-700 group"
                >
                    <span class="flex-1 ml-3 whitespace-nowrap"
                        >Resident database</span
                    >
                </a>
            </li>
        </ul>
    </div>
</aside>

<div class="p-4 pt-10 sm:ml-64">
    <slot />
</div>
