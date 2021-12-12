exports.validateUser = (userId) => {
  console.log('userValidation');
  if (userId > 0 && userId < 100) {
    console.log(`User validated with an id of ${userId}`);
  } else {
    console.log(`user id ${userId} is invalid`);
  }
};
