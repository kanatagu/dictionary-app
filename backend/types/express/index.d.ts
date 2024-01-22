import { Express } from 'express-serve-static-core';
import express from 'express';
import { UserType } from '../../models/user';

// declare namespace Express {
//   interface Request {
//     user: Omit<UserType, 'password'>;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user: Omit<UserType, 'password'>;
    }
  }
}

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: Omit<UserType, 'password'>;
//   }
// }

// declare global {
//   namespace Express {
//     export interface Request {
//       user?: Omit<UserType, 'password'>;
//     }
//   }
// }
