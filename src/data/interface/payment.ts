export interface Payment {
    id: number;
    name: string;
    icon: string;
}

export interface IPayment {
    amount: number;
    orderInfo: string;
    plan: number;
}

export type Transaction = {
    id: number;
    orderId: string;
    transactionNo: string;
    transactionDate: string;
    amount: number;
    status: string;
    planName: string;
}