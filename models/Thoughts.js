const { Schema, model, Types } = require('mongoose');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ReactionSchema = new Schema(
    {
      reactionBody: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

ThoughtsSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);
const Reaction = model('Reaction', ReactionSchema);

module.exports = Thoughts;