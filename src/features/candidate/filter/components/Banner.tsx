import { em, Grid, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import "@mantine/carousel/styles.css";
import "../banner.scss";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { BannerData } from "@data/interface/banner";

export default function Banner({
  bannerList,
}: {
  bannerList: BannerData[] | undefined;
}) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [mainBanner, setmainBanner] = useState<BannerData>();
  const [subBanner, setSubBanner] = useState<BannerData[]>();

  useEffect(() => {
    if (bannerList) {
      const subData: BannerData[] = [];
      bannerList.forEach((ba) => {
        if (ba.type == "MAIN") {
          setmainBanner(ba);
        }
        if (ba.type == "SUB") {
          subData.push(ba);
        }
      });
      setSubBanner(subData);
    }
  }, [bannerList]);

  return (
    <Grid w={"100%"}>
      <Grid.Col span={{ base: 12, xs: 12, md: 5 }} h={"20rem"}>
        {!isMobile && mainBanner && (
          <Image
            pos={"relative"}
            h={"18rem"}
            fit="fill"
            src={mainBanner?.img}
            radius={"md"}
            fallbackSrc="https://placehold.co/600x400?text=Banner"
          />
        )}
        
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12, md: 7 }} h={"20rem"}>
        {subBanner && <Carousel
          withIndicators
          loop
          classNames={{
            root: "carousel",
            controls: "carouselControls",
            indicator: "carouselIndicator",
          }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {subBanner.map((data) => (
            <Carousel.Slide
              key={data.img}
              style={{
                transition: "opacity 150ms ease",
              }}
            >
              
                <Image
                  src={data.img}
                  fit="fill"
                  h={"18rem"}
                  radius={"md"}
                  fallbackSrc="/src/assets/img/placeholder.png"
                />
              
            
            </Carousel.Slide>
          ))}
        </Carousel>}
      </Grid.Col>
    </Grid>
  );
}
