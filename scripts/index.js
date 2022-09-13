import {
  formElement,
  modal,
  handleModal,
  handleModalFig,
  handleCloseEvent,
  prependElement,
  appendElement,
  elementsList,
  formObject,
  setModalProfileEdit,
  setModalAddLocation,
  titleValue,
  subtitleValue,
  titleInput,
  subtitleInput,
} from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function renderElement(card, prepend = false) {
  const element = new Card(card, ".element");
  const cardElement = element.generateCard();
  prepend ? prependElement(cardElement) : appendElement(cardElement);
}

function updateElements(cards) {
  elementsList.innerHTML = "";
  cards.forEach((card) => renderElement(card));
}

function handleOverlayModalClick(evt) {
  const modalFigClicked = evt.target.classList.contains("modal__fig");
  const childrenElementClicked = evt.currentTarget !== evt.target;
  if (childrenElementClicked && !modalFigClicked) {
    return;
  }
  handleCloseEvent();
}

function handleModalContent() {
  handleModal();
  formElement.classList.toggle("modal__content_opened");
  const addFormValidator = new FormValidator(formObject, formElement);
  addFormValidator.enableValidation();
}

// Funcão para renderizar Modal Profile Edit
export function renderModalProfileEdit() {
  setModalProfileEdit();
  handleModalContent();
}

// Função para renderizar Modal Add Local
export function renderModalAddLocation() {
  setModalAddLocation();
  handleModalContent();
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário
  const profileEditForm = evt.target.name.includes("form__edit-profile");
  if (profileEditForm) {
    titleValue.textContent = titleInput.value;
    subtitleValue.textContent = subtitleInput.value;
  } else {
    const newCard = {
      name: titleInput.value,
      link: subtitleInput.value,
    };
    renderElement(newCard, true);
  }
  handleModalContent();
}

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const profileAddLocation = document.querySelector(".profile__add");
const closeButton = document.querySelector(".modal__close");
const closeFigButton = document.querySelector(".modal__figclose");

profileEditButton.addEventListener("click", renderModalProfileEdit);
profileAddLocation.addEventListener("click", renderModalAddLocation);
closeButton.addEventListener("click", handleModalContent);
closeFigButton.addEventListener("click", handleModalFig);
modal.addEventListener("click", handleOverlayModalClick);

// Adicionar o evento de submit ao formulário do Modal
formElement.addEventListener("submit", handleFormSubmit);

// Obter os cartão iniciar no carregamento da página
updateElements(initialCards);
// setEventKeydown();
