import { Plan } from "@data/interface/plan";

export const PlanPriceData: Plan[] = [
    {
        id: 0,
        name: "Cơ bản",
        duration: "Vĩnh viễn",
        price: 0,
        isActive: true,
        icon: "/src/assets/img/starter.png",
        feature: ["3 lần đăng tuyển"
        ]
    },
    {
        id: 1,
        name: "Pro",
        duration: "30 ngày",
        price: 500000,
        isActive: false,
        icon: "/src/assets/img/pro.png",
        feature: ["Không giới hạn đăng tuyển","5 bài đăng nổi bật","Lọc ứng viên"
        ]
    },
    {
        id: 3,
        name: "Premium",
        duration: "1 năm",
        price: 890000,
        isActive: false,
        icon: "/src/assets/img/premium.png",
        feature: ["Không giới hạn đăng tuyển","20 bài đăng nổi bật","Lọc ứng viên"
        ]
    }
]