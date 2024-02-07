export interface ProcessPaymentInput {
    amount: number;
    paymentMethod: string;
}

export interface Payment {
    id: string;
    status: string;
    amount: number;
    paymentMethod: string;
    createdAt: string;
}