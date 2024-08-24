export const getFullName = (user) => {
  const fullName = ((user.first_name || "") + " " + (user.last_name || "")).trim()
  return fullName
}

export const getInitials = (user) => {
  const fullName = getFullName(user)
  if (!fullName) {
   return user.email?.slice(0, 2).toUpperCase()
  }
  const parts = fullName.split(' ');
  const initials = parts.map(part => part[0]).join('');
  return initials.toUpperCase();
};
