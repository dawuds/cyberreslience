# Cyber Resilience Framework Policy

| Field | Value |
|-------|-------|
| **Document ID** | POL-CRF-001 |
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

This policy establishes [FI Name]'s Cyber Resilience Framework (CRF) in accordance with BNM RMiT Paragraph 11.1. The CRF provides a structured approach to identify, protect against, detect, respond to, and recover from cyber threats, ensuring the continued delivery of critical financial services.

## 2. Scope

This policy applies to:

- All information systems, technology infrastructure, and digital services operated by or on behalf of [FI Name]
- All employees, contractors, and third-party service providers with access to [FI Name]'s systems or data
- All business units and subsidiaries within the [FI Name] group structure
- Cloud-hosted services, outsourced technology operations, and managed security services

## 3. Regulatory Reference

| Regulation | Clause | Requirement |
|------------|--------|-------------|
| BNM RMiT | 11.1 | Establish and maintain a Cyber Resilience Framework |
| BNM RMiT | 11.2 | Cyber risk management commensurate with risk profile |
| BNM RMiT | 11.3 | Security controls proportionate to threat landscape |

## 4. CRF Lifecycle Phases

### 4.1 Identify

**Objective:** Understand the cyber threat landscape and the institution's risk exposure.

**Key Activities:**
- Maintain a current cyber threat intelligence capability (ref: 11.4–11.7)
- Conduct periodic cyber risk assessments aligned with the enterprise risk management framework
- Classify and inventory all critical information assets and digital services
- Assess third-party and supply chain cyber risk exposure
- Monitor the external threat landscape relevant to the Malaysian financial sector

**Responsible:** Cyber Risk Function, Threat Intelligence Team

**Frequency:** Continuous monitoring; formal risk assessment at least annually

### 4.2 Protect

**Objective:** Implement preventive controls to limit the impact of potential cyber events.

**Key Activities:**
- Maintain security architecture aligned with defence-in-depth principles (ref: 11.2–11.3)
- Enforce identity and access management controls, including privileged access management
- Implement network segmentation, encryption, and endpoint protection
- Secure digital services channels per Section 12 requirements
- Conduct security awareness and training programmes (ref: 15.1–15.3)
- Manage vulnerabilities through timely patching and hardening

**Responsible:** IT Security, Infrastructure, Application Development, HR (awareness)

**Frequency:** Controls operated continuously; architecture reviewed annually

### 4.3 Detect

**Objective:** Ensure timely discovery of cyber events through continuous monitoring.

**Key Activities:**
- Operate a Security Operations Centre (SOC) with 24x7 monitoring capability (ref: 11.8–11.12, App5-B, App5-C)
- Deploy and maintain SIEM with correlation rules mapped to known TTPs
- Conduct proactive threat hunting operations
- Perform vulnerability assessments and penetration testing (ref: App5-D)
- Monitor for data exfiltration, lateral movement, and anomalous behaviour

**Responsible:** SOC, Threat Hunting Team, VAPT Team

**Frequency:** SOC monitoring 24x7; VA quarterly; penetration testing annually

### 4.4 Respond

**Objective:** Contain and manage cyber incidents to minimise impact.

**Key Activities:**
- Activate the Cyber Incident Response Plan (CIRP) upon confirmed incidents (ref: 11.13)
- Mobilise the Cyber Emergency Response Team (CERT) per defined escalation triggers
- Execute containment, eradication, and evidence preservation procedures
- Communicate with internal stakeholders, regulators (BNM), and affected parties (ref: 11.17–11.20)
- Maintain out-of-band communication channels (ref: 11.15)

**Responsible:** CERT, CISO, Legal, Communications, Senior Management

**Frequency:** As triggered by incidents; CIRP tested at least annually via cyber drills (ref: 11.16)

### 4.5 Recover

**Objective:** Restore services and incorporate lessons learned.

**Key Activities:**
- Execute recovery procedures to restore affected systems and services (ref: 11.13(d))
- Conduct post-incident review to identify root cause and control gaps (ref: 11.13(e))
- Update threat intelligence, controls, and procedures based on lessons learned
- Report to the Board on incident impact and remediation status
- Share anonymised threat intelligence with industry peers where appropriate

**Responsible:** IT Operations, CERT, CISO, Cyber Risk Function

**Frequency:** Post every significant incident; lessons learned integrated within 30 days

## 5. Governance Structure

### 5.1 Board of Directors

- Ultimate oversight of cyber resilience posture
- Approve the CRF Policy and annual cyber resilience strategy
- Receive quarterly cyber resilience reports and immediate notification of significant incidents
- Ensure adequate budget and resources for cyber resilience

### 5.2 Chief Information Security Officer (CISO)

- Accountable for the design, implementation, and effectiveness of the CRF
- Report to the Board / Board Risk Committee on cyber resilience matters
- Chair the Cyber Risk Committee
- Authority to escalate cyber incidents to senior management and the Board

### 5.3 Cyber Risk Function

- Conduct cyber risk assessments and maintain the cyber risk register
- Monitor compliance with this policy and supporting procedures
- Coordinate with Enterprise Risk Management on integrated risk reporting
- Evaluate emerging threats and recommend control enhancements

### 5.4 Cyber Emergency Response Team (CERT)

- Lead the response to confirmed cyber incidents per the CIRP
- Comprise representatives from IT Security, IT Operations, Legal, Communications, and relevant business units
- Maintain readiness through regular training and cyber drills (ref: 11.16)
- Authority to invoke containment measures including system isolation

### 5.5 Security Operations Centre (SOC)

- Provide 24x7 monitoring, detection, and initial triage of cyber events
- Operate SIEM, EDR, and other detection technologies
- Escalate confirmed incidents to the CERT per defined escalation criteria
- Produce monthly threat assessment reports (ref: App5-C3)

## 6. Risk Assessment Approach

[FI Name] shall conduct cyber risk assessments that:

1. **Align with enterprise risk management** — Cyber risk is integrated into the institution's overall risk taxonomy and appetite framework
2. **Consider the threat landscape** — Assessments incorporate current threat intelligence relevant to the financial sector
3. **Evaluate likelihood and impact** — Using a consistent methodology (e.g., quantitative, semi-quantitative, or qualitative) approved by the Cyber Risk Committee
4. **Cover all CRF phases** — Gaps in any phase (Identify, Protect, Detect, Respond, Recover) are identified and tracked
5. **Assess third-party risk** — Cyber risk from outsourced services, cloud providers, and supply chain dependencies is evaluated
6. **Produce actionable outputs** — Risk assessment results drive remediation roadmaps with clear ownership and timelines

Cyber risk assessments shall be conducted:
- At least annually as a comprehensive exercise
- Upon material changes to the technology environment, threat landscape, or business operations
- Following significant cyber incidents

## 7. Control Framework Reference

This policy is supported by the [FI Name] Cyber Resilience Control Framework comprising 12 control domains and 144 controls. Each control is:

- Mapped to the relevant RMiT clause(s)
- Assigned to a CRF lifecycle phase
- Assessed against a 4-level maturity model (Initial, Basic, Mature, Advanced)
- Cross-referenced to NIST CSF 2.0, ISO 27001:2022, and CIS Controls v8

The control framework is maintained by the Cyber Risk Function and reviewed annually.

## 8. Review and Update

This policy shall be reviewed:

| Trigger | Action |
|---------|--------|
| Annual review cycle | Full policy review by CISO and Cyber Risk Function |
| Material regulatory change | Update within 60 days of BNM policy issuance |
| Significant cyber incident | Post-incident review may trigger policy update |
| Material technology change | Assess impact on CRF scope and controls |
| Organisational restructuring | Update governance roles and responsibilities |

All changes require Board / Board Risk Committee approval.

## 9. Board Oversight Requirements

The Board shall:

1. Receive and deliberate on the annual Cyber Resilience Strategy and this CRF Policy
2. Review quarterly cyber resilience reports covering threat landscape, incidents, maturity posture, and key risk indicators
3. Be immediately notified of significant cyber incidents (Severity 1 and 2)
4. Approve the annual cyber resilience budget
5. Ensure at least one Board member or advisor possesses cybersecurity expertise
6. Participate in annual cyber drill exercises (ref: 11.16)
7. Oversee remediation of material cyber risk findings from internal audit, external assessments, and regulatory examinations

## 10. Related Documents

| Document | Reference |
|----------|-----------|
| Cyber Incident Response Plan | PROC-CIRP-001 |
| SOC Charter | PROC-SOC-001 |
| VAPT Standard Operating Procedure | PROC-VAPT-001 |
| Threat Intelligence Policy | POL-TI-001 |
| Digital Services Security Policy | POL-DSS-001 |
| Information Security Policy | POL-ISP-001 |
| Business Continuity Plan | POL-BCP-001 |

## 11. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| CISO | [Name] | __________ | [Date] |
| CRO / Head of Risk | [Name] | __________ | [Date] |
| CEO | [Name] | __________ | [Date] |
| Board Risk Committee Chair | [Name] | __________ | [Date] |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
