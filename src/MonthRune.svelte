<script>
	export let month;
</script>

{#if month.rune.includes("svg")}
	{@html month.rune.trim()}
{:else}
	{month.rune}
{/if}
