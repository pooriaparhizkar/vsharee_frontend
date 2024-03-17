import { AppContextActionKeyEnum, AppContextType } from '../interface';
import { __AppContextActionType } from '../interface/context';

// helper function for container.tsx
// check type and set given value to exact field of state in order to given type
export function globalStateSetter(e: __AppContextActionType[], state: AppContextType): AppContextType {
    const newState: AppContextType = { ...state };
    for (const action of e) {
        switch (action.key) {
            case AppContextActionKeyEnum.userData:
                newState.userData = action.value;
                break;
            case AppContextActionKeyEnum.authStatus:
                newState.authStatus = action.value;
                break;
        }
    }
    return newState;
}
