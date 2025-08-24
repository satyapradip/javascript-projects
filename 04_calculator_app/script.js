let result = document.getElementById('result');
let expression = '';

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (buttonText === '=') {
      try {
        expression = eval(expression).toString();
        result.value = expression;
      } catch (error) {
        result.value = 'Error';
        expression = '';
      }
    } else if (buttonText === 'C') {
      expression = '';
      result.value = '';
    } else {
      expression += buttonText;
      result.value = expression;
    }
  });
});
