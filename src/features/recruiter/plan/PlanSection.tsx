import Grid from "@mui/material/Grid2";

import { PlanPriceData } from "./test_data";
import PlanCard from "./PlanCard";
import { Typography } from "@mui/material";

export default function PlanSection() {
  return (
    <>
      <Typography
        sx={{
          color: "black",
          fontSize: "18px",
          textAlign: "center",
          lineHeight: "26px",
          marginTop: "2%",
          fontWeight: "700",
          width: "100%",
        }}
      >
        Nâng cấp tài khoản VIP
      </Typography>

      <Typography
        sx={{
          color: "#0581e6",
          fontSize: "32px",
          textAlign: "center",
          marginTop: "10px",
          lineHeight: "44px",
          fontWeight: "700",
          width: "100%",
        }}
      >
        Để có trải nghiệm tốt hơn
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "30px",
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "10%",
          backgroundColor: "rgba(0,0,0,0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {PlanPriceData.map((plan, index) => (
          <Grid
            key={plan.id}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlanCard
              key={index}
              name={plan.name}
              price={plan.price}
              feature={plan.feature}
              isActive={plan.isActive}
              id={plan.id}
              duration={plan.duration}
              icon={plan.icon}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
