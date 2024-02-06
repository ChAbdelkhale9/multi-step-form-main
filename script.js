
const prices_plan = [9, 12, 15]
const prices_addon = [1, 2, 2]
const checkbox = document.getElementById('switch');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const inputs = document.getElementsByClassName('input');
const phoneInput = document.getElementById("phoneNumber")
const errorMessages = document.getElementsByClassName('error');
const plan_options = document.querySelectorAll('.plan-option');
const addOns = document.querySelectorAll('.add-on');
const addOnCheckboxes = document.querySelectorAll('.custom-checkbox');

// need to handle info  for each input field and validate before  submitting the form
const steps = [".your-info", ".select-plan", ".add-ons", ".summary"];

let currentStep = 0;
let isMonthly = true;

let userInfo = {
  profile: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  plan: {
    planOption: "arcade", // Set "arcade" as the default option
    isMonthly: true
  },
  addOn: {
    onlineService: false,
    largerStorage: false,
    customizableProfile: false
  }
};

next.addEventListener('click', () => {

  // Check if there are no more steps

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
  if (currentStep + 1 >= steps.length) {
    next.style.display = "none";
    console.log("Button disappeared");
    return;
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
  userInfo.profile = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  for (let i = 0; i < inputs.length; i++) {
    const inputValue = inputs[i].value.trim();

    if (!inputValue) {
      errorMessages[i].style.display = 'block';
      inputs[i].classList.add('isEmpty');
      isAllValid = false;  // Set to false only if an invalid field is found
    } else {
      errorMessages[i].style.display = 'none';
      inputs[i].classList.remove('isEmpty');
      // Populate userInfo only if all fields are valid
      userInfo.profile[inputs[i].name] = inputValue;
    }
  }

  console.log(userInfo);
  return isAllValid;
}

plan_options.forEach((option) => {
  const option_name = option.getAttribute('data-option');

  option.addEventListener('click', () => {
    const previousSelectedOption = document.querySelector(`.plan-option.isSelected`);

    if (previousSelectedOption) {
      previousSelectedOption.classList.remove('isSelected');
    }

    userInfo.plan.planOption = option_name;
    option.classList.add('isSelected');
  });

  // Set "arcade" as selected by default
  if (option_name === userInfo.plan.planOption) {
    option.classList.add('isSelected');
  }
});

checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    document.querySelector(".yearly").classList.add('inPlan');
    document.querySelector(".monthly").classList.remove('inPlan');
    userInfo.plan.isMonthly = false;
    priceUpdate()
  } else {
    document.querySelector(".monthly").classList.add('inPlan');
    document.querySelector('.yearly').classList.remove('inPlan');
    userInfo.plan.isMonthly = true
    priceUpdate();
  }
}
);



function priceUpdate() {
  const planType = userInfo.plan.isMonthly ? 'mo' : 'yr';

  for (let i = 0; i < 3; i++) {
    const optionPrice = document.getElementById(`price-${i + 1}`);
    const addonPrice = document.getElementById(`service-price-${i + 1}`);

    const priceValue = userInfo.plan.isMonthly ? prices_plan[i] : prices_plan[i] * 10;
    const addonValue = userInfo.plan.isMonthly ? prices_addon[i] : prices_addon[i] * 10;

    optionPrice.innerText = `$${priceValue}/${planType}`;
    addonPrice.innerText = `$${addonValue}/${planType}`;
  }

  const displayValue = userInfo.plan.isMonthly ? 'none' : 'block';
  document.querySelectorAll(".free-months").forEach(element => {
    element.style.display = displayValue;
  });
}






addOns.forEach((addOn, index) => {
  const serviceName = addOn.getAttribute('data-service-name');
  const checkbox = addOnCheckboxes[index];

  addOn.addEventListener('click', () => {
    if (!userInfo.addOn[serviceName]) {
      userInfo.addOn[serviceName] = true;
      addOn.classList.add('isSelected');
      checkbox.checked = true;
    } else {
      userInfo.addOn[serviceName] = false;
      addOn.classList.remove('isSelected');
      checkbox.checked = false;
    }
    console.log(userInfo);
  });
});