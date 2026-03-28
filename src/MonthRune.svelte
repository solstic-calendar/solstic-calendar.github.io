<script>
export let month;
</script>

<span class="monthRuneFont">
	{#if month.rune.includes("svg")}
		{@html month.rune.trim()}
	{:else}
		{month.rune}
	{/if}
</span>

<style>
	.monthRuneFont {
		font-family: "TolkeinDwarf", sans-serif;
		width: 1em;
		height: 1em;
		display: inline-block;
	}
</style>
