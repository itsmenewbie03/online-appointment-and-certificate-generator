<script>
    import { onMount } from "svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    let resident_data = {};
    let target_id;
    let first_name;
    let middle_name;
    let last_name;
    let gender;
    let date_of_birth;
    let period_of_residency;
    let phone_number;

    // NOTE: we use `resident_id` to pull the resident info

    const get_resident_info = async (id) => {
        console.log(`TRYING TO GET INFO FOR: ${id}`);
        const endpoint =
            "https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/data/resident/find";
        const opts = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                resident_id: id,
            }),
        };
        const resp = await fetch(endpoint, opts).then((res) => res.json());
        console.log(`WE GOT: ${JSON.stringify(resp)}`);
        return resp;
    };
    onMount(async () => {
        const _resident_data = await get_resident_info(data.resident_id);
        resident_data = _resident_data.data;
        resident_data.date_of_birth = resident_data.date_of_birth.split('T').shift()
    });

    const format_date = (dateString) => {
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
//Help me salvs QwQ
//idk what i did wrong T-T
  const update_resident_info = async () => {
    const endpoint = "https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/data/resident/update";
    const opts = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        id: target_id,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        gender: gender,
        date_of_birth: date_of_birth,
        period_of_residency: period_of_residency,
        phone_number: phone_number
      }),
    };
    try {
    const resp = await fetch(endpoint, opts);


    if (!resp.ok) {
      throw new Error(`Failed to update resident info: ${resp.statusText}`);
    }

    const data = await resp.json();
    console.log(`Update successful: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error("Error updating resident info:", error.message);

  }

  }

</script>

<h1>
    HEloow DIZZ {resident_data.first_name ?? "Loading..."}
    {resident_data.last_name ?? "Loading..."}
</h1>

<div>
    <form action="">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" bind:value={resident_data.first_name} />

        <label for="middleName">Middle Name:</label>
        <input type="text" id="middleName" bind:value={resident_data.middle_name} />

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" bind:value={resident_data.last_name} />

        <label for="gender">Gender:</label>
        <input type="text" id="gender" bind:value={resident_data.gender} />

        <label for="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" bind:value={resident_data.date_of_birth} />

        <label for="address">Address:</label>
        <input type="text" id="address" bind:value={resident_data.address} />

        <label for="periodOfResidency">Period of Residency:</label>
        <input type="text" id="periodOfResidency" bind:value={resident_data.period_of_residency} />

        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={resident_data.email} />

        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" bind:value={resident_data.phone_number} />

        <button
        class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        on:click={async () => {
            await update_resident_info();
          }}
      >
        Save Changes
      </button>
      <button
        class="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Cancel
      </button>
    </form>
</div>
