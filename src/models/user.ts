import { Schema, Document, model, ObjectId } from "mongoose";

interface IUser extends Document {

    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount: number;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userSchema
.virtual('friendCount')
.get(function (this: IUser) {
    return this.friends.length;
});

const User = model('User', userSchema);

export default User;