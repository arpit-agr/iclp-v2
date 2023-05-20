const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const htmlmin = require("html-minifier");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPlugin(directoryOutputPlugin);

	//Passthrough copy
	eleventyConfig.addPassthroughCopy({ "./src/assets/images": "/images/" });
	eleventyConfig.addPassthroughCopy({ "./src/assets/fonts": "/fonts/" });
	// eleventyConfig.addPassthroughCopy("./src/scripts");
	// eleventyConfig.addPassthroughCopy({"./src/favicons": "/"});
	// eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");

	//Watch target
	// eleventyConfig.addWatchTarget("./src/_includes/css/");
	// eleventyConfig.addWatchTarget('./src/scripts/');

	//Collections
	eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/posts/*.md");
	});

	//postDate Filter
	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

	//addNbsp Filter
	eleventyConfig.addFilter("addNbsp", (str) => {
		if (!str) {
			return;
		}
		let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
		title = title.replace(/"(.*)"/g, '\\"$1\\"');
		return title;
	});

	//addNbsp filter for last three words
	eleventyConfig.addFilter("addNbspLastThreeWords", (str) => {
		if (!str) {
			return;
		}
		let words = str.split(" ");
		let lastThreeWords = words.slice(-3);
		let modifiedLastThreeWords = lastThreeWords.join("&nbsp;");
		let result = str.replace(lastThreeWords.join(" "), modifiedLastThreeWords);
		return result;
	});

	//Transforms
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		// Eleventy 1.0+: use this.inputPath and this.outputPath instead
		if (
			process.env.NODE_ENV === "production" &&
			this.outputPath &&
			this.outputPath.endsWith(".html")
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: false,
				removeComments: true,
				collapseWhitespace: true,
				preserveLineBreaks: true,
				collapseBooleanAttributes: true,
				minifyCSS: true,
			});
			return minified;
		}

		return content;
	});

	return {
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "public",
		},
	};
};
