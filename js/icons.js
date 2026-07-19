/* ==========================================================================
   ÍCONES — SVGs de linha, minimalistas (stroke, sem preenchimento)
   ========================================================================== */
const ICONS = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.2c1.6-3.4 4.4-5.2 7.5-5.2s5.9 1.8 7.5 5.2" stroke-linecap="round"/></svg>`,
  bag: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 13H7L6 8z" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" stroke-linecap="round"/></svg>`,
  heart: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20.2s-7.8-4.7-10-9.4C.4 7 2.6 4 6.1 4c2 0 3.6 1 5.9 3.3C14.3 5 15.9 4 17.9 4c3.5 0 5.7 3 4.1 6.8-2.2 4.7-10 9.4-10 9.4z" stroke-linejoin="round"/></svg>`,
  heartFill: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6"><path d="M12 20.2s-7.8-4.7-10-9.4C.4 7 2.6 4 6.1 4c2 0 3.6 1 5.9 3.3C14.3 5 15.9 4 17.9 4c3.5 0 5.7 3 4.1 6.8-2.2 4.7-10 9.4-10 9.4z" stroke-linejoin="round"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19" stroke-linecap="round"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14" stroke-linecap="round"/></svg>`,
  chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.8 5.9 21.2l1.5-6.9L2.2 9.6l6.9-.7L12 2.5z"/></svg>`,
  starHalf: `<svg width="13" height="13" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" stroke="currentColor" stroke-width="1" d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.8 5.9 21.2l1.5-6.9L2.2 9.6l6.9-.7L12 2.5z"/></svg>`,
  starEmpty: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.8 5.9 21.2l1.5-6.9L2.2 9.6l6.9-.7L12 2.5z"/></svg>`,
  whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.1 15 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.2-8.4 8.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s1 2.4 1.1 2.6c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>`,
  truck: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 7h11v10H2z" stroke-linejoin="round"/><path d="M13 10h4l4 3.5V17h-8" stroke-linejoin="round"/><circle cx="6" cy="18.5" r="1.6"/><circle cx="17" cy="18.5" r="1.6"/></svg>`,
  lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="10" width="14" height="10" rx="1.5"/><path d="M8 10V7a4 4 0 018 0v3" stroke-linecap="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12.5l5 5.5L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

function starRow(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) out += ICONS.star;
    else if (rating >= i - 0.5) out += ICONS.starHalf;
    else out += ICONS.starEmpty;
  }
  return out;
}
