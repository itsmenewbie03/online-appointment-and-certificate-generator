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

<div class="mx-auto max-w-screen-lg">
    <div class="text-center">
        <div class="SubHeading text-green-500 text-lg font-semibold font-['Inter'] leading-relaxed">Welcome!</div>
        <div>
            <div class="SectionTitle text-gray-900 text-4xl font-bold font-['Inter'] leading-10">Announcement and Events</div>
            <div class="NoMatterTheSizeO text-gray-500 text-base font-normal font-['Inter'] leading-normal">Here are the ANNOUNCEMENTS and EVENTS for BARANGAY BANGCUD</div>
        </div>
    </div>
    <div class="text-center">
      <div class="BlogGrid flex-col justify-start items-start gap-7 inline-flex">
        <img class="BlogImage w-96 h-56 rounded" src="https://via.placeholder.com/370x220" />
        <div class="Frame1000003810 flex-col justify-start items-start gap-6 flex">
          <div class="Date px-3.5 py-1 bg-teal-500 rounded shadow-inner justify-center items-center gap-2.5 inline-flex">
            <div class="Dec222023 text-white text-xs font-medium font-['Inter'] leading-tight">Mar 15, 2023</div>
          </div>
          <div class="Frame1000003809 flex-col justify-start items-start gap-3.5 flex">
            <div class="MeetAutomanageTheBestAiManagementTools w-96 text-gray-900 text-2xl font-semibold font-['Inter'] leading-loose">Mr. & Ms. Bangcud</div>
            <div class="LoremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry w-96 text-gray-500 text-base font-normal font-['Inter'] leading-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          </div>
        </div>
      </div>
      <div class="BlogGrid flex-col justify-start items-start gap-7 inline-flex">
        <img class="BlogImage w-96 h-56 rounded" src="https://via.placeholder.com/370x220" />
        <div class="Frame1000003810 flex-col justify-start items-start gap-6 flex">
          <div class="Date px-3.5 py-1 bg-teal-500 rounded shadow-inner justify-center items-center gap-2.5 inline-flex">
            <div class="Dec222023 text-white text-xs font-medium font-['Inter'] leading-tight">Jan 05, 2023</div>
          </div>
          <div class="Frame1000003809 flex-col justify-start items-start gap-3.5 flex">
            <div class="MeetAutomanageTheBestAiManagementTools w-96 text-gray-900 text-2xl font-semibold font-['Inter'] leading-loose">File for candidacy is now open</div>
            <div class="LoremIpsumIsSimplyDummyTextOfThePrintingAndTypesettingIndustry w-96 text-gray-500 text-base font-normal font-['Inter'] leading-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
