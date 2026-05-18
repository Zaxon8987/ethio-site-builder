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
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — ${escapeHtml(data.category)} in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a2e;line-height:1.6}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;border-bottom:2px solid #f0fdf4}
.header h1{font-size:2.2rem;margin-bottom:8px;color:#1a8a3f}
.header .category{color:#888;font-size:.9rem;text-transform:uppercase;letter-spacing:1px}
.header .city{color:#666;margin-top:4px}
.header .tagline{font-size:1.1rem;color:#555;margin-top:12px;max-width:600px;margin-left:auto;margin-right:auto}
.section{padding:40px 0}
.section h2{font-size:1.3rem;margin-bottom:16px;color:#1a8a3f}
.about-text{color:#555;font-size:.95rem;max-width:700px}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.product-item{background:#f8f9fa;padding:14px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;font-size:.95rem}
.product-emoji{font-size:1.3rem}
.destinations{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.destination-tag{background:#f0fdf4;color:#1a8a3f;padding:6px 14px;border-radius:20px;font-size:.85rem}
.contact-info{background:#f8f9fa;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#1a8a3f;text-decoration:none}
.contact-info a:hover{text-decoration:underline}
.social-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:16px}
.social-link{background:#e8e8e8;padding:8px 16px;border-radius:6px;text-decoration:none;color:#333;font-size:.85rem}
.social-link:hover{background:#ddd}
.footer{text-align:center;padding:32px 0;color:#888;font-size:.8rem;border-top:1px solid #e8e8e8;margin-top:40px}
.footer a{color:#1a8a3f;text-decoration:none}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.6rem}.products-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="category">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${products ? `<div class="section"><h2>Products / Services</h2><div class="products-grid">${products}</div>${destinations ? `<div class="destinations">${destinations}</div>` : ''}</div>` : ''}
<div class="section"><h2>Contact</h2><div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Chat on WhatsApp</a></p>` : ''}
${data.website ? `<p>🌐 <a href="https://${data.website.replace(/^https?:\/\//, '')}" target="_blank">${escapeHtml(data.website)}</a></p>` : ''}
${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p><p style="margin-top:4px">Built with EthioSite</p></div>
</div></body></html>`;
  },

  hotel: function(data) {
    const services = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🛎️';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="service-item">${emoji} ${escapeHtml(name)}</div>`;
    }).join('');
    const amenities = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="amenity-tag">${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Hotel in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Georgia',serif;color:#2d1f14;line-height:1.7;background:#faf8f5}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#2d1f14,#4a3728);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.4rem;margin-bottom:6px;letter-spacing:1px}
.header .stars{color:#f5c518;font-size:1.4rem;margin-bottom:8px}
.header .city{color:#c4a882;font-size:.9rem}
.header .tagline{color:#e0d0c0;font-size:1rem;margin-top:12px;font-style:italic}
.section{padding:32px 0;border-bottom:1px solid #eee}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#4a3728;text-transform:uppercase;letter-spacing:2px}
.services-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.service-item{background:#fff;padding:12px 16px;border-radius:8px;font-size:.9rem;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.amenities{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.amenity-tag{background:#2d1f14;color:#f5e6d6;padding:4px 14px;border-radius:4px;font-size:.8rem}
.contact-info{background:#fff;padding:32px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#4a3728;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.book-btn{display:inline-block;background:#2d1f14;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:12px}
.book-btn:hover{background:#4a3728}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.services-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="stars">★★★★★</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">"${escapeHtml(data.tagline)}"</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${services ? `<div class="section"><h2>Services & Amenities</h2><div class="services-grid">${services}</div>${amenities ? `<div class="amenities">${amenities}</div>` : ''}</div>` : ''}
<div class="section"><h2>Book Your Stay</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Book via WhatsApp</a></p>` : ''}
${data.website ? `<p><a href="https://${data.website.replace(/^https?:\/\//, '')}" class="book-btn" target="_blank">🌐 Book Online</a></p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  restaurant: function(data) {
    const menu = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🍽️';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="menu-item"><span class="menu-emoji">${emoji}</span><span class="menu-name">${escapeHtml(name)}</span></div>`;
    }).join('');
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Restaurant in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;line-height:1.6;background:#fffdf8}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:#d4410b;color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.4rem;margin-bottom:6px;font-family:'Georgia',serif}
.header .cuisine{color:#ffccb3;font-size:.9rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#ffccb3;margin-top:4px}
.header .tagline{color:#fff;font-size:1rem;margin-top:12px;font-style:italic;opacity:.9}
.section{padding:32px 0;border-bottom:1px solid #f0e8e0}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#d4410b;font-family:'Georgia',serif}
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.menu-item{background:#fff;padding:14px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;font-size:.9rem;box-shadow:0 1px 4px rgba(0,0,0,.04);border-left:3px solid #d4410b}
.menu-emoji{font-size:1.2rem}
.hours{background:#fff5ee;padding:20px;border-radius:12px;margin-top:16px;font-size:.9rem;color:#555}
.contact-info{background:#fff5ee;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#d4410b;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.menu-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="cuisine">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${menu ? `<div class="section"><h2>Menu</h2><div class="menu-grid">${menu}</div></div>` : ''}
<div class="section"><h2>Contact & Hours</h2>
<div class="hours">🕐 Open daily: 8:00 AM – 10:00 PM</div>
<div class="contact-info" style="margin-top:16px">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">🍕 Order via WhatsApp</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  clinic: function(data) {
    const services = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '💊';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="service-item"><span class="service-emoji">${emoji}</span><span>${escapeHtml(name)}</span></div>`;
    }).join('');
    const specialties = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="specialty-tag">${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Clinic in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a2a3a;line-height:1.6;background:#f5f9fc}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#1a73b5,#2980c9);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:8px}
.header .type{color:#b3d9ff;font-size:.9rem;text-transform:uppercase;letter-spacing:1px}
.header .city{color:#b3d9ff;margin-top:4px}
.header .tagline{color:#e0f0ff;font-size:1rem;margin-top:12px}
.section{padding:32px 0;border-bottom:1px solid #e8f0f5}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#1a73b5}
.services-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.service-item{background:#fff;padding:14px 18px;border-radius:8px;display:flex;align-items:center;gap:8px;font-size:.9rem;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.service-emoji{font-size:1.2rem}
.specialties{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.specialty-tag{background:#e8f4fd;color:#1a73b5;padding:6px 14px;border-radius:20px;font-size:.8rem;border:1px solid #cce5ff}
.contact-info{background:#fff;padding:32px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#1a73b5;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.appt-btn{display:inline-block;background:#1a73b5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px;margin-right:8px}
.appt-btn:hover{background:#155a92}
.hours{background:#e8f4fd;padding:16px;border-radius:8px;margin-top:12px;font-size:.85rem;color:#444}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.services-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${services ? `<div class="section"><h2>Services</h2><div class="services-grid">${services}</div>${specialties ? `<div class="specialties">${specialties}</div>` : ''}</div>` : ''}
<div class="section"><h2>Visit Us</h2>
<div class="hours">🕐 Mon–Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 1:00 PM</div>
<div class="contact-info" style="margin-top:16px">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Book Appointment</a></p>` : ''}
${data.website ? `<p><a href="https://${data.website.replace(/^https?:\/\//, '')}" class="appt-btn" target="_blank">📅 Book Online</a></p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  shop: function(data) {
    const products = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🛍️';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="product-card"><div class="product-emoji-lg">${emoji}</div><div class="product-name">${escapeHtml(name)}</div><div class="product-price">Call for price</div></div>`;
    }).join('');
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Shop in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;line-height:1.6;background:#fff}
.container{max-width:1000px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:50px 0;background:linear-gradient(135deg,#ff6b35,#ff8f5e);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:6px}
.header .type{color:#ffe0d0;font-size:.9rem;text-transform:uppercase;letter-spacing:1px}
.header .city{color:#ffe0d0;margin-top:4px}
.header .tagline{color:#fff;font-size:1rem;margin-top:12px}
.section{padding:32px 0}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#ff6b35}
.products-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.product-card{background:#fafafa;border-radius:12px;padding:24px 16px;text-align:center;border:1px solid #f0f0f0;transition:transform .2s}
.product-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
.product-emoji-lg{font-size:2.5rem;margin-bottom:12px}
.product-name{font-weight:600;font-size:.9rem;margin-bottom:6px}
.product-price{color:#ff6b35;font-size:.8rem;font-weight:500}
.contact-info{background:#fafafa;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#ff6b35;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem;border-top:1px solid #f0f0f0;margin-top:32px}
@media(max-width:768px){.products-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.products-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${products ? `<div class="section"><h2>Products</h2><div class="products-grid">${products}</div></div>` : ''}
<div class="section"><h2>Contact & Order</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">🛒 Order via WhatsApp</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  manufacturer: function(data) {
    const products = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🏭';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="product-item"><span class="product-emoji">${emoji}</span><div><div class="product-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    const certifications = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="cert-badge">✓ ${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Manufacturer in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;line-height:1.6;background:#fafafa}
.container{max-width:1000px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#1c1c3d,#2d2d5e);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:8px;letter-spacing:-.5px}
.header .type{color:#8888bb;font-size:.85rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}
.header .city{color:#8888bb;margin-top:4px}
.header .tagline{color:#ccccee;font-size:1rem;margin-top:12px;max-width:600px;margin-left:auto;margin-right:auto}
.section{padding:32px 0;border-bottom:1px solid #eee}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#1c1c3d;text-transform:uppercase;letter-spacing:1px}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.product-item{background:#fff;padding:16px 18px;border-radius:8px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid #f0f0f0}
.product-emoji{font-size:1.5rem}
.product-name{font-weight:600;font-size:.9rem}
.certifications{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.cert-badge{background:#e8f5e9;color:#2e7d32;padding:6px 16px;border-radius:4px;font-size:.8rem;font-weight:500}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.stat{text-align:center;padding:16px;background:#f5f5ff;border-radius:8px}
.stat-num{font-size:1.5rem;font-weight:800;color:#1c1c3d}
.stat-label{font-size:.75rem;color:#666;text-transform:uppercase}
.contact-info{background:#f5f5ff;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#1c1c3d;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.stats{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div>
<div class="stats"><div class="stat"><div class="stat-num">10+</div><div class="stat-label">Years Exp</div></div><div class="stat"><div class="stat-num">50+</div><div class="stat-label">Clients</div></div><div class="stat"><div class="stat-num">100%</div><div class="stat-label">Quality</div></div></div></div>` : ''}
${products ? `<div class="section"><h2>Products</h2><div class="products-grid">${products}</div>${certifications ? `<div class="certifications">${certifications}</div>` : ''}</div>` : ''}
<div class="section"><h2>Contact</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Request Quote</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  school: function(data) {
    const programs = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '📚';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="program-card"><span class="program-emoji">${emoji}</span><div class="program-info"><div class="program-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    const extras = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="extra-tag">${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — School in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a2a3a;line-height:1.6;background:#f5f7ff}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#1565c0,#1976d2);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:6px}
.header .type{color:#bbdefb;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#bbdefb;margin-top:4px}
.header .tagline{color:#e3f2fd;font-size:1rem;margin-top:12px;font-style:italic}
.section{padding:32px 0;border-bottom:1px solid #e8eaf6}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#1565c0}
.programs-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.program-card{background:#fff;padding:14px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border-left:4px solid #1565c0}
.program-emoji{font-size:1.3rem}
.program-name{font-weight:600;font-size:.9rem}
.extras{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.extra-tag{background:#e8eefb;color:#1565c0;padding:6px 14px;border-radius:20px;font-size:.8rem}
.contact-info{background:#eef2fb;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#1565c0;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.programs-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About Our School</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${programs ? `<div class="section"><h2>Programs</h2><div class="programs-grid">${programs}</div>${extras ? `<div class="extras">${extras}</div>` : ''}</div>` : ''}
<div class="section"><h2>Contact & Enrollment</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">📝 Enroll via WhatsApp</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  ngo: function(data) {
    const projects = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🤝';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="project-item"><span class="project-emoji">${emoji}</span><div><div class="project-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    const areas = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="area-tag">${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — NGO in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#263238;line-height:1.7;background:#f5f5f5}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#e65100,#ff6f00);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:6px;letter-spacing:-.5px}
.header .type{color:#ffcc80;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#ffcc80;margin-top:4px}
.header .tagline{color:#ffe0b2;font-size:1rem;margin-top:12px;font-weight:300}
.section{padding:32px 0;border-bottom:1px solid #e0e0e0}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#e65100;font-weight:700}
.projects-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.project-item{background:#fff;padding:16px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid #f5f5f5}
.project-emoji{font-size:1.4rem}
.project-name{font-weight:600;font-size:.9rem}
.impact-stat{text-align:center;padding:24px;background:#fff3e0;border-radius:12px;margin-top:16px}
.impact-stat .num{font-size:2rem;font-weight:800;color:#e65100}
.impact-stat .label{font-size:.8rem;color:#888;text-transform:uppercase}
.areas{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.area-tag{background:#fff3e0;color:#e65100;padding:6px 16px;border-radius:20px;font-size:.8rem;font-weight:500}
.contact-info{background:#fff3e0;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#e65100;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.donate-btn{display:inline-block;background:#e65100;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:12px;margin-right:8px}
.donate-btn:hover{background:#bf360c}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.projects-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>Our Mission</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${projects ? `<div class="section"><h2>Projects & Programs</h2><div class="projects-grid">${projects}</div>${areas ? `<div class="areas">${areas}</div>` : ''}</div>` : ''}
<div class="section"><h2>Get Involved</h2>
<div class="impact-stat"><div class="num">1,000+</div><div class="label">Lives Impacted</div></div>
<div class="contact-info" style="margin-top:16px">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">💬 Contact Us</a></p>` : ''}
${data.website ? `<p><a href="https://${data.website.replace(/^https?:\/\//, '')}" class="donate-btn" target="_blank">🤝 Donate / Partner</a></p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  farm: function(data) {
    const products = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🌾';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="product-item"><span class="product-emoji">${emoji}</span><div><div class="product-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    const exports = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="export-tag">🚢 ${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Farm in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Georgia',serif;color:#2e3b2e;line-height:1.6;background:#f6faf6}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#2e7d32,#43a047);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.4rem;margin-bottom:6px;letter-spacing:-.5px}
.header .type{color:#c8e6c9;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#c8e6c9;margin-top:4px}
.header .tagline{color:#e8f5e9;font-size:1rem;margin-top:12px;font-style:italic}
.section{padding:32px 0;border-bottom:1px solid #e8f0e8}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#2e7d32;font-family:'Georgia',serif}
.products-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.product-item{background:#fff;padding:16px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid #e8f0e8}
.product-emoji{font-size:1.5rem}
.product-name{font-weight:600;font-size:.9rem}
.exports{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.export-tag{background:#e8f5e9;color:#2e7d32;padding:6px 16px;border-radius:20px;font-size:.8rem}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.stat{text-align:center;padding:16px;background:#f0faf0;border-radius:8px}
.stat-num{font-size:1.5rem;font-weight:800;color:#2e7d32}
.stat-label{font-size:.75rem;color:#666;text-transform:uppercase}
.contact-info{background:#f0faf0;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#2e7d32;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.products-grid{grid-template-columns:1fr}.stats{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About Our Farm</h2><div class="about-text">${escapeHtml(data.description)}</div>
<div class="stats"><div class="stat"><div class="stat-num">50+</div><div class="stat-label">Hectares</div></div><div class="stat"><div class="stat-num">100%</div><div class="stat-label">Organic</div></div><div class="stat"><div class="stat-num">500+</div><div class="stat-label">Farmers</div></div></div></div>` : ''}
${products ? `<div class="section"><h2>Our Produce</h2><div class="products-grid">${products}</div>${exports ? `<div class="exports">${exports}</div>` : ''}</div>` : ''}
<div class="section"><h2>Contact</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">🌱 Order Our Produce</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  transport: function(data) {
    const services = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '🚛';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="service-item"><span class="service-emoji">${emoji}</span><div><div class="service-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    const routes = data.destinations ? data.destinations.split(',').map(d => d.trim()).filter(Boolean).map(d =>
      `<span class="route-tag">📍 ${escapeHtml(d)}</span>`
    ).join('') : '';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Transport in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a2a3a;line-height:1.6;background:#f5f8fa}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:linear-gradient(135deg,#0d47a1,#1565c0);color:#fff;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.2rem;margin-bottom:6px;letter-spacing:-.5px}
.header .type{color:#90caf9;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#90caf9;margin-top:4px}
.header .tagline{color:#bbdefb;font-size:1rem;margin-top:12px}
.section{padding:32px 0;border-bottom:1px solid #e3f2fd}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#0d47a1}
.services-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.service-item{background:#fff;padding:16px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border-left:4px solid #0d47a1}
.service-emoji{font-size:1.3rem}
.service-name{font-weight:600;font-size:.9rem}
.routes{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.route-tag{background:#e3f2fd;color:#0d47a1;padding:6px 16px;border-radius:20px;font-size:.8rem;font-weight:500}
.contact-info{background:#e3f2fd;padding:32px;border-radius:12px}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#0d47a1;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#999;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.services-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>About</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${services ? `<div class="section"><h2>Services</h2><div class="services-grid">${services}</div>${routes ? `<div class="routes">${routes}</div>` : ''}</div>` : ''}
<div class="section"><h2>Get a Quote</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">🚚 Request Quote</a></p>` : ''}
${data.website ? `<p>🌐 ${escapeHtml(data.website)}</p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  },

  cafe: function(data) {
    const items = data.products.split('\n').filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      const emoji = trimmed.match(/^(\p{Emoji}+)/u)?.[1] || '☕';
      const name = trimmed.replace(/^\p{Emoji}+/u, '').trim() || trimmed;
      return `<div class="menu-item"><span class="menu-emoji">${emoji}</span><div><div class="menu-name">${escapeHtml(name)}</div></div></div>`;
    }).join('');
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.companyName)} — Cafe in ${escapeHtml(data.city)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#3d2b1f;line-height:1.6;background:#fefcf5}
.container{max-width:900px;margin:0 auto;padding:40px 24px}
.header{text-align:center;padding:60px 0 40px;background:#3d2b1f url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="%23f5e6d0" stroke-width=".5" opacity=".3"/></svg>');color:#f5e6d0;border-radius:12px;margin-bottom:32px}
.header h1{font-size:2.4rem;margin-bottom:6px;font-family:'Georgia',serif}
.header .type{color:#c4a882;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
.header .city{color:#c4a882;margin-top:4px}
.header .tagline{color:#e0d0c0;font-size:1rem;margin-top:12px;font-style:italic}
.section{padding:32px 0;border-bottom:1px solid #f0e8e0}
.section h2{font-size:1.2rem;margin-bottom:16px;color:#3d2b1f;font-family:'Georgia',serif}
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.menu-item{background:#fff;padding:14px 18px;border-radius:8px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid #f0e8e0}
.menu-emoji{font-size:1.5rem}
.menu-name{font-weight:600;font-size:.9rem}
.menu-price{font-size:.8rem;color:#c4a882}
.contact-info{background:#fff;padding:32px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.contact-info p{margin-bottom:8px;font-size:.95rem}
.contact-info a{color:#3d2b1f;text-decoration:none;font-weight:500}
.contact-info a:hover{text-decoration:underline}
.whatsapp-btn{display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px}
.whatsapp-btn:hover{background:#1da851}
.footer{text-align:center;padding:32px 0;color:#c4a882;font-size:.8rem}
@media(max-width:600px){.container{padding:20px 16px}.header h1{font-size:1.8rem}.menu-grid{grid-template-columns:1fr}}
</style></head>
<body><div class="container">
<div class="header">
<h1>${escapeHtml(data.companyName)}</h1>
<div class="type">${escapeHtml(data.category.toUpperCase())}</div>
<div class="city">📍 ${escapeHtml(data.city)}, Ethiopia</div>
${data.tagline ? `<div class="tagline">${escapeHtml(data.tagline)}</div>` : ''}
</div>
${data.description ? `<div class="section"><h2>Our Story</h2><div class="about-text">${escapeHtml(data.description)}</div></div>` : ''}
${items ? `<div class="section"><h2>Menu</h2><div class="menu-grid">${items}</div></div>` : ''}
<div class="section"><h2>Find Us</h2>
<div class="contact-info">
${data.phone ? `<p>📞 <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
${data.email ? `<p>📧 <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
${data.whatsapp ? `<p><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" class="whatsapp-btn" target="_blank">☕ Order Ahead</a></p>` : ''}
</div></div>
<div class="footer"><p>${escapeHtml(data.companyName)} — ${escapeHtml(data.city)}, Ethiopia</p></div>
</div></body></html>`;
  }
};

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function generateSite(data) {
  const template = TEMPLATES[data.templateType] || TEMPLATES.exporter;
  let html = template(data);
  const seoTitle = data.seoTitle ? escapeHtml(data.seoTitle) : '';
  const seoDesc = data.seoDesc ? escapeHtml(data.seoDesc) : '';
  const ogImage = data.ogImage ? escapeHtml(data.ogImage) : '';
  if (seoDesc || seoTitle || ogImage) {
    const meta = [];
    if (seoDesc) {
      meta.push(`<meta name="description" content="${seoDesc}">`);
      meta.push(`<meta property="og:description" content="${seoDesc}">`);
    }
    if (seoTitle) {
      meta.push(`<meta property="og:title" content="${seoTitle}">`);
      html = html.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    }
    if (ogImage) {
      meta.push(`<meta property="og:image" content="${ogImage}">`);
    }
    meta.push('<meta property="og:type" content="website">');
    meta.push(`<meta property="og:url" content="${window.location.href}">`);
    html = html.replace('</title>', '</title>' + meta.join(''));
  }
  return html;
}
