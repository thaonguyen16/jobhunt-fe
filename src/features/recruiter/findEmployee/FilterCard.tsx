import { Text, Container, ActionIcon, Group, Tooltip, Button } from "@mantine/core";
import "./combobox.scss";
import { IconAdjustmentsOff, IconEyeOff } from "@tabler/icons-react";
import ComboBoxSalaryFE from "./partials/ComboBoxSalaryFE";
import ComboBoxWorkModeFE from "./partials/ComboBoxWorkModeFE";
import { useEffect, useState } from "react";
import { Industry } from "@data/interface/industry";
import { Option } from "@data/interface/option";
import { fetchIndustriesWithSub } from "@services/industryService";
import { FilterCandidateCV } from "@data/interface/cv";
import ComboBoxDegreeFJ from "./partials/ComboBoxDegree";
import ComboBoxField from "./partials/comboBoxField";
import ComboBoxLocation from "./partials/comboBoxLocation";
import SearchText from "./partials/searchText";
import ComboBoxMajor from "./partials/comboBoxMajor";

export default function FilterCard({submit, hiddenF}:{submit: (data: FilterCandidateCV) => void,hiddenF: (data: boolean) => void;}) {

  const [resetFilter, setResetFiter] = useState(false);
  const [industryData, setIndustryData] = useState<Industry[]>([]);
  const [subIndustryData, setSubIndustryData] = useState<Option[]>([]);
  const [filterData, setFilterData] = useState<FilterCandidateCV>({keyWord: "",
    location: [],
    workMode: "",
    industry: "",
    subIndustry: "",
    experience: -1,
    degree: "",
    salaryMin: 0,
    salaryMax: 0,
    updateSort: true,
    findJobSort: false,
  });

  const handleChooseIndustry = (data: Option[]) => {
    setSubIndustryData(data);
  }

  const handleSetKeyWord = (data: string) => {
    setFilterData({...filterData, keyWord : data})
  }

  const handleSetLocation = (data: string[]) => {
    setFilterData({...filterData, location : data})
  }
  const handleSetWorkMode = (data: string) => {
    setFilterData({...filterData, workMode : data})
  }
  const handleSetIndustry = (data: string) => {
    setFilterData({...filterData, industry : data})
  }
  const handleSetSubIndustry = (data: string) => {
    setFilterData({...filterData, subIndustry : data})
  }

  const handleSetSalaryMinMax = (min: number, max: number) => {
    setFilterData({...filterData, salaryMin: min, salaryMax: max})
  }
  const handleSetDegree = (data: string) => {
    setFilterData({...filterData, degree: data});
  }

  const handleSubmitKeyWok = () => {
    submit(filterData);
  }

  useEffect(() => {
    const fetchIndustryData = async() => {
      await fetchIndustriesWithSub().then((data) => {
        if(data) {
          setIndustryData(data);
        }
      })
    }
    fetchIndustryData();
  },[]);

  useEffect(() => {
    handleChooseIndustry([]);
    setFilterData({keyWord: "",
      location: [],
      workMode: "",
      industry: "",
      subIndustry: "",
      experience: -1,
      degree: "",
      salaryMin: 0,
      salaryMax: 0,
      updateSort: true,
      findJobSort: false,
    })
  },[resetFilter])

  return (
    <Container h={"fit-content"} bg={"rgba(255,255,255,.5"} pt={"20px"} pb={"100px"} className="filter-card">
      <Group w={"100%"} justify="space-between">
        <Text size="md" fw={"700"} c={"#0581e6"}>
          Tìm kiếm cơ bản
        </Text>
        <Group>
        <Tooltip label="Xóa bộ lọc">
        <ActionIcon color="blue" onClick={() => {setResetFiter(!resetFilter)}} variant="subtle">
          <IconAdjustmentsOff stroke={1} />
        </ActionIcon>
        </Tooltip>
        <Tooltip label="Ẩn bộ lọc">
        <ActionIcon color="blue" onClick={() => {hiddenF(true)}} variant="subtle">
          <IconEyeOff stroke={1} />
        </ActionIcon>
        </Tooltip>
        </Group>
      </Group>
      <Text ta={"left"} w={"100%"} size="sm" fw={500} mt={"20px"}>
        Từ khóa tìm kiếm
      </Text>

      <SearchText key={"FC1"} keyWord={handleSetKeyWord} submit={handleSubmitKeyWok} resetFilter={resetFilter}></SearchText>

      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"}>
        Nơi làm việc
      </Text>

      <ComboBoxLocation key={"FC2"} resetFilter={resetFilter} location ={handleSetLocation}/>

      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"} mb={'1rem'}>
        Hình thức công việc
      </Text>

      <ComboBoxWorkModeFE key={"FC3"} getMobile={true} resetFilter={resetFilter} workMode = {handleSetWorkMode}/>


      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"}>
        Ngành nghề
      </Text>

      <ComboBoxField key={"FC4"} resetFilter={resetFilter} industryData={industryData} chooseSub = {handleChooseIndustry} industry = {handleSetIndustry}/>

      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"}>
        Lĩnh vực
      </Text>

      <ComboBoxMajor key={"FC5"} subIndustryData={subIndustryData} subIndustry = {handleSetSubIndustry}/>

      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"} mb={"1rem"}>
        Mức lương
      </Text>

      <ComboBoxSalaryFE key={"FC6"}  getMobile={true} resetFilter = {resetFilter} salary = {handleSetSalaryMinMax}/>

      <Text ta={"left"} w={"100%"} size="sm" fw={"500"} mt={"1rem"} mb={"1rem"}>
        Bằng cấp
      </Text>

      <ComboBoxDegreeFJ key={"DE7"} getMobile={true} resetFilter = {resetFilter} degree={handleSetDegree}  />

      <Button w={"100%"} variant="gradient" mt={"2rem"} onClick={() => {
         console.log(filterData);
         submit(filterData);
      }}>
        Áp dụng
      </Button>
    </Container>
  );
}
