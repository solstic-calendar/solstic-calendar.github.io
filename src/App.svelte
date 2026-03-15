<script>
import Home from "./Home.svelte";
import { MONTHS } from "./lib/calendar";
import MonthRune from "./MonthRune.svelte";
import { calendar } from "./lib/calendar";

const today = calendar();
</script>

<Home />

<footer>
	<div id="all_rune_months">
		{#each MONTHS as month}
			<span class={today.month?.name == month.name ? "currentMonth" : ""}>
				<MonthRune {month} />
			</span>
		{/each}
	</div>
</footer>

<style>
	footer {
		position: fixed;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		width: 100%;
		text-align: center;
		padding: 0.75rem 1rem;
		box-sizing: border-box;
		z-index: 1000;
	}

	#all_rune_months {
		font-size: 2em;
		font-family: "TolkeinDwarf", sans-serif;
	}

	.currentMonth {
		color: var(--blue);
		fill: var(--blue);
	}
</style>
