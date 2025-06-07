export declare enum VerifyCodeType {
    FORGOT_PASSWORD = "forgot_password",
    VERIFY_EMAIL = "verify_email"
}
export declare class VerifyCode {
    id: number;
    code: number;
    email: string;
    type: string;
    createdAt: Date;
}
