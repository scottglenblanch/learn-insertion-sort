// user actions
// click on button to create array

function getTextArea() {
  return document.querySelector('.user-input')
}

function getTemplateElement(templateQuerySelector) {
  const templateElement = document
    .querySelector(`[data-template="${templateQuerySelector}"]`)

  return templateElement.content.children[0].cloneNode(true)
}

function isInputValid(inputText) {
  return inputText.length > 0 && inputText.split(/\s+/).every(word => !isNaN(word))
}

function bindListenerToTextArea() {
  const textAreaEl = getTextArea()

  textAreaEl.addEventListener('change', (e) => {
    const inputText = e.target.value ?? ''
    
    removeNumbers()
    hideNextButton()
    hideInvalidInputAlert()

    if (isInputValid(inputText)) {

      showNumbersFromInput(inputText)
      showNextButton(inputText)
    } else {
      showInvalidInputAlert()
    }
  })
}


function addClassToNumberElement(index, className) {
  const elementToUpdate = document.querySelector(`.display-numbers > .number-item:nth-child(${index + 1})`)
  const previousCurrentNumbers = Array.from(document.querySelectorAll('.' + className))

  previousCurrentNumbers.forEach(el => el.classList.remove(className))

  elementToUpdate.classList.add(className)  
}

function addTextToNumberElement(index, text) {
  const elementToUpdate = document.querySelector(`.display-numbers > .number-item:nth-child(${index + 1})`)

  elementToUpdate.textContent = text
}

function removeClassesFromElements(className) {
  const elements = Array.from(document.querySelectorAll('.' + className))

  elements.forEach(x => x.classList.remove(className))
}

function showListOrderedAlert(countStepsTaken) {
  const listOrderedAlert = getTemplateElement('template-list-now-ordered')

  listOrderedAlert.textContent = listOrderedAlert.textContent.replace('{countStepsTaken}', countStepsTaken)

  document.body.appendChild(listOrderedAlert)
}

function bindEventListenerToButtonForNextStep(buttonEl, numbers) {

  let countStepsTaken = 0

  function* generatorFunctionForAlgorithm() {

    for(let i = 0; i < numbers.length; i++) {
      yield;
      removeClassesFromElements('comparison-left-number')
      removeClassesFromElements('comparison-right-number')
      removeClassesFromElements('current-number')

      addClassToNumberElement(i, 'current-number')


      for (let j = i; j > 0; j-- ) {

        const leftIndex = j - 1
        const rightIndex = j 

        const leftNumber = numbers[leftIndex]
        const rightNumber = numbers[rightIndex]
        const isSwap = leftNumber > rightNumber

        addClassToNumberElement(j - 1, 'comparison-left-number')
        addClassToNumberElement(j, 'comparison-right-number')

        yield;
        if (isSwap) {
          // update numbers for comparison
          numbers[leftIndex] = rightNumber
          numbers[rightIndex] = leftNumber 

          addTextToNumberElement(leftIndex, rightNumber)
          addTextToNumberElement(rightIndex, leftNumber)
        }

        countStepsTaken += 1
      }
    }
    yield;
    showListOrderedAlert(countStepsTaken)
  }
  
  const generator = generatorFunctionForAlgorithm()

  buttonEl.addEventListener('click', () => {
    generator.next()
  })
}

function showInvalidInputAlert() {
  const alertElement = getTemplateElement('template-invalid-input-alert')

  document.body.appendChild(alertElement)
}

function hideInvalidInputAlert() {
  // remove alert
  const alertElement = document.querySelector('.invalid-input-alert')

  if (alertElement) {
      alertElement.remove()
  }
    
}

function removeNumbers() {
  document.querySelector('.display-numbers')?.remove()
}

function showNumbersFromInput(inputText) {
  const numbers = inputText.split(/\s+/)
    .filter(s => s.length > 0).map(n => parseFloat(n))
  const displayNumbersEl = getTemplateElement('template-display-numbers')



  document.body.appendChild(displayNumbersEl)

  for(const numberItem of numbers) {
    const numberItemEl = getTemplateElement('template-number-item')

    numberItemEl.textContent = numberItem

    displayNumbersEl.appendChild(numberItemEl)
  }
}

function showNextButton(inputText) {
  const numbers = inputText.split(/\s+/)
  .filter(s => s.length > 0).map(n => parseFloat(n))

  const buttonForNextStep = getTemplateElement('button-for-next-step')
  
  bindEventListenerToButtonForNextStep(buttonForNextStep, numbers);
  
  document.body.appendChild(buttonForNextStep)
}

function hideNextButton() {
  const buttonElements = Array.from(document.querySelectorAll('.button-for-next-step'))

  buttonElements.forEach(el => el.remove())

}

bindListenerToTextArea()
