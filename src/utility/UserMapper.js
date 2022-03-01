import { User } from '../model/User';

export default class UserMapper {
  static convertArrayToObject(users) {
    const result = [];
    users.forEach((user) => {
      if (user[0] !== '') {
        const userObject = new User(
          user[0],
          user[1],
          user[2],
          user[3],
          user[4]
        );
        result.push(userObject);
      }
    });
    return result;
  }

  static convertObjectToArray(users) {
    const result = [];
    users.forEach((user) => {
      const userArray = [];
      userArray.push(user.id);
      userArray.push(user.name);
      userArray.push(user.email);
      userArray.push(user.role);
      userArray.push(user.createdAt);
      result.push(userArray);
    });
    return result;
  }
}
