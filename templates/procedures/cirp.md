# Cyber Incident Response Plan (CIRP)

| Field | Value |
|-------|-------|
| **Document ID** | PROC-CIRP-001 |
| **Institution** | [FI Name] |
| **Version** | [Version, e.g., 1.0] |
| **Effective Date** | [Date] |
| **Last Reviewed** | [Date] |
| **Next Review** | [Date + 12 months] |
| **Classification** | Confidential |
| **Owner** | Chief Information Security Officer (CISO) |
| **Approved By** | Board of Directors / Board Risk Committee |

---

## 1. Purpose

This Cyber Incident Response Plan (CIRP) establishes [FI Name]'s procedures for detecting, responding to, containing, eradicating, recovering from, and learning from cyber incidents. This plan is developed in accordance with BNM RMiT Paragraph 11.13 and supporting clauses 11.14, 11.15, and 11.17–11.20.

## 2. Scope

This plan covers all cyber incidents affecting:

- [FI Name]'s information systems, networks, and technology infrastructure
- Digital services and customer-facing channels (online banking, mobile banking, APIs)
- Cloud-hosted services and third-party managed environments
- Data and information assets regardless of classification level
- Third-party and supply chain incidents that impact [FI Name]

## 3. Regulatory Reference

| Clause | Requirement |
|--------|-------------|
| 11.13 | Establish comprehensive incident response procedures |
| 11.13(a) | Define CERT governance, roles, and responsibilities |
| 11.13(b) | Detection and analysis procedures |
| 11.13(c) | Containment and eradication procedures |
| 11.13(d) | Recovery procedures |
| 11.13(e) | Post-incident review and lessons learned |
| 11.14 | Incident response capability and readiness |
| 11.15 | Out-of-band communication channels |
| 11.17–11.20 | Regulatory reporting of cyber incidents to BNM |

## 4. CERT Governance, Roles, and Responsibilities

*Per Paragraph 11.13(a)*

### 4.1 CERT Composition

| Role | Primary | Alternate | Responsibility |
|------|---------|-----------|----------------|
| **CERT Lead** | CISO | Deputy CISO | Overall incident command and decision-making |
| **Incident Commander** | Head of IT Security | Senior Security Analyst | Tactical coordination of response activities |
| **Forensic Lead** | Digital Forensics Manager | Senior Forensic Analyst | Evidence collection, preservation, and analysis |
| **Infrastructure Lead** | Head of IT Operations | Senior Infrastructure Engineer | System isolation, containment, and recovery |
| **Application Lead** | Head of Application Support | Senior Application Engineer | Application-layer investigation and remediation |
| **Communications Lead** | Head of Corporate Communications | PR Manager | Internal and external communications |
| **Legal Counsel** | General Counsel / Head of Legal | Senior Legal Advisor | Legal obligations, regulatory reporting, evidence preservation |
| **Business Liaison** | Head of affected business unit | Deputy Head | Business impact assessment and customer communication |
| **Compliance Officer** | Head of Compliance | Senior Compliance Manager | Regulatory reporting obligations and timelines |
| **HR Representative** | Head of HR | Senior HR Manager | Insider threat investigations, disciplinary actions |

### 4.2 CERT Activation Criteria

The CERT shall be activated when any of the following conditions are met:

- Confirmed intrusion or unauthorised access to critical systems
- Active data exfiltration or ransomware deployment
- Compromise of privileged accounts or administrative credentials
- Distributed denial-of-service (DDoS) impacting customer services
- Supply chain compromise affecting [FI Name]'s environment
- Any incident classified as Severity 1 or Severity 2 (see Section 5)

### 4.3 CERT Authority

The CERT Lead (CISO) has the authority to:

- Invoke system isolation and network segmentation measures
- Engage external incident response and forensic service providers
- Direct the suspension of compromised user accounts and services
- Authorise out-of-band communication activation
- Escalate to the CEO and Board as required

## 5. Incident Classification

### 5.1 Severity Levels

| Severity | Name | Definition | Examples | Response Time | CERT Activation |
|----------|------|------------|----------|---------------|-----------------|
| **1** | Critical | Imminent or active threat to critical systems, customer data, or financial operations with significant business impact | Active ransomware on core banking; confirmed exfiltration of customer PII; compromise of SWIFT/payment systems | Immediate (within 15 minutes) | Full CERT mobilisation |
| **2** | High | Confirmed security breach with potential for significant impact if not contained promptly | Unauthorised access to production systems; DDoS affecting customer channels; privileged account compromise | Within 30 minutes | CERT activated; key members mobilised |
| **3** | Medium | Confirmed security event requiring investigation; limited immediate impact | Malware on endpoint (contained); phishing compromise of single user account; vulnerability exploitation attempt | Within 2 hours | Incident Commander and relevant leads |
| **4** | Low | Security event or anomaly requiring assessment; minimal or no business impact | Suspicious email reported; failed brute-force attempt; policy violation detected | Within 8 hours | SOC handles; escalate if upgraded |

### 5.2 Severity Escalation

Incidents may be upgraded in severity as additional information becomes available. The Incident Commander shall reassess severity at each phase transition and upon discovery of new evidence.

## 6. Detection and Analysis

*Per Paragraph 11.13(b)*

### 6.1 Detection Sources

| Source | Technology/Process | Owner |
|--------|--------------------|-------|
| SIEM alerts | [SIEM Platform, e.g., Splunk/Sentinel] | SOC |
| EDR/XDR alerts | [EDR Platform] | SOC |
| Network detection | IDS/IPS, NDR, NetFlow analysis | SOC |
| Threat intelligence | TIP, ISAC feeds, vendor advisories | Threat Intelligence Team |
| User reports | Phishing reports, helpdesk tickets | IT Service Desk |
| Third-party notification | CSP alerts, vendor notifications, law enforcement | CISO Office |
| Vulnerability scanning | Automated VA tools | VAPT Team |

### 6.2 Initial Triage

Upon detection of a potential incident, the SOC shall:

1. **Log** — Create an incident ticket in [Incident Management Tool] with timestamp, source, and initial details
2. **Classify** — Assign initial severity per Section 5
3. **Assess** — Determine scope: affected systems, users, data, and services
4. **Correlate** — Cross-reference with threat intelligence, recent alerts, and known IoCs
5. **Escalate** — Notify the Incident Commander (Severity 1–3) or continue monitoring (Severity 4)

### 6.3 Analysis Procedures

The investigation team shall:

- Collect and preserve volatile evidence (memory dumps, running processes, network connections) before taking containment actions
- Analyse log data from SIEM, firewalls, proxies, DNS, authentication systems, and application logs
- Identify the attack vector, initial compromise point, lateral movement, and persistence mechanisms
- Determine the scope of compromise: systems affected, data accessed or exfiltrated, accounts compromised
- Map observed TTPs to MITRE ATT&CK framework for structured analysis
- Maintain a chain-of-custody log for all forensic evidence

## 7. Containment and Eradication

*Per Paragraph 11.13(c)*

### 7.1 Containment Strategy

| Approach | When to Use | Actions |
|----------|-------------|---------|
| **Short-term containment** | Immediate threat; need to stop active damage | Network isolation of affected hosts; block malicious IPs/domains; disable compromised accounts; activate DNS sinkhole |
| **Long-term containment** | Threat contained but not eradicated; need sustained control while investigating | Move affected systems to isolated VLAN; deploy enhanced monitoring; implement temporary firewall rules; rotate credentials |

### 7.2 Containment Decision Matrix

| Scenario | Recommended Action | Approval Required |
|----------|--------------------|-------------------|
| Active ransomware / wiper | Immediate network isolation | Incident Commander (post-facto CISO approval) |
| Data exfiltration in progress | Block egress to C2; isolate source systems | Incident Commander |
| Compromised privileged account | Disable account; rotate all associated credentials | Incident Commander |
| DDoS on customer services | Activate DDoS mitigation; engage ISP/CDN | Incident Commander |
| Third-party / supply chain compromise | Isolate connectivity to affected third party | CISO |
| Insider threat | Coordinate with HR and Legal before containment | CISO and Legal Counsel |

### 7.3 Eradication

Following containment, the team shall:

1. Remove malware, backdoors, and persistence mechanisms from all affected systems
2. Patch exploited vulnerabilities
3. Reset all compromised credentials, certificates, and API keys
4. Verify eradication through scanning and monitoring of previously affected systems
5. Confirm no re-infection or continued attacker presence over a [72-hour] monitoring period

## 8. Recovery

*Per Paragraph 11.13(d)*

### 8.1 Recovery Procedures

1. **Restoration planning** — Prioritise recovery based on business criticality and customer impact
2. **System restoration** — Rebuild from known-good backups or clean images; do not restore from potentially compromised backups without forensic verification
3. **Validation** — Verify system integrity, functionality, and security posture before returning to production
4. **Enhanced monitoring** — Implement heightened monitoring on recovered systems for [30 days] post-recovery
5. **Service restoration** — Gradually restore services with staged rollback capability
6. **Stakeholder notification** — Inform affected customers, partners, and regulators of service restoration

### 8.2 Recovery Approval

| Severity | Recovery Approval Authority |
|----------|----------------------------|
| 1 | CISO and CEO |
| 2 | CISO |
| 3 | Incident Commander |
| 4 | SOC Lead |

## 9. Post-Incident Review

*Per Paragraph 11.13(e)*

### 9.1 Review Requirements

A post-incident review shall be conducted for all Severity 1–3 incidents within [10 business days] of incident closure. The review shall cover:

1. **Timeline reconstruction** — Complete incident timeline from initial compromise to closure
2. **Root cause analysis** — Identify the root cause(s) and contributing factors
3. **Control effectiveness** — Assess which controls worked, which failed, and which were absent
4. **Response effectiveness** — Evaluate detection time, response time, containment effectiveness, and communication adequacy
5. **Lessons learned** — Document specific, actionable improvements
6. **Remediation plan** — Define actions, owners, and deadlines to address identified gaps

### 9.2 Post-Incident Report Distribution

| Audience | Content | Timeline |
|----------|---------|----------|
| CERT members | Full post-incident report | Within 10 business days |
| Senior Management | Executive summary with key findings and actions | Within 15 business days |
| Board / Board Risk Committee | Board-level summary with strategic implications | Next scheduled Board meeting or immediately for Severity 1 |
| BNM | Per regulatory reporting requirements (see Section 11) | Per 11.17–11.20 timelines |

## 10. Escalation Matrix

| Trigger | Escalate To | Method | Timeline |
|---------|-------------|--------|----------|
| Severity 4 detected | SOC Lead | Incident management tool | Per triage |
| Severity 3 confirmed | Incident Commander | Phone + secure messaging | Within 30 minutes |
| Severity 2 confirmed | CISO | Phone call (primary) | Within 15 minutes |
| Severity 1 confirmed | CISO → CEO → Board Chair | Phone call (primary); out-of-band if compromised | Immediately |
| Customer data confirmed compromised | CISO + Legal + Compliance | Phone call + meeting | Within 1 hour |
| Regulatory reporting threshold met | CISO + Compliance → BNM | Per 11.17–11.20 prescribed channels | Per regulatory timeline |
| Third-party involvement confirmed | CISO + Vendor Management | Phone + secure email | Within 2 hours |
| Law enforcement engagement needed | CISO + Legal | In-person or phone | CISO decision |

## 11. Communication Plan

### 11.1 Internal Communication

| Audience | Message Content | Channel | Responsibility |
|----------|----------------|---------|----------------|
| CERT members | Full technical details, tasking | [Secure collaboration tool, e.g., dedicated Slack/Teams channel] | Incident Commander |
| Senior Management | Situation summary, business impact, actions taken | Secure email or in-person briefing | CISO |
| Board of Directors | Executive summary, strategic implications | Board portal or in-person briefing | CISO / CEO |
| All staff (if required) | General advisory, actions required (e.g., password reset) | Corporate email, intranet | Communications Lead |
| IT Operations | Technical advisories, system status | IT operations channel | Infrastructure Lead |

### 11.2 External Communication

| Audience | Message Content | Channel | Responsibility | Approval |
|----------|----------------|---------|----------------|----------|
| BNM | Incident notification per 11.17–11.20 | Prescribed regulatory channels | Compliance Officer | CISO |
| Affected customers | Impact notification, protective actions | Official channels (email, SMS, website) | Communications Lead | CISO + Legal |
| Law enforcement | Evidence, technical details | Formal channels | Legal Counsel | CISO + CEO |
| Media | Prepared statement only | Press release, spokesperson | Communications Lead | CEO |
| Industry peers / ISAC | Anonymised IoCs and TTPs | ISAC sharing platform | Threat Intelligence Team | CISO |
| Third-party service providers | Relevant incident details | Contractual notification channels | Vendor Management | CISO |

### 11.3 Communication Principles

- All external communications must be approved by the CISO and Legal Counsel
- No employee shall discuss incident details on social media or with unauthorised parties
- Media enquiries shall be directed exclusively to Corporate Communications
- Regulatory notifications shall be made within prescribed timelines regardless of investigation status

## 12. Out-of-Band Communication

*Per Paragraph 11.15*

[FI Name] shall maintain out-of-band communication channels that are independent of the primary corporate network and can be activated when primary channels are compromised or unavailable.

### 12.1 Out-of-Band Channels

| Channel | Purpose | Activation Trigger |
|---------|---------|-------------------|
| Dedicated mobile phones (non-corporate) | CERT voice communication | Primary phone system compromised or unavailable |
| Encrypted messaging app on personal devices | CERT secure messaging | Corporate messaging platform compromised |
| Satellite phone | Communication during widespread network outage | All terrestrial communication unavailable |
| Physical assembly point | In-person coordination | All electronic communication compromised |
| Pre-distributed contact cards | Emergency contact information | Corporate directory unavailable |

### 12.2 Testing

Out-of-band communication channels shall be tested:
- At least quarterly through communication drills
- As part of every annual cyber drill exercise (ref: 11.16)
- After any change to the out-of-band infrastructure

## 13. Contact List

*Maintain a current version of this list. Review and update monthly.*

### 13.1 Internal CERT Contacts

| Role | Name | Office Phone | Mobile Phone | Personal Email | Out-of-Band # |
|------|------|-------------|-------------|----------------|----------------|
| CERT Lead (CISO) | [Name] | [Number] | [Number] | [Email] | [Number] |
| Deputy CISO | [Name] | [Number] | [Number] | [Email] | [Number] |
| Incident Commander | [Name] | [Number] | [Number] | [Email] | [Number] |
| Forensic Lead | [Name] | [Number] | [Number] | [Email] | [Number] |
| Infrastructure Lead | [Name] | [Number] | [Number] | [Email] | [Number] |
| Application Lead | [Name] | [Number] | [Number] | [Email] | [Number] |
| Communications Lead | [Name] | [Number] | [Number] | [Email] | [Number] |
| Legal Counsel | [Name] | [Number] | [Number] | [Email] | [Number] |
| Compliance Officer | [Name] | [Number] | [Number] | [Email] | [Number] |

### 13.2 Senior Management

| Role | Name | Mobile Phone | Out-of-Band # |
|------|------|-------------|----------------|
| CEO | [Name] | [Number] | [Number] |
| CRO | [Name] | [Number] | [Number] |
| CTO / CIO | [Name] | [Number] | [Number] |
| Board Chair | [Name] | [Number] | [Number] |
| Board Risk Committee Chair | [Name] | [Number] | [Number] |

### 13.3 External Contacts

| Organisation | Contact | Phone | Email | Purpose |
|-------------|---------|-------|-------|---------|
| BNM — Technology Supervision | [Contact] | [Number] | [Email] | Regulatory incident reporting |
| Malaysia CERT (MyCERT) | Incident Response | 1-300-88-2999 | mycert@mycert.org.my | National CERT coordination |
| External IR Retainer | [Firm Name] | [Number] | [Email] | Incident response support |
| External Forensics | [Firm Name] | [Number] | [Email] | Digital forensics |
| Legal — External Counsel | [Firm Name] | [Number] | [Email] | Legal advisory |
| Cyber Insurance | [Insurer / Broker] | [Number] | [Email] | Claims notification |
| Law Enforcement — PDRM | Commercial Crime (D11) | [Number] | — | Criminal investigation |

## 14. BNM Regulatory Reporting

*Per Paragraphs 11.17–11.20*

| Reporting Stage | Timeline | Content | Channel |
|----------------|----------|---------|---------|
| Initial notification | Within [prescribed hours] of confirmed incident | Incident type, affected systems, initial impact assessment | BNM prescribed channel |
| Interim update | As required / upon material developments | Updated scope, containment status, customer impact | BNM prescribed channel |
| Final report | Within [prescribed days] of incident closure | Full incident report, root cause, remediation actions | BNM prescribed channel |

---

## Appendix A: Incident Classification Criteria

### A.1 Classification by Attack Type

| Category | Description | Typical Severity |
|----------|-------------|-----------------|
| **Ransomware / Destructive Malware** | Encryption or destruction of data/systems | Severity 1–2 |
| **Data Breach / Exfiltration** | Unauthorised access to or theft of sensitive data | Severity 1–2 |
| **Account Compromise — Privileged** | Compromise of admin, root, or service accounts | Severity 1–2 |
| **Account Compromise — Standard** | Compromise of regular user accounts | Severity 3 |
| **DDoS** | Volumetric, protocol, or application-layer denial of service | Severity 2–3 |
| **Web Application Attack** | SQL injection, XSS, API abuse, credential stuffing | Severity 2–3 |
| **Phishing / Social Engineering** | Targeted or mass phishing, vishing, BEC | Severity 3–4 |
| **Malware — Contained** | Malware detected and contained on endpoint | Severity 3–4 |
| **Insider Threat** | Malicious or negligent actions by authorised users | Severity 2–3 |
| **Supply Chain Compromise** | Compromise via third-party vendor or software | Severity 1–2 |
| **Vulnerability Exploitation** | Exploitation of known or zero-day vulnerabilities | Severity 2–3 |

### A.2 Impact Assessment Factors

| Factor | High Impact | Medium Impact | Low Impact |
|--------|------------|---------------|------------|
| **Systems affected** | Core banking, payment, SWIFT | Secondary business systems | Non-critical / test systems |
| **Data sensitivity** | Customer PII, financial data, credentials | Internal confidential data | Public or non-sensitive data |
| **Customer impact** | Service disruption to customers; data compromised | Degraded service; no data compromise | No customer impact |
| **Financial impact** | Direct financial loss > RM [threshold] | Potential financial loss | Negligible financial impact |
| **Regulatory impact** | Mandatory BNM notification triggered | Potential regulatory interest | No regulatory implication |
| **Reputational impact** | Likely media coverage; customer trust affected | Internal awareness; limited external visibility | Minimal reputational risk |

### A.3 Classification Decision Tree

```
Is there active data exfiltration, ransomware, or compromise of critical systems?
  ├── YES → Severity 1 (Critical)
  └── NO
      Is there confirmed unauthorised access to production systems or customer data?
        ├── YES → Severity 2 (High)
        └── NO
            Is there a confirmed security event requiring investigation?
              ├── YES → Severity 3 (Medium)
              └── NO → Severity 4 (Low)
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial release |
| | | | |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
