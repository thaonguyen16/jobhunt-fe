import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Get the access token from cookies
export const getAccessToken = (): string | null => {
  const token = Cookies.get("access_token");
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

interface payload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const getUserRole = (): string | undefined => {
  const token = getAccessToken();

  if (!token) {
    return undefined; // Return undefined if there's no token
  }

  try {
    const decodedToken = jwtDecode(token) as payload;
    return decodedToken.role;
  } catch (error) {
    return undefined; // Return undefined in case of decoding errors
  }
};

export const getTokenDuration = () => {
  const expiration = Cookies.get("expiration");
  const expirationDate = new Date(expiration + "");
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
