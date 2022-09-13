export const formObject = {
  formSelector: ".modal__content",
  inputSelector: ".modal__input-text",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input-text_error",
  errorClass: "modal__input-error_active",
};

// Template Elements
export const elementsList = document.querySelector(".elements");

export const modal = document.querySelector(".modal");
export const modalFig = document.querySelector(".modal__fig");
const submitButton = document.querySelector(formObject.submitButtonSelector);
export const formElement = document.querySelector(formObject.formSelector);
export const titleValue = document.querySelector(".profile__title");
export const subtitleValue = document.querySelector(".profile__subtitle");
export const titleInput = formElement.querySelector("#title");
export const subtitleInput = formElement.querySelector("#subtitle");

export function handleModal() {
  modal.classList.toggle("modal_opened");
}

function closeModalFigListener(evt) {
  if (evt.key === "Escape") {
    handleEscapeKeyEvent();
  }
}

export function setModalFig(data) {
  const figure = document.querySelector(".modal__image");
  const figureCaption = document.querySelector(".modal__figcaption");
  figure.src = data.image;
  figure.alt = data.title;
  figureCaption.textContent = data.title;
  document.addEventListener("keydown", closeModalFigListener);
}

export function handleModalFig() {
  handleModal();
  modalFig.classList.toggle("modal__fig_opened");
  if (!modalFig.classList.contains("modal__fig_opened")) {
    document.removeEventListener("keydown", closeModalFigListener);
  }
}

export function appendElement(cardElement) {
  elementsList.append(cardElement);
}

export function prependElement(cardElement) {
  elementsList.prepend(cardElement);
}

// Elementos do Modal
const modalTitle = formElement.querySelector(".modal__title");

// Função para configurar os atributos de Modal Add Local
export function setModalAddLocation() {
  modalTitle.textContent = "Novo Local";
  titleInput.value = "";
  subtitleInput.value = "";
  titleInput.placeholder = "Titulo";
  subtitleInput.placeholder = "Link de Imagem";
  submitButton.textContent = "Criar";
  formElement.setAttribute("name", "form__add-local");
  titleInput.maxLength = 40;
  subtitleInput.removeAttribute("minlength");
  subtitleInput.removeAttribute("maxlength");
  subtitleInput.type = "url";
}

// Função para configurar os atributos de Modal Profile Edit
export function setModalProfileEdit() {
  modalTitle.textContent = "Editar Perfil";
  titleInput.value = titleValue.textContent;
  subtitleInput.value = subtitleValue.textContent;
  titleInput.placeholder = "Nome";
  subtitleInput.placeholder = "Sobre mim";
  submitButton.textContent = "Salvar";
  formElement.setAttribute("name", "form__edit-profile");
  titleInput.maxLength = 30;
  subtitleInput.minLength = 2;
  subtitleInput.maxLength = 200;
  subtitleInput.type = "text";
}

export function handleCloseEvent() {
  const modalFigOpened = document.querySelector(".modal__fig_opened");
  modalFigOpened ? handleModalFig() : handleModalContent();
}

function handleEscapeKeyEvent() {
  if (modal.classList.contains("modal_opened")) {
    handleCloseEvent();
  }
}
