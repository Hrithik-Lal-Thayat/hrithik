const User = require('../models/User')


module.exports = async (req, res) => {
    
    try {
        const user = await User.create({ ...req.body });
        console.log(user);
    } catch (e) {
        console.log(e);
        if (e.name === 'ValidationError') {
            const validationErrors = Object.keys(e.errors).map((key) => e.errors[key].message)
            req.flash('validationErrors', validationErrors)
            return res.redirect('/auth/register')
        }
        res.status(500).send('error occurred while creating user')

    }
    res.redirect('/');
}