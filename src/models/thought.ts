import { Schema, model, ObjectId } from 'mongoose';
import Reaction from './reaction.js';

interface IThought {
    thoughtText: string;
    createdAt: Date;
    username: ObjectId;
    reactions: typeof Reaction[];
    reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;