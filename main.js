const MONTHS = [
	{ name: "Hazel" },
	{ name: "Birch" },
	{ name: "Alder" },
	{ name: "Hawthorn" },
	{ name: "Oak" },
	{ name: "Ash" },
	{ name: "Rowan" },
	{ name: "Apple" },
	{ name: "Beech" },
	{ name: "Willow" },
	{ name: "Yew" },
	{ name: "Holly" },
	{ name: "Pine" },
];

const DAYS = [
	{
		name: "Yom Sheket",
	},
	{
		name: "Yom Shemesh",
	},
	{
		name: "Yom Eysh",
	},
	{
		name: "Yom Adamah",
	},
	{
		name: "Yom Mayim",
	},
	{
		name: "Yom Yareyah",
	},
	{
		name: "Yom Yofi",
	},
];

const MISTLETOE_DAY = {
	name: "Mistletoe Day",
};

const MISTLETOE_MONTH = {
	name: "",
};

const MOSS_DAY = {
	name: "Moss Day",
};

const MOSS_MONTH = {
	name: "",
};

const CALENDAR_START = "Feburary 5";

main();

function main() {
	let day;
	let month;

	for (let index = 0; index <= daysSince(); index++) {
		day = getDay(index);
		number = getNumber(index);
		month = getMonth(index);
	}

	document.getElementById("solstic_month").textContent = month.name;
	document.getElementById("solstic_number").textContent = number;
	document.getElementById("solstic_day").textContent = day.name;
}

function getDay(index) {
	if (isMossDay(index)) {
		return MOSS_DAY;
	}
	if (isMistletoeDay(index)) {
		return MISTLETOE_DAY;
	}

	return DAYS[index % 7];
}

function getNumber(index) {
	if (isMistletoeDay(index) || isMossDay(index)) {
		return 0;
	}

	return (index % 28) + 1;
}

function getMonth(index) {
	if (isMossDay(index)) {
		return MOSS_MONTH;
	}
	if (isMistletoeDay(index)) {
		return MISTLETOE_MONTH;
	}

	return MONTHS[Math.floor(index / 28)];
}

function daysSince() {
	const msPerDay = 24 * 60 * 60 * 1000;

	const now = new Date();
	const firstDay = new Date(`${CALENDAR_START}, ${now.getFullYear()}`);
	const diff =
		Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
		Date.UTC(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
	return Math.floor(diff / msPerDay);
}

function isMistletoeDay(index) {
	return index === 365;
}

function isMossDay(index) {
	if (isLeapYear() && index === 33) {
		return true;
	}

	return false;
}

function isLeapYear() {
	const thisYear = new Date().getFullYear();
	return new Date(thisYear, 1, 29).getDate() === 29;
}
