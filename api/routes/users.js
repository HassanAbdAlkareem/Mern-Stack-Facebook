const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    if (userId) {
      const user = await User.findById(userId);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } else {
      const userFound = await User.findOne({ username: username }).select(
        "username , bio , country , city , followings ,followers , birthday"
      );
      userFound
        ? res.status(200).send(userFound)
        : res.status(404).json("not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get last 10 user joined
router.get("/lastUsers/", async (req, res) => {
  try {
    const lastUsers = await User.find().sort({ _id: -1 }).limit(10);
    res.status(200).send(lastUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user.friends.includes(req.body.userId)) {
        await user.updateOne({ $push: { friends: req.body.userId } });
        const updateUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $push: { friends: req.params.id },
          },
          { new: true }
        );
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user.friends.includes(req.body.userId)) {
        const updateUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $pull: { friends: req.params.id },
          },
          { new: true }
        );
        res.status(200).json(updateUser);
        await user.updateOne({ $pull: { friends: req.body.userId } });
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
