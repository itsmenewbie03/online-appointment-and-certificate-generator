/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    resident_id: params.resident_id,
  };
}
