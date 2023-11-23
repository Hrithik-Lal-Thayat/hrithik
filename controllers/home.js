
const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({}).populate('userId')
    console.log(req.session);
    res.render('index', {
        blogPosts
    });
}