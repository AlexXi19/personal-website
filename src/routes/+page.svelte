<script lang='ts'>
import { supabase } from "$lib/supabase";
import type { definitions } from "$lib/types/supabase";

async function getMessage(): Promise<string | undefined> {
	const { data, error } = await supabase.from<definitions['messages']>("messages").select("*");
	return data?.[0].text;
}

let message = getMessage();


</script>

<h1>Alex's personal Website</h1>
{#await message then value}
	{#if value}
		<p>{value}</p>
	{/if}
{/await}

