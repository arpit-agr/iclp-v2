const { DateTime } = require("luxon");

const readableDate = (dateObj) => {
	return DateTime.fromJSDate(dateObj)
		.setZone("Asia/Calcutta")
		.toLocaleString(DateTime.DATE_MED)
		.replaceAll(" ", "&nbsp;");
};

const htmlDate = (dateObj) => {
	return DateTime.fromJSDate(dateObj)
		.setZone("Asia/Calcutta")
		.toFormat("yyyy-LL-dd");
};

module.exports = {
	readableDate,
	htmlDate,
};
