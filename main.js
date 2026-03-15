const ASSETS_PATH = "assets";

const SVGS = {};

const MONTHS = [
	{
		name: "Hazel",
		rune: "x",
	},
	{
		name: "Birch",
		rune: "b",
	},
	{
		name: "Alder",
		rune: "E",
	},
	{
		name: "Hawthorn",
		rune: "T",
	},
	{
		name: "Oak",
		rune: "d",
	},
	{
		name: "Ash",
		rune: "a",
	},
	{
		name: "Rowan",
		rune: "r",
	},
	{
		name: "Apple",
		rune: "p",
	},
	{
		name: "Beech",
		rune: "J",
	},
	{
		name: "Willow",
		rune: "w",
	},
	{
		name: "Yew",
		rune: `${ASSETS_PATH}/yew.svg`,
	},
	{
		name: "Holly",
		rune: "H",
	},
	{
		name: "Pine",
		rune: "c",
	},
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

async function main() {
	let day;
	let month;

	await loadAllSVGs();

	for (let index = 0; index <= daysSince(); index++) {
		day = getDay(index);
		number = getNumber(index);
		month = getMonth(index);
	}

	document.getElementById("solstic_month").textContent = month.name;
	document.getElementById("solstic_rune").textContent = month.rune;
	document.getElementById("solstic_number").textContent = number;
	document.getElementById("solstic_day").textContent = day.name;
	document.getElementById("all_rune_months").innerHTML =
		listMonthRunes().join(" ");
}

async function loadAllSVGs() {
	const loaders = MONTHS.filter((month) =>
		month?.rune?.includes(ASSETS_PATH),
	).map((month) => loadSVG(month.rune));

	await Promise.allSettled(loaders);
}

async function loadSVG(path) {
	const response = await fetch(path);
	SVGS[path] = await response.text();
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

function listMonthRunes() {
	return Object.values(MONTHS).map((month) => {
		if (!month.rune.includes(ASSETS_PATH)) {
			return month.rune;
		} else {
			return SVGS[month.rune];
		}
	});
}
