const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, loading, fetchpriority) {
	let metadata = await Image(src, {
		widths: [320, 640, 960, 1280, null],
		formats: ["avif", "webp", "jpeg"],
		urlPath: "/images/",
		outputDir: "./public/images/",
		sharpAvifOptions: {
			quality: 60,
		},
	});

	let imageAttributes = {
		alt,
		sizes,
		loading,
		fetchpriority,
		decoding: "async",
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
