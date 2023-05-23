// Posts
const getPosts = (collection) => {
	return collection.getFilteredByGlob("src/posts/**/*.md");
};

module.exports = getPosts;
