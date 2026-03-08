# Reliability Baseline

## Ownership
MC Engineer owns website/backend reliability, uptime checks, and proactive issue response.

## Baseline implemented
- Backend health endpoint: `GET /health`
- Daily health check automation:
  - OpenClaw cron at **5:00 AM America/New_York**
  - GitHub Actions scheduled check (`.github/workflows/daily-health-check.yml`)

## Daily run expectations
1. Validate website availability and page response
2. Validate backend `/health` endpoint and uptime signal
3. Check for errors/incidents in logs
4. Resolve issues before business hours when possible
5. Publish detailed report in Mission Control channel (`1476563019353034806`):
   - overall status
   - incidents detected
   - fixes completed
   - remaining risks / follow-ups

## Security/logging guardrails
- Do not include secrets, tokens, or PII in reports.
- Keep remediation notes actionable but sanitized.
