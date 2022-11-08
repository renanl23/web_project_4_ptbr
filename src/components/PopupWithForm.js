// *
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, handleFormSubmit }) {
    super(popupSelector);
    this._formElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".modal__input-text");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  open() {
    super.open();
    this._formElement.classList.add("modal__content_opened");
  }

  close() {
    super.close();
    this._formElement.classList.remove("modal__content_opened");
    this._formElement.reset();
  }
}
