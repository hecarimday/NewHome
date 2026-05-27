/**
 * Shared navbar — dropdowns + Contact Us button top-right.
 * Each page sets window.NAV_ROOT before loading this script:
 *   - index.html (root):  window.NAV_ROOT = '';
 *   - pages/*.html:       window.NAV_ROOT = '../';
 */
(function () {
  const ROOT = (typeof window.NAV_ROOT !== 'undefined') ? window.NAV_ROOT : '';
  const P = ROOT + 'pages/';

  const NAV = [
    {
      label: 'About Us',
      children: [
        { label: 'Introduction', href: P + 'introduction.html' },
        { label: 'Photos',       href: P + 'photos.html' },
        { label: 'Contact Us',   href: P + 'contact.html' },
      ]
    },
    {
      label: 'Research',
      children: [
        { label: 'Fields',   href: P + 'fields.html' },
        { label: 'Projects', href: P + 'projects.html' },
        { label: 'Patents',  href: P + 'patents.html' },
      ]
    },
    { label: 'Publications', href: P + 'publications.html' },
    { label: 'Members',      href: P + 'members.html' },
    {
      label: 'Demos',
      children: [
        { label: 'NLP',           href: P + 'demos-nlp.html' },
        { label: 'IR',            href: P + 'demos-ir.html' },
        { label: 'Text Mining',   href: P + 'demos-textmining.html' },
        { label: 'Generative AI', href: P + 'demos-generativeai.html' },
      ]
    },
    { label: 'Boards', href: P + 'boards.html' },
  ];

  const currentFile = location.pathname.split('/').pop() || 'index.html';

  const ACTIVE_MAP = {
    'introduction.html': 'About Us', 'photos.html': 'About Us', 'contact.html': 'About Us',
    'fields.html': 'Research', 'projects.html': 'Research', 'patents.html': 'Research',
    'publications.html': 'Publications',
    'members.html': 'Members',
    'demos-nlp.html': 'Demos', 'demos-ir.html': 'Demos',
    'demos-textmining.html': 'Demos', 'demos-generativeai.html': 'Demos',
    'boards.html': 'Boards',
  };

  const activeLabel = ACTIVE_MAP[currentFile] || '';

  function buildItem(item) {
    const hasChildren = item.children && item.children.length;
    const isActive = item.label === activeLabel;

    const dropdownHTML = hasChildren
      ? `<div class="dropdown">${item.children.map(c =>
          `<a href="${c.href}">${c.label}</a>`).join('')}</div>`
      : '';

    const caretHTML = hasChildren ? `<span class="caret">▾</span>` : '';
    const href = hasChildren ? '#' : item.href;
    const onclick = hasChildren ? ' onclick="return false"' : '';

    return `<li class="nav-item${isActive ? ' active' : ''}">
      <a href="${href}"${onclick}>${item.label}${caretHTML}</a>
      ${dropdownHTML}
    </li>`;
  }

  const logoSVG = `
    <svg class="logo-icon" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="6" fill="rgba(255,255,255,0.15)"/>
      <path d="M19 7L6 17v15h9v-9h8v9h9V17L19 7z" fill="#7dd49a"/>
      <rect x="15" y="22" width="8" height="10" rx="1" fill="#4ab870"/>
    </svg>`;

  const html = `
    <nav class="navbar" id="main-navbar">
      <div class="nav-inner">
        <a class="nav-logo" href="${ROOT}index.html">
          ${logoSVG}
          <span class="logo-text">iis<span>Lab</span></span>
        </a>
        <ul class="nav-menu">
          ${NAV.map(buildItem).join('')}
        </ul>
        <div class="nav-actions">
          <button class="nav-icon-btn" aria-label="Search" onclick="alert('검색 기능은 준비 중입니다.')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <a class="btn-contact" href="${P}contact.html">Contact Us</a>
        </div>
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
})();
