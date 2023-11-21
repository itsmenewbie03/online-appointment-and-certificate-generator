<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-50 uppercase bg-green-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Name & Document </th>
          <th scope="col" class="px-6 py-3"> Appointment Status </th>
          <th scope="col" class="px-6 py-3"> Date </th>
          <th scope="col" class="px-6 py-3 text-right">
            Actions
          </th>
        </tr>
      </thead>
      <!-- Example tbody 
      Now do the integration magik  -->
      
      <tbody id="resident"> 
        <tr class="bg-white border-b hover:bg-green-100">
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png" alt="Jese image">
                <div class="pl-3">
                    <div class="text-base font-semibold">First_Name Last_Name</div>
                    <div class="font-normal text-gray-500">Document</div>
                </div>  
            </th>
          <td class="px-6 py-4">
            <div class="relative inline-flex">
              <select
                class="text-white bg-green-400 border hover:border-green-500 px-4 py-2 pr-8 rounded-3xl"
              >
                <option>Correct</option>
                <option>Incorrect</option>
              </select>
            </div>
          </td>
          <td class="px-6 py-4"> Date Crap </td>
          <td class="px-6 py-4 text-right">
            <a
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
      </tbody>
    </table>
  </div>