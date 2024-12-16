import {Image,Text, Transition } from "@mantine/core";
export default function Layer({
    linkLayer
}: {linkLayer: string}) {
    

    return (<>
        <Transition mounted={true}
      transition="scale"
      keepMounted
      
      timingFunction="ease">
            {(transitionStyles) => (<><Image
        pos={"absolute"}
        top={"0"}
        left={"0"}
        style={{...transitionStyles, zIndex: 0}}
        fallbackSrc="/src/assets/img/placeholder.png"

        src={linkLayer}
        fit="revert-layer"
        h={"25rem"}
        w={"100%"}

        m={"0"}
        p={"0"}
        />        
        </>)}
        
            </Transition>
        
        <Text  pos={"relative"} style={{zIndex: 2}} c={"#608BC1"} w={"100%"} ta={"center"} fw={800} size="1.5rem" mb={"1.5rem"}>
            Tìm việc làm nhanh chóng, dễ dàng với Jobhunt
        </Text>
    </>);
}