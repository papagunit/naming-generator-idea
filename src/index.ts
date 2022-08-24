import "./styles.css";

/*
Next steps:
Function to generate dropdown from object, start this function on load - 
business unit, location group, service line, campaign type

Update folder logic

Length limit recommendations if exceeds

[TEST]-FiscalYear-Month-[Day]-Business Unit/Ministry Abbreviation-[Location/Medical Group]-
Service Line-Brief Name-Campaign Type-[Shortened Subject Line or description]-[Number in
series]-[Version Number]
*/
interface Dropdowns {
  [index: string]: string;
}

// use these to generate dropdowns. Value on the right is shown in box
let BusinessUnits: Dropdowns = {
  "": "Please Select",
  TH: "Trinity Health",
  HCHFL: "Holy Cross Health FL",
  HCHMD: "Holy Cross Health MD",
  Loyola: "Loyola Medicine",
  THMI: "Trinity Health Michigan",
  MO: "MercyOne",
  MCHS: "Mount Carmel Health System",
  SAMC: "Saint Agnes Medical Center",
  SAHS: "Saint Alphonsus Regional Medical Center",
  SJMED: "Saint Joseph Health System - Indiana",
  SJHSYR: "St. Joseph's Health",
  "SMHCS GA": "St. Mary's Health Care System",
  SPHP: "St. Peter's Health Partners",
  THMA: "Trinity Health Mid Atlantic",
  THOfNE: "Trinity Health Of New England"
};
let LocationGroups: Dropdowns = {
  "": "Please Select",
  oneval: "one",
  twoval: "two"
};
let ServiceLine: Dropdowns = {
  "": "Please Select",
  oneval: "one",
  twoval: "two"
};

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

// used for ElmOps
interface Operations {
  setInnerText(name: string, value: string): void;
  getElement(name: string): HTMLElement;
  getElmVal(name: string): string;
  setInnerHTML(name: string, value: string): void;
  setSelectValue(name: string, value: string): void;
  setInputValue(name: string, value: string): void;
  setInnerSelectHTML(name: string, value: string): void;
}

// Necessary type assertion. This object has functions to get and set elements
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
  // this also works for dropdowns
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
  },
  setInnerSelectHTML: (name: string, value: string): void => {
    let ElementHolder: HTMLSelectElement = ElmOps.getElement(
      name
    ) as HTMLSelectElement;
    ElementHolder.innerHTML = ElementHolder.innerHTML + value;
  }
};

// Put these in some sort of init
ElmOps.setSelectValue("Year", times.getYear());
ElmOps.setSelectValue("Month", times.getMonth());
ElmOps.setInputValue("Day", times.getDay());

for (const [key, value] of Object.entries(BusinessUnits)) {
  ElmOps.setInnerSelectHTML(
    "businessUnit",
    '<option value="' + key + '">' + value + "</option>"
  );
}
for (const [key, value] of Object.entries(LocationGroups)) {
  ElmOps.setInnerSelectHTML(
    "locationGroup",
    '<option value="' + key + '">' + value + "</option>"
  );
}
for (const [key, value] of Object.entries(ServiceLine)) {
  ElmOps.setInnerSelectHTML(
    "serviceLine",
    '<option value="' + key + '">' + value + "</option>"
  );
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

function defaultFoldering(): string {
  return (
    ElmOps.getElmVal("businessUnit") +
    " -> 20" +
    ElmOps.getElmVal("Year") +
    " -> [" +
    ElmOps.getElmVal("Month") +
    "] -> " +
    (ElmOps.getElmVal("campaignType").length > 1
      ? ElmOps.getElmVal("campaignType") + " -> "
      : "") +
    (ElmOps.getElmVal("campaignName").length > 1
      ? "[" + ElmOps.getElmVal("campaignName") + "]"
      : "")
  );
}

function buYearFoldering(): string {
  return ElmOps.getElmVal("businessUnit") + " -> 20" + ElmOps.getElmVal("Year");
}

let FolderValues: object = {
  CampaignFolder: (): string => {
    return defaultFoldering();
  },
  EmailFolder: (): string => {
    return defaultFoldering();
  },
  SegmentFolder: (): string => {
    return defaultFoldering();
  },
  FormFolder: (): string => {
    return defaultFoldering();
  },
  LPFolder: (): string => {
    return defaultFoldering();
  },
  ContentFolder: (): string => {
    return defaultFoldering();
  },
  ProgramFolder: (): string => {
    return buYearFoldering();
  },
  FilterFolder: (): string => {
    return defaultFoldering();
  }
};

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

// next to impossible to debug in here
function CopyOutputtoClipboard(output: string): void {
  window.navigator["clipboard"].writeText(output);
}

class AssetNames {
  defaultName(): string {
    return (
      (checkOptions.isTest() ? "[TEST]-" : "") +
      ElmOps.getElmVal("Year") +
      "-" +
      ElmOps.getElmVal("Month") +
      "-" +
      (checkOptions.includeDay() ? ElmOps.getElmVal("Day") + "-" : "") +
      ElmOps.getElmVal("businessUnit") +
      "-" +
      (ElmOps.getElmVal("locationGroup").length > 0
        ? ElmOps.getElmVal("locationGroup") + "-"
        : "") +
      (ElmOps.getElmVal("serviceLine").length > 0
        ? ElmOps.getElmVal("serviceLine") + "-"
        : "") +
      ElmOps.getElmVal("campaignName") +
      "-" +
      ElmOps.getElmVal("campaignType") +
      (ElmOps.getElmVal("Description").length > 0
        ? "-" + ElmOps.getElmVal("Description")
        : "") +
      (ElmOps.getElmVal("Series") !== ""
        ? "-" + ElmOps.getElmVal("Series")
        : "") +
      (ElmOps.getElmVal("Version") !== ""
        ? "-v" + ElmOps.getElmVal("Version")
        : "")
    );
  }

  get CampaignName(): string {
    return this.defaultName();
  }

  get EmailName(): string {
    return this.defaultName();
  }
  get SegmentName(): string {
    return this.defaultName();
  }
  get FormName(): string {
    return this.defaultName();
  }
  get LPName(): string {
    return this.defaultName();
  }
  get ContentName(): string {
    return this.defaultName();
  }
  get ProgramName(): string {
    return this.defaultName();
  }
  get SharedFilter(): string {
    return this.defaultName();
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
  //set naming for all asset elements
  for (let i of AssetElms) {
    ElmOps.setInnerHTML(i, getAssetNames[i]);
  }
};

// assigns event handler to all dropdowns
for (let i of dropelements) {
  i.onchange = inputHandler;
}

// set event handlers for input fields and checkboxes
for (let i of eventelements) {
  i.addEventListener("input", inputHandler);
  i.addEventListener("propertychange", inputHandler);
}

// copy value to clipboard, iterates over each button
for (let i of AssetElms) {
  ElmOps.getElement(i).addEventListener("click", () =>
    CopyOutputtoClipboard(ElmOps.getElement(i).innerHTML)
  );
}
