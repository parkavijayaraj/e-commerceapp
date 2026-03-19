export const authorizeRole = (user, role) => {
  if (user.role !== role) {
    throw new Error("Access Denied");
  }
};


