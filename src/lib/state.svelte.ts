import dayjs from 'dayjs';

export const date = new Date();
export const currentYear = dayjs().year();
export const startDate = dayjs(`${currentYear}-01-01`);
export const endDate = dayjs(`${currentYear}-12-31`);

export const dates = $state(
	Array.from({ length: endDate.diff(startDate, 'days') + 1 }, (_, i) => ({
		id: i,
		date: startDate.add(i, 'days').format('YYYY-MM-DD'),
		filled: false
	}))
);

export const resetDates = () => {
	dates.forEach((date) => (date.filled = false));
};
