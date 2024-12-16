import { Banner, Layer, SearchBar } from "@features/candidate/filter";
import { MediumContainer } from "@components/ui";

import { useEffect, useState } from "react";
import { BannerData } from "@data/interface/banner";
import fetchBannerByStatus from "@services/bannerService";
import { JobCardContainer } from "@features/job";
import MediumContainerNoBG from "@components/ui/MediumContainerNoBG";
import CompanyHotCardCardContainer from "@features/job/components/card/CompanyHotCardContainer";
import IndustryCardContainer from "@features/job/components/card/IndustryCardContainer";
import SuggestJobCardContainer from "@features/job/components/card/SuggestJobCardContainer";
import { Image } from "@mantine/core";
import ScrollToTop from "@components/ui/ScrollToTop";

export default function Job() {
  const [banners, setBanners] = useState<BannerData[] | undefined>(undefined);
  const [layerLink, setLayerLink] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ba = await fetchBannerByStatus("ACTIVE");
        setBanners(ba);
        if (ba) {
          ba.forEach((e) => {
            if (e.type === "LAYER") {
              setLayerLink(e.link);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MediumContainer>
        <ScrollToTop />
        <Layer linkLayer={layerLink} />
        <SearchBar />
        <Banner bannerList={banners} />
      </MediumContainer>

      <MediumContainerNoBG>
        <JobCardContainer></JobCardContainer>
        <SuggestJobCardContainer></SuggestJobCardContainer>

        <IndustryCardContainer></IndustryCardContainer>

        <CompanyHotCardCardContainer></CompanyHotCardCardContainer>

        <Image src="src/assets/img/jobhunt_slider.png" w={"100%"} />
      </MediumContainerNoBG>
    </>
  );
}
