<script>
    import toast, { Toaster } from 'svelte-french-toast'
    import { goto } from '$app/navigation'

    let account_type
    let info = {}
    let period_of_residency_value
    let period_of_residency_unit
    let submit_btn

    const handle_submit = async (e) => {
        e.preventDefault()
        submit_btn.disabled = true
        info.period_of_residency = `${period_of_residency_value} ${period_of_residency_unit}`
        console.log(`Trying to create ${account_type} account`)
        const endpoint = `https://itsmenewbie03.is-a.dev/appt/api/resident/register`
        const opts = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                info: info,
            }),
        }
        const resp = await fetch(endpoint, opts).then((res) => res.json())
        toast.success(resp.message)
        submit_btn.disabled = false
        // Redirect back to the main page
        // WARN: while implementing the better response please don't redirect if there's an error
        goto('/dashboard/admin/resident-db')
        // NOTE: this should be displayed in the console
        console.log(`REGISTER ENDPOINT RESPONSE: ${JSON.stringify(resp)}`)
    }
</script>

<Toaster />

<div
    class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow"
>
    <div class="">
        <form class="grid grid-cols-2 gap-6" on:submit={handle_submit}>
            <div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="first_name"
                        bind:value={info.first_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="First Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="last_name"
                        bind:value={info.last_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Last Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <select
                        bind:value={info.gender}
                        id="genders"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="" selected>Select gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Others</option>
                        <option value="prefer not to say"
                            >Prefer not to say</option
                        >
                    </select>
                </div>
                <div class="mb-2">
                    <input
                        type="date"
                        id="birth"
                        bind:value={info.date_of_birth}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Date of Birth*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <div class="flex">
                        <input
                            type="number"
                            id="residency-value"
                            bind:value={period_of_residency_value}
                            class="form-input rounded-l-md bg-gray-50 border border-gray-300 text-gray-900"
                            placeholder="Period of residency*"
                            min="1"
                            required
                        />
                        <select
                            id="residency-unit"
                            bind:value={period_of_residency_unit}
                            class="form-select rounded-r-md bg-gray-50 border border-gray-300 text-gray-900 w-full"
                            required
                        >
                            <option value="" disabled selected
                                >Select Unit*</option
                            >
                            <option value="days">Day(s)</option>
                            <option value="weeks">Week(s)</option>
                            <option value="months">Month(s)</option>
                            <option value="years">Year(s)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="middle_name"
                        bind:value={info.middle_name}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Middle Name"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="suffix"
                        bind:value={info.name_suffix}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Suffix"
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="address"
                        bind:value={info.address}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Address*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="contact"
                        bind:value={info.phone_number}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Phone Number*"
                        minlength="11"
                        maxlength="13"
                        required
                    />
                </div>
            </div>
            <a
                href="/dashboard/admin/resident-db"
                class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
            >
                <button> Cancel </button>
            </a>

            <button
                id="create-account"
                type="submit"
                class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-16 mb-2"
                bind:this={submit_btn}>Submit</button
            >
        </form>
    </div>
</div>
