/* ==========================================================================
   MAIN — comportamento de header, menu, carrinho, hero e grid da home
   ========================================================================== */

/* ---------- Header: fundo ao rolar ---------- */
const header = document.querySelector(".site-header");
function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 12) header.classList.add("is-scrolled");
  else header.classList.remove("is-scrolled");
}
window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* ---------- Menu mobile ---------- */
const burger = document.querySelector("[data-burger]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );
}

/* ---------- Drawer do carrinho ---------- */
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartOverlay = document.querySelector("[data-cart-overlay]");
function openCart() {
  cartDrawer?.classList.add("is-open");
  cartOverlay?.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer?.classList.remove("is-open");
  cartOverlay?.classList.remove("is-open");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-cart-open]").forEach((btn) => btn.addEventListener("click", openCart));
document.querySelectorAll("[data-cart-close]").forEach((btn) => btn.addEventListener("click", closeCart));
cartOverlay?.addEventListener("click", closeCart);

/* ---------- Reveal ao rolar ---------- */
const revealItems = document.querySelectorAll(".fade-up");
if (revealItems.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => io.observe(el));
}

/* ---------- Hero slider ---------- */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsWrap = document.querySelector("[data-hero-dots]");
if (heroSlides.length) {
  let heroIndex = 0;
  heroSlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goToHeroSlide(i));
    heroDotsWrap?.appendChild(dot);
  });
  function goToHeroSlide(i) {
    heroSlides[heroIndex].classList.remove("is-active");
    heroDotsWrap?.children[heroIndex]?.classList.remove("is-active");
    heroIndex = i;
    heroSlides[heroIndex].classList.add("is-active");
    heroDotsWrap?.children[heroIndex]?.classList.add("is-active");
  }
  setInterval(() => {
    goToHeroSlide((heroIndex + 1) % heroSlides.length);
  }, 5600);
}

/* ---------- Grid de produtos (home) ---------- */
const gridEl = document.querySelector("[data-product-grid]");

function productCardHTML(p) {
  const hasSale = p.oldPrice && p.oldPrice > p.price;
  return `
  <a href="product.html?id=${p.id}" class="product-card">
    <div class="product-media" data-media data-images='${JSON.stringify(p.img)}'>
      ${hasSale ? `<span class="product-tag sale">Oferta</span>` : `<span class="product-tag">${p.category}</span>`}
      <span class="product-sku">${p.sku}</span>
      <img src="${p.img[0]}" alt="${p.name}" class="is-shown" data-img-index="0">
      <img src="${p.img[1]}" alt="${p.name}" data-img-index="1">
      <div class="media-dots">
        <span class="is-active"></span><span></span>
      </div>
      <button type="button" class="quick-add" aria-label="Adicionar rápido ao carrinho" data-quick-add="${p.id}">${ICONS.plus}</button>
    </div>
    <div class="product-info">
      <p class="product-cat">${p.category}</p>
      <p class="product-title">${p.name}</p>
      <div class="product-price">
        <span>${formatPrice(p.price)}</span>
        ${hasSale ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
    </div>
  </a>`;
}

function renderGrid(filter) {
  if (!gridEl) return;
  const list = filter && filter !== "Tudo" ? PRODUCTS.filter((p) => p.category === filter) : PRODUCTS;
  gridEl.innerHTML = list.map(productCardHTML).join("");
  bindProductMedia();
  bindQuickAdd();
}

function bindProductMedia() {
  document.querySelectorAll("[data-media]").forEach((media) => {
    const images = media.querySelectorAll("img");
    const dots = media.querySelectorAll(".media-dots span");
    if (images.length < 2) return;

    /* Desktop: hover troca imagem */
    media.addEventListener("mouseenter", () => setActiveImage(media, images, dots, 1));
    media.addEventListener("mouseleave", () => setActiveImage(media, images, dots, 0));

    /* Mobile: swipe troca imagem */
    let startX = 0;
    media.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    media.addEventListener(
      "touchend",
      (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 30) {
          const current = media.querySelector("img.is-shown").dataset.imgIndex;
          const next = current === "0" ? 1 : 0;
          setActiveImage(media, images, dots, next);
        }
      },
      { passive: true }
    );
  });
}

function setActiveImage(media, images, dots, index) {
  images.forEach((img) => img.classList.toggle("is-shown", Number(img.dataset.imgIndex) === index));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
}

function bindQuickAdd() {
  document.querySelectorAll("[data-quick-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const product = getProductById(btn.dataset.quickAdd);
      if (!product) return;
      Cart.add({
        id: product.id,
        name: product.name,
        sku: product.sku,
        image: product.img[0],
        price: product.price,
        size: product.sizes[Math.floor(product.sizes.length / 2)],
        color: product.colors[0],
        qty: 1
      });
      showToast("Adicionado ao carrinho");
      openCart();
    });
  });
}

if (gridEl) {
  renderGrid();

  const filterRow = document.querySelector("[data-filter-row]");
  if (filterRow) {
    filterRow.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filterRow.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGrid(btn.dataset.filter);
    });
  }
}

/* ---------- VIP form ---------- */
const vipForm = document.querySelector("[data-vip-form]");
if (vipForm) {
  vipForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const success = vipForm.querySelector("[data-vip-success]");
    vipForm.querySelector("input").value = "";
    if (success) success.classList.add("is-shown");
    showToast("Bem-vindo ao clube VIP");
  });
}
