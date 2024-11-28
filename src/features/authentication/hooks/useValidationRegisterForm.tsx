import { useEffect, useCallback, useState } from "react";

export default function useValidationRegisterForm(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateRegisterForm = useCallback(() => {
    let valid = true;

    if (!fullName || !/^[\p{L}\p{M}\s]+$/u.test(fullName)) {
      valid = false;
    }

    // Validate email
    if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      valid = false;
    }

    // Validate password
    if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      valid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      valid = false;
    }

    return valid;
  }, [email, password, confirmPassword, fullName]);

  useEffect(() => {
    setIsFormValid(() => validateRegisterForm());
  }, [email, password, confirmPassword, validateRegisterForm]);

  return { isFormValid };
}
