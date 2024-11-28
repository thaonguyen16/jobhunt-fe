export interface IRecruiterRegister {
    fullName: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    companyName: string;
    gender: string;
    location: number;
}

export interface IVerifyOTP {
    email: string;
    otp: string;
}