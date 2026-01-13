import connectTheDB from '@/config/database';
import Google from 'next-auth/providers/google';
// const { data: sessionn } = useSession();
// import connectTheDB from '@/config/database';
import User from '@/models/User';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // invoked on successfull signin
    async signIn(paramssss) {
      //this paramssss is coming from next auth
      // console.log('this is the signin Callback log', paramssss);
      // this is the signin log {
      //   user: {
      //     id: '692e8/////////////////////',
      //     name: 'Karam',
      //     email: 'karam////////////20//@gmail.com',
      //     image: 'https://lh3.googleusercontent.c/////////////////'
      //   },
      //   account: {
      //     access_token: '////////16vOBLlsVzTORzG5YI/////knZrc02LQirGf////LIYbKwXQRstayqcjM4aCgYKAR///206',
      //     expires_in: 3598,
      //     refresh_token: '1//0gh0///BPNR5AppbKslzKZ///rH9XJXqQa8',
      //     scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
      //     token_type: 'bearer',
      //     id_token: 'eyJ///WYzMzJlMGY3ODcxNjUiLCJ0eXAiOiJKV1QifQ//bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODE2NDc2NTAwMTItaG43b2xxNjljNjQ5Njc5bGZxbXNxY3JzOWlsMjFkbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODE2NDc2NTAwMTItaG43b2xxNjljNjQ5Njc5bGZxbXNxY3JzOWlsMjFkbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA4MDEwMzc1MDc0MzU0ODc3MTQiLCJlbWFpbCI6ImthcmFtLnNheWVkMjAyNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImVDLU10eDdTRUNYMHFVNVlOREtvenciLCJuYW1lIjoiS2FyYW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2pPR2hGMUpSUGJIOFdFNjl0VG1KbFE5bmx5YUJzbUxULVFaRkk5VjNlYlhiX3hRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkthcmFtIiwiaWF0IjoxNzY3NjI1NzExLCJleHAiOjE3Njc2MjkzMTF9.idmm7aqiiCc4MV2XuOM_D1QJzripxVs6p_mytRhSJTNi7I0avz81l5jA-ZauqQ33EJChs6vrEQJMALqv69dPwB0Vdi53VK3BL8SGmGMpfICkZej5KDqPFvMl_KhHIWkX6jiMFmwqo1cFwlyVNzEqITCyMkTtiZgu-jQCI3I0k66FZ18J0LUbKPlDUU4pLHhq-HXrbF_N1uBeyFGLcsTe-50vLoKCHXBNoG53KL3VzCpFnLN02EoRrc1vqC-8uzaq16CG9Sb6-8nTuZ0OLHBXAzGHEJ46rbZo1uIlbhEmZ7Kl47ojUprGPZc1m6EJ0ebYttHpz_jG1ji68GMSOYSudw',
      //     expires_at: 1767629303,
      //     provider: 'google',
      //     type: 'oidc',
      //     providerAccountId: '10//1037///4'
      //   },
      //   profile: {
      //     iss: 'https://accounts.google.com',
      //     azp: '8816476/////9///n.apps.googleusercontent.com',
      //     aud: '881647////n.apps.googleusercontent.com',
      //     sub: '100801/////87714',
      //     email: 'kara//20//@gmail.com',
      //     email_verified: true,
      //     at_hash: 'eC-Mtx7Kozw',
      //     name: 'Karam',
      //     picture: 'https://lh3.googleusercontent.com/a/A//3ebXb_xQ=s96-c',
      //     given_name: 'Karam',
      //     iat: 17//25711,
      //     exp: 1767629311
      //   }
      // }

      const { user } = paramssss;

      //1. connect to database
      await connectTheDB();
      // //2. check if user exist
      const UserExists = await User.findOne({ email: user.email });
      // //3. if not create user
      if (!UserExists) {
        const username = user.name.slice(0, 20);
        // const email = user.email;
        await User.create({
          username,
          email: user.email,
          image: user.image,
        });
      }
      //4. return true to allow sign in
      return true;
    },

    //sessionn callbac function that modifies the sessionn
    async session(sessionnn) {
      //this sessionnn is coming from next auth
      // console.log('this is the session log', sessionnn);

      // this is the session log {
      //   session: {
      //     user: {
      //       name: 'Karam',
      //       email: 'karam//20//@gmail.com',
      //       image: 'https://lh3.googleusercontent.com/a/ACg8/////mJlQ9nlyaBsmLT-QZFI///96-c'
      //     },
      //     expires: '2026-02-04T15:08:26.468Z'
      //   },
      //   token: {
      //     name: 'Karam',
      //     email: 'karam//20//@gmail.com',
      //     picture: 'https://lh3.googleusercontent.com/a/A/////mLT-QZFI9V3ebXb_xQ=s96-c',
      //     sub: '692e8d19-e5a9-4317-97b3-4bd5ef48b0ab',
      //     iat: 1767625705,
      //     exp: 1770217705,
      //     jti: 'e8e097a0-9713-4cff-be0b-1913fe1187e3'
      //       email: 'karam//20//@gmail.com',
      //       image: 'https://lh3.googleusercontent.com/a/ACg8ocKjO////ZFI9V3ebXb_xQ=s96-c'
      //     },
      //     expires: '2026-02-04T15:08:26.573Z'
      //   },
      //   token: {
      //     name: 'Karam',
      //       email: 'karam//20//@gmail.com',
      //       image: 'https://lh3.googleusercontent.com/a/ACg8o//lyaBsmLT-QZFI9V3ebXb_xQ=s96-c'
      //     },
      //     expires: '2026-02-04T15:08:26.573Z'
      //   },
      //       email: 'karam//20//@gmail.com',
      //       image: 'https://lh3.googleuserco//-QZFI9V3ebXb_xQ=s96-c'
      //       email: 'karam.sayed2024@gmail.com',
      //       email: 'karam.sayed2024@gmail.com',
      //   token: {
      //     name: 'Karam',
      //     email: 'karam//20//@gmail.com',
      //     picture: 'https://lh3.googleusercontentsfdgTmJlQ9nlyaBsmLT-QZFI9V3ebXb_xQ=s96-c',
      //     name: 'Karam',
      //     email: 'karam//20//@gmail.com',
      //     picture: 'https://lh3.googleusercosfdgTmJlQ9nlyaBsmLT-QZFI9V3ebXb_xQ=s96-c',
      //     sub: '692e8d19-sdfg-4bd5ef48b0ab',
      //     iat: 1sf6,
      //     exp: 1sf21sf706,
      //     jti: 'cfaa8f30-dfg316452f0d1'
      //   token: {
      //     name: 'Karam',
      //     email: 'karam//20//@gmail.com',
      //     picture: 'https://lh3.googleusercontentsdfgmJlQ9nlyaBsmLT-QZFI9V3ebXb_xQ=s96-c',
      //     sub: '692e8d19sfgd5ef48b0ab',
      //     iat: 17sdfg706,
      //   token: {
      //     name: 'Karam',
      //     email: 'karam//20//@gmail.com',
      //     picture: 'https://lh3.googlsfdgt.com/a/.///yaBsmLT-QZFI9V3ebXb_xQ=s96-c',
      //     email: 'karam.sayed2024@gmail.com',
      //     picture: 'https://lh3.googleusercontent//lyaBsmLT-QZFI9V3ebXb_xQ=s96-c',
      //     picture: 'http//smLT-QZFI9V3ebXb_xQ=s96-c',
      //     sub: '692esfdgd5ef48b0ab',
      //     iat: 176sdfg706,
      //     exp: 1770217706,
      //     jti: 'cfaa8sdfgbe-e4316452f0d1'
      //   }
      // }
      const { session } = sessionnn;
      const { user } = session;
      // //1. get the user from database
      const userFromDB = await User.findOne({ email: user.email });
      // //2. assign user id from the session
      user.id = userFromDB._id.toString();
      //3. return the session
      return sessionnn;
    },
  },
};
