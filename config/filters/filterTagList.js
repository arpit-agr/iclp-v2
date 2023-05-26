module.exports = (tags) => {
	return (tags || []).filter(
		(tag) => ["all", "pages", "posts"].indexOf(tag) === -1
	);
};
