let currentSiteHTML = '';

document.getElementById('siteForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-large');
  const btnText = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');

  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  btn.disabled = true;

  const data = {
    companyName: document.getElementById('companyName').value.trim(),
    ownerName: document.getElementById('ownerName').value.trim(),
    category: document.getElementById('category').value,
    city: document.getElementById('city').value.trim(),
    tagline: document.getElementById('tagline').value.trim(),
    description: document.getElementById('description').value.trim(),
    products: document.getElementById('products').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    website: document.getElementById('website').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim(),
    social: document.getElementById('social').value.trim(),
    destinations: document.getElementById('destinations').value.trim()
  };

  setTimeout(() => {
    currentSiteHTML = generateSite(data);
    showPreview(currentSiteHTML);

    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    btn.disabled = false;

    gtag_event('site_generated', { category: data.category });
  }, 800);
});

function showPreview(html) {
  const section = document.getElementById('preview');
  section.style.display = 'block';

  const frame = document.getElementById('previewFrame');
  frame.innerHTML = `<iframe srcdoc="${escapeHtmlAttr(html)}" style="width:100%;height:600px;border:none;" onload="this.style.height=this.contentWindow.document.body.scrollHeight+50+'px'"></iframe>`;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadSite() {
  if (!currentSiteHTML) return;
  const blob = new Blob([currentSiteHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const name = document.getElementById('companyName').value.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'my-business';
  a.href = url;
  a.download = `${name}_site.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyEmbedCode() {
  const name = document.getElementById('companyName').value.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'my-business';
  const url = `${window.location.origin}/site.html?id=${encodeURIComponent(name)}`;
  navigator.clipboard.writeText(url).then(() => {
    alert('URL copied! You can share this link.');
  }).catch(() => {
    prompt('Copy this URL:', url);
  });
}

function escapeHtmlAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function gtag_event() {}
