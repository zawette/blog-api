const router = require("express").Router();
const articleController = require("../controllers/article");
router.get("/", articleController.getArticles);

exports.router = router;
