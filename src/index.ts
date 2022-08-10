import "./styles.css";

/*
Next steps:
Objects for each dropdown
Function to generate dropdown from object, start this function on load - 
business unit, location group, service line, campaign type

Object with each element
Object with each select, iterate over that with the event handler
Object for each output name, then use the object properties
Object for each output folder, add internal function using this and then property name

Length limit recommendations if exceeds
Copy services for each button

[TEST]-FiscalYear-Month-[Day]-Business Unit/Ministry Abbreviation-[Location/Medical Group]-
Service Line-Brief Name-Campaign Type-[Shortened Subject Line or description]-[Number in
series]-[Version Number]
*/

// use these to generate dropdowns
let BusinessUnits: Array<string> = ["tbd", "tbd"];
let LocationGroups: Array<string> = ["tbd", "tbd"];
let ServiceLine: Array<string> = ["tbd", "tbd"];

interface Months {
  [index: number]: string;
}

// January starts on 0
let convertMonth: Months = {
  0: "JAN",
  1: "FEB",
  2: "MAR",
  3: "APR",
  4: "MAY",
  5: "JUN",
  6: "JUL",
  7: "AUG",
  8: "SEP",
  9: "OCT",
  10: "NOV",
  11: "DEC"
};

interface timetable {
  getCurrentTimestamp(): number;
  getUTCDate(): string;
  getYear(): string;
  getMonth(): string;
  getDay(): string;
}

let times: timetable = {
  getCurrentTimestamp: (): number => {
    return Date.now();
  },
  getUTCDate: (): string => {
    let timestamp: number = Date.now();
    return new Date(timestamp).toUTCString();
  },
  getYear: (): string => {
    let timestamp: number = Date.now();
    let year: number = new Date(timestamp).getFullYear();
    let yearstring: string = year.toString();
    yearstring = yearstring.substring(2);
    return yearstring;
  },
  getMonth: (): string => {
    let timestamp: number = Date.now();
    let month: number = new Date(timestamp).getMonth();
    return convertMonth[month]; // returns the shortened month value
  },
  getDay: (): string => {
    let timestamp: number = Date.now();
    let localtime: number = new Date(timestamp).getDate();
    return localtime.toString();
  }
};

//test times
console.log(times.getYear());
console.log(times.getMonth());
console.log(times.getDay());

interface Elms {
  copyOutput: HTMLInputElement;
  campaignName: HTMLInputElement;
  businessUnit: HTMLInputElement;
  isTest: boolean;
  includeDay: boolean;
  getelm(): void;
}

// used for ElmOps
interface Operations {
  setInnerText(name: string, value: string): void;
  getElement(name: string): HTMLElement;
  getElmVal(name: string): string;
  setInnerHTML(name: string, value: string): void;
  setSelectValue(name: string, value: string): void;
  setInputValue(name: string, value: string): void;
}

// Necessary type assertion. This object has functions to get and set folder naming
let ElmOps: Operations = {
  setInnerText: (name: string, value: string): void => {
    let ElementHolder: HTMLElement = ElmOps.getElement(name);
    ElementHolder.innerText = value;
  },
  // pseudo like callback function used with set inner text
  getElement: (name: string): HTMLElement => {
    let elm = document.getElementById(name) as HTMLInputElement;
    return elm;
  },
  getElmVal: (name: string): string => {
    return (document.getElementById(name) as HTMLInputElement).value;
  },
  setInnerHTML: (name: string, value: string): void => {
    let ElementHolder: HTMLElement = ElmOps.getElement(name);
    ElementHolder.innerHTML = value;
  },
  setSelectValue: (name: string, value: string): void => {
    let ElementHolder: HTMLSelectElement = ElmOps.getElement(
      name
    ) as HTMLSelectElement;
    ElementHolder.value = value;
  },
  setInputValue: (name: string, value: string): void => {
    let ElementHolder: HTMLInputElement = ElmOps.getElement(
      name
    ) as HTMLInputElement;
    ElementHolder.value = value;
  }
};

ElmOps.setSelectValue("Year", times.getYear());
ElmOps.setSelectValue("Month", times.getMonth());
ElmOps.setInputValue("Day", times.getDay());

// gets current dropdown value, need to add a param for the element
function getdropvalue(id: string) {
  let currentdropvalue: string | undefined = (document.getElementById(
    id
  ) as HTMLSelectElement).value;
  console.log(currentdropvalue);
  return currentdropvalue;
}

// element names for the buttons
let AssetElms: Array<string> = [
  "CampaignName",
  "EmailName",
  "SegmentName",
  "FormName",
  "LPName",
  "ContentName",
  "ProgramName",
  "SharedFilter"
];

let FolderElms: Array<string> = [
  "CampaignFolder",
  "EmailFolder",
  "SegmentFolder",
  "FormFolder",
  "LPFolder",
  "ContentFolder",
  "ProgramFolder",
  "FilterFolder"
];

// set folder generation logic here, called the FolderElms array and ElmOps functions. Should we convert these to getters?

let FolderValues: object = {
  CampaignFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  EmailFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  SegmentFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  FormFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  LPFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  ContentFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  ProgramFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  },
  FilterFolder: (): string => {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
};

//FolderList.setInnerText(FolderList.CampaignFolder, "this is a test");

//class ElmList implements Elms {
//  constructor();
//}

interface Options {
  isTest(): boolean;
  includeDay(): boolean;
}

let checkOptions: Options = {
  isTest: (): boolean => {
    return (document.getElementById("isTest") as HTMLInputElement).checked;
  },
  includeDay: (): boolean => {
    return (document.getElementById("includeDay") as HTMLInputElement).checked;
  }
};

console.log(checkOptions.isTest());

//let copyOutput = document.getElementById("CampaignName") as HTMLInputElement;
//let campaignName = document?.getElementById("campaignName") as HTMLInputElement;
//let businessUnit = document?.getElementById("businessUnit") as HTMLInputElement;
//let isTest: boolean = (document.getElementById("isTest") as HTMLInputElement)
//  .checked;
//let includeDay: boolean = (document.getElementById(
//"includeDay"
//) as HTMLInputElement).checked;

function returnOptions(): number {
  let optionnumb: number;
  if (isTest && includeDay) {
    optionnumb = 4;
    return optionnumb;
  } else if (isTest && !includeDay) {
    optionnumb = 3;
    return optionnumb;
  } else if (!isTest && includeDay) {
    optionnumb = 2;
    return optionnumb;
  } else if (!isTest && !includeDay) {
    optionnumb = 1;
    return optionnumb;
  } else {
    optionnumb = 0;
    return optionnumb;
  }
}
// next to impossible to debug in here
function CopyOutputtoClipboard(output: string): void {
  window.navigator["clipboard"].writeText(output);
}

class AssetNames {
  get CampaignName(): string {
    return (
      (checkOptions.isTest() ? "[TEST]-" : "") +
      ElmOps.getElmVal("Year") +
      "-" +
      ElmOps.getElmVal("Month") +
      "-" +
      (checkOptions.includeDay() ? ElmOps.getElmVal("Day") + "-" : "") +
      ElmOps.getElmVal("businessUnit") +
      "-" +
      (ElmOps.getElmVal("locationGroup").length > 1
        ? ElmOps.getElmVal("locationGroup") + "-"
        : "") +
      ElmOps.getElmVal("serviceLine") +
      "-" +
      ElmOps.getElmVal("campaignName") +
      "-" +
      ElmOps.getElmVal("campaignType") +
      "-" +
      (ElmOps.getElmVal("Description").length > 1
        ? ElmOps.getElmVal("Description") + "-"
        : "") +
      (ElmOps.getElmVal("Series").length > 1
        ? ElmOps.getElmVal("Series") + "-"
        : "") +
      (ElmOps.getElmVal("Version").length > 1
        ? ElmOps.getElmVal("Version") + "-"
        : "")
    );
  }

  get EmailName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get SegmentName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get FormName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get LPName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get ContentName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get ProgramName(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
  get SharedFilter(): string {
    return (
      ElmOps.getElmVal("campaignName") + "-" + ElmOps.getElmVal("businessUnit")
    );
  }
}

let getAssetNames = new AssetNames();

// get all elements that should have an event listener
let eventelements: Array<HTMLElement> = Array.from(
  document.querySelectorAll("input")
);
// get all select elements for event listener
let dropelements: Array<HTMLSelectElement> = Array.from(
  document.querySelectorAll("select")
);

// sets all output values, including folder name, this is kind of the magnum opus
const inputHandler = function (e: Event): void {
  console.log("it ran");

  // set folders **************
  for (let LookupValue of FolderElms) {
    // let assembledvalue: string = pull from an object, pass LookupValue as key, uses foldervalues
    let assembledvalue: string = FolderValues[LookupValue]();
    ElmOps.setInnerText(LookupValue, assembledvalue);
  }
  //set naming for all asset elements, need to update to dynamically generate output values
  for (let i of AssetElms) {
    ElmOps.setInnerHTML(i, getAssetNames[i]);
  }
};

// assigns event handler to all dropdowns - still need to capture all dropdowns
for (let i of dropelements) {
  i.onchange = inputHandler;
}

//console.log(dropdownelm[0].innerHTML);
//document?.getElementById("dropdown").onchange = inputHandler;
// set event handlers for input fields and checkboxes
for (let i of eventelements) {
  i.addEventListener("input", inputHandler);
  i.addEventListener("propertychange", inputHandler);
}

// copy value to clipboard - need to iterate over each button
/*
copyOutput?.addEventListener("click", () =>
  CopyOutputtoClipboard(copyOutput.innerHTML)
);
*/
for (let i of AssetElms) {
  ElmOps.getElement(i).addEventListener("click", () =>
    CopyOutputtoClipboard(ElmOps.getElement(i).innerHTML)
  );
}
