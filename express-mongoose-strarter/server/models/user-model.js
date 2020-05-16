const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
   password: {
       type: String,
       required: [true, 'password is required'],
       minlength: [6, 'password should contain at least 6 characters'],
    },
    username: {
		type: String,
		required: [true, 'user name is required'],
		minlength: [4, 'user name should contain at least 4 characters'],
    },
});

// validations
userSchema.path('email').validate(async (email) => {
    const count = await mongoose.model('User').count({ email });
    return !count;
}, 'email has already used');

userSchema.path('username').validate(async (username) => {
	const count = await mongoose.model('User').count({ username });
	return !count;
}, 'user name has already used');

// hash password before saving the user
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.generateToken = function () {
    return jwt.sign({ user: this }, process.env.JWTSECRET);
};

module.exports = mongoose.model('User', userSchema);
