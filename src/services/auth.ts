
import {
  loginUser as loginUserFromDb,
  createAccount as createAccountFromDb,
} from "../utils/db";

/**
 * Authenticate a user using the existing authentication logic.
 */
export const loginUser = loginUserFromDb;

/**
 * Create an account using the existing account creation logic.
 */
export const createAccount = createAccountFromDb;
