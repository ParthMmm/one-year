import dayjs from 'dayjs';

export const date = new Date();
export const currentYear = dayjs().year();
export const startDate = dayjs(`${currentYear}-01-01`);
export const endDate = dayjs(`${currentYear}-12-31`);

// Function to initialize dates
const initializeDates = () => {
	return Array.from({ length: endDate.diff(startDate, 'days') + 1 }, (_, i) => ({
		id: i,
		date: startDate.add(i, 'days').format('YYYY-MM-DD'),
		filled: false
	}));
};

// Load dates from localStorage or initialize if not found
const loadDatesFromStorage = () => {
	const stored = localStorage.getItem('dates');
	if (stored) {
		return JSON.parse(stored);
	}
	return initializeDates();
};

export const dates = $state(loadDatesFromStorage());

// .root allows for the creation of effects outside of the component initialisation phase
$effect.root(() => {
	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('dates', JSON.stringify(dates));
		}
	});
});

export const resetDates = () => {
	dates.forEach((date: { filled: boolean }) => (date.filled = false));
};
