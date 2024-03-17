// import { AppMainLang } from 'app/app.lang';
import { AppContextType, AuthStatus } from '../interface';

// initial value of the global state in
export const globalContextInitialValue: AppContextType = {
    update: (...e) => {
        return 'this one is going to change in container.tsx' + e.length;
    },
    userData: null,
    authStatus: AuthStatus.isPending
};
