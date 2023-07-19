/* eslint-disable import/no-extraneous-dependencies */
const secretkey = 'Instagram';
/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const data = await db.users.findAll({
      include: [
        {
          model: db.posts,
        }, {
          model: db.likes,
        },
        {
          model: db.comments,
        },
      ],
    });

    return res.status(200).json({
      message: 'Getting all the users successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      e: 'Error in Getting the All  Users',
    });
  }
};

const postUsers = async (req, res) => {
  try {
    const { gmail, password, userName } = req.body;

    if (!Object.keys(req.body).length) return res.status(400).json({ message: 'Please Provide the Valid Body' });

    const Alreadyreg = await db.users.findOne({ where: { gmail } });
    if (Alreadyreg) {
      return res.status(409).json({ error: 'user is already exist' });
    }

    const hashespassward = await bcrypt.hash(password, 10);
    const data = await db.users.create({ userName, gmail, password: hashespassward });
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ gmail: data.gmail, id: data._id }, secretkey);
    return res.status(201).json(
      {
        // user: data,
        message: 'Users Posted Successfully',
        token,
      },
    );
  } catch (e) {
    return res.status(500).json({
      error: 'error in inserting the users data',
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const reqid = req.query.id;
    const reqbody = req.body;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid Users Id of User',
      });
    }

    if (!Object.keys(reqbody).length) {
      return res.status(400).json({
        message: 'Please Provide the body of the updated User',
      });
    }

    const data = await db.users.update(reqbody, {
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'users updated Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in updating the users',

    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const reqid = req.query.id;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid User Id for Deleting',
      });
    }

    const data = await db.users.destroy({
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'User Deleted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error in Deleting the user',
    });
  }
};
const login = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const data = await db.users.findOne({
      where: {
        gmail,
      },
    });

    if (!data) {
      return res.status(400).json({
        message: 'gmail is not registered',
      });
    }

    const matchPassword = await bcrypt.compare(password, data.password);
    if (!matchPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ gmail: data.gmail, id: data._id }, secretkey);
    return res.status(200).json({
      user: data,
      token,

    });
  } catch (e) {
    return res.status(500).json({
      error: 'Error in login',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const UserId = req.query.id;

    if (!UserId) {
      return res.status(400).json({
        message: 'Please Provide the valid user Id',
      });
    }
    const data = await db.users.findOne({
      where: {
        id: UserId,
      },
    });

    return res.status(200).json({
      message: 'Getting Users by User Id',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error in getting user by UserId',
    });
  }
};
module.exports = {
  getAllUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  login,
  getUserById,
};
