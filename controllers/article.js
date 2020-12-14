const Article = require("../models/article");

exports.getArticles = async (req, resp, next) => {
  const perPage = Number.parseInt(req.query.per_page) || 30;
  const page = Number.parseInt(req.query.page) || 1;
  const tags = req.query.tags;
  const tags_exclude = req.query.tags_exclude;
  const condition = {};
  if (tags) condition.tags = { $all: tags.split(",") };
  if (tags_exclude) condition.tags = { $nin: tags_exclude.split(",") };
  try {
    const totalArticles = await Article.find(condition).countDocuments();
    const articles = await Article.find(condition)
      .skip(perPage * (page - 1))
      .limit(perPage);
    resp.status(200).json({ totalArticles: totalArticles, articles: articles });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.postArticles = async (req, resp, next) => {
  const article = new Article({
    title: req.body.title,
    published: req.body.published,
    tags: req.body.tags,
    description: req.body.description,
    series: req.body.series,
    body_markdown: req.body.body_markdown,
  });
  try {
    await article.save();
    resp.status(201).json({
      message: "article created successfully!",
      article: article,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
