import { Plan } from "./plan";

export type SubscriptionData = {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
    plan: Plan
}