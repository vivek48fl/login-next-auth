import NextAuth from "next-auth/next";
import Credentials from 'next-auth/providers/credentials';
import clientPromise from "./../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
    session: {
        jwt: true,
    },
    secret: process.env.SECRET,
    providers: [
        Credentials({
            credentials: {
               email:{type:'string'},
               password:{type:'string'}
            },
            async authorize(credentials){

                // NOTE: ensure client is connected
                const client = await clientPromise;

                // connect to database
                const db = await client.db('test');

                // check for existing user
                const user = await db.collection('users').findOne({
                    email: credentials.email,
                    password: credentials.password
                });
                if(!user){
                    // client.close();
                    throw new Error("No user found!");
                }
                let response = {
                    email : user.email,
                    flag:true
                    // return other things here
                
                }

                return response;
            }
        }),
    
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
          })
    
    
    
    ], callbacks: {
            jwt: async ({ token, user }) => {
                user && (token.user = user)
                return token
            },
            session: async ({ session, token }) => {
                session.user = token.user
                return session
            }
        }
    });