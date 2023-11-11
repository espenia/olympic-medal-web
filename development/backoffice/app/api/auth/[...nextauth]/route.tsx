import "reflect-metadata";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import LoginUseCase from '../../../../../usecases/auth/loginUseCase';
import AuthService from "../../../../../infrastructure/src/auth/authService"

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
      CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "user@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            try {
              if (!credentials || credentials.username.trim() === "" || credentials.password.trim() === "") {
                  throw new Error("Usuario y contrasenia requeridos.")
              }
              const res = new LoginUseCase(new AuthService());
              res.username = credentials!.username;
              res.password = credentials!.password;
              const user = await res.handle();
  
              if (user) {
                  return { id: "1", name: user.username, email: user.username }
              }
            } catch(e) {
              console.log(e);
              return null;
            }
  
            // Return null if user data could not be retrieved
            return null
          }
        })
    ],
  });

export { handler as GET, handler as POST }