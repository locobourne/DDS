export function authorizedRoles(allowedRoles = []) {
  return (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }
    if (allowedRoles.includes(user.rol)) {
      next();
    } else {
      res.status(403).json({ message: "usuario no autorizado!" });
    }
  };
}
