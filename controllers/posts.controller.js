const db = require('../models');

const getAllPosts = async (req, res) => {
  try {
    const data = await db.posts.findAll({
      include: [
        {
          model: db.likes,
        },
        {
          model: db.comments,
        }, {
          model: db.users,
        },
      ],
    });

    return res.status(200).json({
      message: 'Getting All The Posts successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      e: 'error in getting the all Posts',
    });
  }
};

const postPosts = async (req, res) => {
  try {
    const { body } = req;

    if (!Object.keys(body).length) return res.status(400).json({ message: 'Please Provide the Valid Body' });

    const data = await db.posts.create(body);

    return res.status(200).json({
      message: 'Posts Posted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in inserting the Posts data',
    });
  }
};

const updatePosts = async (req, res) => {
  try {
    const reqid = req.query.id;
    const reqbody = req.body;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid Posts Id of Posts',
      });
    }

    if (!Object.keys(reqbody).length) {
      return res.status(400).json({
        message: 'Please Provide the body of the updated Posts',
      });
    }

    const data = await db.posts.update(reqbody, {
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Posts updated Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in updating the Posts',

    });
  }
};

const deletePosts = async (req, res) => {
  try {
    const reqid = req.query.id;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid  Id Postsfor Deleting',
      });
    }

    const data = await db.posts.destroy({
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Posts Deleted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error in Deleting the Posts',
    });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: 'Please Provide the Valid User Id to getting all the posts',
      });
    }

    const data = await db.posts.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      message: 'Post By UserId getting Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Error in getting all post of the user',
    });
  }
};

module.exports = {
  getAllPosts,
  postPosts,
  updatePosts,
  deletePosts,
  getPostByUserId,

};
