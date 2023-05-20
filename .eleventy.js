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
		if (
			process.env.NODE_ENV === "production" &&
			this.outputPath &&
			this.outputPath.endsWith(".html")
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: false,
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				minifyCSS: {
					format: {
						breaks: {
							// controls where to insert breaks
							afterAtRule: true, // controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `false`
							afterBlockBegins: true, // controls if a line break comes after a block begins; e.g. `@media`; defaults to `false`
							afterBlockEnds: true, // controls if a line break comes after a block ends, defaults to `false`
							afterComment: true, // controls if a line break comes after a comment; defaults to `false`
							afterProperty: true, // controls if a line break comes after a property; defaults to `false`
							afterRuleBegins: true, // controls if a line break comes after a rule begins; defaults to `false`
							afterRuleEnds: true, // controls if a line break comes after a rule ends; defaults to `false`
							beforeBlockEnds: true, // controls if a line break comes before a block ends; defaults to `false`
							betweenSelectors: true, // controls if a line break comes between selectors; defaults to `false`
						},
						breakWith: "\n", // controls the new line character, can be `'\r\n'` or `'\n'` (aliased as `'windows'` and `'unix'` or `'crlf'` and `'lf'`); defaults to system one, so former on Windows and latter on Unix
						indentBy: 1, // controls number of characters to indent with; defaults to `0`
						indentWith: "tab", // controls a character to indent with, can be `'space'` or `'tab'`; defaults to `'space'`
						spaces: {
							// controls where to insert spaces
							aroundSelectorRelation: true, // controls if spaces come around selector relations; e.g. `div > a`; defaults to `false`
							beforeBlockBegins: true, // controls if a space comes before a block begins; e.g. `.block {`; defaults to `false`
							beforeValue: true, // controls if a space comes before a value; e.g. `width: 1rem`; defaults to `false`
						},
						wrapAt: false, // controls maximum line length; defaults to `false`
						semicolonAfterLastProperty: true, // controls removing trailing semicolons in rule; defaults to `false` - means remove
					},
				},
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
