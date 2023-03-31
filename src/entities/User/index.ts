export type { UserData, UserSchema } from './model/types/userSchema';
export { userReducer, userActions } from './model/slices/userSlices';
export { getUserData, getUserStatus } from './model/selectors/getUser/getUser';
