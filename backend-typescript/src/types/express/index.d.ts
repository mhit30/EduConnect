import { User, FacultyUser } from '../User'

export {}

// Extending Request!
declare global {
    namespace Express {
        export interface Request {
            user: User
            facultyUser: FacultyUser
        }
    }
}
