export function decorPrice(price: number) {
  let priceDecor = "Fee";
  if (price == 0) {
    priceDecor = "Miễn phí";
  } else {
    priceDecor = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(price);

    return priceDecor;
  }
}


export function getGender(gender: string | undefined) {
  let decorGender = "";

  if (gender !== undefined) {
    if (gender === "MALE") {
      decorGender = "Nam";
    }
    else if (gender === "FEMALE") {
      decorGender = "Nữ"
    }
    else {
      decorGender = "Khác"
    }
  }

  return decorGender;
}

export function decorSalary(min: number, max: number) {
  if (min == null && max == null || min==0 && max==0) {
    return "Lương thỏa thuận";
  }

  if (min == null || min==0) {
    return "Dưới " + Math.round(max / 1000000) + " triệu";
  }

  if (max == null || max==0) {
    return "Trên " + Math.round(min / 1000000) + " triệu";
  }

  if (Math.round(min) == 0 && Math.round(max) == 0) {
    return "Lương thỏa thuận";
  }

  const num1 = Math.round(min / 1000000);
  const num2 = Math.round(max / 1000000);
  return num1 + " - " + num2 + " triệu";
}

export function decorNumber(data: number | null) {
 if(data) {
  let name = "";
  let i = 0;
  let num = 1;
  for(i ; i< data.toString().length ; i++) {
    num++;
    name = name + data.toString()[i];
    if(num == 3) {
      name = name + ".";
      num = 1;
    }
  }
 
  return name;
 }
  
}