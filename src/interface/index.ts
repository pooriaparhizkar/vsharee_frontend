import { __Pagination, __Response } from './general';
import { __AppContextActionKeyEnum, __AppContextActionType, __AppContextType } from './context';


import { __AuthStatus, __Tokens, __UserData } from './register';

export interface Response<D> extends __Response<D> { }
export interface Pagination<D> extends __Pagination<D> { }
export interface Tokens extends __Tokens { }
export interface UserData extends __UserData { }

export interface AppContextType extends __AppContextType { }
export { __AuthStatus as AuthStatus };
export { __AppContextActionKeyEnum as AppContextActionKeyEnum };
