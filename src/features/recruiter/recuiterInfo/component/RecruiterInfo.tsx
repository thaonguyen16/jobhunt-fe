import { CompanyInformation } from "..";

import { Center, Container, Grid, Loader, Overlay } from "@mantine/core";
import UserInformation from "./UserInformation";
import { useState } from "react";
import ChangePassword from "@features/candidate/setting/components/ChangePassword";
import { VerifyAccount } from "@features/recruiter/approval";

export default function RecruiterInfo() {
  const [isloading, setLoading] = useState(true);
  const [businessLicense, setBusinessLicense] = useState<string>("");

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <>
      {isloading && (
        <Overlay w="100%" h="100%" pos="fixed" blur={2} zIndex={10000}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>
      )}
      <Container
        maw={"2000px"}
        bg={"#f4f4f4"}
        pt={"20px"}
        mih={"500px"}
        w={"100%"}
      >
        <Grid w={"100%"}>
          <Grid.Col span={{ base: 12, md: 8, sm: 12 }}>
            <CompanyInformation
              loading={handleSetLoading}
              setBusinessLicense={setBusinessLicense}
            />
            <VerifyAccount
              businessLicense={businessLicense}
              loading={setLoading}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, sm: 12 }}>
            <UserInformation loading={handleSetLoading}></UserInformation>
            <ChangePassword loading={handleSetLoading} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
