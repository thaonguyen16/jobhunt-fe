import { useEffect, useCallback, useState } from "react";
import { RecruiterRegisterInfo } from "..";

export default function useRecruiterFormValid(
  initValue: boolean,
  recruiterRegistrationInfo: RecruiterRegisterInfo
) {
  const [isFormValid, setIsFormValid] = useState(initValue);

  const {
    fullName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    companyName,
  } = recruiterRegistrationInfo;

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

    if (!companyName) return false;

    if (!phoneNumber || !/^(\+?\d{1,3}[- ]?)?\d{9,}$/.test(phoneNumber))
      return false;

    if (password !== confirmPassword) {
      valid = false;
    }

    return valid;
  }, [email, password, confirmPassword, fullName, phoneNumber, companyName]);

  useEffect(() => {
    setIsFormValid(() => validateRegisterForm());
  }, [recruiterRegistrationInfo, validateRegisterForm]);

  return { isFormValid };
}
