/* ==========================================================================
   CARRINHO — persistido em localStorage, compartilhado entre páginas
   Estrutura de cada item: { id, name, sku, image, price, size, color, qty }
   ========================================================================== */
const CART_KEY = "mono_cart_v1";

const Cart = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  },
  write(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: items }));
  },
  add(item) {
    const items = this.read();
    const existing = items.find((i) => i.id === item.id && i.size === item.size && i.color === item.color);
    if (existing) {
      existing.qty += item.qty;
    } else {
      items.push(item);
    }
    this.write(items);
  },
  updateQty(index, qty) {
    const items = this.read();
    if (!items[index]) return;
    if (qty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].qty = qty;
    }
    this.write(items);
  },
  remove(index) {
    const items = this.read();
    items.splice(index, 1);
    this.write(items);
  },
  clear() {
    this.write([]);
  },
  count() {
    return this.read().reduce((sum, i) => sum + i.qty, 0);
  },
  subtotal() {
    return this.read().reduce((sum, i) => sum + i.price * i.qty, 0);
  }
};

/* ---- Renderização do drawer + contador (chamado em todas as páginas) ---- */
function renderCartUI() {
  const items = Cart.read();
  const countEl = document.querySelector("[data-cart-count]");
  if (countEl) {
    countEl.textContent = Cart.count();
    countEl.dataset.empty = Cart.count() === 0 ? "true" : "false";
  }

  const listEl = document.querySelector("[data-cart-items]");
  const footEl = document.querySelector("[data-cart-foot]");
  if (!listEl) return;

  if (items.length === 0) {
    listEl.innerHTML = `<div class="cart-empty">Seu carrinho está vazio.<br>Explore a coleção e encontre a sua próxima peça.</div>`;
    if (footEl) footEl.style.display = "none";
    return;
  }

  if (footEl) footEl.style.display = "block";

  listEl.innerHTML = items
    .map(
      (item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.color} · ${item.size} · ${item.sku}</p>
        <div class="cart-item-qty">
          <button type="button" aria-label="Diminuir quantidade" data-qty-minus="${index}">${ICONS.minus}</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="Aumentar quantidade" data-qty-plus="${index}">${ICONS.plus}</button>
        </div>
      </div>
      <div>
        <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
        <button type="button" class="cart-item-remove" data-remove="${index}">remover</button>
      </div>
    </div>`
    )
    .join("");

  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  if (subtotalEl) subtotalEl.textContent = formatPrice(Cart.subtotal());

  listEl.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.qtyPlus);
      Cart.updateQty(idx, Cart.read()[idx].qty + 1);
    });
  });
  listEl.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.qtyMinus);
      Cart.updateQty(idx, Cart.read()[idx].qty - 1);
    });
  });
  listEl.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      Cart.remove(Number(btn.dataset.remove));
    });
  });
}

document.addEventListener("cart:updated", renderCartUI);
document.addEventListener("DOMContentLoaded", renderCartUI);

/* ---- Toast simples ---- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${ICONS.check} ${message}`;
  toast.classList.add("is-shown");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-shown"), 2400);
}
