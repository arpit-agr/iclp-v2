const addNbsp = (str) => {
	if (!str) {
		return;
	}
	let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
	title = title.replace(/"(.*)"/g, '\\"$1\\"');
	return title;
};

const addNbspLastThreeWords = (str) => {
	if (!str) {
		return;
	}
	let words = str.split(" ");
	let lastThreeWords = words.slice(-3);
	let modifiedLastThreeWords = lastThreeWords.join("&nbsp;");
	let result = str.replace(lastThreeWords.join(" "), modifiedLastThreeWords);
	return result;
};

module.exports = {
	addNbsp,
	addNbspLastThreeWords,
};
