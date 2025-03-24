export interface Account {
    _id?: string,
    name?: string,
    username?: string,
    passwordHash?: string,
    email?: string,
    phoneNumber?: string,
    roleNum?: number,
    role?: string,
    profileImage?: {
        publicId?: string,
        url?: string,
    },
  }