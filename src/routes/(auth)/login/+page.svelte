<script>
    let email;
    let password;
    import toast, { Toaster } from "svelte-french-toast";
    import { goto } from "$app/navigation";
    const handle_submit = async (event) => {
        event.preventDefault();
        // change url to actual api url
        const url =
            "https://appt-cert-gen-api.itsdarkhere4ever.repl.co/api/auth/admin/login";
        console.log(`logging in with ${email}:${password}`);
        // do the http request
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(async (res) => {
            return { status: res.status, body: await res.json() };
        });
        const { status, body } = resp;
        const _alert = status == 200 ? toast.success : toast.error;
        // we could add a bit of client side encryption here using AES, so even if someone peeks at the token they can't read it
        // i'll leave the implementation to you,
        if (status == 200) {
            const { access_token, refresh_token } = body;
            localStorage.setItem("access_token", access_token);
            /**
             * TODO:
             * Add Encryption with refresh_token as it is a long lived token
             */
            localStorage.setItem("refresh_token", refresh_token);
            const t_id = toast.loading(
                "Login success.\nYou are being redirected to the dashboard..."
            );
            // add a 1 second delay
            setTimeout(() => {
                goto("/");
                toast.dismiss(t_id);
            }, 1000);
            return;
        }
        _alert(body.message);
        // now you can use the response
    };
</script>

<Toaster />
<div class="grid h-screen place-items-center">
    <div
        class=" max-w-sm py-[60px] w-2/3 px-12 bg-white border border-gray-200 rounded-lg shadow"
    >
        <form
            class="auth-form"
            method="post"
            action="?/OAuth2"
            on:submit={handle_submit}
        >
            <div class="grid mb-8 place-items-center">
                <img src="/src/lib/assets/BRGY.-BANGCU1D-150x150.png" alt="" />
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                    bind:value={email}
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                    placeholder=" "
                />
                <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email address</label
                >
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                    bind:value={password}
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                    placeholder=" "
                />
                <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-950 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label
                >
            </div>

            <button
                type="submit"
                class="text-white bg-green-400 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
                >Login</button
            >

            <div class="grid place-items-center">
                <button
                    type="submit"
                    class="btn-auth text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm my-4 px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                    <svg
                        class="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                        ><path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        /></svg
                    >
                    Login in with Google
                </button>
            </div>
            <a
                href="#"
                class="grid place-items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Forgot Password?</a
            >
        </form>
    </div>
</div>
