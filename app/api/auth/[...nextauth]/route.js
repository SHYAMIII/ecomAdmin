    import NextAuth, { getServerSession } from 'next-auth'
    import mongoose from 'mongoose'
    // import AppleProvider from 'next-auth/providers/apple'
    // import FacebookProvider from 'next-auth/providers/facebook'
    import GoogleProvider from 'next-auth/providers/google'
    import User from '@/models/User'
    import { useSession } from 'next-auth/react'
import next from 'next'
    // import EmailProvider from 'next-auth/providers/email'


    //create a const email with 2 admin email account by .env 


    const adminEmails = process.env.ADMIN_EMAILS.split(',');



    export const authOptions ={
        providers: [
            // OAuth authentication providers...
            // AppleProvider({
            //   clientId: process.env.APPLE_ID,
            //   clientSecret: process.env.APPLE_SECRET
            // }),
            // FacebookProvider({
            //   clientId: process.env.FACEBOOK_ID,
            //   clientSecret: process.env.FACEBOOK_SECRET
            // }),
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET
            }),
            // Passwordless / email sign in
            // EmailProvider({
            //   server: process.env.MAIL_SERVER,
            //   from: 'NextAuth.js <no-reply@example.com>'
            // }),
        ],

        callbacks: {
            // async signIn({ user, account, profile, email, credentials }) {
            //     if (account.provider === 'google') {

            //         //connect to te database
            //         await mongoose.connect(process.env.MONGODB_URI)
            //         const currentuser = await User.findOne({ email: profile.email })
            //         if (!currentuser) {
            //             const newuser = await new User({
            //                 name: profile.name,
            //                 email: profile.email,
            //                 // profilePic: profile.image,
            //                 createdAt: Date.now()
            //             })
            //             await newuser.save();
            //             user.name = newuser.name
            //             // user.image = newuser.profilePic
            //             user.id = newuser._id

            //         }

            //         else {
            //             user.name = currentuser.name
            //             // user.image = currentuser.profilePic
            //             user.id = currentuser._id
            //         }
            //     }
            //     return true
            // },
            
            async session({session,token}){
                // console.log("session : ",session);
                
            if(adminEmails.includes(session.user.email)){
                return session;
            }
            else{
                return false
                
            }

        },
    },
        // async jwt({token,user}){
        //     if(user){
        //         token.id=user.id;
        //     }
        //     return token;
        // },
          
        // },
    };


    const handler= NextAuth(authOptions);
    export {handler as GET,handler as POST};




