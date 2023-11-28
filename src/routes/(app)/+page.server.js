/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    const a = url.searchParams.get('a')
    return {
        a: a,
    }
}
