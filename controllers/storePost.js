const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req, res) => {
    console.log(req.body);
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '../public/img', image.name));
    try {
        const blog = await BlogPost.create({ ...req.body, image: 'img/' + image.name, userId: req.session.userId });
        console.log(blog);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/');
}