import { AuthStatus, UserData } from '.';

// type of the global state in context
// you can expand this one and add new fields to it
export interface __AppContextType {
    update: (...e: __AppContextActionType[]) => void;
    userData: UserData | null;
    authStatus: AuthStatus;
}

// type of update function of global state single argument
// you can expand this one and add a {key, value} per filed you add to global state
export type __AppContextActionType = {
    key: __AppContextActionKeyEnum.userData;
    value: UserData | null;
} | {
    key: __AppContextActionKeyEnum.authStatus;
    value: AuthStatus;
};

// keys of the update function argument in global state
// you can expand this one and add a unique key per filed you add to global state
export enum __AppContextActionKeyEnum {
    userData = 'CONTEXT_USER_DATA_ACTION',
    authStatus = 'CONTEXT_AUTH_STATUS_ACTION',
}
