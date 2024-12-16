import { JobCardData } from "./job"

export type PaginationRespone = {
    listData: JobCardData[]
    totalItems: number
    totalPages: number
}