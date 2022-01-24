const { Schema, model } = require('mongoose');
const { Thoughts } = require('.');

const UserSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          trim: true,
          unique: true
        },
        email: {
          type: String,
          required: true,
          unique: true,
          required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
          }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('thoughtsCount').get(function() {
    return this.comments.reduce(
        (total, thoughts) => total + thoughts.replies.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User;