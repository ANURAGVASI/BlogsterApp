
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const dropCache = require('../middlewares/dropCache');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    
    const blogs = await Blog
    .find({ _user: req.user.id })
    .cache({key: req.user.id});
    
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, dropCache, async (req, res) => {
    const { title, content, imageurl } = req.body;
    
    console.log('image urll ------',imageurl);

    const blog = new Blog({
      imageurl,
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      console.log(err);
      res.send(400, err);

    }
  });
};
