# Monthly Threat Assessment Report

| Field | Value |
|-------|-------|
| **Document ID** | RPT-TI-[YYYY]-[MM] |
| **Report Period** | [Month Year, e.g., February 2026] |
| **Institution** | [FI Name] |
| **Prepared By** | Security Operations Centre |
| **Report Date** | [Date] |
| **Classification** | Confidential |
| **Distribution** | CISO, CRO, Board Risk Committee, Senior Management |

---

## 1. Executive Summary

This report provides the monthly threat assessment for [FI Name] for the period [Month Year], prepared in accordance with BNM RMiT Appendix 5, Part C, Paragraph C3.

**Key highlights:**

- **Total events monitored:** [X,XXX,XXX]
- **Security incidents:** [X] ([X] Critical, [X] High, [X] Medium, [X] Low)
- **Notable threats:** [Brief summary of most significant threat(s) observed]
- **Emerging threat:** [Brief summary of most relevant emerging threat]
- **Overall threat level:** [Elevated / Normal / Heightened] — [unchanged from / increased from / decreased from] previous month

## 2. Cyber Events and Incidents Statistics

*Per Appendix 5, Part C, Paragraph C3(a)*

### 2.1 Event and Incident Summary

| Metric | Current Month | Previous Month | Change |
|--------|--------------|----------------|--------|
| Total events ingested by SIEM | [X,XXX,XXX] | [X,XXX,XXX] | [+/-X%] |
| Events triaged by SOC | [X,XXX] | [X,XXX] | [+/-X%] |
| Confirmed security incidents | [X] | [X] | [+/-X] |
| False positive rate | [X%] | [X%] | [+/-X%] |
| Mean time to detect (MTTD) | [X] minutes | [X] minutes | [+/-X min] |
| Mean time to respond (MTTR) | [X] minutes | [X] minutes | [+/-X min] |

### 2.2 Incidents by Type

| Incident Type | Count | Severity Breakdown | Trend (3-month) |
|--------------|-------|-------------------|-----------------|
| Malware / Ransomware | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Phishing / Social Engineering | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Unauthorised Access | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| DDoS | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Web Application Attack | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Data Exfiltration / Leakage | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Insider Threat | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Vulnerability Exploitation | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| Policy Violation | [X] | C:[X] H:[X] M:[X] L:[X] | [Up / Down / Stable] |
| **Total** | **[X]** | | |

### 2.3 Target and Source IP Analysis

*Per Appendix 5, Part C, Paragraph C3(a) — target and source IPs*

**Top 10 Source IPs (External Attacks)**

| # | Source IP | Country | Attack Type | Event Count | Status |
|---|----------|---------|-------------|-------------|--------|
| 1 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 2 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 3 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 4 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 5 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 6 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 7 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 8 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 9 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |
| 10 | [IP] | [Country] | [Type] | [Count] | [Blocked / Monitored] |

**Top Targeted Internal Systems**

| # | Target System | Criticality | Attack Type | Event Count |
|---|--------------|-------------|-------------|-------------|
| 1 | [System/IP] | [Critical / High / Medium] | [Type] | [Count] |
| 2 | [System/IP] | [Critical / High / Medium] | [Type] | [Count] |
| 3 | [System/IP] | [Critical / High / Medium] | [Type] | [Count] |
| 4 | [System/IP] | [Critical / High / Medium] | [Type] | [Count] |
| 5 | [System/IP] | [Critical / High / Medium] | [Type] | [Count] |

### 2.4 Incidents by Data Centre Location

*Per Appendix 5, Part C, Paragraph C3(a) — DC location*

| Data Centre / Environment | Incidents | Severity Breakdown |
|--------------------------|-----------|-------------------|
| Primary DC — [Location] | [X] | C:[X] H:[X] M:[X] L:[X] |
| Secondary DC / DR — [Location] | [X] | C:[X] H:[X] M:[X] L:[X] |
| Cloud — [AWS / Azure / GCP Region] | [X] | C:[X] H:[X] M:[X] L:[X] |
| Branch network | [X] | C:[X] H:[X] M:[X] L:[X] |
| **Total** | **[X]** | |

### 2.5 Incidents by Application Criticality

*Per Appendix 5, Part C, Paragraph C3(a) — application criticality*

| Application Criticality | Incidents | Examples |
|------------------------|-----------|---------|
| **Critical** (Tier 1) | [X] | Core banking, payment gateway, SWIFT, internet banking |
| **High** (Tier 2) | [X] | Treasury system, trade finance, HR/payroll |
| **Medium** (Tier 3) | [X] | Email, collaboration tools, document management |
| **Low** (Tier 4) | [X] | Development/test environments, non-critical internal tools |
| **Total** | **[X]** | |

## 3. Emerging Threats and TTPs

*Per Appendix 5, Part C, Paragraph C3(b)*

### 3.1 Threat Landscape Update

| # | Threat | Relevance to [FI Name] | Risk Level | Recommended Action |
|---|--------|------------------------|-----------|-------------------|
| 1 | [Threat name/description, e.g., "New ransomware variant targeting SWIFT environments"] | [High / Medium / Low] | [Critical / High / Medium / Low] | [Action, e.g., "Verify SWIFT environment patching; update EDR signatures"] |
| 2 | [Threat name/description] | [High / Medium / Low] | [Critical / High / Medium / Low] | [Action] |
| 3 | [Threat name/description] | [High / Medium / Low] | [Critical / High / Medium / Low] | [Action] |

### 3.2 Adversary TTPs Observed

| MITRE ATT&CK Tactic | Technique ID | Technique Name | Observed / Intelligence | Detection Status |
|---------------------|-------------|----------------|------------------------|-----------------|
| Initial Access | [T-XXXX] | [Technique] | [Observed in [FI Name] environment / Intelligence from ISAC / Vendor advisory] | [Detected / Detection rule pending / Gap] |
| Execution | [T-XXXX] | [Technique] | [Source] | [Status] |
| Persistence | [T-XXXX] | [Technique] | [Source] | [Status] |
| Lateral Movement | [T-XXXX] | [Technique] | [Source] | [Status] |
| Exfiltration | [T-XXXX] | [Technique] | [Source] | [Status] |

### 3.3 Sector-Specific Intelligence

| Source | Intelligence | Impact |
|--------|-------------|--------|
| MyCERT Advisory | [Advisory summary] | [Impact assessment for FI Name] |
| Financial ISAC | [Intelligence summary] | [Impact assessment] |
| BNM Circular / Advisory | [Summary] | [Impact assessment] |
| Vendor Threat Report | [Summary] | [Impact assessment] |

## 4. Threat Intelligence Highlights

### 4.1 Key Intelligence Products Consumed

| # | Source | Product | Actionable IoCs |
|---|--------|---------|----------------|
| 1 | [Source, e.g., Recorded Future] | [Report title] | [X] IoCs ingested |
| 2 | [Source] | [Report title] | [X] IoCs ingested |
| 3 | [Source] | [Report title] | [X] IoCs ingested |

### 4.2 Intelligence Sharing

| Activity | Detail |
|----------|--------|
| IoCs shared with industry peers | [X] indicators shared via [ISAC / MISP] |
| IoCs received from peers | [X] indicators received and operationalised |
| Advisories issued internally | [X] internal threat advisories distributed to IT/business |

## 5. Indicators of Compromise (IoC) Summary

### 5.1 IoC Statistics

| IoC Type | New This Month | Total Active | Matched in Environment |
|----------|---------------|-------------|----------------------|
| IP addresses | [X] | [X] | [X] |
| Domain names | [X] | [X] | [X] |
| URLs | [X] | [X] | [X] |
| File hashes (SHA256) | [X] | [X] | [X] |
| Email addresses | [X] | [X] | [X] |
| YARA rules | [X] | [X] | [X] matches |
| **Total** | **[X]** | **[X]** | **[X]** |

### 5.2 Notable IoCs

| # | IoC | Type | Associated Threat | Action Taken |
|---|-----|------|-------------------|-------------|
| 1 | [IoC value] | [Type] | [Threat/campaign name] | [Blocked / Monitored / Investigated] |
| 2 | [IoC value] | [Type] | [Threat/campaign name] | [Action] |
| 3 | [IoC value] | [Type] | [Threat/campaign name] | [Action] |

## 6. Recommendations

### 6.1 Immediate Actions

| # | Recommendation | Priority | Owner | Target Date |
|---|---------------|----------|-------|-------------|
| 1 | [Recommendation, e.g., "Patch CVE-XXXX-XXXXX on all internet-facing systems"] | Critical | [Owner] | [Date] |
| 2 | [Recommendation] | High | [Owner] | [Date] |
| 3 | [Recommendation] | High | [Owner] | [Date] |

### 6.2 Strategic Recommendations

| # | Recommendation | Rationale | Target Quarter |
|---|---------------|-----------|---------------|
| 1 | [Recommendation, e.g., "Implement network detection and response (NDR) for east-west traffic monitoring"] | [Rationale based on observed gaps or emerging threats] | [Quarter] |
| 2 | [Recommendation] | [Rationale] | [Quarter] |

### 6.3 Detection Gap Remediation

| Gap | MITRE ATT&CK Reference | Remediation | Status |
|-----|------------------------|-------------|--------|
| [Detection gap, e.g., "No detection for living-off-the-land techniques"] | [T-XXXX] | [Remediation, e.g., "Deploy Sysmon with enhanced logging; create correlation rules"] | [In progress / Planned / Completed] |
| [Gap] | [T-XXXX] | [Remediation] | [Status] |

## 7. SOC Operational Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| SIEM uptime | 99.9% | [X%] | [Met / Not Met] |
| Log source coverage (critical systems) | 100% | [X%] | [Met / Not Met] |
| Mean time to detect (Severity 1–2) | < [X] min | [X] min | [Met / Not Met] |
| Mean time to respond (Severity 1–2) | < [X] min | [X] min | [Met / Not Met] |
| False positive rate | < [X%] | [X%] | [Met / Not Met] |
| Threat hunts completed | [X] | [X] | [Met / Not Met] |
| Analyst training hours | [X] hrs/analyst | [X] hrs | [Met / Not Met] |

---

## Appendix: Detailed Incident Log

| Incident ID | Date | Type | Severity | Affected System | Description | Status | Resolution |
|------------|------|------|----------|----------------|-------------|--------|------------|
| INC-[YYYY]-[####] | [Date] | [Type] | [Sev] | [System] | [Brief description] | [Open / Closed] | [Resolution summary] |
| INC-[YYYY]-[####] | [Date] | [Type] | [Sev] | [System] | [Brief description] | [Open / Closed] | [Resolution summary] |
| INC-[YYYY]-[####] | [Date] | [Type] | [Sev] | [System] | [Brief description] | [Open / Closed] | [Resolution summary] |
| INC-[YYYY]-[####] | [Date] | [Type] | [Sev] | [System] | [Brief description] | [Open / Closed] | [Resolution summary] |
| INC-[YYYY]-[####] | [Date] | [Type] | [Sev] | [System] | [Brief description] | [Open / Closed] | [Resolution summary] |

---

**Report Prepared By:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| SOC Manager | [Name] | __________ | [Date] |
| CISO | [Name] | __________ | [Date] |

---

*This document is classified as Confidential and is the property of [FI Name]. Unauthorised distribution is prohibited.*
