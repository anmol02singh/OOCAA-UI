export interface Account {
    _id: string,
    name: string,
    username: string,
    passwordHash: string,
    email: string,
    phoneNumber: string,
    roleNum: number,
    role: string,
    profileImage: {
        type: {
            publicId: string,
            url: string | undefined,
        },
    },
  }