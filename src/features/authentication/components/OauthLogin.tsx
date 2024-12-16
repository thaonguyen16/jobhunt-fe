import Typography from "@mui/material/Typography";
import { Oauth2Button } from "@components/ui/button";
import { Container } from "@mantine/core";

export default function OauthLogin() {
  return (
    <Container bg={"white"}>
       <Typography
        className="text-primary-600"
        variant="body1"
        style={{ fontSize: "0.9rem", fontWeight: 600 }}
      >
        Hoặc đăng nhập bằng
      </Typography>
      <div className="flex justify-center gap-7">
        <Oauth2Button
          iconUrl="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-q.cdn.bubble.io%2Ff1536920601855x691820740932598700%2Fgoogle-logo-icon-PNG-Transparent-Background.png"
          alt="Sign in with Google"
        />
        <Oauth2Button
          iconUrl="https://static-00.iconduck.com/assets.00/facebook-icon-512x512-seb542ju.png"
          alt="Sign in with Facebook"
        />
      </div>
    </Container>

  );
}
