import { auth } from '@/auth';
import connectTheDB from '@/config/database';
import User from '@/models/User';
export const getSessionUserInServerr = async () => {
  const sessiionn = await auth();
  // // // console.log('mmmmmmmmmmmmmmmmmmmmmmmm', sessiionn);
  if (!sessiionn || !sessiionn.user) {
    return null;
  }
  // await connectTheDB();
  // const userFromDB = await User.findOne({ email: sessiionn.user.email });
  const result = {
    user: sessiionn.user,
    userId: sessiionn.user.id,
    // userId: userFromDB._id.toString(),
  };
  // console.log(
  //   'user id need to be fetched from database because of auth vs next auth contradiction',
  //   result
  // );///RESOLVED
  return result;
};
// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   return <pre>{JSON.stringify(session, null, 2)}</pre>;
// }
