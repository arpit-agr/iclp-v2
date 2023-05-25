const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

// Importing from config
const getPosts = require("./config/collections/posts.js");
const getPages = require("./config/collections/pages.js");
const md = require("./config/filters/md.js");
const { readableDate, htmlDate } = require("./config/filters/date.js");
const {
	addNbsp,
	addNbspLastThreeWords,
} = require("./config/filters/addNbsp.js");
const imageShortcode = require("./config/shortcodes/image.js");
const assetHash = require("./config/plugins/asset-hash.js");
const htmlmin = require("./config/transforms/html-min.js");

module.exports = function (eleventyConfig) {
	//Add Collections
	eleventyConfig.addCollection("posts", getPosts);
	eleventyConfig.addCollection("pages", getPages);

	//Add Filters
	eleventyConfig.addFilter("md", md);
	eleventyConfig.addFilter("htmlDate", htmlDate);
	eleventyConfig.addFilter("readableDate", readableDate);
	eleventyConfig.addFilter("addNbsp", addNbsp);
	eleventyConfig.addFilter("addNbspLastThreeWords", addNbspLastThreeWords);
	eleventyConfig.addAsyncFilter(
		"liquidDate",
		async function (date, format = "%Y/%m/%d") {
			const content = eleventyConfig.javascriptFunctions.renderTemplate(
				`{{ "${date}" | date: "${format}" }}`,
				"liquid"
			);
			return await content;
		}
	);

	//Add Plugins
	eleventyConfig.addPlugin(htmlmin);
	eleventyConfig.addPlugin(assetHash);
	eleventyConfig.addPlugin(directoryOutputPlugin);
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	//Shortcode
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	//Passthrough copy
	eleventyConfig.addPassthroughCopy({ "./src/assets/images": "/images/" });
	eleventyConfig.addPassthroughCopy({ "./src/assets/fonts": "/fonts/" });
	// eleventyConfig.addPassthroughCopy({"./src/favicons": "/"});
	// eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");

	eleventyConfig.setServerOptions({
		showAllHosts: true,
	});
	eleventyConfig.setQuietMode(true);

	return {
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "public",
		},
	};
};
