import "./styles.css";

/*
Next steps:
Objects for each dropdown
Function to generate dropdown from object, start this function on load
Object with each element
Object with each select, iterate over that with the event handler
*/

interface Elms {
  copyOutput: HTMLInputElement;
  campaignName: HTMLInputElement;
  businessUnit: HTMLInputElement;
  isTest: boolean;
  includeDay: boolean;
  getelm(): void;
}

class ElmList implements Elms {
  constructor();
}

let copyOutput = document.getElementById("output") as HTMLInputElement;
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

// changes button value
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
