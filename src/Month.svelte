<script>
import { calendar } from "./lib/calendar";

let dayOfMonth = 1;
export let date;
const today = calendar(date);
const isCustomDate = date.toDateString() !== new Date().toDateString();
let oldGreg = new Date(
	date.getFullYear(),
	date.getMonth(),
	date.getDate() - today.dayOfMonth,
);

const format = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
});

const days = Array.from({ length: 28 }, (_, i) => {
	oldGreg.setDate(oldGreg.getDate() + 1);
	return {
		dayOfMonth: dayOfMonth + i,
		oldGreg: new Date(oldGreg.getTime()),
	};
});

const weeks = [];
for (let i = 0; i < 4; i++) {
	weeks.push(days.slice(i * 7, i * 7 + 7));
}
</script>

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
