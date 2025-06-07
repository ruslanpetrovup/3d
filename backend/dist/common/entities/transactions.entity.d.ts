import { TransactionStatus } from '../enums/transactions.enum';
export declare class Transactions {
    id: string;
    userId: string;
    stripeTransactionLinkId: string;
    typeTransaction: string;
    typePayment: string;
    amount: number;
    data: {
        [key: string]: any;
    };
    status: TransactionStatus;
    description: string;
    createdAt: Date;
}
