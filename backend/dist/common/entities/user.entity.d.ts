export declare class User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    stripeCustomerId?: string;
    isVerifiedEmail: boolean;
    isVerificationPassport: boolean;
    isVerificationFace: boolean;
    createdAt: Date;
    googleId?: string;
    appleId?: string;
    facebookId?: string;
    isBanned: boolean;
}
