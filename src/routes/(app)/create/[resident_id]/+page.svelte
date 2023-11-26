<script>
    import { onMount } from "svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    let resident_data = {};

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
    });
</script>

<h1>
    HEloow DIZZ {resident_data.first_name ?? "Loading..."}
    {resident_data.last_name ?? "Loading..."}
</h1>

