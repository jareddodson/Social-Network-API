const { Thoughts, User } = require('../models');

const thoughtsController = {
    // add thoughts to user
    addThoughts({ params, body }, res) {
        console.log(params);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // add reply to thoughts
    addReply({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: }
        )
    }
}