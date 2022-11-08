// *
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardElement) {
    super.open();
    this._element.classList.add("modal__fig_opened");
    this._card = cardElement;
    this._element.querySelector(".modal__image").src =
      this._card.querySelector(".element__image").src;
    this._element.querySelector(".modal__image").alt =
      this._card.querySelector(".element__title").textContent;
    this._element.querySelector(".modal__figcaption").textContent =
      this._card.querySelector(".element__title").textContent;
  }
  close() {
    super.close();
    this._element.classList.remove("modal__fig_opened");
  }
}
