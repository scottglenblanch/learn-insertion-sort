
function inputTextIntoTextArea(input) {
  const textAreaEl = document.querySelector('.user-input')

  textAreaEl.value = input;

  textAreaEl.dispatchEvent(new Event('change'))
}

describe('user can create an array of numbers to be displayed', function () {

  beforeEach(() => {
    inputTextIntoTextArea('')
  })

  it('should show alert when user inputs invalid text', () => {

    const invalidText = '111 aaabbb 123'

    inputTextIntoTextArea(invalidText)

    expect(document.querySelector('.invalid-input-alert')).toBeTruthy()
  })

  it('should NOT show alert when user inputs valid text', () => {

    const validText = '111 123.2    2.34'

    inputTextIntoTextArea(validText)

    expect(document.querySelector('.invalid-input-alert')).not.toBeTruthy()
  })

  it('should have numbers displayed after typing valid numbers with spaces', () => {
    const validText = '111 123.2    2.34'
    inputTextIntoTextArea(validText)

    const displayNumbersEl = document.querySelector('.display-numbers')

    const numbersExpected = [111, 123.2, 2.34]
    const numbersInDocuments = Array.from(
      displayNumbersEl.querySelectorAll('.number-item')
    ).map(numberItemElement => numberItemElement.textContent)
    .map(text => parseFloat(text))
    
    const isValid = numbersExpected.every((n, index) => n === numbersInDocuments[index])

    expect(isValid).toBe(true)

  })

  it('should start the algorithm sequence when you click the button', () => {
    
  })
});