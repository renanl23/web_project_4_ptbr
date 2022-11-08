export class FormValidator {
  constructor(formObject, formElement) {
    this._formElement = formElement;
    this._formSelector = formObject.formSelector;
    this._inactiveButtonClass = formObject.inactiveButtonClass;
    this._inputErrorClass = formObject.inputErrorClass;
    this._errorClass = formObject.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(formObject.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      formObject.submitButtonSelector
    );
  }

  _hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton();
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _resetFormInputsError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._resetFormInputsError();
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
}
