const TEMPLATES = {
  exporter: function(data) {
    const products = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '📦';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="product-item"><span class="product-emoji">${emoji}</span><span>${escapeHtml(name)}</span></div>`;
    }).join('');

    const socialLinks = data.social ? data.social.split(',').map(s => {
      const url = s.trim();
      const platform = url.includes('facebook') ? 'Facebook' : url.includes('instagram') ? 'Instagram' : url.includes('twitter') || url.includes('x.com') ? 'Twitter / X' : url.includes('linkedin') ? 'LinkedIn' : url.includes('youtube') ? 'YouTube' : url.includes('tiktok') ? 'TikTok' : url.includes('telegram') ? 'Telegram' : 'Social';
      return `<a href="https://${url.replace(/^https?:\/\//, '')}" target="_blank" class="social-link">${platform}</a>`;
    }).join('') : '';

    const destinations = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="destination-tag">${escapeHtml(d)}</span>`
    ).join('') : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.companyName)} — ${escapeHtml(data.category)} in ${escapeHtml(data.city)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; padding: 60px 0 40px; border-bottom: 2px solid #f0fdf4; }
    .header h1 { font-size: 2.2rem; margin-bottom: 8px; color: #1a8a3f; }
    .header .category { color: #888; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
    .header .city { color: #666; margin-top: 4px; }
    .header .tagline { font-size: 1.1rem; color: #555; margin-top: 12px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .section { padding: 40px 0; }
    .section h2 { font-size: 1.3rem; margin-bottom: 16px; color: #1a8a3f; }
    .about-text { color: #555; font-size: 0.95rem; max-width: 700px; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .product-item { background: #f8f9fa; padding: 14px 18px; border-radius: 8px; display: flex; align-items: center; gap: 10px; font-size: 0.95rem; }
    .product-emoji { font-size: 1.3rem; }
    .destinations { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .destination-tag { background: #f0fdf4; color: #1a8a3f; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; }
    .contact-info { background: #f8f9fa; padding: 32px; border-radius: 12px; }
    .contact-info p { margin-bottom: 8px; font-size: 0.95rem; }
    .contact-info a { color: #1a8a3f; text-decoration: none; }
    .contact-info a:hover { text-decoration: underline; }
    .social-links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
    .social-link { background: #e8e8e8; padding: 8px 16px; border-radius: 6px; text-decoration: none; color: #333; font-size: 0.85rem; }
    .social-link:hover { background: #ddd; }
    .footer { text-align: center; padding: 32px 0; color: #888; font-size: 0.8rem; border-top: 1px solid #e8e8e8; margin-top: 40px; }
    .footer a { color: #1a8a3f; text-decoration: none; }
    .whatsapp-btn { display: inline-block; background: #25D366; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 12px; }
    .whatsapp-btn:hover { background: #1da851; }
    @media (max-width: 600px) {
      .container { padding: 20px 16px; }
      .header h1 { font-size: 1.6rem; }
      .products-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(data.companyName)}</h1>
      <div class="category">${escapeHtml(data.category.toUpperCase())}</div>
      <div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
      ${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
    </div>

    ${data.description ? `
    <div class="section">
      <h2>About</h2>
      <div class="about-text">${escapeHtml(data.description)}</div>
    </div>` : ''}

    ${products ? `
    <div class="section">
      <h2>Products / Services</h2>
      <div class="products-grid">${products}</div>
      ${destinations ? `<div class="destinations">${destinations}</div>` : ''}
    </div>` : ''}

    <div class="section">
      <h2>Contact</h2>
      <div class="contact-info">
        ${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
        ${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
        ${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Chat on WhatsApp</a></p>` : ''}
        ${data.website ? `<p>🌐 <a href="https://${data.website.replace(/^https?:\/\//, '')}" target="_blank">${escapeHtml(data.website)}</a></p>` : ''}
        ${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ''}
      </div>
    </div>

    <div class="footer">
      <p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p>
      <p style="margin-top:4px">Built with <a href="#">EthioSite</a> | Get your free business site</p>
    </div>
  </div>
</body>
</html>`;
  }
};

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function generateSite(data) {
  const template = TEMPLATES.exporter;
  return template(data);
}
