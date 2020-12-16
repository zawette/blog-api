const router = require("express").Router();
const { body } = require("express-validator");
const articleController = require("../controllers/article");
router.get("/", articleController.getArticles);
router.post(
  "/",
  [
    body("title").exists(),
    body("body_markdown").exists(),
    body("published").isBoolean(),
  ],
  articleController.createArticle
);
router.put(
  "/:articleId",
  [
    body("title").exists(),
    body("body_markdown").exists(),
    body("published").isBoolean(),
  ],
  articleController.updateArticle
);

router.get("/:articleId", articleController.getArticleById);

exports.router = router;
