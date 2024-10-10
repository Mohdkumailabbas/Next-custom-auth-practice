import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id?: string,
        username?: string
        email?: string
    }
    interface Session {
        user: {
            id?: string,
            username?: string
            email?: string

        } & DefaultSession['user']
    }
}