<script>
    import Radio from '$components/Radio.svelte'
    import toast, { Toaster } from 'svelte-french-toast'

    let document_type
    let file

    const options = [
        {
            value: 'paid',
            label: 'Paid',
        },
        {
            value: 'free',
            label: 'Free',
        },
    ]

    let document_name = ''
    let required_data = []

    const handleFileChange = (event) => {
        file = event.target.files?.[0]
    }

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value

        if (event.target.checked) {
            required_data = [...required_data, checkboxValue]
        } else {
            required_data = required_data.filter(
                (value) => value !== checkboxValue,
            )
        }
    }

    const handleSubmit = async () => {
        if (!file) {
            toast.error('Please select a file.')
            return
        }

        // Read the file as a base64 string
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64Data = reader.result?.toString().split(',')[1]

            if (!base64Data) {
                toast.error('Failed to read the file.')
                return
            }

            const formData = {
                file: base64Data,
                required_data: required_data,
                document_name: document_name,
                document_type: document_type,
            }

            try {
                const resp = await fetch(
                    'https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/documents/create',
                    {
                        method: 'POST',

                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'access_token',
                            )}`,
                        },
                        body: JSON.stringify(formData),
                    },
                ).then(async (res) => {
                    return {
                        status: res.status,
                        body: await res.json(),
                    }
                })

                const _alert = resp.status == 200 ? toast.success : toast.error
                _alert(resp.body.message)
            } catch (error) {
                toast.error(`Error uploading file: ${error}`)
            }
        }
    }
</script>

<main>
    <Toaster />
    <div class="grid place-items-center">
        <div
            class=" max-w-sm py-[60px] w-2/3 px-12 bg-white border border-gray-200 rounded-lg shadow"
        >
            <form on:submit|preventDefault={handleSubmit}>
                <Radio
                    {options}
                    fontSize={16}
                    legend="Document Type"
                    bind:userSelected={document_type}
                />
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    name="file"
                    accept=".doc, .docx"
                    id="file"
                    on:change={handleFileChange}
                />

                <label for="description">Document Name</label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    bind:value={document_name}
                    id="description"
                    required
                />
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <!-- Example of a single checkbox styled using Tailwind -->
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="first_name"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">First Name</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="middle_name"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Middle Name</span>
                        </label>
                    </div>
                    <!-- Repeated structure for other checkboxes -->
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="last_name"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Last Name</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="gender"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Gender</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="date_of_birth"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Date of Birth</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="address"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Address</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="period_of_residency"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Period of Residency</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="phone_number"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">Phone Number</span>
                        </label>
                    </div>

                    <div>
                        <label class="flex items-center">
                            <input
                                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                type="checkbox"
                                value="or_number"
                                on:change={handleCheckboxChange}
                            />
                            <span class="ml-2">OR Number</span>
                        </label>
                    </div>
                    <!-- Additional checkboxes can be added similarly -->
                </div>

                <!--PLEASE DO Add more checkboxes coz it's needed -->

                <button
                    class="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="submit">Upload</button
                >
            </form>
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        margin-top: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: 0 auto;
    }

    label {
        margin-top: 0.5rem;
    }

    input {
        margin-top: 0.25rem;
    }

    button {
        margin-top: 1rem;
        cursor: pointer;
    }
</style>
