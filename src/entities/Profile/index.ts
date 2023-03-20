import { ProfileCard } from './ui/ProfileCard/ProfileCard';
export type { ProfileData, ProfileSchema } from './model/types/profileSchema';
export { profileReducer, profileActions } from './model/slices/profileSlices';
export { getProfileData } from './model/selectors/getProfile/getProfileData';
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
export { ProfileCard } from './ui/ProfileCard/ProfileCard';
