const router = require("express").Router();
const articleController = require("../controllers/article");
router.get("/", articleController.getArticles);
router.post("/", articleController.postArticles);

exports.router = router;
