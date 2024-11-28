
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

type PlanCardProps = {
  id: number;
  name: string;
  duration: string;
  price: number;
  isActive: boolean;
  icon: string;
  feature: string[];
};

const PricingCardWrapper = styled(Card)({
  width: 250,
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

export default function PLanCard(props: PlanCardProps) {
  const { icon, duration, name, price, feature, isActive } = props;

  let priceDecor = "Fee";
  if (price == 0) {
    priceDecor = "Miễn phí";
  } else {
    priceDecor = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(price);
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <PricingCardWrapper>
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
              {name}
            </Typography>

            <Typography
              sx={{
                color: "black",
                fontSize: "17px",
                textAlign: "left",
                fontWeight: "700",
              }}
            >
              {priceDecor}
            </Typography>

            <Typography
              sx={{
                color: "black",
                fontSize: "14px",
                textAlign: "left",
                marginTop: "5px",
              }}
            >
              {duration}
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* Content of Plan */}

            {feature.map((item, index) => (
              <Typography
                key={index}
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
                {item}
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
            {isActive ? (
              <Typography
                sx={{
                  color: "grey",
                  fontSize: "15px",
                  textAlign: "left",
                  marginTop: "5px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                Đang sử dụng
              </Typography>
            ) : (
              <ButtonVip>Nâng cấp</ButtonVip>
            )}
          </CardActions>
        </PricingCardWrapper>
      </motion.div>
    </>
  );
}
