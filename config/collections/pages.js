// Posts
const getPages = (collection) => {
	return collection.getFilteredByGlob("src/pages/**/*.md");
};

module.exports = getPages;
