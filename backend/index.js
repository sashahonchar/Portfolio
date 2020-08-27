
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { handleSiteMessage } from "./controllers/message";
import { router } from "./constants/routes";

const path = require("path");
const fs = require("fs");
const app = express();
const compression = require("compression");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

const handlePage = (req, res) => {
	const metadata = router[req.url];
	const htmlDom = fs.readFileSync(path.join(__dirname , "../build/index.html"), "utf8");
	const html = htmlDom.replace("<title></title>", `<title>${metadata.title}</title>`);
	res.send(html);
};

app.post("/message", async (req, res) => {
	try {
		console.log(req.body)
		await handleSiteMessage(req.body);
		res.status(200).send({ success: true });
	} catch (error) {
		res.status(400).send({ error });
	}
});

app.get(Object.keys(router), handlePage);

app.use(express.static(path.join(__dirname, "../build")));

app.all("*", (req, res, next) => {
	res.status(404).json({ message: "Not found route" });
});
app.listen(PORT, () => {
	console.info(`listen... ${PORT}`);
});
