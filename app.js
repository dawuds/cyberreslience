/* ============================================
   BNM RMiT Cyber Resilience Explorer — Application
   ============================================ */

const state = {
  sections: null,
  clauses: null,
  controls: null,     // { domains, library, clauseMap }
  requirements: null,
  evidence: null,
  riskMgmt: null,
  crfLifecycle: null,
  maturity: null,
  crossRefs: null,
  artifacts: null,
  route: { view: 'overview' },
};

const cache = new Map();

function renderError(path, error) {
  return '<div class="error-state">' +
    '<h2>Failed to load data</h2>' +
    '<p class="error-message">Could not fetch ' + escHtml(path) + '</p>' +
    (error ? '<p style="font-size:0.8125rem;color:var(--text-muted)">' + escHtml(String(error)) + '</p>' : '') +
    '<button onclick="location.reload()">Retry</button>' +
    '</div>';
}

async function fetchJSON(path) {
  if (cache.has(path)) return cache.get(path);
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache.set(path, data);
    return data;
  } catch (e) {
    console.error(`Failed to load ${path}:`, e);
    const app = document.getElementById('app');
    if (app) app.innerHTML = renderError(path, e);
    return null;
  }
}

// ---- Router ----
function parseHash() {
  const hash = location.hash.slice(1);
  if (!hash) return { view: 'overview' };
  if (hash === 'search' || hash.startsWith('search/')) return { view: 'search', query: hash.startsWith('search/') ? decodeURIComponent(hash.slice(7)) : '' };
  if (hash === 'framework') return { view: 'framework' };
  if (hash.startsWith('framework/')) return { view: 'framework-detail', id: hash.slice(10) };
  if (hash === 'controls') return { view: 'controls' };
  if (hash.startsWith('control/')) return { view: 'control-detail', id: hash.slice(8) };
  if (hash === 'risk-management') return { view: 'risk-management' };
  if (hash === 'reference') return { view: 'reference' };
  if (hash.startsWith('reference/')) return { view: 'reference', sub: hash.slice(10) };
  // Clause IDs like 11.1, App5-A1
  if (hash.match(/^\d+\.\d+$/) || hash.startsWith('App5-')) return { view: 'clause', id: hash };
  return { view: 'overview' };
}

function navigate(hash) { location.hash = hash; }

function escHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

function renderBreadcrumbs(items) {
  return `<nav class="breadcrumbs">${items.map((item, i) => {
    if (i === items.length - 1) return `<span class="current">${escHtml(item.label)}</span>`;
    return `<a href="#${item.hash || ''}">${escHtml(item.label)}</a><span class="sep">\u203A</span>`;
  }).join('')}</nav>`;
}

function renderLoading() {
  return '<div class="loading"><div class="spinner"></div><span>Loading data\u2026</span></div>';
}

// ---- Domain helpers ----
const domainMeta = {
  'cyber-risk-governance': { short: 'Governance', badge: 'governance' },
  'ncii-compliance': { short: 'NCII', badge: 'ncii' },
  'network-security': { short: 'Network', badge: 'network' },
  'data-security': { short: 'Data', badge: 'data' },
  'soc-operations': { short: 'SOC', badge: 'soc' },
  'vapt': { short: 'VAPT', badge: 'vapt' },
  'api-security': { short: 'API', badge: 'api' },
  'cyber-operations': { short: 'Cyber Ops', badge: 'cyber-ops' },
  'incident-response': { short: 'IR', badge: 'incident' },
  'cyber-insurance-reporting': { short: 'Insurance', badge: 'insurance' },
  'digital-services-security': { short: 'Digital', badge: 'digital' },
  'security-awareness': { short: 'Awareness', badge: 'awareness' },
};

function getDomainBadge(domainId) {
  const m = domainMeta[domainId];
  return m ? `domain-badge-${m.badge}` : 'badge-domain';
}

// ---- CRF Lifecycle Visualization ----
function renderCRFLifecycle() {
  if (!state.crfLifecycle) return '';
  const phases = state.crfLifecycle.framework.phases;
  const icons = { identify: 'I', protect: 'P', detect: 'D', respond: 'R', recover: 'R\u2019' };

  return `
    <div class="crf-lifecycle">
      ${phases.map((phase, i) => `
        ${i > 0 ? '<span class="crf-arrow">\u2192</span>' : ''}
        <div class="crf-phase crf-phase-${phase.id}">
          <div class="crf-phase-icon">${icons[phase.id] || phase.name[0]}</div>
          <div class="crf-phase-label">${escHtml(phase.name)}</div>
          <div class="crf-phase-domains">${phase.domains.length} domain${phase.domains.length !== 1 ? 's' : ''}</div>
        </div>`).join('')}
    </div>`;
}

// ---- View: Overview ----
function renderOverview() {
  const sections = state.sections;
  const totalClauses = Object.keys(state.clauses).length;
  const controlCount = state.controls ? state.controls.totalCount : '\u2014';
  const domainCount = state.controls ? state.controls.domains.length : '\u2014';
  const evidenceCount = state.evidence ? state.evidence.length : '\u2014';

  return `
    <div class="disclaimer">
      This database is for educational and indicative purposes only. It does not constitute legal advice. The content represents a structured interpretation of BNM's Risk Management in Technology Policy Document (November 2025), specifically Sections 11 (Cybersecurity Management), 12 (Digital Services), 15 (Security Awareness), and Appendix 5 (Cybersecurity Controls). Always consult the source PDF and qualified legal or regulatory counsel for compliance decisions.
    </div>
    ${renderCRFLifecycle()}
    <div class="stats-banner">
      <div class="stat"><div class="stat-value">${sections.length}</div><div class="stat-label">Sections</div></div>
      <div class="stat"><div class="stat-value">${totalClauses}</div><div class="stat-label">Clauses</div></div>
      <div class="stat"><div class="stat-value">${controlCount}</div><div class="stat-label">Controls</div></div>
      <div class="stat"><div class="stat-value">${domainCount}</div><div class="stat-label">Domains</div></div>
      <div class="stat"><div class="stat-value">${evidenceCount}</div><div class="stat-label">Evidence Items</div></div>
    </div>
    <h3 style="font-size:1.125rem;margin-bottom:1rem">Regulatory Sections</h3>
    <div class="control-grid">
      ${sections.map(sec => {
        const clauseCount = sec.subsections.reduce((s, ss) => s + ss.clauses.length, 0);
        return `
          <div class="control-card" onclick="navigate('framework/${sec.id}')">
            <div class="control-card-header">
              <span class="control-id">\u00A7${escHtml(sec.number)}</span>
            </div>
            <h3 class="control-card-title">${escHtml(sec.title)}</h3>
            <div class="control-card-meta">
              <span class="badge badge-artifacts">${sec.subsections.length} subsection${sec.subsections.length !== 1 ? 's' : ''}</span>
              <span class="badge badge-evidence">${clauseCount} clause${clauseCount !== 1 ? 's' : ''}</span>
            </div>
          </div>`;
      }).join('')}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap">
      <a href="#framework" style="font-size:0.875rem">Browse all sections \u2192</a>
      <a href="#controls" style="font-size:0.875rem">Browse Controls Library (${controlCount} controls across ${domainCount} domains) \u2192</a>
    </div>`;
}

// ---- View: Framework ----
function renderFramework() {
  const sections = state.sections;

  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Framework' }])}
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Cyber Resilience Framework</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">
      Browse all ${sections.length} sections covering cybersecurity management, digital services, security awareness, and Appendix 5 control measures.
    </p>
    ${renderCRFLifecycle()}
    <div class="control-grid">
      ${sections.map(sec => {
        const clauseCount = sec.subsections.reduce((s, ss) => s + ss.clauses.length, 0);
        return `
          <div class="control-card" onclick="navigate('framework/${sec.id}')">
            <div class="control-card-header">
              <span class="control-id">\u00A7${escHtml(sec.number)}</span>
            </div>
            <h3 class="control-card-title">${escHtml(sec.title)}</h3>
            <div class="control-card-meta">
              <span class="badge badge-artifacts">${sec.subsections.length} subsection${sec.subsections.length !== 1 ? 's' : ''}</span>
              <span class="badge badge-evidence">${clauseCount} clause${clauseCount !== 1 ? 's' : ''}</span>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ---- View: Section Detail ----
function renderSection(secId) {
  const sec = state.sections.find(s => s.id === secId);
  if (!sec) return '<div class="error-state">Section not found.</div>';

  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Framework', hash: 'framework' }, { label: `\u00A7${sec.number} ${sec.title}` }])}
    <div style="margin-bottom:1.5rem">
      <h2 style="font-size:1.5rem;display:flex;align-items:center;gap:0.75rem">
        <span style="font-family:var(--font-mono);font-weight:700;font-size:1.25rem;padding:0.25rem 0.75rem;background:#FEE2E2;color:var(--red);border-radius:var(--radius-sm)">\u00A7${escHtml(sec.number)}</span>
        ${escHtml(sec.title)}
      </h2>
    </div>
    <div class="accordion">
      ${sec.subsections.map(ss => `
        <div class="accordion-item open">
          <button class="accordion-trigger" data-accordion>
            <span class="accordion-trigger-left">
              <span>${escHtml(ss.title)}</span>
              <span style="color:var(--text-muted);font-weight:400;font-size:0.8125rem">(${ss.clauses.length} clause${ss.clauses.length !== 1 ? 's' : ''})</span>
            </span>
            <span class="chevron">\u25B6</span>
          </button>
          <div class="accordion-content">
            <ul class="clause-list">
              ${ss.clauses.map(cid => {
                const cl = state.clauses[cid];
                if (!cl) return '';
                return `
                  <li>
                    <a class="clause-link" href="#${cid}">
                      <span class="clause-id">${escHtml(cid)}</span>
                      <span class="clause-title">${escHtml(cl.title)}</span>
                      <span class="clause-marker marker-${cl.marker}">${cl.marker === 'S' ? 'Shall' : 'Should'}</span>
                    </a>
                  </li>`;
              }).join('')}
            </ul>
          </div>
        </div>`).join('')}
    </div>`;
}

// ---- View: Clause Detail ----
function renderClause(clauseId) {
  const cl = state.clauses[clauseId];
  if (!cl) return '<div class="error-state">Clause not found.</div>';

  const sec = state.sections.find(s => s.id === cl.sectionId);
  const controlIds = state.controls ? (state.controls.clauseMap[clauseId] || []) : [];
  const requirements = state.requirements ? state.requirements.filter(r => r.clauseRef === clauseId) : [];
  const evidence = state.evidence ? state.evidence.filter(e => e.controlRef.some(cr => controlIds.includes(cr))) : [];

  return `
    ${renderBreadcrumbs([
      { label: 'Home', hash: '' },
      { label: 'Framework', hash: 'framework' },
      { label: sec ? `\u00A7${sec.number} ${sec.title}` : 'Section', hash: sec ? 'framework/' + sec.id : 'framework' },
      { label: `Clause ${clauseId}` }
    ])}
    <div class="clause-detail-header">
      <h2>
        <span class="clause-id-badge">${escHtml(clauseId)}</span>
        ${escHtml(cl.title)}
      </h2>
      <div class="clause-meta">
        <span class="badge badge-domain">\u00A7${escHtml(cl.section)}</span>
        <span class="badge badge-type">${escHtml(cl.subsection)}</span>
        <span class="clause-marker marker-${cl.marker}">${cl.marker === 'S' ? 'Shall' : 'Should'}</span>
      </div>
      <div class="verbatim-block">
        <strong>Verbatim (BNM RMiT PD)</strong>
        ${escHtml(cl.text)}
      </div>
    </div>
    <div class="tabs">
      <div class="tab-list" role="tablist">
        <button class="tab-btn active" data-tab="controls" role="tab">Controls (${controlIds.length})</button>
        <button class="tab-btn" data-tab="requirements" role="tab">Requirements (${requirements.length})</button>
        <button class="tab-btn" data-tab="evidence" role="tab">Evidence (${evidence.length})</button>
      </div>
      <div class="tab-panel active" data-panel="controls">${renderClauseControlsTab(controlIds)}</div>
      <div class="tab-panel" data-panel="requirements">${renderClauseRequirementsTab(requirements)}</div>
      <div class="tab-panel" data-panel="evidence">${renderClauseEvidenceTab(evidence)}</div>
    </div>`;
}

function renderClauseControlsTab(controlIds) {
  if (!state.controls || controlIds.length === 0) return '<p class="empty-state-text">No controls mapped to this clause.</p>';
  const controls = state.controls.allControls.filter(c => controlIds.includes(c.id));

  return controls.map(ctrl => {
    const domain = state.controls.domains.find(d => d.id === ctrl.domain);
    return `
      <div class="control-card" style="cursor:pointer" onclick="navigate('control/${ctrl.id}')">
        <div class="control-card-header">
          <span class="control-id">${escHtml(ctrl.id)}</span>
          <span class="badge ${getDomainBadge(ctrl.domain)}">${escHtml(domain ? domain.name : ctrl.domain)}</span>
        </div>
        <h3 class="control-card-title">${escHtml(ctrl.title)}</h3>
        <p class="control-card-desc">${escHtml(ctrl.description)}</p>
      </div>`;
  }).join('');
}

function renderClauseRequirementsTab(requirements) {
  if (requirements.length === 0) return '<p class="empty-state-text">No requirements decomposed for this clause.</p>';

  return `
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>ID</th><th>Requirement</th><th>Type</th><th>Priority</th></tr></thead>
        <tbody>
          ${requirements.map(r => `
            <tr>
              <td class="mono" style="white-space:nowrap;font-weight:600">${escHtml(r.id)}</td>
              <td>
                <div style="font-weight:500">${escHtml(r.title)}</div>
                <div style="font-size:0.8125rem;color:var(--text-secondary);margin-top:0.25rem">${escHtml(r.description)}</div>
              </td>
              <td><span class="badge badge-type" style="text-transform:capitalize">${escHtml(r.type)}</span></td>
              <td><span class="badge ${r.priority === 'critical' ? 'badge-mandatory' : 'badge-domain'}" style="text-transform:capitalize">${escHtml(r.priority)}</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderClauseEvidenceTab(evidence) {
  if (evidence.length === 0) return '<p class="empty-state-text">No evidence items mapped to this clause.</p>';

  return evidence.map(item => `
    <div class="evidence-item">
      <div class="evidence-item-header">
        <span class="evidence-id">${escHtml(item.id)}</span>
        <span class="evidence-item-name">${escHtml(item.title)}</span>
      </div>
      <p class="evidence-item-desc">${escHtml(item.description)}</p>
      <div class="evidence-item-meta">
        ${item.format ? `<span class="meta-item"><strong>Format:</strong> ${escHtml(item.format)}</span>` : ''}
        ${item.frequency ? `<span class="meta-item"><strong>Frequency:</strong> ${escHtml(item.frequency)}</span>` : ''}
        ${item.owner ? `<span class="meta-item"><strong>Owner:</strong> ${escHtml(item.owner)}</span>` : ''}
        <span class="meta-item"><strong>Criticality:</strong> ${escHtml(item.criticality)}</span>
      </div>
    </div>`).join('');
}

// ---- View: Controls Browser ----
function renderControlsBrowser() {
  if (!state.controls) return renderLoading();
  const { domains, domainLibrary } = state.controls;

  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Controls Library' }])}
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Cyber Resilience Controls Library</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">
      ${state.controls.totalCount} controls across ${domains.length} domains. Each control maps to one or more RMiT clauses and includes a 3-tier maturity model.
    </p>
    <div class="accordion">
      ${domains.map(domain => {
        const controls = domainLibrary[domain.id] || [];
        return `
          <div class="accordion-item">
            <button class="accordion-trigger" data-accordion>
              <span class="accordion-trigger-left">
                <span class="badge badge-phase badge-phase-${domain.crfPhase}" style="margin-right:0.25rem">${escHtml(domain.crfPhase)}</span>
                <span>${escHtml(domain.name)}</span>
                <span style="color:var(--text-muted);font-weight:400;font-size:0.8125rem">(${controls.length})</span>
              </span>
              <span class="chevron">\u25B6</span>
            </button>
            <div class="accordion-content">
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.75rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border)">${escHtml(domain.description)}</p>
              <ul class="clause-list">
                ${controls.map(ctrl => `
                  <li><a class="clause-link" href="#control/${ctrl.id}">
                    <span class="clause-id">${escHtml(ctrl.id)}</span>
                    <span class="clause-title">${escHtml(ctrl.title)}</span>
                    <span style="font-size:0.75rem;color:var(--text-muted)">${(ctrl.clauseRef || []).length} clause${(ctrl.clauseRef || []).length !== 1 ? 's' : ''}</span>
                  </a></li>`).join('')}
              </ul>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ---- View: Control Detail ----
function renderControlDetail(controlId) {
  if (!state.controls) return renderLoading();
  const ctrl = state.controls.allControls.find(c => c.id === controlId);
  if (!ctrl) return '<div class="error-state">Control not found.</div>';
  const domain = state.controls.domains.find(d => d.id === ctrl.domain);

  // Linked evidence
  const linkedEvidence = state.evidence ? state.evidence.filter(e => e.controlRef.includes(ctrl.id)) : [];

  // Linked requirements
  const linkedReqs = state.requirements ? state.requirements.filter(r => (r.controlRef || []).includes(ctrl.id)) : [];

  // Cross-references
  const xref = state.crossRefs ? state.crossRefs.mappings.find(m => m.domain === ctrl.domain) : null;

  return `
    <article class="control-detail">
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Controls', hash: 'controls' }, { label: ctrl.title }])}

    <header class="control-detail-header">
      <div class="control-detail-id-row">
        <span class="badge ${getDomainBadge(ctrl.domain)}">${escHtml(domain ? domain.name : ctrl.domain)}</span>
        <span class="badge badge-phase badge-phase-${domain ? domain.crfPhase : 'identify'}">${escHtml(domain ? domain.crfPhase : '')}</span>
      </div>
      <h1 class="control-detail-title">${escHtml(ctrl.id)} \u2014 ${escHtml(ctrl.title)}</h1>
      <p class="control-detail-desc">${escHtml(ctrl.description)}</p>
    </header>

    <!-- Maturity Levels -->
    ${ctrl.maturity ? `
    <section class="detail-section">
      <h2 class="detail-section-title">Maturity Levels</h2>
      <div class="maturity-grid">
        <div class="maturity-card maturity-basic"><div class="maturity-label">Level 2 \u2014 Basic</div><p>${escHtml(ctrl.maturity.basic)}</p></div>
        <div class="maturity-card maturity-mature"><div class="maturity-label">Level 3 \u2014 Mature</div><p>${escHtml(ctrl.maturity.mature)}</p></div>
        <div class="maturity-card maturity-advanced"><div class="maturity-label">Level 4 \u2014 Advanced</div><p>${escHtml(ctrl.maturity.advanced)}</p></div>
      </div>
    </section>` : ''}

    <!-- Evidence Required -->
    ${ctrl.evidenceRequired && ctrl.evidenceRequired.length > 0 ? `
    <section class="detail-section">
      <h2 class="detail-section-title">Evidence Required</h2>
      <ul class="activity-list">${ctrl.evidenceRequired.map(e => `<li>${escHtml(e)}</li>`).join('')}</ul>
    </section>` : ''}

    <!-- Audit Package: Evidence Items -->
    ${linkedEvidence.length > 0 ? `
    <section class="audit-package">
      <h2 class="audit-package-title">
        Audit Package
        <span class="audit-package-counts">
          <span class="badge badge-evidence">${linkedEvidence.length} evidence item${linkedEvidence.length !== 1 ? 's' : ''}</span>
        </span>
      </h2>
      ${linkedEvidence.map(item => `
        <div class="evidence-item">
          <div class="evidence-item-header">
            <span class="evidence-id">${escHtml(item.id)}</span>
            <span class="evidence-item-name">${escHtml(item.title)}</span>
          </div>
          <p class="evidence-item-desc">${escHtml(item.description)}</p>
          <div class="evidence-item-meta">
            ${item.format ? `<span class="meta-item"><strong>Format:</strong> ${escHtml(item.format)}</span>` : ''}
            ${item.frequency ? `<span class="meta-item"><strong>Frequency:</strong> ${escHtml(item.frequency)}</span>` : ''}
            ${item.owner ? `<span class="meta-item"><strong>Owner:</strong> ${escHtml(item.owner)}</span>` : ''}
          </div>
        </div>`).join('')}
    </section>` : ''}

    <!-- Linked Requirements -->
    ${linkedReqs.length > 0 ? `
    <section class="detail-section">
      <h2 class="detail-section-title">Linked Requirements (${linkedReqs.length})</h2>
      ${linkedReqs.map(r => `
        <div style="padding:0.75rem 0;border-bottom:1px solid var(--border)">
          <div style="display:flex;align-items:baseline;gap:0.5rem;flex-wrap:wrap">
            <span class="mono" style="font-size:0.75rem;color:var(--red);font-weight:600">${escHtml(r.id)}</span>
            <span style="font-weight:500">${escHtml(r.title)}</span>
            <span class="badge ${r.priority === 'critical' ? 'badge-mandatory' : 'badge-domain'}" style="text-transform:capitalize">${escHtml(r.priority)}</span>
          </div>
          <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:0.25rem">${escHtml(r.description)}</p>
        </div>`).join('')}
    </section>` : ''}

    <!-- Cross-References -->
    ${xref ? `
    <section class="detail-section">
      <h2 class="detail-section-title">Framework Mappings</h2>
      <div class="fw-mappings">
        ${xref.nistCsf && xref.nistCsf.length > 0 ? `<div class="fw-mapping-row"><span class="fw-label">NIST CSF 2.0</span><span class="fw-codes">${xref.nistCsf.map(n => escHtml(n)).join(', ')}</span></div>` : ''}
        ${xref.iso27001 && xref.iso27001.length > 0 ? `<div class="fw-mapping-row"><span class="fw-label">ISO 27001:2022</span><span class="fw-codes">${xref.iso27001.map(n => escHtml(n)).join(', ')}</span></div>` : ''}
        ${xref.mitreAttack && xref.mitreAttack.length > 0 ? `<div class="fw-mapping-row"><span class="fw-label">MITRE ATT&CK</span><span class="fw-codes">${xref.mitreAttack.map(n => escHtml(n)).join(', ')}</span></div>` : ''}
        ${xref.cisControls && xref.cisControls.length > 0 ? `<div class="fw-mapping-row"><span class="fw-label">CIS Controls v8</span><span class="fw-codes">${xref.cisControls.map(n => escHtml(n)).join(', ')}</span></div>` : ''}
      </div>
    </section>` : ''}

    <!-- Source Provisions -->
    ${ctrl.clauseRef && ctrl.clauseRef.length > 0 ? `
    <section class="detail-section">
      <h2 class="detail-section-title">Source Provisions</h2>
      <div class="provision-links">
        ${ctrl.clauseRef.map(cid => {
          const cl = state.clauses[cid];
          return `<a href="#${cid}" class="provision-link">
            <span class="provision-id">${escHtml(cid)}</span>
            <span class="provision-title">${cl ? escHtml(cl.title) : ''}</span>
          </a>`;
        }).join('')}
      </div>
    </section>` : ''}
    </article>`;
}

// ---- View: Risk Management ----
function getRiskBandFromLabel(label) {
  const l = (label || '').toLowerCase();
  if (l === 'critical') return { label: 'Critical', color: '#ef4444', bg: '#FEF2F2' };
  if (l === 'high') return { label: 'High', color: '#f97316', bg: '#FFF7ED' };
  if (l === 'medium') return { label: 'Medium', color: '#f59e0b', bg: '#FFFBEB' };
  return { label: 'Low', color: '#22c55e', bg: '#F0FDF4' };
}

function getLikelihoodScore(label) {
  const map = { 'very low': 1, 'low': 2, 'medium': 3, 'high': 4, 'very high': 5 };
  return map[(label || '').toLowerCase()] || 3;
}

function getImpactScore(label) {
  const map = { 'negligible': 1, 'minor': 1, 'low': 2, 'moderate': 2, 'medium': 3, 'significant': 3, 'high': 4, 'major': 4, 'critical': 5, 'catastrophic': 5 };
  return map[(label || '').toLowerCase()] || 3;
}

function renderRiskManagement() {
  if (!state.riskMgmt) return renderLoading();
  const riskData = state.riskMgmt;
  const allRisks = riskData.riskCategories.flatMap(cat => cat.risks.map(r => ({ ...r, categoryName: cat.category })));

  const riskCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  allRisks.forEach(r => { const b = getRiskBandFromLabel(r.inherentRating); riskCounts[b.label]++; });

  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Risk Management' }])}
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Cyber Risk Management</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:0.5rem">
      Cyber risk register and assessment framework for BNM RMiT compliance.
    </p>
    <div class="disclaimer">
      This section contains AI-generated indicative content aligned to BNM RMiT requirements. Risk scores, controls, and treatment plans are illustrative and must be adapted to each organization's specific risk appetite, threat landscape, and board-approved frameworks.
    </div>
    <div class="stats-banner">
      <div class="stat"><div class="stat-value">${allRisks.length}</div><div class="stat-label">Risks</div></div>
      <div class="stat"><div class="stat-value" style="color:#ef4444">${riskCounts.Critical}</div><div class="stat-label">Critical</div></div>
      <div class="stat"><div class="stat-value" style="color:#f97316">${riskCounts.High}</div><div class="stat-label">High</div></div>
      <div class="stat"><div class="stat-value" style="color:#f59e0b">${riskCounts.Medium}</div><div class="stat-label">Medium</div></div>
      <div class="stat"><div class="stat-value" style="color:#22c55e">${riskCounts.Low}</div><div class="stat-label">Low</div></div>
    </div>
    <div class="tabs">
      <div class="tab-list" role="tablist">
        <button class="tab-btn active" data-rmtab="matrix" role="tab">Risk Matrix</button>
        <button class="tab-btn" data-rmtab="register" role="tab">Risk Register</button>
        <button class="tab-btn" data-rmtab="treatment" role="tab">Treatment Options</button>
      </div>
      <div class="tab-panel active" data-rmpanel="matrix">${renderRiskMatrix()}</div>
      <div class="tab-panel" data-rmpanel="register">${renderRiskRegister(allRisks)}</div>
      <div class="tab-panel" data-rmpanel="treatment">${renderTreatmentOptions()}</div>
    </div>`;
}

function renderRiskMatrix() {
  const yLabels = ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'];
  const xLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  const matrix = [
    [5,10,15,20,25],
    [4,8,12,16,20],
    [3,6,9,12,15],
    [2,4,6,8,10],
    [1,2,3,4,5]
  ];

  function getBand(score) {
    if (score >= 16) return { label: 'Critical', color: '#ef4444', bg: '#FEF2F2' };
    if (score >= 10) return { label: 'High', color: '#f97316', bg: '#FFF7ED' };
    if (score >= 5)  return { label: 'Medium', color: '#f59e0b', bg: '#FFFBEB' };
    return { label: 'Low', color: '#22c55e', bg: '#F0FDF4' };
  }

  return `
    <h3 style="font-size:1rem;margin-bottom:0.75rem">5 x 5 Risk Assessment Matrix</h3>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1rem">
      Standard risk matrix mapping likelihood against impact to determine inherent and residual risk ratings.
    </p>
    <div style="overflow-x:auto;margin-bottom:1.5rem">
      <table class="risk-matrix-table">
        <thead>
          <tr>
            <th class="risk-matrix-corner">Likelihood \\ Impact</th>
            ${xLabels.map(l => `<th class="risk-matrix-header">${escHtml(l)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${matrix.map((row, yi) => `
            <tr>
              <td class="risk-matrix-row-label">${escHtml(yLabels[yi])}</td>
              ${row.map(score => {
                const band = getBand(score);
                return `<td class="risk-matrix-cell" style="background:${band.bg};color:${band.color};font-weight:700;border:2px solid ${band.color}22">${score}<div class="risk-matrix-cell-label">${band.label}</div></td>`;
              }).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem">
      <div style="display:flex;align-items:center;gap:0.375rem;font-size:0.8125rem">
        <span style="width:12px;height:12px;border-radius:3px;background:#ef4444;display:inline-block"></span>
        <strong>Critical</strong> (16-25): Immediate escalation to board
      </div>
      <div style="display:flex;align-items:center;gap:0.375rem;font-size:0.8125rem">
        <span style="width:12px;height:12px;border-radius:3px;background:#f97316;display:inline-block"></span>
        <strong>High</strong> (10-15): Senior management attention
      </div>
      <div style="display:flex;align-items:center;gap:0.375rem;font-size:0.8125rem">
        <span style="width:12px;height:12px;border-radius:3px;background:#f59e0b;display:inline-block"></span>
        <strong>Medium</strong> (5-9): Monitor and mitigate
      </div>
      <div style="display:flex;align-items:center;gap:0.375rem;font-size:0.8125rem">
        <span style="width:12px;height:12px;border-radius:3px;background:#22c55e;display:inline-block"></span>
        <strong>Low</strong> (1-4): Accept or routine management
      </div>
    </div>`;
}

function renderRiskRegister(allRisks) {
  const categories = [...new Set(allRisks.map(r => r.categoryName))];

  return `
    <h3 style="font-size:1rem;margin-bottom:0.5rem">Cyber Risk Register <span class="badge badge-ai" title="AI-generated indicative risk register">AI Generated</span></h3>
    <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem">${allRisks.length} risks across ${categories.length} categories.</p>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem">
      <button class="risk-filter-btn active" data-risk-filter="all">All (${allRisks.length})</button>
      ${categories.map(cat => {
        const count = allRisks.filter(r => r.categoryName === cat).length;
        return `<button class="risk-filter-btn" data-risk-filter="${escHtml(cat)}">${escHtml(cat)} (${count})</button>`;
      }).join('')}
    </div>
    <div style="overflow-x:auto">
      <table class="data-table risk-register-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Risk</th>
            <th>Category</th>
            <th>Domain</th>
            <th>Inherent</th>
            <th>Residual</th>
            <th>Clauses</th>
          </tr>
        </thead>
        <tbody>
          ${allRisks.map(r => {
            const iBand = getRiskBandFromLabel(r.inherentRating);
            const rBand = getRiskBandFromLabel(r.residualRating);
            const domainInfo = domainMeta[r.domain];
            return `
              <tr class="risk-row" data-category="${escHtml(r.categoryName)}" data-risk-id="${escHtml(r.id)}">
                <td class="mono" style="white-space:nowrap;font-weight:600">${escHtml(r.id)}</td>
                <td style="font-weight:500;min-width:200px">${escHtml(r.risk)}</td>
                <td><span class="badge badge-domain">${escHtml(r.categoryName)}</span></td>
                <td><span class="badge ${getDomainBadge(r.domain)}">${escHtml(domainInfo ? domainInfo.short : r.domain)}</span></td>
                <td>
                  <span class="risk-score-badge" style="background:${iBand.bg};color:${iBand.color};border:1px solid ${iBand.color}33">
                    ${escHtml(iBand.label)}
                  </span>
                </td>
                <td>
                  <span class="risk-score-badge" style="background:${rBand.bg};color:${rBand.color};border:1px solid ${rBand.color}33">
                    ${escHtml(rBand.label)}
                  </span>
                </td>
                <td style="font-size:0.75rem;font-family:var(--font-mono)">${(r.clauseRef || []).join(', ')}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div id="risk-detail-panel" class="risk-detail-panel" style="display:none"></div>`;
}

function renderRiskDetailPanel(riskId) {
  const allRisks = state.riskMgmt.riskCategories.flatMap(cat => cat.risks.map(r => ({ ...r, categoryName: cat.category })));
  const r = allRisks.find(risk => risk.id === riskId);
  if (!r) return '';
  const iBand = getRiskBandFromLabel(r.inherentRating);
  const rBand = getRiskBandFromLabel(r.residualRating);

  return `
    <div class="risk-detail-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem">
        <h4 style="font-size:1rem">
          <span class="mono" style="color:var(--red)">${escHtml(r.id)}</span>
          ${escHtml(r.risk)}
        </h4>
        <button data-close-risk style="background:none;border:1px solid var(--border);border-radius:4px;padding:0.25rem 0.5rem;cursor:pointer;font-size:0.75rem;color:var(--text-muted)">Close</button>
      </div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem">
        <span class="badge badge-domain">${escHtml(r.categoryName)}</span>
        <span class="badge ${getDomainBadge(r.domain)}">${escHtml(r.domain)}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div style="background:${iBand.bg};border:1px solid ${iBand.color}33;border-radius:var(--radius);padding:1rem">
          <div style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${iBand.color};margin-bottom:0.375rem">Inherent Risk</div>
          <div style="font-size:1.5rem;font-weight:700;color:${iBand.color}">${iBand.label}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem">L: ${escHtml(r.likelihood)} / I: ${escHtml(r.impact)}</div>
        </div>
        <div style="background:${rBand.bg};border:1px solid ${rBand.color}33;border-radius:var(--radius);padding:1rem">
          <div style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${rBand.color};margin-bottom:0.375rem">Residual Risk</div>
          <div style="font-size:1.5rem;font-weight:700;color:${rBand.color}">${rBand.label}</div>
        </div>
      </div>
      ${r.controls && r.controls.length > 0 ? `
      <div style="margin-bottom:1rem">
        <h5 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.375rem">Mitigating Controls</h5>
        <div style="display:flex;gap:0.375rem;flex-wrap:wrap">
          ${r.controls.map(c => `<a href="#control/${c}" class="badge badge-artifacts" style="cursor:pointer">${escHtml(c)}</a>`).join('')}
        </div>
      </div>` : ''}
      ${r.clauseRef && r.clauseRef.length > 0 ? `
      <div>
        <h5 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.375rem">RMiT Clauses</h5>
        <div style="display:flex;gap:0.375rem;flex-wrap:wrap">
          ${r.clauseRef.map(c => `<a href="#${c}" class="badge badge-evidence" style="cursor:pointer">${escHtml(c)}</a>`).join('')}
        </div>
      </div>` : ''}
    </div>`;
}

function renderTreatmentOptions() {
  const strategies = [
    { strategy: 'Mitigate', description: 'Implement controls to reduce likelihood or impact of the risk.', when: 'Risk is within acceptable range after controls; most common approach for cyber risks.', examples: ['Deploy network segmentation', 'Implement MFA', 'Establish SOC monitoring', 'Conduct regular VAPT'], color: { bg: '#EFF6FF', border: '#2563EB', text: '#1E40AF' } },
    { strategy: 'Transfer', description: 'Transfer the risk to a third party through insurance or outsourcing.', when: 'Residual risk remains high despite controls; financial impact can be quantified.', examples: ['Cyber insurance policy', 'Managed SOC services', 'Cloud provider SLA guarantees'], color: { bg: '#F5F3FF', border: '#7C3AED', text: '#5B21B6' } },
    { strategy: 'Accept', description: 'Accept the risk when it falls within the institution\'s risk appetite.', when: 'Risk is low and cost of mitigation exceeds potential impact; documented board approval required.', examples: ['Low-impact legacy system risk', 'Minimal exposure endpoint', 'Documented risk acceptance by board'], color: { bg: '#FFFBEB', border: '#D97706', text: '#92400E' } },
    { strategy: 'Avoid', description: 'Eliminate the risk by discontinuing the activity or removing the threat source.', when: 'Risk exceeds appetite and cannot be adequately mitigated or transferred.', examples: ['Decommission vulnerable legacy system', 'Withdraw from high-risk digital service', 'Block risky API integrations'], color: { bg: '#FEF2F2', border: '#DC2626', text: '#991B1B' } },
  ];

  return `
    <h3 style="font-size:1rem;margin-bottom:0.5rem">Risk Treatment Strategies</h3>
    <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1.5rem">Four standard risk treatment options aligned with BNM RMiT and ISO 31000.</p>
    <div class="treatment-grid">
      ${strategies.map(opt => `
        <div class="treatment-card" style="background:${opt.color.bg};border:1px solid ${opt.color.border}33;border-left:4px solid ${opt.color.border}">
          <h4 style="color:${opt.color.text};font-size:1rem;margin-bottom:0.375rem">${escHtml(opt.strategy)}</h4>
          <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.75rem">${escHtml(opt.description)}</p>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.75rem;padding:0.5rem;background:rgba(255,255,255,0.5);border-radius:4px">
            <strong>When to use:</strong> ${escHtml(opt.when)}
          </div>
          <div>
            <div style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.25rem">Examples</div>
            <ul style="list-style:disc;padding-left:1.25rem">
              ${opt.examples.map(e => `<li style="font-size:0.8125rem;color:var(--text-secondary);padding:0.125rem 0">${escHtml(e)}</li>`).join('')}
            </ul>
          </div>
        </div>`).join('')}
    </div>`;
}

// ---- View: Reference ----
function renderReference() {
  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Reference' }])}
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Reference</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1rem">
      Cross-framework mappings, maturity model, and supplementary references.
    </p>
    <div class="sub-tabs">
      <button class="sub-tab active" data-sub="cross-references">Cross-References</button>
      <button class="sub-tab" data-sub="maturity">Maturity Model</button>
      <button class="sub-tab" data-sub="evidence-browser">Evidence Browser</button>
    </div>
    <div class="sub-panel active" data-subpanel="cross-references">${renderCrossReferencesPanel()}</div>
    <div class="sub-panel" data-subpanel="maturity">${renderMaturityPanel()}</div>
    <div class="sub-panel" data-subpanel="evidence-browser">${renderEvidenceBrowserPanel()}</div>`;
}

function renderCrossReferencesPanel() {
  if (!state.crossRefs) return '<p class="empty-state-text">No cross-reference data available.</p>';
  const { frameworks, mappings } = state.crossRefs;

  return `
    <h3 style="font-size:1rem;margin-bottom:0.5rem">Cross-Framework Mappings</h3>
    <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem">
      All 12 control domains mapped to ${frameworks.length} international frameworks.
    </p>
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem">
      ${frameworks.map(fw => `
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:0.625rem 1rem;text-align:center;min-width:120px">
          <div style="font-size:var(--font-size-sm);font-weight:600;color:var(--text-primary)">${escHtml(fw.name)}</div>
          <div style="font-size:var(--font-size-xs);color:var(--text-muted)">${escHtml(fw.version)}</div>
        </div>`).join('')}
    </div>
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Domain</th>
            <th>RMiT Clauses</th>
            <th>NIST CSF 2.0</th>
            <th>ISO 27001</th>
            <th>MITRE ATT&CK</th>
            <th>CIS v8</th>
          </tr>
        </thead>
        <tbody>
          ${mappings.map(m => {
            const domain = state.controls ? state.controls.domains.find(d => d.id === m.domain) : null;
            return `
              <tr>
                <td><span class="badge ${getDomainBadge(m.domain)}">${escHtml(domain ? domain.name : m.domain)}</span></td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${(m.rmitClauses || []).join(', ')}</td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${(m.nistCsf || []).join(', ')}</td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${(m.iso27001 || []).join(', ')}</td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${(m.mitreAttack || []).join(', ') || '\u2014'}</td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${(m.cisControls || []).join(', ') || '\u2014'}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderMaturityPanel() {
  if (!state.maturity) return '<p class="empty-state-text">No maturity model data available.</p>';
  const { maturityModel } = state.maturity;

  return `
    <h3 style="font-size:1rem;margin-bottom:0.5rem">${escHtml(maturityModel.name)}</h3>
    <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1.5rem">
      4-level maturity model for assessing cyber resilience posture across all control domains.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;margin-bottom:2rem">
      ${maturityModel.levels.map(level => {
        const colors = [
          { bg: '#FEE2E2', border: '#DC2626', text: '#991B1B' },
          { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
          { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF' },
          { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' },
        ][level.level - 1] || { bg: '#F8FAFC', border: '#94A3B8', text: '#475569' };
        return `
          <div style="background:${colors.bg};border:1px solid ${colors.border}33;border-left:4px solid ${colors.border};border-radius:var(--radius);padding:1rem">
            <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${colors.text};margin-bottom:0.375rem">
              Level ${level.level} \u2014 ${escHtml(level.name)}
            </div>
            <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.75rem">${escHtml(level.description)}</p>
            <ul style="list-style:disc;padding-left:1.25rem">
              ${level.characteristics.map(c => `<li style="font-size:0.75rem;color:var(--text-secondary);padding:0.125rem 0">${escHtml(c)}</li>`).join('')}
            </ul>
          </div>`;
      }).join('')}
    </div>
    <h4 style="font-size:0.9375rem;margin-bottom:0.75rem">Domain Assessment Thresholds</h4>
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Domain</th><th>Basic Threshold Controls</th><th>Mature Threshold Controls</th></tr></thead>
        <tbody>
          ${maturityModel.domainAssessment.map(da => {
            const domain = state.controls ? state.controls.domains.find(d => d.id === da.domain) : null;
            return `
              <tr>
                <td><span class="badge ${getDomainBadge(da.domain)}">${escHtml(domain ? domain.name : da.domain)}</span></td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${da.basicThreshold.join(', ')}</td>
                <td style="font-family:var(--font-mono);font-size:0.75rem">${da.matureThreshold.join(', ')}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderEvidenceBrowserPanel() {
  if (!state.evidence || state.evidence.length === 0) return '<p class="empty-state-text">No evidence data available.</p>';

  // Group by domain
  const byDomain = {};
  state.evidence.forEach(e => {
    const ctrlId = (e.controlRef || [])[0] || '';
    const ctrl = state.controls ? state.controls.allControls.find(c => c.id === ctrlId) : null;
    const domainId = ctrl ? ctrl.domain : 'other';
    if (!byDomain[domainId]) byDomain[domainId] = [];
    byDomain[domainId].push(e);
  });

  return `
    <h3 style="font-size:1rem;margin-bottom:0.5rem">Evidence Browser</h3>
    <p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem">${state.evidence.length} evidence items across all control domains.</p>
    <div class="accordion">
      ${Object.entries(byDomain).map(([domainId, items]) => {
        const domain = state.controls ? state.controls.domains.find(d => d.id === domainId) : null;
        return `
          <div class="accordion-item">
            <button class="accordion-trigger" data-accordion>
              <span class="accordion-trigger-left">
                <span class="badge ${getDomainBadge(domainId)}">${escHtml(domain ? domain.name : domainId)}</span>
                <span style="color:var(--text-muted);font-weight:400;font-size:0.8125rem">(${items.length})</span>
              </span>
              <span class="chevron">\u25B6</span>
            </button>
            <div class="accordion-content">
              ${items.map(item => `
                <div class="evidence-item">
                  <div class="evidence-item-header">
                    <span class="evidence-id">${escHtml(item.id)}</span>
                    <span class="evidence-item-name">${escHtml(item.title)}</span>
                  </div>
                  <p class="evidence-item-desc">${escHtml(item.description)}</p>
                  <div class="evidence-item-meta">
                    <span class="meta-item"><strong>Format:</strong> ${escHtml(item.format)}</span>
                    <span class="meta-item"><strong>Frequency:</strong> ${escHtml(item.frequency)}</span>
                    <span class="meta-item"><strong>Owner:</strong> ${escHtml(item.owner)}</span>
                    <span class="meta-item"><strong>Criticality:</strong> ${escHtml(item.criticality)}</span>
                  </div>
                </div>`).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ---- View: Search ----
function renderSearchView(query) {
  if (!query) {
    return `
      ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Search' }])}
      <h2 style="font-size:1.25rem;margin-bottom:1rem">Search</h2>
      <p class="empty-state-text">Enter a search term to find clauses, controls, requirements, and evidence across all data layers.</p>`;
  }

  const q = query.toLowerCase();
  const results = [];

  // Search clauses
  for (const [id, cl] of Object.entries(state.clauses)) {
    if (id.toLowerCase().includes(q) || cl.title.toLowerCase().includes(q) ||
        (cl.text && cl.text.toLowerCase().includes(q))) {
      results.push({ type: 'clause', id, title: cl.title, desc: cl.subsection, badge: 'search-type-clause' });
    }
  }

  // Search controls
  if (state.controls) {
    state.controls.allControls.forEach(ctrl => {
      if (ctrl.id.toLowerCase().includes(q) || ctrl.title.toLowerCase().includes(q) ||
          ctrl.description.toLowerCase().includes(q)) {
        results.push({ type: 'control', id: ctrl.id, title: ctrl.title, desc: ctrl.description.slice(0, 120), badge: 'search-type-control', hash: `control/${ctrl.id}` });
      }
    });
  }

  // Search requirements
  if (state.requirements) {
    state.requirements.forEach(r => {
      if (r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)) {
        results.push({ type: 'requirement', id: r.id, title: r.title, desc: r.description.slice(0, 120), badge: 'search-type-requirement', hash: r.clauseRef });
      }
    });
  }

  // Search evidence
  if (state.evidence) {
    state.evidence.forEach(e => {
      if (e.id.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)) {
        results.push({ type: 'evidence', id: e.id, title: e.title, desc: e.description.slice(0, 120), badge: 'search-type-evidence' });
      }
    });
  }

  if (results.length === 0) {
    return `
      ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Search' }])}
      <p class="empty-state-text">No results match "${escHtml(query)}".</p>`;
  }

  // Group by type
  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  });

  const typeLabels = { clause: 'Clauses', control: 'Controls', requirement: 'Requirements', evidence: 'Evidence' };

  return `
    ${renderBreadcrumbs([{ label: 'Home', hash: '' }, { label: 'Search' }])}
    <div class="search-results-header">${results.length} result${results.length !== 1 ? 's' : ''} for "${escHtml(query)}"</div>
    ${Object.entries(grouped).map(([type, items]) => `
      <div class="search-group">
        <div class="search-group-title">
          <span class="search-type-badge ${items[0].badge}">${typeLabels[type] || type}</span>
          <span style="font-weight:600">(${items.length})</span>
        </div>
        <ul class="clause-list">
          ${items.slice(0, 50).map(r => `
            <li><a class="clause-link" href="#${r.hash || r.id}">
              <span class="clause-id">${escHtml(r.id)}</span>
              <span class="clause-title">${escHtml(r.title)}</span>
            </a></li>`).join('')}
        </ul>
      </div>`).join('')}`;
}

// ---- Export ----
function exportToPDF() {
  window.print();
}

function exportToCSV() {
  if (!state.controls) return;
  const rows = [['Control ID', 'Domain', 'Title', 'Description', 'CRF Phase', 'Clause References']];
  state.controls.allControls.forEach(ctrl => {
    const domain = state.controls.domains.find(d => d.id === ctrl.domain);
    rows.push([
      ctrl.id,
      domain ? domain.name : ctrl.domain,
      ctrl.title,
      ctrl.description,
      domain ? domain.crfPhase : '',
      (ctrl.clauseRef || []).join('; ')
    ]);
  });
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cyber-resilience-controls.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ---- Event Delegation ----
document.addEventListener('click', e => {
  // Accordion toggle
  const accBtn = e.target.closest('[data-accordion]');
  if (accBtn) {
    const item = accBtn.closest('.accordion-item');
    if (item) item.classList.toggle('open');
    return;
  }

  // Clause detail tabs
  const tabBtn = e.target.closest('.tab-btn[data-tab]');
  if (tabBtn) {
    const tabList = tabBtn.closest('.tab-list');
    const container = tabBtn.closest('.tabs');
    tabList.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabBtn.classList.add('active');
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = container.querySelector(`[data-panel="${tabBtn.dataset.tab}"]`);
    if (panel) panel.classList.add('active');
    return;
  }

  // Risk management tabs
  const rmTab = e.target.closest('.tab-btn[data-rmtab]');
  if (rmTab) {
    const tabList = rmTab.closest('.tab-list');
    const container = rmTab.closest('.tabs');
    tabList.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    rmTab.classList.add('active');
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = container.querySelector(`[data-rmpanel="${rmTab.dataset.rmtab}"]`);
    if (panel) panel.classList.add('active');
    return;
  }

  // Sub-tabs
  const subTab = e.target.closest('.sub-tab');
  if (subTab) {
    const subTabs = subTab.closest('.sub-tabs');
    const parent = subTabs.parentElement;
    subTabs.querySelectorAll('.sub-tab').forEach(b => b.classList.remove('active'));
    subTab.classList.add('active');
    parent.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
    const panel = parent.querySelector(`[data-subpanel="${subTab.dataset.sub}"]`);
    if (panel) panel.classList.add('active');
    return;
  }

  // Risk filter
  const riskFilter = e.target.closest('[data-risk-filter]');
  if (riskFilter) {
    const filterValue = riskFilter.dataset.riskFilter;
    riskFilter.closest('.risk-register-filters, div').querySelectorAll('.risk-filter-btn').forEach(b => b.classList.remove('active'));
    riskFilter.classList.add('active');
    document.querySelectorAll('.risk-row').forEach(row => {
      row.style.display = (filterValue === 'all' || row.dataset.category === filterValue) ? '' : 'none';
    });
    return;
  }

  // Risk row click
  const riskRow = e.target.closest('.risk-row');
  if (riskRow) {
    const riskId = riskRow.dataset.riskId;
    const panel = document.getElementById('risk-detail-panel');
    if (panel) {
      panel.innerHTML = renderRiskDetailPanel(riskId);
      panel.style.display = 'block';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  // Close risk detail
  const closeRisk = e.target.closest('[data-close-risk]');
  if (closeRisk) {
    const panel = document.getElementById('risk-detail-panel');
    if (panel) { panel.style.display = 'none'; panel.innerHTML = ''; }
    return;
  }
});

// ---- Search input ----
document.getElementById('search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) navigate('search/' + encodeURIComponent(q));
  }
});

// ---- Nav active state ----
function updateNav(view) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.view === view) link.classList.add('active');
  });
}

// ---- Main Render ----
async function render() {
  const route = parseHash();
  state.route = route;
  const app = document.getElementById('app');

  // Determine active nav
  let navView = route.view;
  if (navView === 'framework-detail' || navView === 'clause') navView = 'framework';
  if (navView === 'control-detail') navView = 'controls';
  updateNav(navView);

  // Load core data on first render
  if (!state.sections) {
    const [sectionsData, clausesData] = await Promise.all([
      fetchJSON('clauses/sections.json'),
      fetchJSON('clauses/index.json'),
    ]);
    if (!sectionsData || !clausesData) return;
    state.sections = sectionsData.sections;
    // Build clause lookup
    state.clauses = {};
    (clausesData.clauses || []).forEach(cl => {
      const sec = state.sections.find(s =>
        s.subsections.some(ss => ss.clauses.includes(cl.id))
      );
      state.clauses[cl.id] = { ...cl, sectionId: sec ? sec.id : null };
    });
  }

  // Lazy-load controls
  if (!state.controls) {
    const [domainsData, libraryData, clauseMapData] = await Promise.all([
      fetchJSON('controls/domains.json'),
      fetchJSON('controls/library.json'),
      fetchJSON('cross-references/clause-map.json'),
    ]);
    if (domainsData && libraryData) {
      const allControls = libraryData.controls || [];
      const domainLibrary = {};
      allControls.forEach(ctrl => {
        if (!domainLibrary[ctrl.domain]) domainLibrary[ctrl.domain] = [];
        domainLibrary[ctrl.domain].push(ctrl);
      });
      state.controls = {
        domains: domainsData.domains || [],
        allControls,
        domainLibrary,
        clauseMap: clauseMapData ? (clauseMapData.clauseToControl || clauseMapData) : {},
        totalCount: allControls.length,
      };
    }
  }

  // Lazy-load requirements, evidence, cross-refs, lifecycle, maturity, risk
  if (!state.requirements) {
    const reqData = await fetchJSON('requirements/index.json');
    if (reqData) state.requirements = reqData.requirements || [];
  }
  if (!state.evidence) {
    const evData = await fetchJSON('evidence/index.json');
    if (evData) state.evidence = evData.evidence || [];
  }
  if (!state.crfLifecycle) {
    const crfData = await fetchJSON('frameworks/crf-lifecycle.json');
    if (crfData) state.crfLifecycle = crfData;
  }
  if (!state.crossRefs) {
    const xrefData = await fetchJSON('cross-references/frameworks.json');
    if (xrefData) state.crossRefs = xrefData;
  }
  if (!state.maturity) {
    const matData = await fetchJSON('maturity/maturity-model.json');
    if (matData) state.maturity = matData;
  }
  if (!state.riskMgmt) {
    const riskData = await fetchJSON('risk-management/risk-register.json');
    if (riskData) state.riskMgmt = riskData;
  }
  if (!state.artifacts) {
    const artData = await fetchJSON('artifacts/inventory.json');
    if (artData) state.artifacts = artData;
  }

  // Render view
  let html = '';
  switch (route.view) {
    case 'overview':
      html = renderOverview();
      break;
    case 'framework':
      html = renderFramework();
      break;
    case 'framework-detail':
      html = renderSection(route.id);
      break;
    case 'clause':
      html = renderClause(route.id);
      break;
    case 'controls':
      html = renderControlsBrowser();
      break;
    case 'control-detail':
      html = renderControlDetail(route.id);
      break;
    case 'risk-management':
      html = renderRiskManagement();
      break;
    case 'reference':
      html = renderReference();
      break;
    case 'search':
      html = renderSearchView(route.query);
      break;
    default:
      html = renderOverview();
  }

  app.innerHTML = `<main class="main">${html}
    <footer class="app-footer">
      <p>BNM RMiT Cyber Resilience Compliance Database \u2014 AI-generated content for educational purposes only. Not legal advice. Always refer to the official BNM Policy Document.</p>
    </footer>
  </main>`;

  window.scrollTo(0, 0);
}

// ---- Init ----
window.addEventListener('hashchange', render);
render();
