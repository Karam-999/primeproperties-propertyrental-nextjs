import { Schema, model, models } from 'mongoose';
// import { unique } from 'next/dist/build/utils';

const MessagesSchhema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    senderName: {
      type: String,
      required: [true, 'Name is Required'],
    },
    senderEmail: {
      type: String,
      required: [true, 'Email is Required'],
    },
    senderPhone: {
      type: String,
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Messages = models.Messages || model('Messages', MessagesSchhema);
export default Messages;
