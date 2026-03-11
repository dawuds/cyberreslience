# Vulnerability Assessment and Penetration Testing (VAPT) Standard Operating Procedure

| Field | Value |
|-------|-------|
| **Document ID** | PROC-VAPT-001 |
| **Institution** | [FI Name] |
| **Version** | [Version, e.g., 1.0] |
| **Effective Date** | [Date] |
| **Last Reviewed** | [Date] |
| **Next Review** | [Date + 12 months] |
| **Classification** | Confidential |
| **Owner** | Chief Information Security Officer (CISO) |
| **Approved By** | CISO |

---

## 1. Purpose

This Standard Operating Procedure (SOP) establishes [FI Name]'s procedures for conducting vulnerability assessments, penetration testing, and related security testing activities. This SOP is aligned with BNM RMiT Appendix 5 Part D (Paragraphs D1–D6) and supports the Detect phase of the Cyber Resilience Framework.

## 2. Scope

This SOP covers all security testing activities conducted against [FI Name]'s:

- External-facing systems and services (internet perimeter, web applications, APIs, digital channels)
- Internal network infrastructure and systems
- Cloud-hosted environments (IaaS, PaaS, SaaS)
- Mobile applications (iOS, Android)
- Wireless networks
- Critical business applications (core banking, payment systems, trading platforms)
- Third-party and vendor-managed systems within [FI Name]'s environment

## 3. Regulatory Reference

| Clause | Requirement |
|--------|-------------|
| App5-D1 | VAPT scope, methodology, and data purging requirements |
| App5-D2 | Frequency and types of assessments |
| App5-D3 | External tester qualifications and independence |
| App5-D4 | Oversight and monitoring of testing activities |
| App5-D5 | Escalation of critical findings to senior management |
| App5-D6 | Documentation, reporting, and remediation tracking |

## 4. Types of Assessments

### 4.1 Assessment Schedule

| Assessment Type | Frequency | Scope | Conducted By | Reference |
|----------------|-----------|-------|-------------|-----------|
| **Vulnerability Assessment (VA)** | Quarterly | All in-scope systems and networks | Internal team or qualified external party | App5-D2 |
| **External Penetration Test** | Annually | Internet-facing perimeter, web applications, APIs | Qualified external party (independent) | App5-D2, App5-D3 |
| **Internal Penetration Test** | Annually | Internal network, lateral movement, privilege escalation | Qualified external party (independent) | App5-D2, App5-D3 |
| **Web Application Security Test** | Per release cycle + annually | Customer-facing web applications and APIs | Internal team or external party | App5-D2 |
| **Mobile Application Security Test** | Per release cycle + annually | Mobile banking and customer-facing mobile apps | Internal team or external party | App5-D2 |
| **Pre-Launch Security Assessment** | Prior to go-live | New systems, major changes, new digital services | Internal team and/or external party | App5-D2 |
| **Compromise Assessment** | Annually or upon suspicion | Full environment threat hunting and forensic analysis | Qualified external party | App5-D2 |
| **Red Team Exercise** | Annually (for systemically important FIs) | Full-scope adversary simulation (people, process, technology) | Qualified external party (independent) | App5-D2 |

### 4.2 Ad-Hoc Assessments

Additional assessments shall be conducted when:

- A significant vulnerability is publicly disclosed affecting [FI Name]'s technology stack
- A cyber incident reveals potential control weaknesses
- Directed by BNM or internal audit
- Prior to deployment of critical system changes
- Following a merger, acquisition, or major infrastructure change

## 5. Engagement and Scoping Procedures

### 5.1 Scoping Process

For each assessment engagement, the following scoping activities shall be completed:

1. **Define objectives** — Clearly articulate what the assessment aims to achieve (e.g., identify external perimeter vulnerabilities, test lateral movement paths, validate web application controls)
2. **Identify target systems** — List all in-scope IP ranges, hostnames, URLs, applications, and cloud environments
3. **Classify system criticality** — Tag each target with business criticality (Critical, High, Medium, Low)
4. **Identify constraints** — Document any systems or actions excluded from scope, testing windows, and restricted techniques
5. **Determine test type** — Black box, grey box, or white box approach per engagement objectives
6. **Obtain authorisation** — Secure written approval from the CISO and relevant system owners

### 5.2 Scoping Document

Each engagement shall have a formal scoping document containing:

| Element | Detail |
|---------|--------|
| Assessment type and methodology | VA / pen test / red team / compromise assessment |
| In-scope targets | IP ranges, URLs, applications, cloud accounts |
| Out-of-scope targets | Excluded systems, networks, techniques |
| Testing approach | Black box / grey box / white box |
| Testing window | Start date, end date, permitted hours |
| Emergency contacts | Tester and [FI Name] contacts for escalation |
| Authorisation | Signed approval from CISO and system owners |

## 6. Rules of Engagement

### 6.1 General Rules

All testing activities shall adhere to the following rules:

1. **Written authorisation** — No testing shall commence without signed authorisation from the CISO
2. **Scope adherence** — Testers shall not test systems outside the defined scope
3. **No destructive actions** — Testing shall not intentionally cause service disruption, data loss, or system damage
4. **Production safeguards** — Production system testing shall be conducted during approved windows with rollback procedures available
5. **Data handling** — No customer data shall be exfiltrated, copied, or stored by testers beyond what is necessary to demonstrate the finding
6. **Communication** — Testers shall maintain communication with the designated [FI Name] point of contact throughout the engagement
7. **Critical finding escalation** — Findings rated Critical shall be reported to [FI Name] immediately upon discovery (see Section 11)
8. **Credential handling** — Any credentials obtained during testing shall be reported and not retained after the engagement

### 6.2 Prohibited Techniques (unless explicitly authorised)

- Denial-of-service attacks against production systems
- Social engineering of customers
- Physical intrusion of data centres or offices (unless part of red team scope)
- Modification or deletion of production data
- Installation of persistent backdoors
- Attacks against systems owned by third parties without their written consent

## 7. External Tester Requirements

*Per Appendix 5, Part D, Paragraph D3*

### 7.1 Qualification Criteria

External penetration testing firms shall meet the following minimum requirements:

| Criterion | Requirement |
|-----------|-------------|
| **Independence** | No conflict of interest; tester shall not have been involved in developing or implementing the systems under test |
| **Experience** | Minimum [3] years of penetration testing experience in the financial services sector |
| **Certifications** | Lead tester holds OSCP, OSCE, GPEN, GXPN, CREST CRT/CCT, or equivalent |
| **Methodology** | Documented methodology aligned with OWASP, PTES, or NIST SP 800-115 |
| **Insurance** | Professional indemnity insurance with coverage of at least RM [X] million |
| **Background checks** | All testers must have passed background checks |
| **NDA** | Signed non-disclosure agreement prior to engagement commencement |
| **Data handling** | Documented data handling and purging procedures (see Section 12) |
| **References** | Minimum [3] references from financial institution clients |

### 7.2 Tester Vetting Process

1. Request firm's qualifications, certifications, and references
2. Verify individual tester credentials and background checks
3. Review firm's methodology documentation
4. Execute NDA and engagement contract
5. Conduct pre-engagement briefing
6. Obtain CISO approval for the specific testing team

## 8. Oversight and Monitoring Controls

*Per Appendix 5, Part D, Paragraph D4*

### 8.1 [FI Name] Oversight Responsibilities

| Activity | Responsible | Frequency |
|----------|-------------|-----------|
| Monitor testing activities via SIEM | SOC | Continuous during testing |
| Daily status calls with testing team | VAPT Coordinator | Daily |
| Review interim findings | CISO / Head of IT Security | As reported |
| Verify scope compliance | VAPT Coordinator | Daily |
| Emergency stop authority | CISO | As needed |

### 8.2 Testing Monitoring

The SOC shall:
- Be notified of all scheduled testing activities with source IP addresses, testing windows, and scope
- Monitor testing activities to distinguish authorised testing from actual attacks
- Not whitelist testing source IPs in detection tools (to validate detection capability)
- Log all testing-related alerts for post-engagement analysis of detection coverage

## 9. Documentation and Reporting

*Per Appendix 5, Part D, Paragraph D6*

### 9.1 Report Requirements

All VAPT reports shall contain, at minimum:

| Section | Content |
|---------|---------|
| Executive summary | High-level summary of scope, approach, key findings, and overall risk posture |
| Scope and methodology | Detailed scope definition, tools used, methodology followed, testing dates |
| Findings summary | Findings categorised by severity (Critical, High, Medium, Low, Informational) with counts |
| Detailed findings | For each finding: description, affected system(s), evidence (screenshots, logs), CVSS score, MITRE ATT&CK mapping, remediation recommendation |
| Attack narratives | For penetration tests: step-by-step attack paths from initial access to objective |
| Positive observations | Controls that effectively prevented or detected attack techniques |
| Recommendations | Prioritised remediation recommendations with effort estimates |
| Appendices | Raw tool output, detailed evidence, vulnerability scan results |

### 9.2 Report Classification and Distribution

| Report Type | Classification | Distribution |
|------------|---------------|-------------|
| Full technical report | Strictly Confidential | CISO, Head of IT Security, VAPT Coordinator |
| Executive summary | Confidential | CRO, CTO/CIO, Board Risk Committee (upon request) |
| Remediation tracker | Confidential | System owners, IT Operations, Application Development |

### 9.3 Report Delivery Timeline

| Assessment Type | Draft Report | Final Report |
|----------------|-------------|-------------|
| Vulnerability Assessment | Within [5] business days of scan completion | Within [10] business days |
| Penetration Test | Within [10] business days of testing completion | Within [15] business days |
| Red Team Exercise | Within [15] business days of exercise completion | Within [20] business days |
| Compromise Assessment | Within [10] business days of assessment completion | Within [15] business days |

## 10. Remediation Tracking

### 10.1 Remediation SLAs

| Finding Severity | Remediation SLA | Interim Mitigation |
|-----------------|----------------|-------------------|
| **Critical** | [15] calendar days | Immediate compensating control required |
| **High** | [30] calendar days | Compensating control within [5] business days |
| **Medium** | [60] calendar days | — |
| **Low** | [90] calendar days | — |
| **Informational** | Best effort / next release | — |

### 10.2 Remediation Process

1. **Finding assignment** — Each finding assigned to a system owner with remediation responsibility
2. **Remediation planning** — System owner develops remediation plan within [5] business days of report receipt
3. **Implementation** — Remediation implemented per SLA
4. **Verification** — VAPT team verifies remediation through re-testing
5. **Closure** — Finding closed upon successful verification; documented in tracking system
6. **Exception management** — Findings that cannot be remediated within SLA require a risk acceptance approved by the CISO (Critical/High) or Head of IT Security (Medium/Low)

### 10.3 Remediation Tracking Tool

All findings shall be tracked in [Ticketing/GRC Tool, e.g., ServiceNow / Archer / Jira] with the following fields:

- Finding ID, title, severity, CVSS score
- Affected system(s) and owner
- Remediation SLA and target date
- Current status (Open, In Progress, Remediated, Verified, Closed, Risk Accepted)
- Verification evidence

## 11. Escalation to Senior Management

*Per Appendix 5, Part D, Paragraph D5*

### 11.1 Escalation Criteria

The following findings shall be escalated immediately to senior management:

| Trigger | Escalate To | Timeline |
|---------|-------------|----------|
| Critical-severity finding on a critical system | CISO → CRO → CEO | Within [4] hours of confirmation |
| Evidence of active compromise discovered during testing | CISO (invoke CIRP) | Immediately |
| Systemic vulnerability across multiple critical systems | CISO → CRO | Within [8] hours |
| Finding exceeding remediation SLA (Critical/High) | CISO → CRO | Upon SLA breach |
| Pattern of recurring findings indicating control failure | CISO → Board Risk Committee | In next monthly report |

### 11.2 Escalation Report Format

Escalation reports to senior management shall include:

- Finding description in non-technical language
- Business impact assessment
- Affected systems and services
- Interim mitigation measures in place
- Remediation plan and timeline
- Resource requirements

## 12. Data Purging Requirements

*Per Appendix 5, Part D, Paragraph D1*

### 12.1 Tester Data Handling Obligations

External testers shall:

1. Not retain any [FI Name] data, credentials, or evidence beyond what is included in the final report
2. Purge all testing data, including scan results, captured credentials, screenshots, and working notes, within [30] calendar days of final report delivery
3. Provide written confirmation of data purging to the VAPT Coordinator
4. Use encrypted storage for all [FI Name] data during the engagement
5. Not transfer [FI Name] data to any third party or offshore location without written CISO approval

### 12.2 Internal Data Handling

- VAPT reports shall be stored in [FI Name]'s secure document management system with access restricted to authorised personnel
- Raw vulnerability scan data shall be retained for [12] months for trend analysis
- Reports shall be retained per [FI Name]'s document retention policy (minimum [7] years)

### 12.3 Purging Verification

The VAPT Coordinator shall:

1. Issue a data purging notice to the external tester upon final report acceptance
2. Receive written confirmation of purging within [30] calendar days
3. Maintain a log of all purging confirmations
4. Include data purging compliance in the tester evaluation for future engagements

## 13. Annual VAPT Calendar

| Month | Activity |
|-------|----------|
| January | Q1 Vulnerability Assessment (internal + external) |
| February | Web application security testing (critical apps) |
| March | Mobile application security testing |
| April | Q2 Vulnerability Assessment; Annual external penetration test begins |
| May | External penetration test completion; report delivery |
| June | Annual internal penetration test |
| July | Q3 Vulnerability Assessment; Red team exercise planning |
| August | Compromise assessment |
| September | Red team exercise execution |
| October | Q4 Vulnerability Assessment; Annual VAPT programme review |
| November | Pre-year-end security assessment for planned changes |
| December | Annual VAPT report to Board Risk Committee |

*Note: Pre-launch assessments are conducted ad-hoc based on project timelines.*

## 14. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial release |
| | | | |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
