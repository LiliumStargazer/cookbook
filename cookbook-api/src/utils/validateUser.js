// utils/validateUser.js
function validateUserData({ username, password, email, favoriteDishes }) {
  if (favoriteDishes && !Array.isArray(favoriteDishes)) {
    return 'favoriteDishes must be an array';
  }
  if (!username || typeof username !== 'string' || username.length < 3) {
    return 'Invalid username: must be at least 3 characters long';
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return 'Invalid password: must be at least 6 characters long';
  }
  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return 'Invalid email';
  }
  return null;
}
module.exports = validateUserData;
