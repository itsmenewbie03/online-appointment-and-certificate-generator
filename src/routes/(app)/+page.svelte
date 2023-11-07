<script>
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import { goto } from "$app/navigation";

    onMount(() => {
        const access_token = localStorage.getItem("access_token");
        /**
         * TODO:
         * validate the access token
         * if the access token is expired
         * use the refresh token to generate a new access token
         */
        if (!access_token) {
            toast.error("Please login first!");
            // add a bit of delay
            setTimeout(() => {
                goto("/login");
            }, 1000);
        }
    });
</script>

<Toaster />
<h1 class="py-8 px-4 border-4 border-indigo-900 shadow-lg">Welcome to Hell.</h1>
<p>Visit <a href="/login">LOGIN</a> to read the documentation</p>
