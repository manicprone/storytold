import AnonUser from './AnonUser';
import AppMessage from './AppMessage';
import Collection from './Collection';
import User from './User';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';

const models = {
  AnonUser,
  AppMessage,
  Collection,
  User,
  UserProfile,
  UserSettings,
};

export default function Model(modelName) {
  return models[modelName];
}
