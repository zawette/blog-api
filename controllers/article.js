const Article = require("../models/article");
const { validationResult } = require("express-validator");

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
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};
exports.createArticle = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

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
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.updateArticle = async (req, resp, next) => {
  const articleId = req.params.articleId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      const error = new Error("article not found");
      error.statusCode = 404;
      throw error;
    }
    article.published = req.body.published;
    article.title = req.body.title;
    article.tags = req.body.tags;
    article.description = req.body.description;
    article.series = req.body.series;
    article.body_markdown = req.body.body_markdown;
    article.save();
    resp.status(200).json({
      message: "article updated successfully!",
      article: article,
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.getArticleById = async (req, resp, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      const error = new Error("Article not found");
      error.statusCode = 404;
      throw error;
    }
    resp.status(200).json(article);
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};
