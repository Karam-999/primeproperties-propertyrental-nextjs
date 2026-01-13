import { Schema, model, models } from 'mongoose';
// import { unique } from 'next/dist/build/utils';

const UserSchhema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    favourites: [
      {
        type: Schema.Types.ObjectId, //this will store the id of the property
        ref: 'Property',
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchhema);
export default User;
