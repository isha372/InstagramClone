const db = require('../models');

const getAllComments = async (req, res) => {
  try {
    const data = await db.comments.findAll({});

    return res.status(200).json({
      message: 'Getting all the Comments successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      e: 'error in getting the all Comments',
    });
  }
};

const postComments = async (req, res) => {
  try {
    const { body } = req;

    if (!Object.keys(body).length) return res.status(400).json({ message: 'Please Provide the Valid Body' });

    const data = await db.comments.create(body);

    return res.status(200).json({
      message: 'Comments Posted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in inserting the Comments data',
    });
  }
};

const updateComments = async (req, res) => {
  try {
    const reqid = req.query.id;
    const reqbody = req.body;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid Comments Id of Comments',
      });
    }

    if (!Object.keys(reqbody).length) {
      return res.status(400).json({
        message: 'Please Provide the body of the updated Comments',
      });
    }

    const data = await db.comments.update(reqbody, {
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Comments updated Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in updating the Comments',

    });
  }
};

const deleteComments = async (req, res) => {
  try {
    const reqid = req.query.id;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid  Id Comments for Deleting',
      });
    }

    const data = await db.comments.destroy({
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Comments Deleted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error in Deleting the Comments',
    });
  }
};
module.exports = {
  getAllComments,
  postComments,
  updateComments,
  deleteComments,
};
