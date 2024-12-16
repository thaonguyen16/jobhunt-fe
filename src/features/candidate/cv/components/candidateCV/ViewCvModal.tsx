import { getImageCV } from "@/api/resume";
import { Flex, Modal,Image, Divider, Loader} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type ViewCvModalProps = {
  opened: boolean;
  onClose: () => void;
  id: number;
};

export default function ViewCvModal({ opened, onClose,id }: ViewCvModalProps) {

  const [image, setImage] = useState<string[]>([]);

  const query = useQuery({
    queryKey: ["get-image",id],
    queryFn: () => getImageCV(id),
  });

  useEffect(() => {
    if(query.data) {
      setImage(query.data);
    }
  },[query.data])


  return (
    <Modal
        opened={opened}
        onClose={onClose}
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 500 }}
      >
       <>
       {query.isLoading && <Flex w={"100%"} pt={"20%"} align={"center"} justify={"center"}>
                  <Loader color="green" type="dots"/>
                </Flex>}

                {image?.map((data, index) => <Flex key={data}>
          <Image src={data}/>
          <Divider>Trang {index + 1} / {image.length}</Divider>
        </Flex>)}
       
       </>

      
      </Modal>
  );
}