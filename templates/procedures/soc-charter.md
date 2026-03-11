# Security Operations Centre (SOC) Charter

| Field | Value |
|-------|-------|
| **Document ID** | PROC-SOC-001 |
| **Institution** | [FI Name] |
| **Version** | [Version, e.g., 1.0] |
| **Effective Date** | [Date] |
| **Last Reviewed** | [Date] |
| **Next Review** | [Date + 12 months] |
| **Classification** | Confidential |
| **Owner** | Chief Information Security Officer (CISO) |
| **Approved By** | Board of Directors / Board Risk Committee |

---

## 1. Mission

The Security Operations Centre (SOC) is [FI Name]'s centralised capability for continuous monitoring, detection, analysis, and initial response to cyber threats and security events. The SOC serves as the first line of defence in the Detect phase of the Cyber Resilience Framework (CRF) and provides the operational foundation for the institution's cyber resilience posture.

This charter is aligned with BNM RMiT Paragraphs 11.8–11.12 and Appendix 5 Parts B (SOC Operations), C (Threat Assessment), and E (SOC Physical Security).

## 2. Scope

The SOC's monitoring and detection coverage encompasses:

- All production systems, networks, and infrastructure (on-premises and cloud)
- Digital services channels (online banking, mobile banking, API gateways)
- Identity and access management systems
- Email and web gateway security
- Endpoint devices (workstations, servers, mobile devices)
- Third-party connections and managed service provider environments
- Operational technology (OT) and IoT devices where applicable
- Data loss prevention and insider threat monitoring

## 3. Services Provided

### 3.1 Core Services

| Service | Description | Reference |
|---------|-------------|-----------|
| **SIEM Operations** | Deployment, tuning, and operation of Security Information and Event Management platform; log ingestion, correlation rule management, alert triage | App5-B |
| **Continuous Monitoring** | 24x7 monitoring of security events across all in-scope systems and networks | 11.8, 11.9 |
| **Incident Detection & Triage** | Initial detection, classification, and triage of security events; escalation of confirmed incidents to CERT | 11.10, App5-B |
| **Incident Response (Initial)** | First-responder actions including initial containment, evidence preservation, and handoff to CERT for Severity 1–2 incidents | 11.13 |
| **Threat Hunting** | Proactive search for indicators of compromise and adversary activity not detected by automated tools | App5-B |
| **Vulnerability Management** | Coordination of vulnerability scanning, assessment prioritisation, and remediation tracking | App5-D |
| **Digital Forensics** | Evidence collection, preservation, and analysis in support of incident investigations | 11.13 |
| **Threat Intelligence** | Collection, analysis, and dissemination of cyber threat intelligence relevant to the financial sector | 11.4–11.7, App5-A |

### 3.2 Reporting Services

| Report | Frequency | Audience | Reference |
|--------|-----------|----------|-----------|
| **Monthly Threat Assessment Report** | Monthly | CISO, Senior Management, Board Risk Committee | App5-C3 |
| **SOC Operations Report** | Monthly | CISO, IT Management | 11.12 |
| **Incident Summary Report** | Per incident | CERT, CISO, affected stakeholders | 11.13 |
| **Vulnerability Status Report** | Monthly | CISO, IT Operations, Application Owners | App5-D |
| **Threat Intelligence Briefing** | Weekly / Ad-hoc | CISO, SOC Analysts, CERT | App5-A |

## 4. Operating Model

### 4.1 Operating Hours

The SOC shall operate on a **24 hours x 7 days** basis, including public holidays, to ensure continuous monitoring and detection capability.

| Shift | Hours | Minimum Staffing |
|-------|-------|-----------------|
| Day shift | 08:00–16:00 MYT | [X] analysts + 1 shift lead |
| Evening shift | 16:00–00:00 MYT | [X] analysts + 1 shift lead |
| Night shift | 00:00–08:00 MYT | [X] analysts + 1 shift lead |

### 4.2 Operating Model Options

[FI Name] operates a [select one]:

- [ ] **Fully in-house SOC** — All staff are [FI Name] employees
- [ ] **Hybrid SOC** — Core functions in-house with [Tier 1 monitoring / threat hunting / forensics] outsourced to [MSSP Name]
- [ ] **Managed SOC** — Outsourced to [MSSP Name] with [FI Name] oversight and escalation governance

*Note: Regardless of model, [FI Name] retains accountability for SOC effectiveness and BNM compliance.*

### 4.3 Escalation Tiers

| Tier | Role | Responsibility |
|------|------|----------------|
| **Tier 1** | SOC Analyst | Alert monitoring, initial triage, false positive filtering, ticket creation |
| **Tier 2** | Senior SOC Analyst | Deep-dive analysis, correlation, threat hunting, incident investigation |
| **Tier 3** | SOC Engineer / Threat Hunter | Advanced analysis, malware reverse engineering, forensics, SIEM tuning |
| **Escalation** | Incident Commander / CISO | CERT activation per CIRP for confirmed Severity 1–2 incidents |

## 5. Staffing and Competency Requirements

### 5.1 SOC Organisation Structure

```
CISO
 └── SOC Manager
      ├── Shift Lead (Day)
      │    ├── Tier 2 Analyst(s)
      │    └── Tier 1 Analyst(s)
      ├── Shift Lead (Evening)
      │    ├── Tier 2 Analyst(s)
      │    └── Tier 1 Analyst(s)
      ├── Shift Lead (Night)
      │    ├── Tier 2 Analyst(s)
      │    └── Tier 1 Analyst(s)
      ├── Threat Intelligence Analyst(s)
      ├── Threat Hunter(s)
      ├── SOC Engineer(s) (SIEM, SOAR, EDR)
      └── Digital Forensic Analyst(s)
```

### 5.2 Minimum Competency Requirements

| Role | Minimum Qualifications | Recommended Certifications |
|------|----------------------|---------------------------|
| SOC Manager | 8+ years cybersecurity experience; 3+ years SOC leadership | CISSP, CISM, GSOM |
| Shift Lead | 5+ years cybersecurity experience; 2+ years SOC experience | CISSP, GCIH, GCIA |
| Tier 2 Analyst | 3+ years SOC or security operations experience | GCIH, GCIA, CySA+, ECIH |
| Tier 1 Analyst | 1+ years IT/security experience; demonstrated analytical capability | Security+, CySA+, BTL1 |
| Threat Intelligence Analyst | 3+ years threat intelligence or security research experience | GCTI, CTIA |
| Threat Hunter | 5+ years security experience; advanced adversary TTP knowledge | GCFA, GCIH, GREM |
| SOC Engineer | 3+ years SIEM/SOAR administration experience | Vendor-specific (Splunk, Sentinel, etc.) |
| Digital Forensic Analyst | 3+ years digital forensics experience | GCFA, GCFE, EnCE, CHFI |

### 5.3 Training and Development

- All SOC personnel shall complete a minimum of [40] hours of cybersecurity training annually
- Analysts shall participate in regular tabletop exercises and purple team activities
- Threat intelligence and TTP knowledge shall be updated through continuous MITRE ATT&CK training
- Cross-training between tiers to ensure succession planning and operational resilience

## 6. Tools and Technology Stack

| Category | Tool/Platform | Purpose |
|----------|--------------|---------|
| **SIEM** | [e.g., Splunk Enterprise Security / Microsoft Sentinel / IBM QRadar] | Log aggregation, correlation, alerting, dashboarding |
| **SOAR** | [e.g., Splunk SOAR / Palo Alto XSOAR / Swimlane] | Playbook automation, case management, orchestration |
| **EDR/XDR** | [e.g., CrowdStrike Falcon / Microsoft Defender for Endpoint / SentinelOne] | Endpoint detection, response, and telemetry |
| **NDR** | [e.g., Darktrace / Vectra / Corelight] | Network traffic analysis and anomaly detection |
| **TIP** | [e.g., MISP / Anomali / Recorded Future] | Threat intelligence aggregation, enrichment, sharing |
| **Vulnerability Scanner** | [e.g., Tenable / Qualys / Rapid7] | Vulnerability discovery and assessment |
| **Forensics** | [e.g., EnCase / X-Ways / Volatility / Velociraptor] | Digital evidence collection and analysis |
| **Ticketing** | [e.g., ServiceNow / Jira] | Incident and case tracking |
| **Communication** | [e.g., Dedicated secure channel] | SOC internal communication |

### 6.1 Log Source Coverage

The SOC shall maintain log ingestion from, at minimum:

- Firewalls and next-generation firewalls
- Web application firewalls (WAF)
- Intrusion detection/prevention systems (IDS/IPS)
- Proxy and web gateway logs
- DNS query logs
- Email security gateway logs
- Active Directory / LDAP authentication logs
- Privileged access management (PAM) logs
- Database activity monitoring logs
- Cloud service provider audit logs (AWS CloudTrail, Azure Activity Log, etc.)
- Application logs for critical systems (core banking, payment, digital channels)
- Endpoint detection and response telemetry
- VPN and remote access logs
- Data loss prevention (DLP) logs

## 7. Reporting

### 7.1 Monthly Threat Assessment Report

*Per Appendix 5, Part C, Paragraph C3*

The SOC shall produce a monthly threat assessment report containing:

**(a) Cyber events and incidents statistics:**
- Number and type of events and incidents (categorised by attack type)
- Target and source IP addresses (anonymised as appropriate)
- Data centre location of affected systems
- Application criticality classification of affected systems

**(b) Emerging threats and TTPs:**
- New threats relevant to the Malaysian financial sector
- Observed adversary tactics, techniques, and procedures
- Relevant threat intelligence from industry sharing (ISAC, MyCERT, vendor feeds)

**(c) Recommendations:**
- Control enhancement recommendations based on observed threats
- Emerging risk areas requiring management attention

### 7.2 Report Distribution

| Report | Recipients | Format |
|--------|-----------|--------|
| Monthly Threat Assessment | CISO, CRO, Board Risk Committee | Executive summary + detailed appendix |
| SOC Operations Report | CISO, IT Management | Dashboard + narrative |
| Weekly Threat Brief | CISO, SOC Team, CERT | Briefing document |
| Ad-hoc Threat Advisory | Relevant stakeholders | Advisory bulletin |

## 8. Physical Security Requirements

*Per Appendix 5, Part E (App5-C5)*

The SOC facility shall meet the following physical security requirements:

| Requirement | Standard |
|-------------|----------|
| **Physical access control** | Biometric + card access; restricted to authorised SOC personnel only |
| **Visitor management** | All visitors escorted; visitor log maintained; no unescorted access |
| **CCTV monitoring** | 24x7 CCTV coverage of SOC facility entrance, work areas, and server room; [90-day] retention |
| **Environmental controls** | Redundant HVAC, UPS, fire suppression appropriate for IT equipment |
| **Clean desk policy** | No unauthorised documents, devices, or storage media in the SOC |
| **Network isolation** | SOC management network logically separated from corporate network |
| **Communication security** | Secure communication channels for SOC-to-CERT coordination |
| **Alternate site** | Documented and tested failover to alternate SOC facility or remote operations capability |

## 9. Performance Metrics and KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Mean Time to Detect (MTTD)** | < [X] minutes for Severity 1–2 | Time from event occurrence to SOC detection |
| **Mean Time to Respond (MTTR)** | < [X] minutes for Severity 1–2 | Time from detection to initial response action |
| **Mean Time to Contain (MTTC)** | < [X] hours for Severity 1–2 | Time from detection to confirmed containment |
| **Alert volume** | Monitored monthly; trending | Total alerts ingested, triaged, escalated |
| **False positive rate** | < [X]% | Percentage of alerts determined to be false positives |
| **Escalation accuracy** | > [X]% | Percentage of escalated alerts confirmed as true incidents |
| **Log source coverage** | 100% of critical systems | Percentage of in-scope systems with active log ingestion |
| **SIEM uptime** | > 99.9% | Platform availability |
| **Correlation rule coverage** | Mapped to MITRE ATT&CK | Percentage of relevant ATT&CK techniques with detection rules |
| **Threat hunting cadence** | [X] hunts per month | Number of proactive threat hunts completed |
| **Analyst training hours** | [X] hours per analyst per year | Annual training completion |
| **Monthly report timeliness** | By [5th] business day | Delivery of monthly threat assessment report |

## 10. Review and Continuous Improvement

The SOC Charter shall be reviewed:

- Annually as part of the CRF policy review cycle
- Following significant cyber incidents that reveal SOC capability gaps
- Upon material changes to the technology environment or threat landscape
- When directed by BNM or internal audit findings

Continuous improvement shall be driven by:

- Post-incident lessons learned
- Purple team and red team exercise findings
- Benchmarking against industry standards (NIST CSF, SOC-CMM)
- Analyst feedback and operational metrics analysis

## 11. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| SOC Manager | [Name] | __________ | [Date] |
| CISO | [Name] | __________ | [Date] |
| CRO / Head of Risk | [Name] | __________ | [Date] |
| Board Risk Committee Chair | [Name] | __________ | [Date] |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
