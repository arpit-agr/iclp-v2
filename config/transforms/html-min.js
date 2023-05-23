const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		if (
			this.page.outputPath &&
			this.page.outputPath.endsWith(".html") &&
			process.env.NODE_ENV === "production"
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: false,
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				minifyCSS: {
					format: {
						breaks: {
							afterAtRule: true,
							afterBlockBegins: true,
							afterBlockEnds: true,
							afterComment: true,
							afterProperty: true,
							afterRuleBegins: true,
							afterRuleEnds: true,
							beforeBlockEnds: true,
							betweenSelectors: true,
						},
						breakWith: "\n",
						indentBy: 1,
						indentWith: "tab",
						spaces: {
							aroundSelectorRelation: true,
							beforeBlockBegins: true,
							beforeValue: true,
						},
						wrapAt: false,
						semicolonAfterLastProperty: true,
					},
				},
			});
			return minified;
		}
		return content;
	});
};
