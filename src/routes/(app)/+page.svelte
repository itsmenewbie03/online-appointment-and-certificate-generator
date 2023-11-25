<script>
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import { goto } from "$app/navigation";
    import { get_session_status, get_new_access_token } from "$lib/session.js";
    /** @type {import('./$types').PageData} */
    export let data;
    let loaded = false;
    onMount(async () => {
        // INFO: the code below is a mess, this needs to be rewritten
        // I will rewrite this soon xD
        if (data.a) {
            const parsed = atob(data.a);
            const [access_token, refresh_token] = parsed.split(":");
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            console.log(
                `we got ${access_token} and ${refresh_token} from ${data.a}`
            );

            const { status, body } = await get_session_status(access_token);
            const success = status == 200;
            if (!success) {
                console.log("access token is invalid");
                // try to generate new access token
                // if no refresh token is available redirect the user to /login
                if (!refresh_token) {
                    toast.error(body.message);
                    setTimeout(() => {
                        goto("/login");
                    }, 1000);
                    return;
                }
                const { status, body } = await get_new_access_token(
                    refresh_token
                );
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
                loaded = true;
                // update the access token in localStorage
                return;
            }
            toast.success(`${body.message}\n${body.role}\n${body.email}`);
            loaded = true;
            return;
        }
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if (!access_token) {
            if (!refresh_token) {
                toast.error("Please login first!");
                // add a bit of delay
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
            loaded = true;
            // update the access token in localStorage
            localStorage.setItem("access_token", body.access_token);
        }
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
            loaded = true;
            // update the access token in localStorage
            localStorage.setItem("access_token", body.access_token);
            return;
        }
        loaded = true;
        toast.success(`${body.message}\n${body.role}\n${body.email}`);
    });
</script>

<Toaster />

<div class="mx-auto max-w-screen-lg">
    {#if !loaded}
    <div class="text-4xl" role="status" style="    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;">
        <svg aria-hidden="true" class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>

    </div>
    {:else}
        <div class="text-center">
            <div
                class="SubHeading text-green-500 text-lg font-semibold font-['Inter'] leading-relaxed"
            >
                Welcome!
            </div>
            <div>
                <div
                    class="SectionTitle text-gray-900 text-4xl font-bold font-['Inter'] leading-10"
                >
                    Announcement and Events
                </div>
                <div
                    class="NoMatterTheSizeO text-gray-500 text-base font-normal font-['Inter'] leading-normal"
                >
                    Here are the ANNOUNCEMENTS and EVENTS for BARANGAY BANGCUD
                </div>
            </div>
        </div>
        <div class="text-center">
            <div
                class="BlogGrid flex-col justify-start items-start gap-7 inline-flex"
            >
                <img
                    class="BlogImage w-96 h-56 rounded"
                    src="https://via.placeholder.com/370x220"
                />
                <div
                    class="Frame1000003810 flex-col justify-start items-start gap-6 flex"
                >
                    <div
                        class="Date px-3.5 py-1 bg-teal-500 rounded shadow-inner justify-center items-center gap-2.5 inline-flex"
                    >
                        <div
                            class="Dec222023 text-white text-xs font-medium font-['Inter'] leading-tight"
                        >
                            Mar 15, 2023
                        </div>
                    </div>
                    <div
                        class="Frame1000003809 flex-col justify-start items-start gap-3.5 flex"
                    >
                        <div
                            class="MeetAutomanageTheBestAiManagementTools w-96 text-gray-900 text-2xl font-semibold font-['Inter'] leading-loose"
                        >
                            Mr. & Ms. Bangcud
                        </div>
                        <div
                            class="LoremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry w-96 text-gray-500 text-base font-normal font-['Inter'] leading-normal"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="BlogGrid flex-col justify-start items-start gap-7 inline-flex"
            >
                <img
                    class="BlogImage w-96 h-56 rounded"
                    src="https://via.placeholder.com/370x220"
                />
                <div
                    class="Frame1000003810 flex-col justify-start items-start gap-6 flex"
                >
                    <div
                        class="Date px-3.5 py-1 bg-teal-500 rounded shadow-inner justify-center items-center gap-2.5 inline-flex"
                    >
                        <div
                            class="Dec222023 text-white text-xs font-medium font-['Inter'] leading-tight"
                        >
                            Jan 05, 2023
                        </div>
                    </div>
                    <div
                        class="Frame1000003809 flex-col justify-start items-start gap-3.5 flex"
                    >
                        <div
                            class="MeetAutomanageTheBestAiManagementTools w-96 text-gray-900 text-2xl font-semibold font-['Inter'] leading-loose"
                        >
                            File for candidacy is now open
                        </div>
                        <div
                            class="LoremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry w-96 text-gray-500 text-base font-normal font-['Inter'] leading-normal"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
