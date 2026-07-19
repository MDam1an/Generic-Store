/* ==========================================================================
   PÁGINA DE PRODUTO
   ========================================================================== */
(function () {
  const root = document.getElementById("product-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id")) || PRODUCTS[0];
  document.title = `${product.name} — MONO`;
  const crumbName = document.querySelector("[data-crumb-name]");
  if (crumbName) crumbName.textContent = product.name;

  let selectedColor = product.colors[0];
  let selectedSize = product.sizes[Math.floor(product.sizes.length / 2)];
  let qty = 1;
  let wished = false;
  let activeImg = 0;

  const hasSale = product.oldPrice && product.oldPrice > product.price;
  const savePct = hasSale ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  root.innerHTML = `
    <div class="product-layout">
      <div class="fade-up is-visible">
        <div class="gallery-main" data-gallery-main>
          ${product.gallery.map((src, i) => `<img src="${src}" alt="${product.name} — imagem ${i + 1}" class="${i === 0 ? "is-shown" : ""}" data-g-index="${i}">`).join("")}
          <div class="gallery-arrows">
            <button type="button" data-g-prev aria-label="Imagem anterior">${ICONS.chevronLeft}</button>
            <button type="button" data-g-next aria-label="Próxima imagem">${ICONS.chevronRight}</button>
          </div>
        </div>
        <div class="gallery-thumbs" data-gallery-thumbs>
          ${product.gallery.map((src, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" data-g-thumb="${i}"><img src="${src}" alt=""></button>`).join("")}
        </div>
      </div>

      <div class="pd-info fade-up is-visible">
        <p class="pd-sku">${product.sku} · ${product.category}</p>
        <h1>${product.name}</h1>
        <div class="pd-rating">
          <span class="stars">${starRow(product.rating)}</span>
          <span>${product.rating.toFixed(1)} · ${product.reviewsCount} avaliações</span>
        </div>
        <div class="pd-price">
          <span>${formatPrice(product.price)}</span>
          ${hasSale ? `<span class="old">${formatPrice(product.oldPrice)}</span><span class="save">-${savePct}%</span>` : ""}
        </div>

        <div class="option-block">
          <div class="option-label"><span>Cor — ${selectedColor}</span></div>
          <div class="swatches" data-color-swatches>
            ${product.colors.map((c) => `<button type="button" class="swatch ${c === selectedColor ? "is-active" : ""}" data-color="${c}">${c}</button>`).join("")}
          </div>
        </div>

        <div class="option-block">
          <div class="option-label"><span>Tamanho — ${selectedSize}</span><button type="button" data-size-guide>Guia de tamanhos</button></div>
          <div class="swatches" data-size-swatches>
            ${product.sizes.map((s) => `<button type="button" class="swatch ${s === selectedSize ? "is-active" : ""}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>

        <div class="qty-row">
          <div class="qty-control">
            <button type="button" data-qty-minus aria-label="Diminuir">${ICONS.minus}</button>
            <span data-qty-value>1</span>
            <button type="button" data-qty-plus aria-label="Aumentar">${ICONS.plus}</button>
          </div>
        </div>

        <div class="pd-actions">
          <button type="button" class="btn" data-add-to-cart>Adicionar à sacola</button>
          <button type="button" class="pd-wish" data-wish aria-label="Adicionar aos favoritos">${ICONS.heart}</button>
        </div>

        <div class="accordion">
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-acc-trigger>Descrição ${ICONS.plus}</button>
            <div class="accordion-panel" data-acc-panel><div class="accordion-panel-inner"><p>${product.description}</p></div></div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-acc-trigger>Composição e cuidados ${ICONS.plus}</button>
            <div class="accordion-panel" data-acc-panel><div class="accordion-panel-inner"><ul>${product.details.map((d) => `<li>— ${d}</li>`).join("")}</ul></div></div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-acc-trigger>Envio e trocas ${ICONS.plus}</button>
            <div class="accordion-panel" data-acc-panel><div class="accordion-panel-inner"><p>Envio para todo o Brasil em até 7 dias úteis. Trocas gratuitas em até 30 dias após o recebimento, desde que a peça esteja sem uso e com etiqueta.</p></div></div>
          </div>
        </div>
      </div>
    </div>

    <section class="reviews fade-up is-visible">
      <div class="reviews-head">
        <div class="reviews-score">${product.rating.toFixed(1)}</div>
        <div class="reviews-summary">
          <div class="stars">${starRow(product.rating)}</div>
          <p>Baseado em ${product.reviewsCount} avaliações</p>
        </div>
      </div>
      <div class="review-list">
        ${product.reviews
          .map(
            (r) => `
          <div class="review-card">
            <div class="stars">${starRow(r.rating)}</div>
            <h5>${r.name}</h5>
            <time>${r.date}</time>
            <p>${r.text}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <section class="related fade-up is-visible">
      <div class="section-head">
        <div><p class="eyebrow">Combine com</p><h2>Você também pode gostar</h2></div>
      </div>
      <div class="product-grid" data-related-grid></div>
    </section>
  `;

  /* ---- Galeria ---- */
  const gMain = root.querySelector("[data-gallery-main]");
  const gImages = gMain.querySelectorAll("img");
  const gThumbs = root.querySelectorAll("[data-g-thumb]");
  function setGalleryImage(i) {
    activeImg = (i + product.gallery.length) % product.gallery.length;
    gImages.forEach((img) => img.classList.toggle("is-shown", Number(img.dataset.gIndex) === activeImg));
    gThumbs.forEach((t) => t.classList.toggle("is-active", Number(t.dataset.gThumb) === activeImg));
  }
  root.querySelector("[data-g-prev]").addEventListener("click", () => setGalleryImage(activeImg - 1));
  root.querySelector("[data-g-next]").addEventListener("click", () => setGalleryImage(activeImg + 1));
  gThumbs.forEach((t) => t.addEventListener("click", () => setGalleryImage(Number(t.dataset.gThumb))));

  let touchStartX = 0;
  gMain.addEventListener("touchstart", (e) => (touchStartX = e.touches[0].clientX), { passive: true });
  gMain.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) setGalleryImage(activeImg + (diff < 0 ? 1 : -1));
    },
    { passive: true }
  );

  /* ---- Cor / tamanho ---- */
  root.querySelectorAll("[data-color]").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedColor = btn.dataset.color;
      root.querySelectorAll("[data-color-swatches] .swatch").forEach((b) => b.classList.toggle("is-active", b === btn));
      root.querySelector(".option-block .option-label span").textContent = `Cor — ${selectedColor}`;
    })
  );
  root.querySelectorAll("[data-size]").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedSize = btn.dataset.size;
      root.querySelectorAll("[data-size-swatches] .swatch").forEach((b) => b.classList.toggle("is-active", b === btn));
      root.querySelectorAll(".option-block .option-label span")[1].textContent = `Tamanho — ${selectedSize}`;
    })
  );

  /* ---- Quantidade ---- */
  const qtyValueEl = root.querySelector("[data-qty-value]");
  root.querySelector("[data-qty-plus]").addEventListener("click", () => {
    qty += 1;
    qtyValueEl.textContent = qty;
  });
  root.querySelector("[data-qty-minus]").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValueEl.textContent = qty;
  });

  /* ---- Favoritos ---- */
  const wishBtn = root.querySelector("[data-wish]");
  wishBtn.addEventListener("click", () => {
    wished = !wished;
    wishBtn.classList.toggle("is-active", wished);
    wishBtn.innerHTML = wished ? ICONS.heartFill : ICONS.heart;
  });

  /* ---- Adicionar à sacola ---- */
  root.querySelector("[data-add-to-cart]").addEventListener("click", () => {
    Cart.add({
      id: product.id,
      name: product.name,
      sku: product.sku,
      image: product.gallery[0],
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      qty
    });
    showToast("Adicionado à sacola");
    document.querySelector("[data-cart-open]")?.click();
  });

  /* ---- Acordeão ---- */
  root.querySelectorAll("[data-acc-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const panel = item.querySelector("[data-acc-panel]");
      const isOpen = item.classList.contains("is-open");
      root.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("is-open");
        i.querySelector("[data-acc-panel]").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---- Relacionados ---- */
  const relatedGrid = root.querySelector("[data-related-grid]");
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallback = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  relatedGrid.innerHTML = (related.length ? related : fallback).map(productCardHTML).join("");
  bindProductMedia();
  bindQuickAdd();
})();
