import { getAccessToken } from "@utils/authUtils";

export default function tokenLoader() {
  return getAccessToken();
}
