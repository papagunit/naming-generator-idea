import "./styles.css";

/*
Next steps:
Add requirement message for business unit?
Length limit recommendations if exceeds

[TEST]-FiscalYear-Month-[Day]-Business Unit/Ministry Abbreviation-[Location/Medical Group]-
Service Line-Brief Name-Campaign Type-[Shortened Subject Line or description]-[Number in
series]-[Version Number]
*/
interface Dropdowns {
  [index: string]: string;
}

type logicArray = Array<string>;
type logicMap = Dropdowns;

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
/* Omitting this for now, cannot get an exhaustive list
let LocationGroups: Dropdowns = {
  "": "Please Select",
  oneval: "one",
  twoval: "two"
};
*/
let ServiceLine: Dropdowns = {
  "": "Please Select",
  "adolescent-medicine": "Adolescent-Medicine",
  advocacy: "Advocacy",
  "allergy-and-immunology": "Allergy-And-Immunology",
  audiology: "Audiology",
  bariatrics: "Bariatrics",
  "behavioral-health": "Behavioral-Health",
  brand: "Brand",
  burn: "Burn",
  cardiology: "Cardiology",
  "cardiothoracic-surgery": "Cardiothoracic-Surgery",
  "covid-19": "Covid-19",
  dentistry: "Dentistry",
  dermatology: "Dermatology",
  "emergency-medicine": "Emergency-Medicine",
  "endocrinology-surgery": "Endocrinology-Surgery",
  "family-medicine": "Family-Medicine",
  flu: "Flu",
  gastroenterology: "Gastroenterology",
  "general-surgery": "General-Surgery",
  geriatrics: "Geriatrics",
  gynecology: "Gynecology",
  hepatology: "Hepatology",
  "home-care": "Home-Care",
  hospice: "Hospice",
  imaging: "Imaging",
  "immediate-care": "Immediate-Care",
  "infectious-diseases": "Infectious-Diseases",
  "internal-medicine": "Internal-Medicine",
  mammography: "Mammography",
  "maternal-fetal-medicine": "Maternal-Fetal-Medicine",
  maternity: "Maternity",
  medigold: "Medigold",
  "mil-vets": "Mil-Vets",
  neonatology: "Neonatology",
  nephrology: "Nephrology",
  neurology: "Neurology",
  neurosurgery: "Neurosurgery",
  "new-movers": "New-Movers",
  nutrition: "Nutrition",
  oncology: "Oncology",
  "online-scheduling": "Online-Scheduling",
  ophthalmology: "Ophthalmology",
  optometry: "Optometry",
  "oral-surgery": "Oral-Surgery",
  orthopedics: "Orthopedics",
  otolaryngology: "Otolaryngology",
  "pain-management": "Pain-Management",
  "palliative-care": "Palliative-Care",
  pediatrics: "Pediatrics",
  pharmacy: "Pharmacy",
  "plastic-surgery": "Plastic-Surgery",
  "primary-care": "Primary-Care",
  pulmonology: "Pulmonology",
  rheumatalogy: "Rheumatalogy",
  "senior-services": "Senior-Services",
  "sleep-medicine": "Sleep-Medicine",
  "spine-surgery": "Spine-Surgery",
  "sports-medicine": "Sports-Medicine",
  "thoracic-surgery": "Thoracic-Surgery",
  transplant: "Transplant",
  trauma: "Trauma",
  "talent-acquisition": "Talent-Acquisition",
  urology: "Urology",
  "vascular-surgery": "Vascular-Surgery",
  "virtual-care": "Virtual-Care",
  "womens-health": "Womens-Health"
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
  monthNumberFromString(month: string): number;
  getDaysSelectedMonth(): number;
}
// object with useful date methods
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
  },
  monthNumberFromString: (month: string): number => {
    return (new Date(`${month} 01 2000`).toLocaleDateString(`en`, {
      month: `numeric`
    }) as unknown) as number;
  },
  // returns the max number of days within a month
  getDaysSelectedMonth: (): number => {
    let month: string = (document.getElementById("Month") as HTMLInputElement)
      .value;
    let monthnumber: number = times.monthNumberFromString(month);
    let year: number = ((document.getElementById("Year") as HTMLSelectElement)
      ?.options[
      (document.getElementById("Year") as HTMLSelectElement)?.selectedIndex
    ].text as unknown) as number;
    return new Date(year, monthnumber, 0).getDate();
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

class InputValues {
  assetLogicMapping: logicMap = {
    CampaignName: "defaultLogic",
    EmailName: "defaultLogic",
    SegmentName: "segmentLogic",
    FormName: "defaultLogic",
    LPName: "pageLogic",
    ContentName: "defaultLogic",
    ProgramName: "programLogic",
    SharedFilter: "filterLogic"
  };
  folderLogicMapping: logicMap = {
    CampaignFolder: "defaultLogic",
    EmailFolder: "defaultLogic",
    SegmentFolder: "defaultLogic",
    FormFolder: "defaultLogic",
    LPFolder: "defaultLogic",
    ContentFolder: "yearLogic",
    ProgramFolder: "yearLogic",
    FilterFolder: "filterLogic"
  };
  d: string;
  constructor(delimiter: string) {
    this.d = delimiter;
  }
  get Year(): string {
    return (
      (checkOptions.isTest() ? "[TEST]" + this.d : "") +
      ElmOps.getElmVal("Year")
    );
  }
  get folderYear(): string {
    return "20" + ElmOps.getElmVal("Year");
  }
  get Month(): string {
    return this.d + ElmOps.getElmVal("Month");
  }
  get Day(): string {
    return checkOptions.includeDay() ? this.d + ElmOps.getElmVal("Day") : "";
  }
  get BusinessUnit(): string {
    return ElmOps.getElmVal("businessUnit").length > 0
      ? this.d + ElmOps.getElmVal("businessUnit")
      : "";
  }
  get folderBusinessUnit(): string {
    return ElmOps.getElmVal("businessUnit").length > 0
      ? ElmOps.getElmVal("businessUnit") + this.d
      : "";
  }
  get LocationGroup(): string {
    return ElmOps.getElmVal("locationGroup").length > 0
      ? this.d + ElmOps.getElmVal("locationGroup")
      : "";
  }
  get ServiceLine(): string {
    return ElmOps.getElmVal("serviceLine").length > 0
      ? this.d + ElmOps.getElmVal("serviceLine")
      : "";
  }
  get Campaign(): string {
    return ElmOps.getElmVal("campaignName").length > 0
      ? this.d + ElmOps.getElmVal("campaignName")
      : "";
  }
  get CampaignType(): string {
    return ElmOps.getElmVal("campaignType").length > 0
      ? this.d + ElmOps.getElmVal("campaignType")
      : "";
  }
  get Description(): string {
    return ElmOps.getElmVal("Description").length > 0
      ? this.d + ElmOps.getElmVal("Description")
      : "";
  }
  get Series(): string {
    return ElmOps.getElmVal("Series") !== ""
      ? this.d + ElmOps.getElmVal("Series")
      : "";
  }
  get Version(): string {
    return ElmOps.getElmVal("Version") !== ""
      ? this.d + "v" + ElmOps.getElmVal("Version")
      : "";
  }
  Name(logic: string): string {
    let y: string = "";
    for (let i of this[logic]) {
      y += this[i];
    }
    return y;
  }

  FindLogic(thing: string, aorf: number) {
    let logic: string = "";
    if (aorf === 1) {
      logic = this.folderLogicMapping[thing];
      return this.Name(logic);
    } else {
      logic = this.assetLogicMapping[thing];
      return this.Name(logic);
    }
  }
}

class FolderNames extends InputValues {
  // good for campaign, email, segments, forms, landing pages,
  defaultLogic: logicArray = [
    "folderBusinessUnit",
    "folderYear",
    "Month",
    "CampaignType",
    "Campaign"
  ];
  yearLogic: logicArray = ["folderBusinessUnit", "folderYear"];
  filterLogic: logicArray = [
    "folderBusinessUnit",
    "folderYear",
    "CampaignType",
    "Campaign"
  ];
}

// sets logic for output order and formatting
class AssetNames extends InputValues {
  // default for Campaigns, Emails, Forms, and Dynamic/Shared Content
  defaultLogic: logicArray = [
    "Year",
    "Month",
    "Day",
    "BusinessUnit",
    "LocationGroup",
    "ServiceLine",
    "Campaign",
    "CampaignType",
    "Description",
    "Series",
    "Version"
  ];

  segmentLogic: logicArray = [
    "Year",
    "Month",
    "Day",
    "BusinessUnit",
    "LocationGroup",
    "ServiceLine",
    "Campaign",
    "CampaignType",
    "Description"
  ];
  pageLogic: logicArray = [
    "Year",
    "Month",
    "Day",
    "BusinessUnit",
    "LocationGroup",
    "ServiceLine",
    "Campaign",
    "CampaignType",
    "Description",
    "Version"
  ];
  programLogic: logicArray = [
    "Year",
    "Month",
    "BusinessUnit",
    "LocationGroup",
    "ServiceLine",
    "Campaign",
    "CampaignType",
    "Description"
  ];
  filterLogic: logicArray = [
    "Year",
    "BusinessUnit",
    "LocationGroup",
    "Description"
  ];
}

function Validation(): void {
  // check if day fits within selected month
  let dayInput: number = (ElmOps.getElmVal("Day") as unknown) as number;
  if (dayInput > times.getDaysSelectedMonth() || dayInput < 1) {
    (ElmOps.getElement("Day") as HTMLInputElement).setCustomValidity(
      "Invalid day"
    );
    (ElmOps.getElement("Day") as HTMLInputElement).reportValidity();
  } else {
    (ElmOps.getElement("Day") as HTMLInputElement).setCustomValidity("");
  }
}

function Main() {
  (ElmOps.getElement("Day") as HTMLInputElement).setCustomValidity(
    "Invalid day"
  );
  // InvalidMsg(ElmOps.getElement("Day") as HTMLInputElement);
  ElmOps.setSelectValue("Year", times.getYear());
  ElmOps.setSelectValue("Month", times.getMonth());
  ElmOps.setInputValue("Day", times.getDay());

  for (const [key, value] of Object.entries(BusinessUnits)) {
    ElmOps.setInnerSelectHTML(
      "businessUnit",
      '<option value="' + key + '">' + value + "</option>"
    );
  }
  /* enabled this and interface again if we are using locationgroup dropdown
for (const [key, value] of Object.entries(LocationGroups)) {
  ElmOps.setInnerSelectHTML(
    "locationGroup",
    '<option value="' + key + '">' + value + "</option>"
  );
}
*/
  for (const [key, value] of Object.entries(ServiceLine)) {
    ElmOps.setInnerSelectHTML(
      "serviceLine",
      '<option value="' + key + '">' + value + "</option>"
    );
  }
  // next to impossible to debug in here
  function CopyOutputtoClipboard(output: string): void {
    window.navigator["clipboard"].writeText(output);
  }
  // instantiate the classes and pass a delimiter parameter to the constructor
  let getAssetNames: AssetNames = new AssetNames("-");
  let getFolderNames: FolderNames = new FolderNames(" => ");
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
    // call some sort of validation, in the future let validation block rest?
    // validateInputs();
    if (ElmOps.getElmVal("businessUnit") !== "") {
      // set folder location values
      for (let LookupValue of FolderElms) {
        ElmOps.setInnerHTML(
          LookupValue,
          getFolderNames.FindLogic(LookupValue, 1)
        );
      }
      //set naming for all asset elements
      for (let LookupValue of AssetElms) {
        ElmOps.setInnerHTML(
          LookupValue,
          getAssetNames.FindLogic(LookupValue, 2)
        );
      }
    }
    Validation();
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

  // copy output value upon click to clipboard, iterates over each 'button'
  for (let i of AssetElms) {
    ElmOps.getElement(i).addEventListener("click", () =>
      CopyOutputtoClipboard(ElmOps.getElement(i).innerHTML)
    );
  }
}
Main();
