import { secretKey } from "../config.js";


export const authenticate = (req, res, next) => {
    const accessToken = (req.headers && req.headers['authorization']) ? req.headers['authorization'] : null;
    const refreshToken = (req.cookies && req.cookies['refreshToken']) ? req.cookies['refreshToken'] : null;
  
    if (!accessToken && !refreshToken) {
      return res.status(401).send({
        success: 0,
        message: 'Access Denied',
        error: 'No authorization token provided'
      });
    }
  
    try {
      const decoded = jwt.verify(accessToken, secretKey);
      req.user = decoded.user;
      next();
    } catch (error) {
      if (!refreshToken) {
        return res.status(401).send({
            success: 0,
            message: 'Access Denied',
            error: 'No refresh token provided'
          });
      }
  
      try {
        const decoded = jwt.verify(refreshToken, secretKey);
        const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });
  
        res
          .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
          .header('Authorization', accessToken)
          .send(decoded.user);
        req.user = decoded.user
        next();
      } catch (error) {
        console.log('error', error)
        return res.status(400).send({
            success: 0,
            message: 'Access Denied',
            error: 'Missing or Invalid token.'
          });
      }
    }
  };