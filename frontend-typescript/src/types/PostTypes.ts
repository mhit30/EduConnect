export interface IPost {
    title: string
    description: string
    imageUrl?: string // imageName will be the random image name
    creator: {
        username: string
        fullName: {
            firstName: string
            lastName: string
        }
        avatarUrl: string
    }
    school: string
    formattedDate: string
    postId: string
}

export type PostContextType = {
    posts: IPost[] | null
    getPosts: () => Promise<void>
}

export type PostAction = { type: 'ADD_POSTS'; payload: IPost[] }

export interface IIsolatedPost {
    key: number
    title: string
    description: string
    imageUrl?: string // imageName will be the random image name
    creator: {
        username: string
        fullName: {
            firstName: string
            lastName: string
        }
        avatarUrl: string
    }
    formattedDate: string
    postId: string
}
