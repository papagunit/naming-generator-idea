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

Copy services for each button

[TEST]-FiscalYear-Month-[Day]-Business Unit/Ministry Abbreviation-[Location/Medical Group]-
Service Line-Brief Name-Campaign Type-[Shortened Subject Line or description]-[Number in
series]-[Version Number]
*/

interface Elms {
  copyOutput: HTMLInputElement;
  campaignName: HTMLInputElement;
  businessUnit: HTMLInputElement;
  isTest: boolean;
  includeDay: boolean;
  getelm(): void;
}

interface Folders {
  CampaignFolder: HTMLElement;
  EmailFolder: HTMLElement;
  SegmentFolder: HTMLElement;
  FormFolder: HTMLElement;
  LPFolder: HTMLElement;
  ContentFolder: HTMLElement;
  ProgramFolder: HTMLElement;
  FilterFolder: HTMLElement;
  setInnerText(name: string, value: string): void;
  getElement(name: string): HTMLElement;
}

// Necessary type assertion
let FolderList: Folders = {
  CampaignFolder: document.getElementById("CampaignFolder") as HTMLInputElement,
  EmailFolder: document.getElementById("EmailFolder") as HTMLInputElement,
  SegmentFolder: document.getElementById("SegmentFolder") as HTMLInputElement,
  FormFolder: document.getElementById("FormFolder") as HTMLInputElement,
  LPFolder: document.getElementById("LPFolder") as HTMLInputElement,
  ContentFolder: document.getElementById("ContentFolder") as HTMLInputElement,
  ProgramFolder: document.getElementById("ProgramFolder") as HTMLInputElement,
  FilterFolder: document.getElementById("FilterFolder") as HTMLInputElement,
  setInnerText: (name: string, value: string): void => {
    let ElementHolder: HTMLElement = FolderList.getElement(name);
    ElementHolder.innerText = value;
  },
  getElement: (name: string): HTMLElement => {
    let elm = document.getElementById(name) as HTMLInputElement;
    return elm;
  }
};

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

for (let i of FolderElms) {
  FolderList.setInnerText(i, "Test");
}

//FolderList.setInnerText(FolderList.CampaignFolder, "this is a test");

//class ElmList implements Elms {
//  constructor();
//}

let copyOutput = document.getElementById("CampaignName") as HTMLInputElement;
let campaignName = document?.getElementById("campaignName") as HTMLInputElement;
let businessUnit = document?.getElementById("businessUnit") as HTMLInputElement;
let isTest: boolean = (document.getElementById("isTest") as HTMLInputElement)
  .checked;
let includeDay: boolean = (document.getElementById(
  "includeDay"
) as HTMLInputElement).checked;

// next to impossible to debug in here
function CopyOutputtoClipboard(output: string): void {
  window.navigator["clipboard"].writeText(output);
}

// gets current dropdown value, need to add a param for the element
function getdropvalue(id: string) {
  let currentdropvalue: string | undefined = (document.getElementById(
    id
  ) as HTMLSelectElement).value;
  console.log(currentdropvalue);
  return currentdropvalue;
}

//prepare final output. need conditionals for checkboxes
function assembleOutput(): string {
  let concatValue: string =
    campaignName.value +
    "-" +
    businessUnit.value +
    "-" +
    getdropvalue("dropdown");

  return concatValue;
}

// get all elements that should have an event listener
let eventelements: Array<HTMLElement> = Array.from(
  document.querySelectorAll("input")
);

// changes button value, this is kind of the magnum opus
const inputHandler = function (e: Event): string {
  console.log("it ran");
  return (copyOutput.innerHTML = assembleOutput());
};

//fix this, need an onchange
let dropdownelm: HTMLElement | null = document.getElementById("dropdown");
dropdownelm!.onchange = inputHandler;

//console.log(dropdownelm[0].innerHTML);
//document?.getElementById("dropdown").onchange = inputHandler;
// set event handlers
for (let i of eventelements) {
  i.addEventListener("input", inputHandler);
  i.addEventListener("propertychange", inputHandler);
}

// copy value to clipboard
copyOutput?.addEventListener("click", () =>
  CopyOutputtoClipboard(copyOutput.innerHTML)
);
