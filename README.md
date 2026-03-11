# BNM RMiT — Cyber Resilience Compliance Database

**Structured compliance database for BNM Risk Management in Technology (RMiT) Policy Document cybersecurity requirements (Sections 11, 12, 15, Appendix 5), November 2025 edition.**

> **Disclaimer**: This is an indicative/educational resource. It does not constitute legal advice. Always refer to the official BNM Policy Document and seek professional counsel for compliance decisions.

## What This Covers

This repository extracts and structures the **cybersecurity and cyber resilience** requirements from BNM RMiT into an actionable compliance database. The regulatory scope covers:

| Section | Title | Clauses | Focus |
|---------|-------|---------|-------|
| **Section 11** | Cybersecurity Management | 11.1–11.20 (20 clauses) | Cyber resilience framework, threat intelligence, SOC, incident response, cyber drills, reporting |
| **Section 12** | Digital Services Security | 12.1–12.9 (9 clauses) | Online and mobile channel security, transaction controls, customer protection |
| **Section 15** | Security Awareness | 15.1–15.3 (3 clauses) | Staff awareness programmes, phishing simulations, board-level awareness |
| **Appendix 5** | Cybersecurity Controls | Parts A–E (5 parts) | Threat intelligence, SOC operations, threat assessment, VAPT, SOC physical security |

Together these provisions form a cohesive cyber resilience regime requiring financial institutions to identify, protect against, detect, respond to, and recover from cyber threats.

## The Cyber Resilience Framework (CRF)

Paragraph 11.1 mandates that every financial institution establish and maintain a **Cyber Resilience Framework (CRF)** structured around five lifecycle phases:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ IDENTIFY │ →  │ PROTECT  │ →  │  DETECT  │ →  │ RESPOND  │ →  │ RECOVER  │
│          │    │          │    │          │    │          │    │          │
│ Threat   │    │ Security │    │ SOC &    │    │ Incident │    │ Recovery │
│ Landscape│    │ Controls │    │ Monitor  │    │ Response │    │ & Lessons│
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

| Phase | Objective | Key Activities |
|-------|-----------|----------------|
| **Identify** | Understand the threat landscape and risk exposure | Threat intelligence (11.4–11.7), asset classification, risk assessment |
| **Protect** | Implement preventive controls to limit impact | Security architecture (11.2–11.3), access controls, digital services security (12.1–12.9), awareness (15.1–15.3) |
| **Detect** | Ensure timely discovery of cyber events | SOC operations (11.8–11.12, App5-C), monitoring, alerting, threat hunting |
| **Respond** | Contain and manage cyber incidents | Incident response (11.13–11.15), CERT activation, escalation, regulatory reporting (11.17–11.20) |
| **Recover** | Restore services and incorporate lessons learned | Recovery procedures (11.13(d)), post-incident review (11.13(e)), cyber drills (11.16) |

## 12 Control Domains

| # | Control Domain | CRF Phase | Clause References | Controls |
|---|---------------|-----------|-------------------|----------|
| 1 | Cyber Risk Governance | Identify | 11.1, 11.2, 11.3 | 6 |
| 2 | NCII Compliance | Identify | 11.4 | 3 |
| 3 | Network Security | Protect | App5-A1 to A6 | 11 |
| 4 | Data Security | Protect | App5-B1 to B5 | 8 |
| 5 | SOC Operations | Detect | 11.9, App5-C1 to C5 | 10 |
| 6 | VAPT | Detect | 11.6, App5-D1 to D6 | 7 |
| 7 | API Security | Protect | App5-E1 | 10 |
| 8 | Cyber Operations | Detect | 11.8, 11.10, 11.11 | 5 |
| 9 | Incident Response | Respond | 11.12 to 11.16 | 8 |
| 10 | Cyber Insurance & Reporting | Respond | 11.17 to 11.20 | 5 |
| 11 | Digital Services Security | Protect | 12.1 to 12.9 | 11 |
| 12 | Security Awareness | Protect | 15.1 to 15.3 | 4 |
| | | | **Total** | **88** |

## Repository Structure

```
clauses/                                     Regulatory clause extraction
  sections.json                                Section and subsection structure
  index.json                                   Full 55-clause index with verbatim text

controls/                                    Control framework
  domains.json                                 12 control domains with CRF phase mapping
  library.json                                 88 controls with 3-tier maturity model

requirements/                                Actionable requirements
  index.json                                   123 requirements decomposed from clauses

evidence/                                    Evidence requirements
  index.json                                   105 evidence items by control domain

cross-references/                            Framework cross-references
  frameworks.json                              Mapping to NIST CSF 2.0, ISO 27001, MITRE ATT&CK, CIS v8
  clause-map.json                              Clause ↔ Control bidirectional map

frameworks/                                  Cyber resilience frameworks
  crf-lifecycle.json                           CRF IPDRR lifecycle (Identify, Protect, Detect, Respond, Recover)

maturity/                                    Maturity assessment
  maturity-model.json                          4-level maturity model with domain thresholds

risk-management/                             Risk management
  risk-register.json                           Template cyber risk register (10 risks, 5 categories)

templates/                                   Policy, procedure, and report templates
  policies/
    crf-policy.md                              Cyber Resilience Framework Policy
  procedures/
    cirp.md                                    Cyber Incident Response Plan (11.13)
    soc-charter.md                             SOC Charter (App5-C)
    vapt-sop.md                                VAPT Standard Operating Procedure (App5-D)
  reports/
    cyber-drill-plan.md                        Cyber Drill Exercise Plan (11.16)
    threat-intel-report.md                     Monthly Threat Assessment Report (App5-C3)

artifacts/                                   Structured data
  inventory.json                               All artifacts inventory

LICENSE                                      CC-BY-4.0
```

## Compliance Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BNM RMiT Clause                              │
│                  (e.g., Paragraph 11.8)                             │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Control Domain                                 │
│              (e.g., CD-07 SOC Operations)                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Control                                     │
│     (e.g., CD-07-C03 SIEM deployment and correlation rules)        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Requirement                                   │
│  (e.g., SIEM must aggregate logs from all critical systems with    │
│   correlation rules mapped to known TTPs)                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Evidence                                     │
│  (e.g., SIEM architecture diagram, correlation rule inventory,     │
│   sample alert from past 30 days, log source coverage report)       │
└─────────────────────────────────────────────────────────────────────┘
```

## Maturity Model

Each of the 88 controls can be assessed against a 4-level maturity model:

| Level | Name | Description |
|-------|------|-------------|
| **1** | Initial | Ad-hoc or absent. The control is not formally defined or consistently applied. |
| **2** | Basic | Defined and documented. The control exists in policy/procedure but may not be consistently operated or measured. |
| **3** | Mature | Consistently operated and monitored. The control is embedded in operations with regular review and metrics. |
| **4** | Advanced | Optimised and adaptive. The control is continuously improved using threat intelligence, automation, and lessons learned. |

The maturity model supports gap analysis, roadmap prioritisation, and board reporting on the institution's cyber resilience posture over time.

## Cross-Framework Mapping

Every control is mapped to recognised international standards and frameworks to support institutions with existing compliance programmes:

| Framework | Version | Mapping Scope |
|-----------|---------|---------------|
| **NIST CSF** | 2.0 | All 88 controls mapped to CSF Functions, Categories, and Subcategories |
| **ISO 27001** | 2022 | Annex A controls mapped where applicable |
| **MITRE ATT&CK** | v15 | Techniques mapped to detection and response controls |
| **CIS Controls** | v8 | Implementation Groups 1–3 mapped to preventive and detective controls |

The mapping file (`controls/control-mapping.json`) enables institutions to demonstrate coverage across multiple frameworks simultaneously, avoiding duplicate compliance effort.

## How to Use

### For gap assessment:
1. Review the [Control Domains](controls/control-domains.json) to understand the full control set
2. Assess current maturity against each control using the [Maturity Model](controls/maturity-model.json)
3. Identify gaps by comparing current state against target maturity (Level 3 recommended as baseline)
4. Prioritise remediation using the CRF phase and control criticality ratings

### For policy and procedure development:
5. Use the [Templates](templates/) as starting points for institutional documentation
6. Customise placeholders to reflect your institution's governance structure and risk appetite
7. Ensure all policies reference the relevant RMiT clause(s) for traceability

### For ongoing compliance:
8. Collect evidence per the [Evidence Checklist](evidence/evidence-checklist.md)
9. Produce periodic reports using the [Report Templates](templates/reports/)
10. Conduct cyber drills per the [Drill Plan](templates/reports/cyber-drill-plan.md) template

### For cross-framework alignment:
11. Use the [Control Mapping](controls/control-mapping.json) to align with NIST CSF, ISO 27001, or CIS Controls
12. Identify overlapping requirements to consolidate compliance activities

## Related Repositories

- **[RMIT Compliance Database](https://github.com/dawuds/RMIT)** — Full 121-clause structured extraction of BNM RMiT with controls, evidence, and 365 document templates
- **[IESP Toolkit](https://github.com/dawuds/iesp)** — Practitioner's toolkit for conducting Independent External Service Provider reviews under BNM RMiT

## Technical Details

- **Source Document:** BNM/RH/PD 028-98, issued 28 November 2025
- **Applicable to:** Licensed banks, investment banks, Islamic banks, insurers, takaful operators, prescribed DFIs, e-money issuers, payment system operators, merchant acquirers, IRIs
- **Schema Version:** GRC Portfolio v2.0 (compatible with RMIT and IESP repos)

## License

CC-BY-4.0
