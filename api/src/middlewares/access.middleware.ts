import { Request, Response, NextFunction } from "express";
import { hasAccess, Roles } from "../roles";

const grantAccess = (role: Roles) => {
  return async function(req: Request, res: Response, next) {
    try {
      const token = req.headers["x-access-token"];

      if(!token) throw new Error("no token provided !");  
      if(!hasAccess(token.toString(), role)) throw new Error("wrong token provided !");

      next();
    }
    catch (error) {
      res.status(401).send({
        type: "Protected ressource",
        error: error.toString()
      });
    }
  }
}

export {
  grantAccess,
  Roles
}