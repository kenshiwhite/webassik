const {User} = require("../models/mongo");

const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username, password});

    if (user) {
        req.session.username = username;
        res.redirect('/main');
    } else {
        res.send('Invalid login credentials');
    }
}

const register = async (req, res) => {
    const {username, password} = req.body;

    await User.create({username, password});

    req.session.username = username;
    res.redirect('/main');
}

module.exports = {
    login,
    register
}