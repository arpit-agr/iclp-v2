const filterTagList = require("../filters/filterTagList");

// Posts
const getTags = (collection) => {
	let tagSet = new Set();
	collection.getAll().forEach((item) => {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
	});

	return filterTagList([...tagSet]);
};

module.exports = getTags;
