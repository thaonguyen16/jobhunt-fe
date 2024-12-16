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

export interface IUserInforGoogle {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
    sub: string;
    role: string;   
}

export interface ISetPassword {
    newPass: string;
}