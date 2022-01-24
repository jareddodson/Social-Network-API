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
            { _id: params.thoughts },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )

        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove thought
    removeComment({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtsId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            return Thoughts.findOneAndUpdate(
                { _id: params.thoughtsId },
                { $pull: { thoughts: params.thoughtsId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove reply
    removeReply({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;