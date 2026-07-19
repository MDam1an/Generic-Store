/* ==========================================================================
   CHECKOUT
   Ao finalizar, monta uma mensagem formatada com todos os dados do pedido
   e abre o WhatsApp da loja (número genérico — troque em WHATSAPP_NUMBER).
   ========================================================================== */

/* Número da loja no formato internacional, apenas dígitos (DDI + DDD + número). */
const WHATSAPP_NUMBER = "5599999999999"; // TODO: substituir pelo número real da loja

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const root = document.getElementById("checkout-root");
const items = Cart.read();

if (items.length === 0) {
  root.innerHTML = `
    <div class="empty-state">
      <h2>Sua sacola está vazia</h2>
      <p>Adicione peças ao carrinho antes de finalizar a compra.</p>
      <a href="index.html" class="btn">Voltar para a loja</a>
    </div>`;
} else {
  renderCheckout();
}

function renderCheckout() {
  const subtotal = Cart.subtotal();

  root.innerHTML = `
    <div class="checkout-layout">
      <form id="checkout-form" novalidate>

        <div class="form-section">
          <h3>Dados pessoais</h3>
          <div class="form-grid">
            <div class="field full">
              <label for="f-name">Nome completo</label>
              <input id="f-name" name="nome" type="text" required autocomplete="name">
            </div>
            <div class="field">
              <label for="f-cpf">CPF</label>
              <input id="f-cpf" name="cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" required>
            </div>
            <div class="field">
              <label for="f-phone">Telefone / WhatsApp</label>
              <input id="f-phone" name="telefone" type="tel" placeholder="(00) 00000-0000" required autocomplete="tel">
            </div>
            <div class="field full">
              <label for="f-email">E-mail</label>
              <input id="f-email" name="email" type="email" required autocomplete="email">
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Endereço de entrega</h3>
          <div class="form-grid">
            <div class="field">
              <label for="f-cep">CEP</label>
              <input id="f-cep" name="cep" type="text" inputmode="numeric" placeholder="00000-000" required>
            </div>
            <div class="field">
              <label for="f-city">Cidade</label>
              <input id="f-city" name="cidade" type="text" required>
            </div>
            <div class="field full">
              <label for="f-street">Rua / Avenida</label>
              <input id="f-street" name="rua" type="text" required>
            </div>
            <div class="field">
              <label for="f-number">Número</label>
              <input id="f-number" name="numero" type="text" required>
            </div>
            <div class="field">
              <label for="f-comp">Complemento</label>
              <input id="f-comp" name="complemento" type="text" placeholder="Apto, bloco, referência">
            </div>
            <div class="field">
              <label for="f-neighborhood">Bairro</label>
              <input id="f-neighborhood" name="bairro" type="text" required>
            </div>
            <div class="field">
              <label for="f-state">Estado</label>
              <select id="f-state" name="estado" required>
                <option value="" disabled selected>UF</option>
                ${UFS.map((uf) => `<option value="${uf}">${uf}</option>`).join("")}
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Forma de pagamento</h3>
          <div class="pay-options">
            <label class="pay-option"><input type="radio" name="pagamento" value="Pix" checked> Pix — confirmação imediata</label>
            <label class="pay-option"><input type="radio" name="pagamento" value="Cartão"> Cartão de crédito</label>
            <label class="pay-option"><input type="radio" name="pagamento" value="Boleto"> Boleto bancário</label>
          </div>
        </div>

        <div class="form-section">
          <h3>Observações</h3>
          <div class="field">
            <label for="f-notes">Alguma informação extra para a entrega? (opcional)</label>
            <textarea id="f-notes" name="observacoes" placeholder="Ex.: ponto de referência, melhor horário para entrega..."></textarea>
          </div>
        </div>

        <button type="submit" class="btn" style="width:100%; padding:1.1rem;">
          ${ICONS.whatsapp} Finalizar pedido via WhatsApp
        </button>
      </form>

      <aside class="order-summary">
        <h3>Resumo do pedido</h3>
        ${items
          .map(
            (item) => `
          <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <p class="summary-item-name">${item.name}</p>
              <p class="summary-item-meta">${item.color} · ${item.size} · qtd. ${item.qty}</p>
            </div>
            <p class="summary-item-price">${formatPrice(item.price * item.qty)}</p>
          </div>`
          )
          .join("")}
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Frete</span><span>Calculado no envio</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(subtotal)}</span></div>
        <p class="summary-note">${ICONS.truck} Envio para todo o Brasil em até 7 dias úteis.</p>
        <p class="summary-note">${ICONS.lock} Seus dados são usados apenas para processar este pedido.</p>
      </aside>
    </div>
  `;

  document.getElementById("checkout-form").addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  const message = buildWhatsappMessage(data, Cart.read(), Cart.subtotal());
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
  Cart.clear();
  showConfirmation();
}

function buildWhatsappMessage(data, items, subtotal) {
  const lines = [];
  lines.push("*Novo pedido — MONO*");
  lines.push("");
  lines.push("*Itens do pedido:*");
  items.forEach((item) => {
    lines.push(`• ${item.name} (${item.sku}) — ${item.color}, tam. ${item.size} — qtd: ${item.qty} — ${formatPrice(item.price * item.qty)}`);
  });
  lines.push("");
  lines.push(`*Subtotal:* ${formatPrice(subtotal)}`);
  lines.push("");
  lines.push("*Dados do cliente:*");
  lines.push(`Nome: ${data.nome}`);
  lines.push(`CPF: ${data.cpf}`);
  lines.push(`Telefone: ${data.telefone}`);
  lines.push(`E-mail: ${data.email}`);
  lines.push("");
  lines.push("*Endereço de entrega:*");
  lines.push(`${data.rua}, ${data.numero}${data.complemento ? " — " + data.complemento : ""}`);
  lines.push(`${data.bairro} — ${data.cidade}/${data.estado}`);
  lines.push(`CEP: ${data.cep}`);
  lines.push("");
  lines.push(`*Forma de pagamento:* ${data.pagamento}`);
  if (data.observacoes) {
    lines.push("");
    lines.push(`*Observações:* ${data.observacoes}`);
  }
  return lines.join("\n");
}

function showConfirmation() {
  root.innerHTML = `
    <div class="empty-state">
      <h2>Pedido enviado</h2>
      <p>Abrimos o WhatsApp com os detalhes do seu pedido. Confirme o envio por lá para que a loja possa dar sequência.</p>
      <a href="index.html" class="btn">Voltar para a loja</a>
    </div>`;
}
