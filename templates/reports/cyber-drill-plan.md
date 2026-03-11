# Cyber Drill Exercise Plan

| Field | Value |
|-------|-------|
| **Document ID** | RPT-DRILL-[YYYY]-[##] |
| **Institution** | [FI Name] |
| **Exercise Name** | [Exercise Name, e.g., "Operation Shield 2026"] |
| **Exercise Date** | [Date(s)] |
| **Version** | [Version, e.g., 1.0] |
| **Classification** | Confidential |
| **Exercise Director** | [Name, Title] |
| **Approved By** | CISO |

---

## 1. Exercise Objectives

*Per BNM RMiT Paragraph 11.16*

This cyber drill exercise is designed to test [FI Name]'s cyber resilience capabilities. The primary objectives are:

| # | Objective | CRF Phase |
|---|-----------|-----------|
| 1 | Test the effectiveness of the Cyber Incident Response Plan (CIRP) | Respond |
| 2 | Validate CERT activation, mobilisation, and coordination procedures | Respond |
| 3 | Test escalation procedures to senior management and the Board | Respond |
| 4 | Evaluate communication effectiveness, including out-of-band channels (ref: 11.15, 11.16) | Respond |
| 5 | Assess decision-making under pressure at operational and strategic levels (ref: 11.16(a)) | Respond |
| 6 | Test CERT readiness and technical response capabilities (ref: 11.16(b)) | Respond |
| 7 | Validate SOC detection and triage capabilities | Detect |
| 8 | Test recovery procedures for critical systems | Recover |
| 9 | Evaluate regulatory reporting procedures and timelines | Respond |
| 10 | Identify gaps in procedures, tools, skills, and coordination | All |

## 2. Scenario Design

### 2.1 Scenario Overview

| Element | Detail |
|---------|--------|
| **Scenario title** | [e.g., "Targeted Ransomware Attack via Supply Chain Compromise"] |
| **Threat actor profile** | [e.g., Financially motivated cybercriminal group / Nation-state APT / Hacktivist] |
| **Initial attack vector** | [e.g., Compromised software update from third-party vendor / Spear-phishing with malicious attachment / Exploitation of internet-facing vulnerability] |
| **Attack progression** | [e.g., Initial access → credential harvesting → lateral movement → data staging → ransomware deployment] |
| **Target systems** | [e.g., Core banking system, payment gateway, customer database] |
| **Expected impact** | [e.g., Encryption of production servers; customer data exfiltration; digital channel outage] |

### 2.2 Scenario Phases and Injects

| Phase | Time | Inject | Expected Response |
|-------|------|--------|-------------------|
| **Phase 1: Detection** | T+0:00 | SOC receives SIEM alert: anomalous outbound traffic from [system] to unknown external IP | SOC triages alert, correlates with threat intelligence, classifies severity |
| **Phase 2: Escalation** | T+0:30 | Analysis reveals compromised service account; lateral movement indicators detected | SOC escalates to Incident Commander; Severity 2 classification; CERT activation considered |
| **Phase 3: Containment** | T+1:00 | Evidence of data staging on file server; ransomware dropper identified on 3 endpoints | CERT activated; containment actions initiated; affected systems isolated |
| **Phase 4: Social Engineering** | T+1:30 | Attacker sends phishing email to CERT members impersonating IT vendor requesting system access | CERT identifies social engineering attempt; activates out-of-band communication |
| **Phase 5: Escalation to Board** | T+2:00 | Ransomware detonates on 2 non-critical servers; ransom note displayed; media enquiry received | CISO escalates to CEO and Board Chair; communications team activated; BNM notification prepared |
| **Phase 6: Recovery** | T+3:00 | Containment confirmed; forensic analysis identifies root cause; recovery planning begins | Recovery procedures initiated; system restoration from clean backups; enhanced monitoring deployed |
| **Phase 7: Regulatory Reporting** | T+4:00 | BNM initial notification deadline approaching | Compliance prepares and submits initial incident notification to BNM |
| **Phase 8: Post-Incident** | T+5:00 | Exercise concludes; hot wash begins | All teams participate in immediate debrief |

### 2.3 Scenario Variants (Optional)

| Variant | Modification | Tests Additionally |
|---------|-------------|-------------------|
| **Variant A: Insider element** | Evidence suggests insider facilitated initial access | Insider threat procedures; HR coordination; legal considerations |
| **Variant B: Third-party impact** | Attack spreads to shared service provider affecting other FIs | Third-party communication; industry coordination; BNM multi-party reporting |
| **Variant C: Out-of-band failure** | Primary and secondary communication channels compromised | Physical assembly; satellite phone; alternate communication methods |

## 3. Participants

*Per Paragraph 11.16 — exercises shall involve the board, senior management, CERT, and relevant third parties*

### 3.1 Participant Matrix

| Group | Participants | Role in Exercise |
|-------|-------------|-----------------|
| **Board of Directors** | Board Chair, Board Risk Committee members | Receive escalation briefings; make strategic decisions (e.g., ransom, disclosure, service suspension) |
| **Senior Management** | CEO, CRO, CTO/CIO, CFO, COO | Decision-making on business impact, resource allocation, external communication |
| **CISO Office** | CISO, Deputy CISO | Incident command; coordinate CERT; advise Board and senior management |
| **CERT** | Full CERT team per CIRP | Execute response procedures: detection, containment, eradication, recovery |
| **SOC** | On-shift SOC analysts and shift lead | Initial detection, triage, and escalation |
| **IT Operations** | Infrastructure and application teams | System isolation, containment actions, recovery operations |
| **Legal** | General Counsel | Legal obligations, evidence preservation, law enforcement liaison |
| **Compliance** | Head of Compliance | Regulatory reporting procedures and timeline adherence |
| **Corporate Communications** | Head of Communications, PR Manager | Media response, customer communication, internal advisory |
| **Business Units** | Heads of affected business lines | Business impact assessment, customer-facing decisions |
| **Third Parties** | [MSSP Name], [IR Retainer Firm], [Cloud Provider] | Third-party response coordination; external support activation |

### 3.2 Observer / Evaluator Team

| Role | Name | Responsibility |
|------|------|----------------|
| Lead Evaluator | [Name] | Overall exercise evaluation; final report author |
| Technical Evaluator | [Name] | Assess SOC and CERT technical response |
| Process Evaluator | [Name] | Assess adherence to CIRP procedures and escalation protocols |
| Communication Evaluator | [Name] | Assess internal and external communication effectiveness |
| Board Evaluator | [Name] | Assess Board and senior management decision-making |

## 4. Out-of-Band Communication Testing

*Per Paragraphs 11.15 and 11.16*

### 4.1 Communication Channels to be Tested

| Channel | Test Method | Success Criteria |
|---------|------------|-----------------|
| Dedicated mobile phones | CERT call tree activation | All CERT members reached within [15] minutes |
| Encrypted messaging (non-corporate) | Group message to CERT channel | Message delivered and acknowledged within [10] minutes |
| Satellite phone | Test call between CISO and CEO | Connection established within [5] minutes |
| Physical assembly point | CERT assembles at designated location | Key personnel assembled within [30] minutes |
| Pre-distributed contact cards | CERT members verify they possess current cards | 100% of CERT members hold current contact cards |

### 4.2 Communication Scenarios

During the exercise, primary corporate communication channels will be declared "compromised" at Phase 4, requiring all subsequent coordination to use out-of-band channels only.

## 5. Testing Focus Areas

*Per Paragraph 11.16(a) and (b)*

### 5.1 Escalation Testing (ref: 11.16(a))

| Test | Criteria | Measurement |
|------|----------|-------------|
| SOC → Incident Commander | Escalation within defined timeline | Time from detection to escalation |
| Incident Commander → CISO | Severity assessment and CERT activation decision | Time and quality of escalation brief |
| CISO → CEO | Strategic escalation with business impact assessment | Completeness and timeliness |
| CISO → Board Chair | Board-level briefing with decision options | Clarity, timeliness, decision quality |
| Compliance → BNM | Regulatory notification preparation and submission | Adherence to prescribed timeline and format |

### 5.2 Communication Testing (ref: 11.16(a))

| Test | Criteria |
|------|----------|
| CERT internal coordination | Clear tasking, status updates, situational awareness across CERT |
| Senior management briefing | Non-technical, decision-focused communication |
| Board communication | Strategic-level briefing enabling informed decision-making |
| External communication — media | Controlled, approved messaging; no information leakage |
| External communication — customers | Clear, actionable guidance for affected customers |
| Regulatory communication | Accurate, timely, complete notification to BNM |

### 5.3 Decision-Making Testing (ref: 11.16(a))

| Decision Point | Options Presented | Evaluates |
|---------------|-------------------|-----------|
| Containment scope | Isolate affected systems only vs. broader network segmentation | Risk appetite, business impact consideration |
| Ransom payment | Pay vs. do not pay | Policy adherence, legal advice, board governance |
| Customer notification | Immediate disclosure vs. investigation-first | Regulatory obligation, reputational risk management |
| Service suspension | Take digital channels offline vs. maintain with degraded security | Customer impact vs. security risk |
| External disclosure | Issue public statement vs. respond only to enquiries | Communications strategy, transparency |

### 5.4 CERT Readiness Testing (ref: 11.16(b))

| Capability | Test Method |
|-----------|------------|
| Mobilisation speed | Time from CERT activation to full team assembled |
| Forensic evidence collection | Timed exercise: collect memory dump, disk image, network capture |
| Containment execution | Timed exercise: isolate host, block IoCs, disable accounts |
| SIEM investigation | Timed exercise: trace attack path using SIEM data |
| Malware analysis | Timed exercise: initial triage of ransomware sample |
| Recovery execution | Timed exercise: restore critical system from backup |

## 6. Exercise Timeline

| Time | Activity | Location |
|------|----------|----------|
| T-60 min | Evaluators briefing and setup | [Exercise control room] |
| T-30 min | Participant check-in and logistics brief | [SOC / War room] |
| T+0:00 | Exercise commences — Phase 1 inject delivered | SOC |
| T+0:30 | Phase 2 inject | SOC / CERT war room |
| T+1:00 | Phase 3 inject; CERT activation | CERT war room |
| T+1:30 | Phase 4 inject (social engineering); out-of-band activation | CERT war room |
| T+2:00 | Phase 5 inject; Board/senior management session begins | Executive conference room |
| T+2:30 | Board deliberation and decision-making | Executive conference room |
| T+3:00 | Phase 6 inject; recovery commences | CERT war room + IT Operations |
| T+4:00 | Phase 7 inject; regulatory reporting | Compliance office |
| T+5:00 | Exercise ENDEX declared | All |
| T+5:15 | Hot wash (immediate debrief) — all participants | [Main conference room] |
| T+5:45 | Evaluator debrief (evaluators only) | [Exercise control room] |

## 7. Evaluation Criteria

### 7.1 Scoring Framework

Each focus area shall be evaluated on a 4-point scale:

| Score | Rating | Definition |
|-------|--------|------------|
| 4 | Excellent | Procedures followed effectively; objectives fully met; minimal gaps |
| 3 | Satisfactory | Procedures followed with minor gaps; objectives substantially met |
| 2 | Needs Improvement | Significant procedural gaps; objectives partially met |
| 1 | Unsatisfactory | Procedures not followed or absent; objectives not met |

### 7.2 Evaluation Areas

| # | Evaluation Area | Weight |
|---|----------------|--------|
| 1 | Detection and initial triage | 10% |
| 2 | CERT activation and mobilisation | 15% |
| 3 | Incident classification accuracy | 10% |
| 4 | Containment decision-making and execution | 15% |
| 5 | Escalation timeliness and quality | 10% |
| 6 | Internal communication effectiveness | 10% |
| 7 | Out-of-band communication execution | 10% |
| 8 | Board/senior management decision-making | 10% |
| 9 | Regulatory reporting readiness | 5% |
| 10 | Recovery planning and execution | 5% |

## 8. Board Reporting Template

### Post-Exercise Board Report

**To:** Board of Directors / Board Risk Committee
**From:** CISO
**Date:** [Date]
**Subject:** Cyber Drill Exercise Report — [Exercise Name]

---

**1. Exercise Summary**

| Item | Detail |
|------|--------|
| Exercise name | [Exercise Name] |
| Date conducted | [Date] |
| Scenario | [Brief scenario description] |
| Duration | [X] hours |
| Participants | [X] personnel across [X] departments |

**2. Overall Assessment**

| Rating | [Excellent / Satisfactory / Needs Improvement / Unsatisfactory] |
|--------|----------------------------------------------------------------|
| Overall score | [X.X / 4.0] |

**3. Key Findings**

| # | Finding | Rating | Impact |
|---|---------|--------|--------|
| 1 | [Finding description] | [Rating] | [Impact on cyber resilience] |
| 2 | [Finding description] | [Rating] | [Impact on cyber resilience] |
| 3 | [Finding description] | [Rating] | [Impact on cyber resilience] |

**4. Strengths Observed**

- [Strength 1]
- [Strength 2]
- [Strength 3]

**5. Areas for Improvement**

| # | Gap | Remediation Action | Owner | Target Date |
|---|-----|-------------------|-------|-------------|
| 1 | [Gap description] | [Action] | [Owner] | [Date] |
| 2 | [Gap description] | [Action] | [Owner] | [Date] |
| 3 | [Gap description] | [Action] | [Owner] | [Date] |

**6. Comparison with Previous Exercise**

| Metric | Previous ([Date]) | Current | Trend |
|--------|-------------------|---------|-------|
| Overall score | [X.X / 4.0] | [X.X / 4.0] | [Improved / Stable / Declined] |
| MTTD (simulated) | [X] minutes | [X] minutes | [Improved / Stable / Declined] |
| CERT mobilisation time | [X] minutes | [X] minutes | [Improved / Stable / Declined] |
| Board escalation time | [X] minutes | [X] minutes | [Improved / Stable / Declined] |

**7. Recommendations to the Board**

1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

**8. Next Exercise**

| Item | Detail |
|------|--------|
| Planned date | [Date] |
| Scenario focus | [Area of focus] |
| Scope | [Participants and systems] |

---

## 9. Logistics and Prerequisites

| Item | Detail |
|------|--------|
| Exercise control room | [Location] |
| CERT war room | [Location] |
| Board/executive session room | [Location] |
| Technical infrastructure | [Lab environment / isolated network / inject delivery platform] |
| Inject delivery method | [Email / phone call / simulated SIEM alert / printed inject cards] |
| Safety word | [Word to pause/stop exercise if real incident occurs] |
| Recording | [Audio/video recording of Board session for training purposes — obtain consent] |
| Catering | [As applicable for extended exercises] |

## 10. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial release |
| | | | |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
