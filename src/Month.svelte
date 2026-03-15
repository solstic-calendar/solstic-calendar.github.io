<script>
import { calendar } from "./lib/calendar";

const today = calendar();

let dayOfMonth = 1;

const days = Array.from({ length: 28 }, (_, i) => ({
	dayOfMonth: dayOfMonth + i,
}));

const weeks = [];
for (let i = 0; i < 4; i++) {
	weeks.push(days.slice(i * 7, i * 7 + 7));
}
</script>

{#each weeks as week}
	<div>
		{#each week as day}
			<span
				class="table_day {today.dayOfMonth == day.dayOfMonth
					? 'currentDay'
					: ''}"
			>
				{day.dayOfMonth}
			</span>
		{/each}
	</div>
{/each}

<style>
	.table_day {
		display: inline-block;
		width: 1em;
		margin: 0.25em;
		padding: 0.25em;
	}

	.currentDay {
		border: 2px solid var(--blue);
		border-radius: 5px;
	}
</style>
