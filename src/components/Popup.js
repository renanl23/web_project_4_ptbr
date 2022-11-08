export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.closest(".modal").classList.add("modal_opened");
  }

  close() {
    this._element.closest(".modal").classList.remove("modal_opened");
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  _setEventListeners() {
    this._element
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._element.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".modal__image") &&
        !evt.target.closest(".modal__content")
      ) {
        this.close();
      }
    });

    this._handleEscClose();
  }
}
