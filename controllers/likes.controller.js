/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const db = require('../models');

const getAllLikes = async (req, res) => {
  try {
    const data = await db.likes.findAll({});

    return res.status(200).json({
      message: 'Getting all the Likes successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      e: 'error in getting the all Likes',
    });
  }
};

// const postLikes = async (req, res) => {
//     try {

//         let { body } = req
//         let { userId, postId } = req.body

//         if (!Object.keys(body).length) return res.status(400).json({ message: "" })

//         let dataalready = await db.likes.findOne({
//             where: {
//                 userId: userId,
//                 postId: postId
//             }
//         })

//         if (dataalready) {
//             let datadeleted = await db.likes.destroy({
//                 where: {
//                     id: dataalready.id
//                 }
//             })

//             let count = await db.likes.count({
//                 where:
//                 {
//                     postId: postId,
//                 }
//             })

//             const reqbody = {
//                 likeCount: count
//             }
//             const updatecountvalue = await db.posts.update(reqbody, {
//                 where: {
//                     id: postId
//                 }
//             })

//             return res.status(200).json({
//                 message: "Likes Deleted Successfully",
//                 count: count,
//                 "update Count value": updatecountvalue
//             })

//         }
//         else {
//             let data = await db.likes.create(body)

//             let count = await db.likes.count({
//                 where:
//                 {
//                     postId: postId,
//                 }
//             })

//             const reqbody = {
//                 likeCount: count
//             }
//             const updatecountvalue = await db.posts.update(reqbody, {
//                 where: {
//                     id: postId
//                 }
//             })

//             return res.status(200).json({
//                 message: "Likes Posted Successfully",
//                 data: data,
//                 count: count
//             })
//         }
//     }
//     catch (e) {
//         console.log(e.message)
//         return res.status(500).json({
//             error: "error in inserting the Likes data"

//         })

//     }
// }

const postLikes = async (req, res) => {
  try {
    const { body } = req;
    const { userId, postId } = req.body;

    if (!Object.keys(body).length) {
      return res.status(400).json({ message: 'Please Provide the Valid Body' });
    }

    const dataalready = await db.likes.findOne({
      where: {
        userId,
        postId,
      },
    });

    let count = await db.likes.count({
      where: {
        postId,
      },
    });

    let updateCountValue;

    if (dataalready) {
      // eslint-disable-next-line no-unused-vars
      const datadeleted = await db.likes.destroy({
        where: {
          id: dataalready.id,
        },
      });

      count--; // Decrease the count if the user is unliking

      const reqbody = {
        likeCount: count,
      };

      updateCountValue = await db.posts.update(reqbody, {
        where: {
          id: postId,
        },
      });
    } else {
      const data = await db.likes.create(body);

      count++; // Increase the count if a new user is liking

      const reqbody = {
        likeCount: count,
      };

      updateCountValue = await db.posts.update(reqbody, {
        where: {
          id: postId,
        },
      });
    }

    return res.status(200).json({
      message: 'Likes Updated Successfully',
      count,
      updateCountValue,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Error in updating the Likes data',
    });
  }
};

const updateLikes = async (req, res) => {
  try {
    const reqid = req.query.id;
    const reqbody = req.body;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid Likes Id of Likes',
      });
    }

    if (!Object.keys(reqbody).length) {
      return res.status(400).json({
        message: 'Please Provide the body of the updated Likes',
      });
    }

    const data = await db.likes.update(reqbody, {
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Likes updated Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'error in updating the Likes',

    });
  }
};

const deleteLikes = async (req, res) => {
  try {
    const reqid = req.query.id;

    if (!reqid) {
      return res.status(400).json({
        message: 'Please Provide the Valid  Id Likes for Deleting',
      });
    }

    const data = await db.likes.destroy({
      where: {
        id: reqid,
      },
    });

    return res.status(200).json({
      message: 'Likes Deleted Successfully',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error in Deleting the likes',
    });
  }
};
module.exports = {
  getAllLikes,
  postLikes,
  updateLikes,
  deleteLikes,
};
