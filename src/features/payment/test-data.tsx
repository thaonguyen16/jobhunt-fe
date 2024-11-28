/* eslint-disable react-refresh/only-export-components */
import { Payment } from "@data/interface/payment";
import { Plan } from "@data/interface/plan";

export const SellectPlan: Plan = {
    id: 3,
    name: "Premium",
    duration: "1 năm",
    price: 500000,
    isActive: false,
    icon: "/src/assets/img/premium.png",
    feature: ["Không giới hạn tạo CV không logo","Không giới hạn ứng tuyển","Xem số đơn ứng tuyển","Ưu tiên hiển thị với nhà tuyển dụng"]
}

export const PaymentMethod: Payment[] = [
    {
        id: 0,
        name: "VNPay QR",
        icon: "/src/assets/img/vnpay.png",
    },
    {
        id: 1,
        name: "Thẻ Visa, Mastercard",
        icon: "/src/assets/img/mastercard.png",
    },
]