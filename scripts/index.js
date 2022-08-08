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

// Formulário
const formElement = document.querySelector(".modal__content");
// Modal Fig
const modalFig = document.querySelector(".modal__fig");

// Entradas
const titleInput = formElement.querySelector("#title");
const subtitleInput = formElement.querySelector("#subtitle");

// Template Elements
const elementsList = document.querySelector(".elements");

function renderElement(card) {
  const templateElements = document.querySelector("template").content;
  const element = templateElements.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = card.link;
  element.querySelector(".element__image").alt = card.name;
  element.querySelector(".element__title").textContent = card.name;
  elementsList.append(element);
}

function updateElements(cards) {
  elementsList.innerHTML = "";
  cards.forEach((card) => renderElement(card));
  setEventLikeButtons();
  setEventTrashButtons();
  setEventFigButtons();
}

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const profileAddLocation = document.querySelector(".profile__add");
const closeButton = document.querySelector(".modal__close");
const closeFigButton = document.querySelector(".modal__figclose");
const saveButton = document.querySelector(".modal__button");

// Valores
const titleValue = document.querySelector(".profile__title");
const subtitleValue = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

function handleOverlayModalClick(evt) {
  const modalFigClicked = evt.target.classList.contains("modal__fig");
  const childremElementClicked = evt.currentTarget !== evt.target;
  if (childremElementClicked && !modalFigClicked) {
    return;
  }
  handleCloseEvent();
}

function handleCloseEvent() {
  const modalFigOpened = document.querySelector(".modal__fig_opened");
  modalFigOpened ? handleModalFig() : handleModalContent();
}

function handleModal() {
  modal.classList.toggle("modal_opened");
}

function handleModalFig() {
  handleModal();
  modalFig.classList.toggle("modal__fig_opened");
}

function handleModalContent() {
  handleModal();
  formElement.classList.toggle("modal__content_opened");
  enableValidation();
}

// Elementos do Modal
const modalTitle = formElement.querySelector(".modal__title");

// Função para configurar os atributos de Modal Add Local
function setModalAddLocation() {
  modalTitle.textContent = "Novo Local";
  titleInput.value = "";
  subtitleInput.value = "";
  titleInput.placeholder = "Titulo";
  subtitleInput.placeholder = "Link de Imagem";
  saveButton.textContent = "Criar";
  formElement.setAttribute("name", "form__add-local");
  titleInput.maxLength = 40;
  subtitleInput.removeAttribute("minlength");
  subtitleInput.removeAttribute("maxlength");
  subtitleInput.type = "url";
}

// Função para renderizar Modal Add Local
function renderModalAddLocation() {
  setModalAddLocation();
  handleModalContent();
}
// Função para configurar os atributos de Modal Profile Edit
function setModalProfileEdit() {
  modalTitle.textContent = "Editar Perfil";
  titleInput.value = titleValue.textContent;
  subtitleInput.value = subtitleValue.textContent;
  titleInput.placeholder = "Nome";
  subtitleInput.placeholder = "Sobre mim";
  saveButton.textContent = "Salvar";
  formElement.setAttribute("name", "form__edit-profile");
  titleInput.maxLength = 30;
  subtitleInput.minLength = 2;
  subtitleInput.maxLength = 200;
  subtitleInput.type = "text";
}

// Funcão para renderizar Modal Profile Edit
function renderModalProfileEdit() {
  setModalProfileEdit();
  handleModalContent();
}

function handleFigButtonEvent(evt) {
  const figureSource = evt.target;
  const figure = document.querySelector(".modal__image");
  const figureCaption = document.querySelector(".modal__figcaption");
  figure.src = figureSource.src;
  figure.alt = figureSource.alt;
  figureCaption.textContent = figureSource.alt;
  handleModalFig();
}

function setEventFigButtons() {
  const openFigButtons = document.querySelectorAll(".element__image");
  openFigButtons.forEach((figButton) => {
    figButton.addEventListener("click", handleFigButtonEvent);
  });
}

function handleLikeButtonsEvent(evt) {
  evt.target.classList.toggle("element__like_clicked");
}

// Função para escutar o evento de click no botão de element__like
function setEventLikeButtons() {
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", handleLikeButtonsEvent);
  });
}
// Função para escutar o evento de click no botão de element__trash
function setEventTrashButtons() {
  const trashButtons = document.querySelectorAll(".element__trash");
  trashButtons.forEach((trashButton) => {
    trashButton.addEventListener("click", removeCard);
  });
}

function setEventKeydown() {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      if (modal.classList.contains("modal_opened")) {
        handleCloseEvent();
      }
    }
  });
}

function getIndexOfElementEvent(evt) {
  const elementOf = evt.target.parentElement;
  const arrayElements = Array.from(elementOf.parentElement.children);
  return arrayElements.indexOf(elementOf);
}

function removeCard(evt) {
  const index = getIndexOfElementEvent(evt);
  initialCards.splice(index, 1);
  updateElements(initialCards);
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__input-text_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__input-text_error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

const resetFormInputsError = (formElement) => {
  const inputElements = formElement.querySelectorAll("input");
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const checkFormValidity = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__input-text")
  );
  return !hasInvalidInput(inputList);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  //console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button_inactive");
  } else {
    buttonElement.classList.remove("modal__button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__input-text")
  );
  const buttonElement = formElement.querySelector(".modal__button");

  // Aqui, para verificar o estado do botão no início:
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // E aqui, para verificar sempre que qualquer entrada de campo for alterada:
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__content"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(".modal__set")
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
      resetFormInputsError(formElement, fieldset);
    });
  });
};

profileEditButton.addEventListener("click", renderModalProfileEdit);
profileAddLocation.addEventListener("click", renderModalAddLocation);
closeButton.addEventListener("click", handleModalContent);
closeFigButton.addEventListener("click", handleModalFig);
modal.addEventListener("click", handleOverlayModalClick);

function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário

  if (!checkFormValidity(evt.currentTarget)) {
    return;
  }
  const profileEditForm = evt.target.name.includes("form__edit-profile");
  if (profileEditForm) {
    titleValue.textContent = titleInput.value;
    subtitleValue.textContent = subtitleInput.value;
  } else {
    initialCards.unshift({
      name: titleInput.value,
      link: subtitleInput.value,
    });
    updateElements(initialCards);
  }
  handleModalContent();
}

// Adicionar o evento de submit ao formulário do Modal
formElement.addEventListener("submit", handleFormSubmit);

// Obter os cartão iniciar no carregamento da página
updateElements(initialCards);
setEventKeydown();
