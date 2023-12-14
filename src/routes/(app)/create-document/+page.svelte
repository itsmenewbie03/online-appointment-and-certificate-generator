<script lang="ts">
    import Radio from '/home/andrew/Documents/CommandCenter/js/online-appointment-and-certificate-generator/src/lib/Radio.svelte'

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
            console.error('Please select a file.')
            return
        }

        // Read the file as a base64 string
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64Data = reader.result?.toString().split(',')[1]

            if (!base64Data) {
                console.error('Failed to read the file.')
                return
            }

            const formData = {
                file: base64Data,
                required_data: required_data,
                document_name: document_name,
                document_type: document_type,
            }

            try {
                const response = await fetch(
                    'http://localhost:3000/api/documents/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    },
                )

                if (response.ok) {
                    const result = await response.json()
                    console.log('File uploaded successfully:', result)
                } else {
                    console.error('File upload failed')
                }
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }
</script>

<main>
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
                />
                <div class="flex justify-between mt-5">
                <div>
                    <label>First Name</label>
                    <input
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        value="first_name"
                        on:change={handleCheckboxChange}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        value="last_name"
                        on:change={handleCheckboxChange}
                    />
                </div>
            </div>
                <!-- Add more checkboxes as needed -->

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
