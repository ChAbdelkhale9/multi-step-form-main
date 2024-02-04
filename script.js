let selectedOption = null;
const prices = [9, 12, 15]
const checkbox = document.getElementById('switch');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const inputs = document.getElementsByClassName('input');
const phoneInput = document.getElementById("phoneNumber")
const errorMessages = document.getElementsByClassName('error');
const steps = [".your-info", ".select-plan", ".test"];

let currentStep = 0;
let isMonthly = true;


let userInfo = [];




selectOption(1)
next.addEventListener('click', () => {

  // Check if there are no more steps
  if (currentStep >= steps.length) {
    next.style.display = "none";
    console.log("Button disappeared");
    return;
  }

  console.log("Current Step:", currentStep);

  if (currentStep === 0 && !isAllValidated()) {
    return;
  }
  currentStep += 1;
  const previousStepElement = document.querySelector(steps[currentStep - 1]);
  const previousStepIcon = document.getElementsByClassName('step_icon')[currentStep - 1];

  previousStepElement.style.display = "none";
  previousStepIcon.classList.remove('inStep');
  console.log("Next Step:", steps[currentStep]);

  const currentStepElement = document.querySelector(steps[currentStep]);
  const currentStepIcon = document.getElementsByClassName('step_icon')[currentStep];

  currentStepElement.style.display = "block";
  currentStepIcon.classList.add('inStep');

  if (currentStep > 0) {
    back.classList.remove('noneBack');
  }
});



back.addEventListener('click', () => {
  next.style.display = "block";
  currentStep -= 1;
  if (currentStep === 0) {
    back.classList.add('noneBack')
  }
  if (steps[currentStep] === undefined) {
    next.style.display = "none"
    return
  }
  console.log("back " + steps[currentStep]);
  document.querySelector(steps[currentStep + 1]).style.display = "none";
  document.getElementsByClassName('step_icon')[currentStep + 1].classList.remove('inStep');
  document.querySelector(steps[currentStep]).style.display = "block";
  document.getElementsByClassName('step_icon')[currentStep].classList.add('inStep');

});

phoneInput.addEventListener('keypress', (event) => {
  // Allow only numeric values, backspace, and delete key
  const allowedKeys = ['Backspace', 'Delete'];
  if (!(/^\d+$/.test(event.key) || allowedKeys.includes(event.key))) {
    event.preventDefault();
  }
})


function isAllValidated() {
  let isAllValid = true;
  userInfo = [];

  for (let i = 0; i < inputs.length; i++) {
    const inputValue = inputs[i].value.trim(); // Trim the input value

    if (!inputValue) {
      // Check if the trimmed input value is empty
      errorMessages[i].style.display = 'block';
      inputs[i].classList.add('isEmpty');
      userInfo = [];  // Reset user information if any field is invalid
      isAllValid = false;
    } else {
      errorMessages[i].style.display = 'none';
      inputs[i].classList.remove('isEmpty');
    }
  }

  // If all inputs are valid, populate the userInfo array
  if (isAllValid) {
    userInfo.push({
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      phoneNumber: inputs[2].value.trim(),
    });
  }

  console.log(userInfo);
  return isAllValid;
}


function selectOption(option) {
  // Check if the clicked option is already selected
  const isAlreadySelected = selectedOption === option;

  // Deselect the previously selected option if not the last selected
  if (selectedOption !== null && !isAlreadySelected) {
    document.querySelector(`.plan-option[data-option="${selectedOption}"]`).classList.remove('selected');
  }

  // Toggle selection for the clicked option
  if (!isAlreadySelected) {
    selectedOption = option;
    document.querySelector(`.plan-option[data-option="${option}"]`).classList.add('selected');
  }
}



checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    document.querySelector(".yearly").classList.add('inPlan');
    document.querySelector(".monthly").classList.remove('inPlan');
    isMonthly = false;
    priceUpdate()
  } else {
    document.querySelector(".monthly").classList.add('inPlan');
    document.querySelector('.yearly').classList.remove('inPlan');
    isMonthly = true;
    priceUpdate();
  }
}
);

function priceUpdate() {
  if (isMonthly) {
    for (let i = 0; i < 3; i++) {
      optionPrice = document.getElementById(`price-${i + 1}`)
      optionPrice.innerText = `$${prices[i]}/mo`;
      document.querySelectorAll(".free-months").forEach(element => {
        element.style.display = "none";
      });
    }
  } else {
    for (let i = 0; i < 3; i++) {
      optionPrice = document.getElementById(`price-${i + 1}`)
      optionPrice.innerText = `$${prices[i] * 10}/yr`;
      document.querySelectorAll(".free-months").forEach(element => {
        element.style.display = "block";
      });
    }
  }
}