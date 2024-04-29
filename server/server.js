// server.js
const corsAnywhere = require("cors-anywhere");
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4000;

corsAnywhere
	.createServer({
		originWhitelist: [], // Allow all origins
		requireHeader: ["origin", "x-requested-with"],
		removeHeaders: ["cookie", "cookie2"],
	})
	.listen(port, host, function () {
		console.log("Running CORS Anywhere on " + host + ":" + port);
	});
