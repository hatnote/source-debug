

<script>
    export let data
        export let keys
    let entries = Object.entries(data)
</script>

<style>
	table {
		border-collapse: collapse;
	}
	table, th, td {
		border: 1px solid #a0b4cb;
		padding: 0.75em;
	}
	th {
		color: #666;
		background: #edf7ff;
	}
</style>

<table>
{#each entries as entry}
    {#if !keys || keys.includes(entry[0])}
    <tr>
			{#if keys}
            <th>
                {entry[0]}
            </th>
			{/if}
            {#if typeof(entry[1]) == 'object'}
                <td><svelte:self data={entry[1]}/></td>
            {:else}
                <td>{entry[1]}</td>
            {/if}       
    </tr>
    {/if}
{/each}
</table>
