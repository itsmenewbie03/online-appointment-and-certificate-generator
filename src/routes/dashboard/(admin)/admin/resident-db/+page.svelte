<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import toast, { Toaster } from 'svelte-french-toast'
    let residents = []
    let filteredResidents = []

    const format_date = (dateString) => {
        const originalDate = new Date(dateString)
        const formattedDate = originalDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        return formattedDate
    }

    onMount(async () => {
        try {
            const response = await fetch(
                'https://itsmenewbie03.is-a.dev/appt/api/data/resident/list',
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
                residents = json_response.data
                filterResidents() // Populate the initial filteredResidents
            } else {
                console.error(
                    'Failed to fetch resident data:',
                    response.status,
                    response.statusText,
                )
            }
        } catch (error) {
            console.error('Error fetching resident data:', error.message)
        }
    })

    const edit_resident = (id) => {
        console.log(`EDIT RESIDENT DIZZ: ${id}`)
        goto(`/dashboard/admin/create/${id}`)
    }

    const delete_resident = async (id) => {
        const endpoint =
            'https://itsmenewbie03.is-a.dev/appt/api/data/resident/delete'
        const opts = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                resident_id: id,
            }),
        }

        const resp = await fetch(endpoint, opts).then(async (res) => {
            return { message: await res.json(), status: res.status }
        })
        const { message, status } = resp
        const _alert = status === 200 ? toast.success : toast.error
        _alert(message.message)

        residents = residents.filter((resident) => resident._id !== id)
    }
    //Edit Modal
    let showModal = false

    function toggleModal() {
        showModal = !showModal
    }

    let searchKey = ''

    function filterResidents() {
        filteredResidents = residents.filter((resident) => {
            const fullName = `${resident.first_name} ${
                resident.middle_name || ''
            } ${resident.last_name}`.toUpperCase()
            return (
                fullName.includes(searchKey.toUpperCase()) ||
                searchKey.trim() === ''
            )
        })
    }
</script>

<Toaster />
<div class="px-4 py-8 sm:px-6 md:px-8 lg:px-12">
    <div class="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div class="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <label for="default-search" class="sr-only">Search</label>
            <div class="relative">
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
                    id="searchKey"
                    class="block w-full sm:w-64 p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Resident Database"
                    bind:value={searchKey}
                    on:input={filterResidents}
                />
            </div>
        </div>
        <!-- Create New Account Button -->
        <div class="flex justify-end">
            <a href="/dashboard/admin/create-resident">
                <button
                    type="button"
                    class="text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >
                    Add New Resident
                </button>
            </a>
            <a href="/dashboard/admin/create">
                <button
                    type="button"
                    class="ml-2 text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >
                    Create New Account
                </button>
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-gray-500">
            <thead class="text-xs text-gray-50 uppercase bg-green-400">
                <tr>
                    <th scope="col" class="px-6 py-3"> Name </th>
                    <th scope="col" class="px-6 py-3"> Date of Birth </th>
                    <th scope="col" class="px-6 py-3"> Address </th>
                    <th scope="col" class="px-6 py-3"> Period of Residency </th>
                    <th scope="col" class="px-6 py-3"> Phone Number </th>
                    <th scope="col" class="px-6 py-3 text-right">
                        Actions
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each residents as resident (resident._id)}
                    {#if filteredResidents.includes(resident) || searchKey === ''}
                        <tr>
                            <td class="px-6 py-3"
                                >{`${resident.first_name} ${
                                    resident?.middle_name
                                        ? resident?.middle_name + ' '
                                        : ''
                                }${resident.last_name}`}</td
                            >
                            <td class="px-6 py-3"
                                >{format_date(resident.date_of_birth)}</td
                            >
                            <td class="px-6 py-3">{resident.address}</td>
                            <td class="px-6 py-3"
                                >{resident.period_of_residency}</td
                            >
                            <td class="px-6 py-3">{resident.phone_number}</td>
                            <td class="px-6 py-4 text-right">
                                <a
                                    on:click={() => {
                                        edit_resident(resident._id)
                                    }}
                                    href="#"
                                    class="font-medium pr-2 text-blue-600 dark:text-blue-500 hover:underline"
                                    >Edit</a
                                >
                                <a
                                    on:click={() => {
                                        delete_resident(resident._id)
                                    }}
                                    href="#"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >Delete</a
                                >
                            </td>
                        </tr>
                    {/if}
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
