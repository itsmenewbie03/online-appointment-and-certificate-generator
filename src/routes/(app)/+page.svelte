<script>
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import { goto } from "$app/navigation";
    import { get_session_status, get_new_access_token } from "$lib/session.js";

    onMount(async () => {
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
            return;
        }
        // token validation
        // I NEED TS 😭
        const { status, body } = await get_session_status(access_token);
        const success = status == 200;
        if (!success) {
            console.log("access token is invalid");
            // try to generate new access token
            const refresh_token = localStorage.getItem("refresh_token");
            // if no refresh token is available redirect the user to /login
            if (!refresh_token) {
                toast.error(body.message);
                setTimeout(() => {
                    goto("/login");
                }, 1000);
                return;
            }
            const { status, body } = await get_new_access_token(refresh_token);
            const success = status == 200;
            // if the refresh token is invalid redirect the user to /login
            if (!success) {
                toast.error(body.message);
                setTimeout(() => {
                    goto("/login");
                }, 1000);
                return;
            }
            // access token generated successfully
            toast.success(`${body.message}`);
            // update the access token in localStorage
            localStorage.setItem("access_token", body.access_token);
            return;
        }
        toast.success(`${body.message}\n${body.role}\n${body.email}`);
    });
</script>

<Toaster />
<h1 class="py-8 px-4 border-4 border-indigo-900 shadow-lg">Welcome to Hell.</h1>
<p>Visit <a href="/login">LOGIN</a> to read the documentation</p>
