import {
  loginRepository,
  logoutRepository,
  sessionRepository,
} from "../repository";

export async function login(
  email: string,
  password: string
) {
  return loginRepository(email, password);
}

export async function logout() {
  return logoutRepository();
}

export async function getSession() {
  return sessionRepository();
}