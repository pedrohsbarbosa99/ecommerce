import request from "../../libs/request";
import { AxiosResponse } from "axios";
import { ProcessPaymentInput, Payment } from './types';

export const ProcessPayment = (
data: ProcessPaymentInput,
): Promise<AxiosResponse<Payment, unknown>> => {
    return request.run<Payment>({
        url: "/api/payments/process",
        method: "POST",
        data,
});
};
ProcessPayment.id = "payments";