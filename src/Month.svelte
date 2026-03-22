<script>
import DayRune from "./DayRune.svelte";
import { calendar, DAYS } from "./lib/calendar";

let { date } = $props();

const today = $derived(calendar(date));
const isCustomDate = $derived(
	date.toDateString() !== new Date().toDateString(),
);

const format = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
});

const weeks = $derived.by(() => {
	const dayOfMonthStart = 1;
	let oldGreg = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate() - today.dayOfMonth,
	);

	const days = Array.from({ length: 28 }, (_, i) => {
		oldGreg.setDate(oldGreg.getDate() + 1);
		return {
			dayOfMonth: dayOfMonthStart + i,
			oldGreg: new Date(oldGreg.getTime()),
		};
	});

	const result = [];
	for (let i = 0; i < 4; i++) {
		result.push(days.slice(i * 7, i * 7 + 7));
	}
	return result;
});
</script>

<div id="day_runes">
	{#each DAYS as day}
		<span class="day_rune">
			<DayRune {day} />
		</span>
	{/each}
</div>

{#each weeks as week}
	<div>
		{#each week as day}
			<span class="day_wrap">
				<span
					class="table_day {today.dayOfMonth == day.dayOfMonth && !isCustomDate
						? 'currentDay'
						: ''}"
				>
					{day.dayOfMonth}
				</span>
				<span class="old_greg">{format.format(day.oldGreg)}</span>
			</span>
		{/each}
	</div>
{/each}

<style>
	#day_runes {
		display: flex;
		align-items: center;
		text-align: center;
		flex-direction: row;
	}

	.day_rune {
		flex: 1;
		color: var(--red);
		fill: var(--red);
	}

	.table_day {
		display: inline-block;
		width: 1em;
		margin: 0.25em;
		padding: 0.25em;
		color: var(--red);
	}

	.day_wrap {
		display: inline-flex;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}

	.currentDay {
		border: 2px solid var(--orange);
		border-radius: 5px;
	}

	.old_greg {
		font-size: 0.25em;
	}
</style>
