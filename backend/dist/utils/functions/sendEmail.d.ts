export declare const template: {
    verify: (code: number) => string;
};
export declare function sendEmail(to: string, subject: string, text: string): Promise<void>;
