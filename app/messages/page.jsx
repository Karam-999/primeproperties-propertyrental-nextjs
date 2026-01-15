import connectTheDB from '@/config/database';
import '@/models/Property';
import Messages from '@/models/Messages';

import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import MessageCard from '@/components/MessageCard';
const MessagesPage = async () => {
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You need to be Signed In');
  }
  const { userId } = sessionUser;
  const readMessages = await Messages.find({ recipientId: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('senderId', 'username email') //this will get the name and email of sender using the senderId reference
    .populate('propertyId', 'propName') //this will get the property name using the property reference
    .lean();

  const unreadMessages = await Messages.find({
    recipientId: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('senderId', 'username email')
    .populate('propertyId', 'propName')
    .lean();
  // const messages = [...unreadMessages, ...readMessages].map((msg) => {
  //   msg.senderId = convertToSerializableObject(msg.senderId);
  //   msg.propertyId = convertToSerializableObject(msg.propertyId);
  //   return msg;
  // });
  // console.log('messages:', messages);

  // messages: [
  // {
  //   _id: new ObjectId('6965438d/////f55cadf'),        
  //   senderId: {
  //     _id: '695bcaf894da981dbad5c114',
  //     email: 'connect.with.karam25@gmail.com',
  //     username: 'connect'
  //   },
  //   recipientId: new ObjectId('695bc//////cf7cf45ce9'),
  //   propertyId: { _id: '6963faf1fb999946cc4e9ad8', propName: "Carolyn D'Amore" },
  //   senderName: 'Jeanette Carey',
  //   senderEmail: 'bolixeky@mailinator.com',
  //   senderPhone: '+1 (928) 519-7949',
  //   message: 'Libero non explicabo',
  //   read: false,
  //   createdAt: 2026-01-12T18:55:09.280Z,
  //   updatedAt: 2026-01-12T18:56:26.540Z,
  //   __v: 0
  // },]
 
  const messages = [...unreadMessages, ...readMessages].map((msg) => {
    msg._id = msg._id.toString();
    msg.recipientId = msg.recipientId.toString();
    msg.senderId = convertToSerializableObject(msg.senderId);
    msg.propertyId = convertToSerializableObject(msg.propertyId);
    return msg;
  });
  // console.log('messages:', messages);

{
  /* messages: [
  {
    _id: '69653f0e5/////55c9b7',
    senderId: {
      _id: '695bc/////7cf45ce9',
      email: 'karam.//////@gmail.com',
      username: 'Karam'
    },
    recipientId: '695bcaf894da981dbad5c114',
    propertyId: { _id: '6963dd99b///1de56afd', propName: 'Genevieve Henry' },
    senderName: 'Jacquelyn Emard',
    senderEmail: 'Saige13@hotmail.com',
    senderPhone: '387-929-7725 x427',
    message: 'audio strenuus textus',
    read: false,
    createdAt: 2026-01-12T18:35:58.123Z,
    updatedAt: 2026-01-12T19:19:49.094Z,
    __v: 0
  }
]*/
}
//OR THIS WORKS TOO
  // const messages = JSON.parse(
  //   JSON.stringify([...unreadMessages, ...readMessages])
  // );

  // console.log('messages:', messages);

  // messages: [
  //   {
  //     _id: '69653f0e511d344f9f55c9b7',
  //     senderId: {
  //       _id: '695bcf765b9b46cf7cf45ce9',
  //       email: 'karam.s//////@gmail.com',
  //       username: 'Karam'
  //     },
  //     recipientId: '695//d5c114',
  //     propertyId: { _id: '6963//1de56afd', propName: 'Genevieve Henry' },
  //     senderName: 'Jacquelyn Emard',
  //     senderEmail: 'Saige13@hotmail.com',
  //     senderPhone: '387-929-7725 x427',
  //     message: 'audio strenuus textus',
  //     read: true,
  //     createdAt: '2026-01-12T18:35:58.123Z',
  //     updatedAt: '2026-01-12T18:54:13.790Z',
  //     __v: 0
  //   }
  // ]

  //   const messages = [...unreadMessages, ...readMessages].map(
  //     convertToSerializableObject
  //   );
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <>No messages yet</>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
