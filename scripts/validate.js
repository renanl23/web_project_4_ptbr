export const enableValidation = (formObject) => {
  const { formSelector, inputSelector } = formObject;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(inputSelector)
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, formObject);
    });
  });
};

const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__input-text")
  );

  toggleButtonState(inputList, formObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, formObject);
    });
  });
};

export const toggleButtonState = (inputList, formObject) => {
  const { inactiveButtonClass, submitButtonSelector } = formObject;
  const buttonElement = document.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

export const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formObject
    );
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formObject
) => {
  const { errorClass, inputErrorClass } = formObject;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

export const hideInputError = (formElement, inputElement, formObject) => {
  const { errorClass, inputErrorClass } = formObject;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};
