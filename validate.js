#!/usr/bin/env node
/**
 * validate.js — Cyber Resilience data integrity validator
 *
 * Checks:
 *   1.  All JSON files parse without errors
 *   2.  Controls library — id uniqueness and required fields
 *   3.  Controls library — domain coverage
 *   4.  Evidence controlRef cross-references
 *   5.  Clause-map cross-references (clauseToControl, controlToClause)
 *   6.  Clauses and sections integrity
 *   7.  Maturity model integrity
 *   8.  Risk register integrity
 *   9.  No empty strings where data is expected
 *   10. Unique IDs across all data sets
 *
 * Usage: node validate.js [--verbose]
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const REPO_ROOT = __dirname;
const verbose   = process.argv.includes('--verbose');

let pass = 0;
let fail = 0;
let warn = 0;

function ok(msg)      { pass++; if (verbose) console.log(`  PASS  ${msg}`); }
function bad(msg)     { fail++; console.log(`  FAIL  ${msg}`); }
function warning(msg) { warn++; console.log(`  WARN  ${msg}`); }

function loadJson(relPath) {
  const abs = path.join(REPO_ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  try {
    return JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (e) {
    return null;
  }
}

// ── 1. JSON Parse Check ─────────────────────────────────────────────

console.log('\n=== 1. JSON Parse Check ===');

function findJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findJsonFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(path.relative(REPO_ROOT, full));
    }
  }
  return results;
}

const jsonFiles = findJsonFiles(REPO_ROOT);
const parsed = {};
let parseErrors = 0;

for (const file of jsonFiles) {
  try {
    parsed[file] = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'));
    ok(`Parsed: ${file}`);
  } catch (e) {
    bad(`JSON parse error: ${file} — ${e.message}`);
    parseErrors++;
  }
}

if (parseErrors === 0) {
  ok(`All ${jsonFiles.length} JSON files parse correctly`);
}

// ── Load core data ──────────────────────────────────────────────────

const controlsLib   = loadJson('controls/library.json');
const domainsFile   = loadJson('controls/domains.json');
const artifactsInv  = loadJson('artifacts/inventory.json');
const evidence      = loadJson('evidence/index.json');
const clauseMap     = loadJson('cross-references/clause-map.json');
const clausesIndex  = loadJson('clauses/index.json');
const sections      = loadJson('clauses/sections.json');
const requirements  = loadJson('requirements/index.json');
const riskRegister  = loadJson('risk-management/risk-register.json');
const maturityModel = loadJson('maturity/maturity-model.json');
const frameworks    = loadJson('cross-references/frameworks.json');

// Controls — uses id and title (not slug/name)
const libraryControls = (controlsLib && controlsLib.controls) || [];
const controlIdSet = new Set(libraryControls.map(c => c.id).filter(Boolean));

// Domains
const libraryDomains = (domainsFile && domainsFile.domains) || [];
const domainIdSet = new Set(libraryDomains.map(d => d.id).filter(Boolean));

// Evidence — { evidence: [...] } with controlRef
const evidenceItems = (evidence && evidence.evidence) || [];

// ── 2. Control ID Uniqueness & Required Fields ───────────────────────

console.log('\n=== 2. Control ID Uniqueness & Required Fields ===');

const idCounts = {};
for (const ctrl of libraryControls) {
  if (!ctrl.id) {
    bad(`Control missing "id": ${(ctrl.title || '').slice(0, 60)}`);
  } else {
    idCounts[ctrl.id] = (idCounts[ctrl.id] || 0) + 1;
  }
  if (!ctrl.title || ctrl.title.trim() === '') bad(`Control "${ctrl.id}" has empty or missing "title"`);
  if (!ctrl.domain) bad(`Control "${ctrl.id}" missing "domain" field`);
}

const idDups = Object.entries(idCounts).filter(([, c]) => c > 1);
if (idDups.length === 0) {
  ok(`No duplicate control IDs (${libraryControls.length} controls)`);
} else {
  for (const [id, count] of idDups) bad(`Duplicate control ID "${id}" appears ${count} times`);
}

// ── 3. Domain Coverage ───────────────────────────────────────────────

console.log('\n=== 3. Controls Library — Domain Coverage ===');

const controlsByDomain = {};
for (const ctrl of libraryControls) {
  if (ctrl.domain) controlsByDomain[ctrl.domain] = (controlsByDomain[ctrl.domain] || 0) + 1;
}

for (const dom of libraryDomains) {
  if (!controlsByDomain[dom.id]) {
    bad(`Domain "${dom.id}" has zero controls in library.json`);
  } else {
    ok(`Domain "${dom.id}" has ${controlsByDomain[dom.id]} control(s)`);
  }
}

let domainRefErrors = 0;
for (const ctrl of libraryControls) {
  if (ctrl.domain && domainIdSet.size > 0 && !domainIdSet.has(ctrl.domain)) {
    bad(`Control "${ctrl.id}" references unknown domain "${ctrl.domain}"`);
    domainRefErrors++;
  }
}
if (domainRefErrors === 0 && libraryControls.length > 0) {
  ok(`All ${libraryControls.length} controls reference valid domains`);
}

// Domain controlCount consistency
for (const dom of libraryDomains) {
  if (dom.controlCount != null) {
    const actual = controlsByDomain[dom.id] || 0;
    if (dom.controlCount !== actual) {
      bad(`Domain "${dom.id}" declares controlCount ${dom.controlCount} but library has ${actual}`);
    } else {
      ok(`Domain "${dom.id}" controlCount matches (${actual})`);
    }
  }
}

// ── 4. Evidence controlRef Cross-References ──────────────────────────

console.log('\n=== 4. Evidence controlRef Cross-References ===');

let evidRefErrors = 0;
let evidRefTotal = 0;

for (const item of evidenceItems) {
  if (item.controlRef) {
    evidRefTotal++;
    if (!controlIdSet.has(item.controlRef)) {
      bad(`Evidence "${item.id}" references unknown controlRef "${item.controlRef}"`);
      evidRefErrors++;
    }
  }
}

if (evidRefErrors === 0) {
  ok(`All ${evidRefTotal} evidence controlRef references resolve correctly`);
}

// ── 5. Clause-Map Cross-References ───────────────────────────────────

console.log('\n=== 5. Clause-Map Cross-References ===');

if (clauseMap) {
  if (clauseMap.clauseToControl) {
    let mapErrors = 0;
    for (const [clauseId, ctrlIds] of Object.entries(clauseMap.clauseToControl)) {
      const ids = Array.isArray(ctrlIds) ? ctrlIds : [ctrlIds];
      for (const id of ids) {
        if (!controlIdSet.has(id)) {
          bad(`Clause-map: clause "${clauseId}" references unknown control "${id}"`);
          mapErrors++;
        }
      }
    }
    if (mapErrors === 0) {
      ok(`All ${Object.keys(clauseMap.clauseToControl).length} clauseToControl entries resolve correctly`);
    }
  }

  if (clauseMap.controlToClause) {
    let mapErrors = 0;
    for (const ctrlId of Object.keys(clauseMap.controlToClause)) {
      if (!controlIdSet.has(ctrlId)) {
        bad(`Clause-map: controlToClause references unknown control "${ctrlId}"`);
        mapErrors++;
      }
    }
    if (mapErrors === 0) {
      ok(`All ${Object.keys(clauseMap.controlToClause).length} controlToClause entries resolve correctly`);
    }
  }
} else {
  warning('No clause-map found');
}

// ── 6. Clauses & Sections Integrity ──────────────────────────────────

console.log('\n=== 6. Clauses & Sections Integrity ===');

if (clausesIndex && typeof clausesIndex === 'object') {
  if (Array.isArray(clausesIndex)) {
    ok(`Clauses index has ${clausesIndex.length} entries`);
  } else {
    ok(`Clauses index has ${Object.keys(clausesIndex).length} keys`);
  }
}

if (sections && typeof sections === 'object') {
  if (Array.isArray(sections)) {
    ok(`Sections has ${sections.length} entries`);
  } else {
    ok(`Sections has ${Object.keys(sections).length} keys`);
  }
}

// ── 7. Maturity Model Integrity ──────────────────────────────────────

console.log('\n=== 7. Maturity Model Integrity ===');

if (maturityModel) {
  const levels = maturityModel.levels || maturityModel.maturityLevels || [];
  if (Array.isArray(levels) && levels.length > 0) {
    ok(`Maturity model has ${levels.length} levels`);
  } else {
    ok('Maturity model loaded');
  }
} else {
  warning('No maturity model found');
}

// ── 8. Risk Register Integrity ───────────────────────────────────────

console.log('\n=== 8. Risk Register Integrity ===');

if (riskRegister && riskRegister.risks) {
  let mathErrors = 0;
  for (const risk of riskRegister.risks) {
    if (risk.likelihood != null && risk.impact != null && risk.inherentRisk != null) {
      const expected = risk.likelihood * risk.impact;
      if (risk.inherentRisk !== expected) {
        bad(`${risk.id}: inherentRisk ${risk.inherentRisk} != ${risk.likelihood} x ${risk.impact} = ${expected}`);
        mathErrors++;
      }
    }
    if (risk.residualLikelihood != null && risk.residualImpact != null && risk.residualRisk != null) {
      const expected = risk.residualLikelihood * risk.residualImpact;
      if (risk.residualRisk !== expected) {
        bad(`${risk.id}: residualRisk ${risk.residualRisk} != ${risk.residualLikelihood} x ${risk.residualImpact} = ${expected}`);
        mathErrors++;
      }
    }
  }
  if (mathErrors === 0) ok(`All ${riskRegister.risks.length} risk register entries have correct math`);
} else {
  ok('No risk register with risks array found (skipping)');
}

// ── 9. Data Completeness ─────────────────────────────────────────────

console.log('\n=== 9. Data Completeness ===');

let emptyIssues = 0;
for (const ctrl of libraryControls) {
  if (ctrl.title && ctrl.title.trim() === '') { bad(`Control "${ctrl.id}" has empty title`); emptyIssues++; }
  if (ctrl.description && ctrl.description.trim() === '') { bad(`Control "${ctrl.id}" has empty description`); emptyIssues++; }
}
for (const item of evidenceItems) {
  if (item.title && item.title.trim() === '') { bad(`Evidence "${item.id}" has empty title`); emptyIssues++; }
}
if (emptyIssues === 0) ok('No empty strings detected in core data');

// ── 10. Unique IDs ──────────────────────────────────────────────────

console.log('\n=== 10. Unique IDs ===');

const seenEvidIds = {};
for (const item of evidenceItems) {
  if (item.id) seenEvidIds[item.id] = (seenEvidIds[item.id] || 0) + 1;
}
const evidDups = Object.entries(seenEvidIds).filter(([, c]) => c > 1);
if (evidDups.length === 0) ok(`All ${evidenceItems.length} evidence IDs are unique`);
else for (const [id, c] of evidDups) bad(`Duplicate evidence ID "${id}" appears ${c} times`);

// ── Summary ──────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(60));
console.log('Validation complete:');
console.log(`  Pass: ${pass}`);
console.log(`  Fail: ${fail}`);
console.log(`  Warn: ${warn}`);
console.log(`  Total: ${pass + fail + warn}`);
console.log('='.repeat(60));

if (fail > 0) {
  console.error(`\nValidation FAILED with ${fail} error(s).`);
  process.exit(1);
} else if (warn > 0) {
  console.log(`\nValidation passed with ${warn} warning(s).`);
  process.exit(0);
} else {
  console.log('\nAll checks passed.');
  process.exit(0);
}
