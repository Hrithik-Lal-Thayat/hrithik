const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    try {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            });
        }
        else {
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e);
    }
}