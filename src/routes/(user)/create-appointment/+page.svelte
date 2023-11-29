<div
    class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow"
>
    <div>
        <form class="grid grid-cols-2 gap-6" on:submit={handle_submit}>
            <div>
                <div>
                    <select
                        id="dropdown1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        required
                    >
                        <option value="" disabled selected hidden
                            >Dropdown 1*</option
                        >
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <select
                        id="dropdown2"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        required
                    >
                        <option value="" disabled selected hidden
                            >Dropdown 2*</option
                        >
                    </select>
                </div>
            </div>

            <!-- CALANDER STUFF (do we api or nah) -->

            <div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="First Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Last Name*"
                        required
                    />
                </div>
            </div>
            <div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="First Name*"
                        required
                    />
                </div>
                <div class="mb-2">
                    <input
                        type="text"
                        id="last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                        placeholder="Last Name*"
                        required
                    />
                </div>
            </div>
            <div class="col-span-2 flex justify-center">
                <button
                    type="button"
                    class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4"
                    >Cancel</button
                >
                <button
                    id="create-account"
                    type="submit"
                    class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-4"
                    >Create Account</button
                >
            </div>
        </form>
    </div>
</div>
