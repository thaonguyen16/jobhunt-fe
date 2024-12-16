export type Plan = {
    id: number,
    name: string;
    description: string;
    price: number;
    duration: number;
    status: string;
    createdAt: string;
    planItemValueList: PlanItemValue[];
    type: string;
    number: number;
}

export interface IPlan {
    name: string;
    description: string;
    price: number;
    duration: number;
    planItemValueList: IPlanItemValue[];
    type: string;
}

export type PlanItem = {
    id: number;
    name: string;
    type: string;
}

export type IPlanItemValue = {
    id: number;
    name: string;
    value: string;
    type: string;
}

export interface PlanItemValue {
    id: number;
    name: string;
    value: string;
}