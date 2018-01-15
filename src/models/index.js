import AnonUser from './AnonUser';
import AppMessage from './AppMessage';
import Chapter from './Chapter';
import Collection from './Collection';
import User from './User';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';

const models = {
  AnonUser,
  AppMessage,
  Chapter,
  Collection,
  User,
  UserProfile,
  UserSettings,
};

export default function Model(modelName) {
  return models[modelName];
}
