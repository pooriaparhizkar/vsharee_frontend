import { __AuthStatus } from './register';
import { UserData } from './index';

export interface __ReduxAction<T> {
    type: string;
    payload: T;
}

export interface __ReduxState {
    userData: UserData | null;
    authStatus: __AuthStatus;
}
