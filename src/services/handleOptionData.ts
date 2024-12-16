import { Option } from "@data/interface";

export default function chooseOptionInitValue(
  init: Option | undefined,
  options: Option[]
) {
  let choseOption: Option | undefined;

  if (init) {
    if (init.id === "0") {
      choseOption = init;
      options.unshift(choseOption);
    } else {
      choseOption = options.find((option) => option.id === init?.id);
    }
  } else {
    return undefined;
  }
  return choseOption;
}
