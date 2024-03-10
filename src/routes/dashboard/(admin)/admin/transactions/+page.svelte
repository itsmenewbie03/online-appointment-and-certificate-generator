<script>
    import { onMount } from 'svelte'
    import toast, { Toaster } from 'svelte-french-toast'
    import jsPDF from 'jspdf'

    let current_status
    let target_id
    let delete_target_id
    let or_number
    let req_body

    let transactions = []
    // NOTE: filtering magic xD
    let startDate = ''
    let endDate = ''

    let filteredTransactions = []

    const filterTransactions = () => {
        if (!startDate || !endDate) {
            console.log('Please select a date range')
            return
        }
        console.log(`[START_DATE]: ${startDate}`)
        console.log(`[END_DATE]: ${endDate}`)

        filteredTransactions = transactions.filter((transaction) => {
            const date = new Date(transaction.date).getTime()
            return (
                date >= new Date(startDate).getTime() &&
                date <= new Date(endDate).getTime()
            )
        })
    }
    // TODO: call the api to generate the report, we pass the filtered request

    const generateReport = async () => {
        // ... existing code for generating PDF (assuming element with ID 'tableContent') is not included here

        const appointments = filteredTransactions
        if (!appointments.length) {
            console.log('No appointments to generate report')
            return
        }

        // Format text data (replace with your desired text formatting logic)
        let textData = `Transaction Report\n`
        textData += `Date Range: ${new Date(
            appointments[0].date,
        ).toLocaleDateString()} - ${new Date(
            appointments[appointments.length - 1].date,
        ).toLocaleDateString()}\n\n`
        textData += `Document Request Count\n`
        const documentTypeCounts = appointments.reduce((acc, appointment) => {
            const type = appointment.document_data.type
            acc[type] = (acc[type] || 0) + 1
            return acc
        }, {})
        for (const type in documentTypeCounts) {
            textData += `${type}: ${documentTypeCounts[type]}\n`
        }
        textData += `Total Transactions: ${appointments.length}\n\n`
        textData += `Generated at ${new Date().toLocaleString()}\n`

        console.log(textData)

        // Create a temporary canvas element to hold the text
        const container = document.createElement('div')
        // Create a paragraph element and set its content
        const p = document.createElement('p')
        p.innerHTML = textData.replace(/\n/g, '<br>') // Use textContent for plain text (avoids HTML parsing)

        // Append the paragraph to the container
        container.appendChild(p)

        // Add the container to the document body (temporary placement)
        document.body.appendChild(container)

        // Convert the container's content to PDF using jsPDF
        const doc = new jsPDF()
        await doc.html(container, {
            callback: function (doc) {
                // Optional: Add page breaks if content overflows a page
                if (doc.internal.pageSize.height < doc.contentHeight) {
                    doc.addPage()
                }
            },
        })
        doc.save('report.pdf')
        document.body.removeChild(container)
    }
    onMount(async () => {
        try {
            const response = await fetch(
                'https://itsmenewbie03.is-a.dev/appt/api/transactions/list',
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
                transactions = json_response.data
                filteredTransactions = transactions
            } else {
                console.error(
                    'Failed to fetch transaction data:',
                    response.status,
                    response.statusText,
                )
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error.message)
        }
    })

    const generateDoc = async () => {
        const endpoint =
            'https://itsmenewbie03.is-a.dev/appt/api/documents/generate'
        console.log(`[REQ_BODY]: ${JSON.stringify(req_body)}`)
        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(req_body),
        }
        const resp = await fetch(endpoint, opts).then(async (res) => {
            return { status: res.status, body: await res.json() }
        })
        const { status, body } = resp
        const _alert = status === 200 ? toast.success : toast.error
        _alert(body.message)
        download(
            body.document,
            `${req_body.user_data.last_name}_${req_body.document_data.type}.docx`,
        )
        toggleGenerate()
    }

    // NOTE: convert base64 to blob
    const base64ToBlob = (base64) => {
        const raw = window.atob(base64)
        const rawLength = raw.length
        const uInt8Array = new Uint8Array(rawLength)
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }
        const contentType = 'application/docx'
        return new Blob([uInt8Array], { type: contentType })
    }

    // NOTE: creat a function that takes a base 64 string and converts it to a blob and downloads it
    const download = (base64, filename) => {
        const blob = base64ToBlob(base64)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }

    const update_status = async () => {
        const endpoint =
            'https://itsmenewbie03.is-a.dev/appt/api/transactions/update'
        const opts = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                id: target_id,
                status: current_status,
            }),
        }

        const resp = await fetch(endpoint, opts).then((res) => res.json())
        // TODO: make this display in the frontend pretty xD
        console.log(`UPDATE DIZZ: ${resp.message}`)
        transactions = transactions.map((transaction) =>
            transaction._id === target_id
                ? { ...transaction, status: current_status }
                : transaction,
        )
        toggleModal()
    }
    const delete_status = async () => {
        const endpoint =
            'https://itsmenewbie03.is-a.dev/appt/api/transactions/delete'
        const opts = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                transaction_id: delete_target_id,
            }),
        }

        const resp = await fetch(endpoint, opts).then((res) => res.json())
        // TODO: make this display in the frontend pretty xD
        console.log(`DELETE DIZZ: ${resp.message}`)
        transactions = transactions.filter(
            (transaction) => transaction._id !== delete_target_id,
        )
        // await invalidateAll();
        hide_delete_modal()
    }
    const format_date = (dateString) => {
        const originalDate = new Date(dateString)
        const formattedDate = originalDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        return formattedDate
    }
    // TODO: we got a copy of the transaction here
    // lets parse this xD
    const show_generate_modal = (transaction) => {
        // INFO: lets prepare the request body
        req_body = transaction
        toggleGenerate()
    }

    const show_edit_modal = (id, status) => {
        console.log(`edit dizz: ${id} with status ${status}`)
        target_id = id
        current_status = status
        toggleModal()
    }

    const show_delete_modal = (id) => {
        console.log(`DELETE TARGET: ${id}`)
        delete_target_id = id
        showDeleteModal()
    }

    const hide_delete_modal = () => {
        hideDeleteModal()
    }

    //Edit Modal
    let generateModal = false
    let showModal = false
    let deleteModal = false

    const toggleGenerate = () => {
        generateModal = !generateModal
    }
    function toggleModal() {
        showModal = !showModal
    }

    const showDeleteModal = () => {
        deleteModal = !deleteModal
    }

    const hideDeleteModal = () => {
        deleteModal = false
    }
</script>

<Toaster />

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div class="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <input type="datetime-local" bind:value={startDate} />
            <input type="datetime-local" bind:value={endDate} />
            <button
                type="button"
                on:click={filterTransactions}
                class="ml-2 text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >Filter</button
            >

            <button
                type="button"
                on:click={generateReport}
                class="ml-2 text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                >Generate & Download Report</button
            >
        </div>
    </div>
    <table
        id="tableContent"
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
        <thead class="text-xs text-gray-50 uppercase bg-green-400">
            <tr>
                <th scope="col" class="px-6 py-3"> Name & Document </th>
                <th scope="col" class="px-6 py-3"> Appointment Status </th>
                <th scope="col" class="px-6 py-3"> Date </th>
                <th scope="col" class="px-6 py-3 text-right"> Actions </th>
            </tr>
        </thead>
        <!-- Example tbody Now do the integration magik  -->

        <!-- Profile Picture, First Name Last Name, Document -->
        <!-- Dropdown with correct and incorrect -->
        <!-- Date -->
        <!-- Edit, Delete -->
        {#each filteredTransactions as transaction (transaction._id)}
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
                        href="#"
                        on:click={show_generate_modal(transaction)}
                        class="font-medium pr-2 text-green-600 dark:text-green-400 hover:underline"
                        >Generate</a
                    >
                    <a
                        on:click={() => {
                            show_edit_modal(transaction._id, transaction.status)
                        }}
                        href="#"
                        class="font-medium pr-2 text-blue-600 dark:text-blue-500 hover:underline"
                        >Edit</a
                    >
                    <a
                        on:click={() => {
                            show_delete_modal(transaction._id)
                        }}
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

{#if generateModal}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="bg-white p-8 rounded-lg">
            <h2 class="text-2xl mb-4">Generate Document</h2>
            <label for=""
                >Please enter OR Number leave blank if the document is free</label
            >
            <br />
            <input type="text" bind:value={or_number} />
            <br />
            <button
                class="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
                on:click={async () => {
                    await generateDoc()
                }}
            >
                Confirm
            </button>

            <button
                class="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
                on:click={() => {
                    toggleGenerate()
                }}
            >
                Cancel
            </button>
        </div>
    </div>
{/if}

{#if showModal}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="bg-white p-8 rounded-lg">
            <h2 class="text-2xl mb-4">Edit</h2>
            <p>This is a simple modal for: {target_id}</p>
            <select bind:value={current_status}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
                <option value="waiting for payment">Waiting for Payment</option>
            </select>
            <button
                class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                on:click={async () => {
                    await update_status()
                }}
            >
                Update Status
            </button>
        </div>
    </div>
{/if}

{#if deleteModal}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="bg-white p-8 rounded-lg">
            <h2 class="text-2xl mb-4">Delete</h2>
            <p>This is a simple modal delete for: {delete_target_id}</p>
            <button
                class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                on:click={async () => {
                    await delete_status()
                }}
            >
                Confirm Delete
            </button>
            <button
                class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                on:click={() => {
                    hide_delete_modal()
                }}
            >
                Cancel
            </button>
        </div>
    </div>
{/if}
