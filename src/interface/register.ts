export interface __Tokens {
    access_token: string;
    user: __UserData;
}

export interface __UserData {
    _id: string;
    bio: string;
    email: string;
    firstname: string;
    groups: any[];
    is_active: boolean;
    is_admin: boolean;
    is_private: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    last_login: string;
    lastname: string;
    password: string;
    photo: boolean;
    photo_path: string;
    user_permissions: any[];
    username: string;
}

export enum __AuthStatus {
    isValid = 'isValid',
    isPending = 'isPending',
    isInValid = 'isInValid',
}
