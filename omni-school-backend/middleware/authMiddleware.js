/**
 * 🛡️ AUTH MIDDLEWARE
 * Protects routes and handles Role-Based Access Control (RBAC)
 */
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the "Bearer <token>" string
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach user data (id and role) to the request object
      req.user = decoded; 
      
      next();
    } catch (error) {
      console.error(`\x1b[31m%s\x1b[0m`, `🔐 Auth Error: ${error.message}`);
      res.status(401).json({ message: 'Not authorized - invalid or expired token' });
    }
  } else {
    // 5. No token found
    console.warn(`\x1b[33m%s\x1b[0m`, `⚠️ Access Attempt Denied: No token provided.`);
    res.status(401).json({ message: 'Not authorized - no token provided' });
  }
};

/**
 * 👑 ROLE AUTHORIZATION
 * Restricts access based on user role (student, teacher, admin)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // If the user's role isn't in the allowed list, block them
    if (!req.user || !roles.includes(req.user.role)) {
      console.error(`\x1b[31m%s\x1b[0m`, `🚫 Permission Denied: Role '${req.user?.role}' cannot access this.`);
      return res.status(403).json({ 
        message: `Forbidden: Access restricted to ${roles.join(' or ')}` 
      });
    }
    next();
  };
};