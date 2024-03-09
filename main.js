/* abre e fecha o menu quando clicar no ícone */
const nav = document.querySelector("#header nav");
const toggle = document.querySelectorAll("nav .toggle");

for (const element of toggle) {
  element.addEventListener("click", function () {
    nav.classList.toggle("show");
  });
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll("nav ul li a");

for (const link of links) {
  link.addEventListener("click", function () {
    nav.classList.remove("show");
  });
}

/* mudar o header da página quando der scroll */
const header = document.querySelector("#header");
const navHeight = header.offsetHeight;

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add("scroll");
  } else {
    // menor que a altura do header
    header.classList.remove("scroll");
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true,
    },
  },
});

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 700,
  reset: true,
});

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
);

/* Botão voltar para o topo */
const backToTopButton = document.querySelector(".back-to-top");

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll("main section[id]");

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + window.innerHeight / 8;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      checkpoint >= sectionTop &&
      checkpoint <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(`nav ul li a[href="#${sectionId}"]`)
        .classList.add("active");
    } else {
      document
        .querySelector(`nav ul li a[href="#${sectionId}"]`)
        .classList.remove("active");
    }
  });
}

/* Quando Scroll */
window.addEventListener("scroll", function () {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});

// Função para abrir o modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Função para fechar o modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Vincule o evento de clique a todos os cards
var cards = document.querySelectorAll(".card");

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    var modalId = card.getAttribute("data-modal");
    openModal(modalId);
  });
});

// Função para abrir o link do WhatsApp
function openWhatsApp() {
  // Substitua o URL abaixo pelo seu link do WhatsApp
  var whatsappURL =
    "https://api.whatsapp.com/send?phone=+558182540904&text=Oi! Gostaria de agendar um horário";
  window.open(whatsappURL, "_blank");
}

// Encontre o botão "Agendar um horário" pelo seu ID ou classe e adicione um ouvinte de evento de clique
var agendarHorarioButton = document.querySelector(".agendar-horario-button");
if (agendarHorarioButton) {
  agendarHorarioButton.addEventListener("click", openWhatsApp);
}





// Funções relacionadas ao carrinho de compras
const cartItems = []; // Array para armazenar itens do carrinho

// Botão do Carrinho
const openCartButton = document.getElementById("open-cart-modal");
openCartButton.addEventListener("click", openCartModal);

// Modal do Carrinho
const cartModal = document.getElementById("cart-modal");

// Função para abrir o modal do carrinho
function openCartModal() {
  updateCartSummary();
  cartModal.style.display = "block";
}

// Função para fechar o modal do carrinho
function closeCartModal() {
  cartModal.style.display = "none";
}

// Função para atualizar o resumo do carrinho no modal
function updateCartSummary() {
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = ""; // Limpa o conteúdo atual

  if (cartItems.length === 0) {
    cartSummary.innerHTML = "<p>Carrinho vazio</p>";
  } else {
    cartItems.forEach((itemName) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.textContent = itemName;
      cartSummary.appendChild(cartItemElement);
    });
  }
}

// Função para enviar a solicitação para o WhatsApp
function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const cartContent = cartItems.join("\n");
  const message = `Nome: ${name}\nTelefone: ${phone}\nItens:\n${cartContent}`;
  
  const whatsappLink = `https://api.whatsapp.com/send?phone=+558182540904&text=${encodeURIComponent(
    message
  )}`;
  
  // Abre o link do WhatsApp em uma nova janela ou guia
  window.open(whatsappLink, "_blank");


  
  // Limpar o carrinho e fechar o modal após o envio
  cartItems.length = 0;
  updateCartSummary();
  closeCartModal();
}

// Função para adicionar um item ao carrinho
function addToCart(itemName) {
  cartItems.push(itemName);
  updateCartCount();
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
  const cartCount = document.getElementById("cart-button").querySelector(".toggle");
  cartCount.textContent = `Carrinho (${cartItems.length})`;
}

// Função para adicionar um item ao carrinho com opção de quantidade
function addToCart(serviceName, modalId) {
  const quantityInput = document.getElementById(`quantity-${modalId}`);
  const quantity = parseInt(quantityInput.value, 10);

  if (quantity > 0) {
    for (let i = 0; i < quantity; i++) {
      cartItems.push(serviceName);
    }
    updateCartCount();
    updateCartSummary();
  }

  // Fechar o modal após adicionar ao carrinho
  closeModal(modalId);
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
  const cartQuantity = document.getElementById("cart-quantity");
  cartQuantity.textContent = ` (${cartItems.length})`;
}





function updateCartSummary() {
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = ""; // Limpa o conteúdo atual

  if (cartItems.length === 0) {
    cartSummary.innerHTML = "<p>Carrinho vazio</p>";
  } else {
    cartItems.forEach((itemName, index) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");

      // Crie um botão de exclusão para cada item
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => {
        removeFromCart(index); // Chame a função para remover o item do carrinho
      });

      cartItemElement.textContent = itemName;
      cartItemElement.appendChild(deleteButton);

      cartSummary.appendChild(cartItemElement);
    });
  }
  updateCartCount();
}

function removeFromCart(index) {
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1); // Remova o item do carrinho pelo índice
    updateCartSummary(); // Atualize o resumo do carrinho
  }
}
