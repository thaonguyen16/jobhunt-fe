
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

import {
  CardContent,
  CardActions,
  Box,
  styled,
  Card,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { NumberFormatter } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PricingCardWrapper = styled(Card)({
  width: 320,
  maxHeight: "550px",
  margin: "10",
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  borderRadius: 20,
  cursor: "pointer",
  position: "relative",
});

const ButtonVip = styled(Button)({
  height: "40px",
  width: "130px",
  textTransform: "none",
  fontSize: "15px",
  backgroundColor: "rgba(5, 129, 230, .1)",
  margin: "0",
  padding: "0",
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRadius: "10px",
  color: "rgb(5, 129, 230)",
  fontWeight: "700",

  "&:hover": {
    backgroundColor: "rgba(5, 129, 230, 1)",
    color: "white",
  },
});

export default function PLanCard({plan,icon}) {

  const navigate = useNavigate();
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <PricingCardWrapper onClick={() => {
           navigate("/thanh-toan" , {state: {plan: plan, icon: icon}});
        }}>
          <CardContent>
            <Box
              component="img"
              sx={{
                width: "50px",
                height: "50px",
                border: "none",
              }}
              src={icon}
            />

            <Typography
              sx={{
                color: "#0581e6",
                fontSize: "17px",
                textAlign: "left",
                fontWeight: "700",
                marginTop: "5px",
              }}
            >
              {plan.name}
            </Typography>

           <NumberFormatter value={plan.price} thousandSeparator style={{
            fontSize: "25px",
            fontWeight: 700,
            color: "#0581e6"
           }}/>

            <Typography
              sx={{
                color: "black",
                fontSize: "14px",
                textAlign: "left",
                marginTop: "5px",
              }}
            >
              {plan.duration} ngày
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* Content of Plan */}

            {plan.planItemValueList.map((item, index) => (
              <Typography
                key={item.name + index}
                sx={{
                  color: "black",
                  fontSize: "14px",
                  textAlign: "left",
                  marginTop: "5px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "20px",
                    color: "rgba(105, 193, 125,0.9)",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                />
                {item.name + " : "} {item.value !== "TRUE" && item.value !== "FALSE" && item.value + " lượt"} {item.value === "TRUE" && "Có"} {item.value === "FALSE" && "Không"}
              </Typography>
            ))}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           <ButtonVip onClick={() => {
            navigate("/thanh-toan" , {state: {plan: plan, icon: icon}});
           
           }}>Nâng cấp</ButtonVip>
          </CardActions>
        </PricingCardWrapper>
      </motion.div>
    </>
  );
}
