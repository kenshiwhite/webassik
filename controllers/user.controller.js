const {User} = require("../models/mongo");

const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username, password});

    if (user) {
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;
        console.log('==== ', user)
        res.redirect('/main');
    } else {
        res.send('Invalid login credentials');
    }
}

const register = async (req, res) => {
    const {username, password} = req.body;

    await User.create({username, password, isAdmin: false, createdAt: new Date(), updatedAt: new Date()});

    req.session.username = username;
    res.redirect('/main');
}

const createUser = async (req, res) => {
    const {username, password, isAdmin} = req.body;

    await User.create({username, password, isAdmin, createdAt: new Date(), updatedAt: new Date()});

    res.send({success: true})
}

const deleteUser = async (req, res) => {
    const {userId} = req.params;

    await User.deleteOne({_id: userId})

    res.send({success: true})
}

const updateUser = async (req, res) => {
    const {userId} = req.params;
    const newDatas = req.body;

    await User.updateOne({_id: userId}, newDatas);

    res.send({success: true});
}

module.exports = {
    login,
    register,
    createUser,
    deleteUser,
    updateUser
}