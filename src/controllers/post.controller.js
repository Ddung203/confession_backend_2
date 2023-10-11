import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import Api404Error from "./../exceptions/api404Error.js";
const createPost = async (req, res, next) => {
  const { authorId, content } = req.body;
  if (!authorId || isNaN(authorId) || !content || content.trim() == "") {
    throw new Api404Error("Error while creating new post.");
  }
  try {
    const author = await UserModel.findById(authorId);
    if (!author || author.length < 1) {
      throw new Api404Error("Author not found!");
    }
    const postModel = new PostModel(authorId, content);
    const result = await postModel.create();
    if (result) {
      const data = await PostModel.getById(result.insertId);
      return res.status(201).json({
        statusCode: 201,
        message: "Create new post successful.",
        data: PostModel.respose(data[0]),
      });
    }
    return res.status(201).json({
      statusCode: 201,
      message: "Create new post successful.",
    });
  } catch (err) {
    console.log("Error while creating new post.", err.message);
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new Api404Error("Post not exists.");
  }
  try {
    const post = await PostModel.getById(id);
    if (!post || post.length < 1) {
      throw new Api404Error("Post not exists.");
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Successfully retrieved the post.",
      data: post[0],
    });
  } catch (err) {
    console.log("Error while getting post by id.", err.message);
    next(err);
  }
};

const hidePost = async (req, res, next) => {
  const id = req.query.id;
  const authorId = req.query.authorId;
  if (!id) {
    throw new Api404Error("Post not exists.");
  }

  try {
    const post = await PostModel.getById(id);
    if (!post || post.length < 1) {
      throw new Api404Error("Post not exists.");
    }
    await PostModel.hide(id, authorId);
    return res.status(200).json({
      statusCode: 200,
      message: "Hide post successful.",
    });
  } catch (err) {
    console.log("Error while hiding the post.", err.message);
    next(err);
  }
};

const showPost = async (req, res, next) => {
  const id = req.query.id;
  const authorId = req.query.authorId;
  if (!id) {
    throw new Api404Error("Post not exists.");
  }

  try {
    await PostModel.show(id, authorId);
    return res.status(200).json({
      statusCode: 200,
      message: "Show post successful.",
    });
  } catch (err) {
    console.log("Error while hiding the post.", err.message);
    next(err);
  }
};

export { createPost, getPostById, hidePost, showPost };
