
<div class="grid place-items-center mt-10 py-[60px] px-12 bg-white border border-gray-200 rounded-lg shadow">
    <div class="">
        <div>
            <div class="flex items-center mb-4">
              <input
                id="user-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                for="user-checkbox"
                class="ml-2 text-sm font-medium text-gray-900"
              >User</label>
            </div>
            <div class="flex items-center mb-4">
              <input
                id="employee-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                for="employee-checkbox"
                class="ml-2 text-sm font-medium text-gray-900"
              >Employee</label>
            </div>
          </div>
          <form class="grid grid-cols-2 gap-6">
            <div>
                <div class="mb-2">
                  <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Gender*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="birth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Date of Birth*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="residency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Period of Residency*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password*" required />
                </div>
              </div>
              <div>
                <div class="mb-2">
                  <input type="text" id="middle_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Middle Name*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="suffix" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Suffix" />
                </div>
                <div class="mb-2">
                  <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Address*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="contact" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone Number*" required />
                </div>
                <div class="mb-2">
                  <input type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirm Password" required />
                </div>
              </div>
              <button type="button" class=" text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-32 mb-2 ">Cancel</button>
              <button id="create-account" type="button" class="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-16 mb-2 ">Create Account</button>
          </form>
    </div>
  </div>
  