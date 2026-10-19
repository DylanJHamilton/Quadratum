(() => {
  const node = document.querySelector('[data-gift-card-qr]');
  if (!node || !node.dataset.giftCardQr || typeof QRCode !== 'function' || node.childElementCount) return;
  new QRCode(node, {text: node.dataset.giftCardQr, width: 160, height: 160, colorDark: '#000000', colorLight: '#ffffff'});
  node.querySelectorAll('img').forEach(image => { image.alt = ''; });
})();
