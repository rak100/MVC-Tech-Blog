const router = require("express").Router();
const { Post, User } = require("../models/");
const w_Auth = require("../utils/auth");

// All POSTS Dashboard
router.get("/", w_Auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("all-posts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", w_Auth, (req, res) => {
  
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", w_Auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
