import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { TEMPLATES, generateSite, escapeHtml } from './templates.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCt64mI0a0jDv_Gz0FIpgQINoLQQ2sEX9U',
  authDomain: 'ethio-site-builder.firebaseapp.com',
  projectId: 'ethio-site-builder',
  storageBucket: 'ethio-site-builder.firebasestorage.app',
  messagingSenderId: '45590439710',
  appId: '1:45590439710:web:2a283a97c6263f6c0a4b0f',
  measurementId: 'G-3CX0W4D088'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const i18n = {
  am: {
    'nav.create': 'ድረ-ገጽ ይፍጠሩ',
    'nav.pricing': 'ዋጋ',
    'nav.faq': 'ጥያቄዎች',
    'nav.login': 'ግባ',
    'nav.logout': 'ውጣ',
    'nav.dashboard': 'የእኔ ጣቢያዎች',
    'auth.login': 'ግባ',
    'auth.signup': 'ተመዝገብ',
    'auth.email': 'ኢሜይል',
    'auth.password': 'የይለፍ ቃል',
    'auth.login.btn': 'ግባ',
    'auth.signup.btn': 'ተመዝገብ',
    'auth.google': 'በGoogle ቀጥል',
    'auth.or': 'ወይም',
    'auth.error.invalid': 'ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም',
    'auth.error.weak': 'የይለፍ ቃል ቢያንስ 6 ፊደላት መሆን አለበት',
    'auth.error.exists': 'ይህ ኢሜይል ቀድሞ ተመዝግቧል',
    'hero.title': 'የኢትዮጵያ ንግድዎን በነጻ በመስመር ላይ ያቅርቡ',
    'hero.sub': 'ለኤክስፖርተሮች፣ አምራቾች እና አገልግሎት ሰጪዎች ፕሮፌሽናል ባለ-1-ገጽ ድረ-ገጽ። ኮድ አያስፈልግም፣ ምንም ወጪ የለም።',
    'hero.cta': 'ነፃ ድረ-ገጽዎን ይፍጠሩ',
    'hero.meta': 'ከ1,000 በላይ የኢትዮጵያ ንግዶች ተመዝግበዋል',
    'feature.fast': 'የ5 ደቂቃ ዝግጅት',
    'feature.fast.desc': 'ቅጽ ይሙሉ፣ ወዲያውኑ ድረ-ገጽ ያግኙ። ቴክኒክ ክህሎት አያስፈልግም።',
    'feature.mobile': 'ለሞባይል ዝግጁ',
    'feature.mobile.desc': 'በስልክ፣ ታብሌት እና ኮምፒውተር ላይ ጥሩ ሆኖ ይታያል።',
    'feature.export': 'ለኤክስፖርት ያተኮረ',
    'feature.export.desc': 'ምርቶችዎን፣ የምስክር ወረቀቶችዎን እና የማጓጓዣ መረጃዎችዎን ያሳዩ።',
    'feature.hosting': 'ነፃ ማስተናገጃ',
    'feature.hosting.desc': 'እኛ በነጻ እናስተናግዳለን፣ ወይም አውርደው በየትኛውም ቦታ ያስተናግዱ።',
    'builder.title': 'ነፃ የንግድ ድረ-ገጽዎን ይፍጠሩ',
    'builder.sub': 'ይህን ቅጽ ይሙሉ እና ወዲያውኑ ፕሮፌሽናል ድረ-ገጽ ያግኙ።',
    'form.name': 'የንግድ ስም *',
    'form.owner': 'የእርስዎ ስም',
    'form.category': 'ምድብ *',
    'form.category.select': 'ምድብ ይምረጡ...',
    'form.city': 'ከተማ *',
    'form.tagline': 'መሪ ቃል',
    'form.about': 'ስለ ንግድዎ *',
    'form.products': 'ምርቶች / አገልግሎቶች (በመስመር)',
    'form.phone': 'ስልክ *',
    'form.email': 'ኢሜይል',
    'form.website': 'ድረ-ገጽ (ካለዎት)',
    'form.whatsapp': 'WhatsApp',
    'form.social': 'ማህበራዊ ሚዲያ (በነጠላ ሰረዝ ይለዩ)',
    'form.destinations': 'ወደ ውጭ የሚላኩባቸው አገራት',
    'form.seo.title': 'SEO ሜታ አርዕስት (አማራጭ)',
    'form.seo.desc': 'SEO ሜታ ገለጻ (አማራጭ)',
    'form.og.image': 'የማህበራዊ ሚዲያ ምስል URL (አማራጭ)',
    'form.advanced': 'የላቁ ቅንብሮች (ለAI ቁልፍ)',
    'form.apikey': 'OpenAI / Claude / HuggingFace ቁልፍ (አማራጭ)',
    'form.apikey.hint': 'በአካባቢዎ ይቀመጣል። ለእውነተኛ AI ይጠቅማል።',
    'form.apiprovider': 'አገልግሎት ሰጪ',
    'form.generate': 'ነፃ ድረ-ገጽዎን ይፍጠሩ',
    'form.generating': 'በዝግጅት ላይ...',
    'form.ai': 'AI ይሙላ',
    'preview.title': 'ድረ-ገጽዎ ዝግጁ ነው!',
    'preview.download': 'HTML አውርድ',
    'preview.copy': 'አገናኝ ቅዳ',
    'preview.save': 'አስቀምጥ',
    'preview.share': 'URL ለመጋራት',
    'preview.share.url': 'ከታች ያለውን አገናኝ ያጋሩ:',
    'preview.upgrade': 'ወደ ፕሪሚየም ያሻሽሉ',
    'dashboard.title': 'የተቀመጡ ጣቢያዎቼ',
    'dashboard.empty': 'ገና ምንም የተቀመጠ ጣቢያ የለም። ከላይ የመጀመሪያውን ይፍጠሩ!',
    'pricing.title': 'ቀላል ዋጋ',
    'pricing.free.title': 'ነፃ',
    'pricing.free.li1': '✓ ባለ-1-ገጽ ድረ-ገጽ',
    'pricing.free.li2': '✓ ለሞባይል ምላሽ ሰጪ',
    'pricing.free.li3': '✓ ምርት ማሳያ',
    'pricing.free.li4': '✓ የእውቂያ ቅጽ',
    'pricing.free.li5': '✓ ነፃ ማስተናገጃ',
    'pricing.free.cta': 'ነፃ ይጀምሩ',
    'pricing.premium.title': 'ፕሪሚየም',
    'pricing.premium.badge': 'ምርጥ ምርጫ',
    'pricing.premium.li1': '✓ በነፃ ውስጥ ያለው ሁሉ',
    'pricing.premium.li2': '✓ የራስዎ ዶሜይን',
    'pricing.premium.li3': '✓ ኢ-ኮሜርስ / ቦታ ማስያዝ',
    'pricing.premium.li4': '✓ ትንተና እና የእውቂያ መከታተያ',
    'pricing.premium.li5': '✓ ሁለት ቋንቋ (አማርኛ + እንግሊዝኛ)',
    'pricing.premium.li6': '✓ የWhatsApp ውይይት',
    'pricing.premium.cta': 'በChapa ይክፈሉ',
    'pricing.pro.title': 'ፕሮ',
    'pricing.pro.li1': '✓ በፕሪሚየም ውስጥ ያለው ሁሉ',
    'pricing.pro.li2': '✓ እስከ 5 ገጾች',
    'pricing.pro.li3': '✓ SEO ማመቻቸት',
    'pricing.pro.li4': '✓ የጉግል ካርታ ውህደት',
    'pricing.pro.li5': '✓ እስከ 50 ምርቶች',
    'pricing.pro.cta': 'በChapa ይክፈሉ',
    'faq.title': 'ተደጋጋሚ ጥያቄዎች',
    'faq.q1': 'በእርግጥ ነፃ ነው?',
    'faq.a1': 'አዎ። ባለ-1-ገጽ ድረ-ገጽዎ ሙሉ በሙሉ ነፃ ነው። ተጨማሪ ባህሪያት ሲፈልጉ ብቻ ያሻሽላሉ።',
    'faq.q2': 'የራሴ ዶሜይን መጠቀም እችላለሁ?',
    'faq.a2': 'አዎ፣ በፕሪሚየም እቅድ ላይ። ነፃ ጣቢያዎች ኤቲዮሳይት ንዑስ ጎራ ይጠቀማሉ።',
    'faq.q3': 'ድረ-ገጼን እንዴት አዘምናለሁ?',
    'faq.a3': 'ነፃ ጣቢያዎች በማንኛውም ጊዜ እንደገና ሊፈጠሩ ይችላሉ። ፕሪሚየም ጣቢያዎች የቀጥታ አርታኢ ያገኛሉ።',
    'footer': 'EthioSite — እያንዳንዱን የኢትዮጵያ ንግድ በመስመር ላይ ያቅርቡ',
    'tpl.exporter': 'ኤክስፖርተር',
    'tpl.manufacturer': 'አምራች',
    'tpl.importer': 'አስመጪ',
    'tpl.service': 'አገልግሎት ሰጪ',
    'tpl.hotel': 'ሆቴል / ጉዞ',
    'tpl.restaurant': 'ምግብ ቤት',
    'tpl.clinic': 'ክሊኒክ',
    'tpl.shop': 'ሱቅ',
    'tpl.cafe': 'ካፌ',
    'tpl.school': 'ትምህርት ቤት / ትምህርት',
    'tpl.ngo': 'መንግሥታዊ ያልሆነ ድርጅት',
    'tpl.farm': 'እርሻ / ግብርና',
    'tpl.transport': 'ትራንስፖርት / ሎጅስቲክስ',
    'tpl.other': 'ሌላ',
    'ai.generating': 'በማመንጨት ላይ...',
    'ai.error': 'እባክዎ መግለጫ ያስገቡ',
    'payment.success': 'ለዝማኔ እንደገና እንገናኝዎታለን!',
    'payment.premium.desc': 'የወርሃዊ ፕሪሚየም ዝማኔ',
    'payment.pro.desc': 'የወርሃዊ ፕሮ ዝማኔ',
    'share.tooltip': 'አገናኝ ተቀድቷል!',
    'toast.saved': 'ጣቢያ በተሳካ ሁኔታ ተቀምጧል!',
    'toast.deleted': 'ጣቢያ ተወግዷል',
    'toast.loaded': 'ጣቢያ ተጭኗል',
    'toast.login': 'በተሳካ ሁኔታ ገብተዋል',
    'toast.logout': 'ወጥተዋል'
  }
}

let currentLang = 'en'
let currentSiteHTML = ''
let generatedSiteData = null
let currentUser = null
let userSites = []

function t(key) {
  if (currentLang === 'am' && i18n.am[key]) return i18n.am[key]
  return null
}

function setLang(lang) {
  currentLang = lang
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    const translation = lang === 'am' ? i18n.am[key] : null
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation
      } else {
        el.textContent = translation
      }
    } else {
      const fb = el.dataset.i18nFallback
      if (fb) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = fb
        } else {
          el.textContent = fb
        }
      }
    }
  })
  document.getElementById('langToggle').textContent = lang === 'am' ? 'EN' : 'አማ'
  document.documentElement.lang = lang === 'am' ? 'am' : 'en'
}

function showToast(msg) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  const t = document.createElement('div')
  t.className = 'toast'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 3000)
}

function loadFromURL() {
  const hash = window.location.hash.slice(1)
  if (!hash) return false
  try {
    const data = JSON.parse(atob(decodeURIComponent(hash)))
    if (data && data.companyName) {
      Object.keys(data).forEach(key => {
        const el = document.getElementById(key)
        if (el) el.value = data[key]
      })
      document.getElementById('siteForm').dispatchEvent(new Event('submit'))
      return true
    }
  } catch (e) {}
  return false
}

function generateShareURL(data) {
  const encoded = encodeURIComponent(btoa(JSON.stringify(data)))
  return `${window.location.origin}${window.location.pathname}#${encoded}`
}

async function generateAIContent(fieldId) {
  const desc = document.getElementById('description').value.trim()
  const btn = document.querySelector(`[data-ai="${fieldId}"]`)
  if (btn) { btn.disabled = true; btn.textContent = '⏳' }

  const apiKey = document.getElementById('apiKey').value.trim()
  const provider = document.getElementById('apiProvider').value

  if (apiKey) {
    try {
      const companyName = document.getElementById('companyName').value.trim() || 'my business'
      const city = document.getElementById('city').value.trim() || 'Addis Ababa'
      const category = document.getElementById('category').value || 'business'
      const prompt = fieldId === 'tagline'
        ? `Write a short, professional tagline (max 10 words) for ${companyName}, a ${category} in ${city}, Ethiopia. Return only the tagline.`
        : `Write a professional business description (2-3 sentences) for ${companyName}, a ${category} based in ${city}, Ethiopia. Company context: ${desc || 'quality products and services'}. Return only the description.`

      let result = ''
      if (provider === 'openai') {
        const r = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 150 })
        })
        const d = await r.json()
        result = d.choices?.[0]?.message?.content?.trim() || ''
      } else if (provider === 'claude') {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: 150, messages: [{ role: 'user', content: prompt }] })
        })
        const d = await r.json()
        result = d.content?.[0]?.text?.trim() || ''
      } else if (provider === 'huggingface') {
        const r = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 150 } })
        })
        const d = await r.json()
        result = d[0]?.generated_text?.replace(prompt, '').trim() || ''
      }
      if (result) {
        document.getElementById(fieldId).value = result.replace(/^["']|["']$/g, '')
        if (btn) { btn.disabled = false; btn.innerHTML = '✨ <span>AI</span>' }
        return
      }
    } catch (e) {
      console.warn('AI API failed, falling back to template:', e.message)
    }
  }

  const templates = {
    tagline: [
      'Quality products, trusted service — delivered worldwide.',
      'Your reliable partner in Ethiopian exports.',
      'Ethiopian excellence, globally delivered.',
      'Crafted with care, shipped with pride.',
      'Connecting Ethiopian quality to the world.'
    ],
    description: [
      `We are a dedicated Ethiopian business based in ${document.getElementById('city').value || 'Addis Ababa'}, specializing in high-quality products and services. Our commitment to excellence and customer satisfaction has made us a trusted name in the industry.`,
      `Based in ${document.getElementById('city').value || 'Addis Ababa'}, we are a growing Ethiopian enterprise focused on delivering exceptional value. With years of experience, we understand the needs of both local and international clients.`,
      `Welcome to our business! We are a ${document.getElementById('city').value || 'Addis Ababa'}-based Ethiopian company committed to providing top-quality products and professional services.`
    ]
  }
  setTimeout(() => {
    const pool = templates[fieldId] || templates.description
    const text = pool[Math.floor(Math.random() * pool.length)]
    document.getElementById(fieldId).value = text
    if (btn) { btn.disabled = false; btn.innerHTML = '✨ <span>AI</span>' }
  }, 400)
}

function initChapaCheckout(plan, amount) {
  const email = document.getElementById('email').value.trim() || 'customer@example.com'
  const name = document.getElementById('companyName').value.trim() || 'Customer'
  const phone = document.getElementById('phone').value.trim() || ''
  const txRef = `ethiosite_${plan}_${Date.now()}`
  const params = new URLSearchParams({
    public_key: 'CHAPUBK_TEST-YOUR_KEY_HERE',
    tx_ref: txRef,
    amount: amount.toString(),
    currency: 'ETB',
    email: email,
    first_name: name.split(' ')[0],
    last_name: name.split(' ').slice(1).join(' '),
    title: plan === 'premium' ? (t('payment.premium.desc') || 'Premium Monthly Subscription') : (t('payment.pro.desc') || 'Pro Monthly Subscription'),
    phone: phone,
    callback_url: window.location.origin + window.location.pathname + '?payment=' + txRef,
    return_url: window.location.origin + window.location.pathname + '?success=' + plan
  })
  window.open(`https://checkout.chapa.co/checkout/payment/${params.toString()}`, '_blank')
}

async function saveSite() {
  if (!currentUser || !generatedSiteData) {
    showToast('Please sign in to save sites')
    return
  }
  const data = { ...generatedSiteData, html: currentSiteHTML, savedAt: serverTimestamp() }
  try {
    const docRef = await addDoc(collection(db, 'sites'), { userId: currentUser.uid, ...data })
    data.id = docRef.id
    userSites.unshift(data)
    renderDashboard()
    showToast(t('toast.saved') || 'Site saved!')
  } catch (e) {
    console.error('Save error:', e)
    showToast('Error saving site')
  }
}

async function deleteSite(siteId) {
  if (!confirm('Delete this site?')) return
  try {
    await deleteDoc(doc(db, 'sites', siteId))
    userSites = userSites.filter(s => s.id !== siteId)
    renderDashboard()
    showToast(t('toast.deleted') || 'Site deleted')
  } catch (e) {
    console.error('Delete error:', e)
  }
}

function loadSite(site) {
  if (!site) return
  generatedSiteData = site
  currentSiteHTML = site.html || ''
  Object.keys(site).forEach(key => {
    if (key === 'id' || key === 'savedAt' || key === 'html' || key === 'userId') return
    const el = document.getElementById(key)
    if (el) el.value = site[key]
  })
  if (currentSiteHTML) {
    showPreview(currentSiteHTML)
    const shareURL = generateShareURL(site)
    const shareEl = document.getElementById('shareURL')
    if (shareEl) {
      shareEl.value = shareURL
      document.getElementById('shareSection').style.display = 'block'
    }
  }
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' })
  showToast(t('toast.loaded') || 'Site loaded')
}

function renderDashboard() {
  const container = document.getElementById('sitesList')
  if (!container) return
  if (userSites.length === 0) {
    container.innerHTML = `<div class="sites-empty">${t('dashboard.empty') || 'No saved sites yet. Create your first site above!'}</div>`
    return
  }
  container.innerHTML = userSites.map(site => `
    <div class="site-card">
      <h4>${escapeHtml(site.companyName || 'Untitled')}</h4>
      <div class="site-meta">${escapeHtml(site.category || '')} — ${escapeHtml(site.city || '')}</div>
      <div class="site-card-actions">
        <button class="btn btn-primary" onclick="window.loadSite(${JSON.stringify(site).replace(/"/g, '&quot;')})">📂 Load</button>
        <button class="btn btn-secondary" onclick="window.previewSavedSite('${escapeHtmlAttr(site.id)}')">👁 Preview</button>
        <button class="btn btn-danger" onclick="window.deleteSite('${site.id}')">🗑 Delete</button>
      </div>
    </div>
  `).join('')
}

function previewSavedSite(siteId) {
  const site = userSites.find(s => s.id === siteId)
  if (site && site.html) {
    currentSiteHTML = site.html
    showPreview(site.html)
    document.getElementById('preview').scrollIntoView({ behavior: 'smooth' })
  }
}

function showAuthModal(tab) {
  document.getElementById('authModal').style.display = 'flex'
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'))
  document.querySelector(`.modal-tab[data-tab="${tab}"]`)?.classList.add('active')
  document.getElementById('authError').style.display = 'none'
  const btn = document.getElementById('authSubmitBtn')
  btn.textContent = tab === 'login' ? (t('auth.login.btn') || 'Sign In') : (t('auth.signup.btn') || 'Sign Up')
}

async function handleAuth(email, password, isLogin) {
  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password)
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
    }
    document.getElementById('authModal').style.display = 'none'
  } catch (e) {
    const errEl = document.getElementById('authError')
    errEl.style.display = 'block'
    if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
      errEl.textContent = t('auth.error.invalid') || 'Invalid email or password'
    } else if (e.code === 'auth/weak-password') {
      errEl.textContent = t('auth.error.weak') || 'Password must be at least 6 characters'
    } else if (e.code === 'auth/email-already-in-use') {
      errEl.textContent = t('auth.error.exists') || 'Email already registered'
    } else {
      errEl.textContent = e.message
    }
  }
}

async function handleGoogleSignIn() {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    document.getElementById('authModal').style.display = 'none'
  } catch (e) {
    console.error('Google sign-in error:', e)
  }
}

function updateAuthUI(user) {
  currentUser = user
  const loginBtn = document.getElementById('loginBtn')
  const logoutBtn = document.getElementById('logoutBtn')
  const userBadge = document.getElementById('userBadge')
  const dashboardLink = document.getElementById('dashboardLink')
  const saveBtn = document.getElementById('saveSiteBtn')

  if (user) {
    loginBtn.style.display = 'none'
    logoutBtn.style.display = 'inline'
    userBadge.style.display = 'inline'
    userBadge.textContent = user.email
    dashboardLink.style.display = 'inline'
    if (saveBtn) saveBtn.style.display = 'inline-block'
    showToast(t('toast.login') || 'Signed in')
    loadUserSites()
  } else {
    loginBtn.style.display = 'inline'
    logoutBtn.style.display = 'none'
    userBadge.style.display = 'none'
    dashboardLink.style.display = 'none'
    if (saveBtn) saveBtn.style.display = 'none'
    userSites = []
    renderDashboard()
    document.getElementById('dashboard').style.display = 'none'
  }
}

async function loadUserSites() {
  if (!currentUser) return
  try {
    const snap = await getDocs(query(collection(db, 'sites'), where('userId', '==', currentUser.uid), orderBy('savedAt', 'desc')))
    userSites = []
    snap.forEach(doc => { userSites.push({ id: doc.id, ...doc.data() }) })
    renderDashboard()
    document.getElementById('dashboard').style.display = userSites.length > 0 ? 'block' : 'none'
  } catch (e) {
    if (e.code === 'failed-precondition') {
      try {
        const snap = await getDocs(query(collection(db, 'sites'), where('userId', '==', currentUser.uid)))
        userSites = []
        snap.forEach(doc => { userSites.push({ id: doc.id, ...doc.data() }) })
        userSites.sort((a, b) => (b.savedAt?.toMillis?.() || 0) - (a.savedAt?.toMillis?.() || 0))
        renderDashboard()
        document.getElementById('dashboard').style.display = userSites.length > 0 ? 'block' : 'none'
      } catch (e2) { console.error('Load sites error:', e2) }
    } else { console.error('Load sites error:', e) }
  }
}

function init() {
  const langBtn = document.getElementById('langToggle')
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault()
      setLang(currentLang === 'en' ? 'am' : 'en')
    })
  }

  document.querySelectorAll('[data-ai]').forEach(btn => {
    btn.addEventListener('click', function() { generateAIContent(this.dataset.ai) })
  })

  document.querySelectorAll('[data-chapa]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault()
      initChapaCheckout(this.dataset.chapa, parseInt(this.dataset.amount))
    })
  })

  document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault()
    showAuthModal('login')
  })

  document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault()
    signOut(auth)
    showToast(t('toast.logout') || 'Signed out')
  })

  document.getElementById('authModalClose').addEventListener('click', function() {
    document.getElementById('authModal').style.display = 'none'
  })

  document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none'
  })

  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'))
      this.classList.add('active')
      document.getElementById('authError').style.display = 'none'
      const btn = document.getElementById('authSubmitBtn')
      btn.textContent = this.dataset.tab === 'login' ? (t('auth.login.btn') || 'Sign In') : (t('auth.signup.btn') || 'Sign Up')
    })
  })

  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('authEmail').value.trim()
    const password = document.getElementById('authPassword').value
    const isLogin = document.querySelector('.modal-tab.active').dataset.tab === 'login'
    handleAuth(email, password, isLogin)
  })

  document.getElementById('googleSignInBtn').addEventListener('click', handleGoogleSignIn)

  document.getElementById('dashboardLink').addEventListener('click', function(e) {
    e.preventDefault()
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' })
  })

  onAuthStateChanged(auth, user => { updateAuthUI(user) })

  if (window.location.hash) {
    loadFromURL()
  }
}

document.addEventListener('DOMContentLoaded', init)

document.getElementById('siteForm').addEventListener('submit', function(e) {
  e.preventDefault()
  const btn = this.querySelector('.btn-large')
  const btnText = btn.querySelector('.btn-text')
  const btnLoader = btn.querySelector('.btn-loader')

  btnText.style.display = 'none'
  btnLoader.style.display = 'inline'
  btn.disabled = true

  const data = {
    templateType: document.getElementById('category').value,
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
    destinations: document.getElementById('destinations').value.trim(),
    seoTitle: document.getElementById('seoTitle').value.trim(),
    seoDesc: document.getElementById('seoDesc').value.trim(),
    ogImage: document.getElementById('ogImage').value.trim()
  }
  generatedSiteData = data

  setTimeout(() => {
    currentSiteHTML = generateSite(data)
    showPreview(currentSiteHTML)

    const shareURL = generateShareURL(data)
    const shareEl = document.getElementById('shareURL')
    if (shareEl) {
      shareEl.value = shareURL
      document.getElementById('shareSection').style.display = 'block'
    }

    btnText.style.display = 'inline'
    btnLoader.style.display = 'none'
    btn.disabled = false
  }, 800)
})

function showPreview(html) {
  const section = document.getElementById('preview')
  section.style.display = 'block'
  const frame = document.getElementById('previewFrame')
  frame.innerHTML = `<iframe srcdoc="${escapeHtmlAttr(html)}" style="width:100%;height:600px;border:none;" onload="this.style.height=this.contentWindow.document.body.scrollHeight+50+'px'"></iframe>`
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function downloadSite() {
  if (!currentSiteHTML) return
  const blob = new Blob([currentSiteHTML], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const name = document.getElementById('companyName').value.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'my-business'
  a.href = url
  a.download = `${name}_site.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function copyEmbedCode() {
  const shareEl = document.getElementById('shareURL')
  if (shareEl && shareEl.value) {
    navigator.clipboard.writeText(shareEl.value).then(() => {
      const btn = document.querySelector('.copy-btn')
      if (btn) {
        const orig = btn.innerHTML
        btn.textContent = '✅ Copied!'
        setTimeout(() => btn.innerHTML = orig, 2000)
      }
    }).catch(() => {
      prompt('Copy this URL:', shareEl.value)
    })
  }
}

function escapeHtmlAttr(str) {
  if (!str) return ''
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

window.downloadSite = downloadSite
window.copyEmbedCode = copyEmbedCode
window.saveSite = saveSite
window.loadSite = loadSite
window.deleteSite = deleteSite
window.previewSavedSite = previewSavedSite
window.initChapaCheckout = initChapaCheckout
