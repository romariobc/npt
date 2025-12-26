# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Last Updated**: December 25, 2025
**Version**: 2025.12
**Git Repository**: https://github.com/romariobc/npt

---

## Project Overview

Sistema NPT HUWC (Nutritional Parenteral Therapy) - A single-page web application for managing the complete lifecycle of NPT prescriptions, from medical prescription to final dispensing or loss/return. Implements the official HUWC workflow effective from 02/12/2025.

**Project Status**: ✅ Production Ready | 📦 Published on GitHub | 📊 Full Reports & Dashboards

---

## Recent Changes (December 25, 2025)

### ✨ Major Updates

1. **SharePoint Version Enhanced**:
   - ✅ Added complete Reports & Dashboards tab
   - ✅ 6 KPIs in real-time (Total, Dispensadas, Aguardando, Perdas, Taxa Aproveitamento, Taxa Conformidade)
   - ✅ 3 interactive charts with Chart.js 4.4.0:
     - Doughnut chart: Prescription status distribution
     - Horizontal bar chart: Top 10 loss reasons
     - Line chart: 7-day temporal evolution
   - ✅ Detailed loss analysis table with percentages and visual progress bars

2. **Documentation Improvements**:
   - ✅ Complete SharePoint deployment guide (10 parts, 850+ lines)
   - ✅ Professional README.md with badges and structure
   - ✅ All documentation organized in `/docs/` folder
   - ✅ Git repository configured with .gitignore

3. **Repository Structure**:
   - ✅ Published to GitHub: https://github.com/romariobc/npt
   - ✅ Files renamed for clarity:
     - `sistema-npt-local-2025-12.html` (localStorage version)
     - `sistema-npt-sharepoint-2025-12.html` (SharePoint + Reports)
   - ✅ 8 technical documents in `/docs/`
   - ✅ Initial commit completed

### 🗂️ File Naming Convention Update

**Previous**: `sistema-npt-2025-12.html`
**Current**: `sistema-npt-local-2025-12.html` (localStorage)
**Current**: `sistema-npt-sharepoint-2025-12.html` (SharePoint + Dashboards)

This change clarifies which version is local (standalone) vs SharePoint (enterprise).

---

## Files in Repository

### Application Files
- `sistema-npt-local-2025-12.html` - **LOCAL VERSION (localStorage)** - Standalone with browser storage (USE THIS for single-user/testing)
- `sistema-npt-sharepoint-2025-12.html` - **SHAREPOINT VERSION** - Enterprise edition with SharePoint integration, reports & dashboards (USE THIS for production)
- `sistema-npt-2025-08-legacy.html` - Legacy version with simplified flow (DEPRECATED - Aug 2025)

### SharePoint Integration Files
- `config.js` - SharePoint configuration (site URL, list names, settings)
- `sharepoint-api.js` - SharePoint REST API wrapper (CRUD operations)
- `auth-simulator.js` - Development authentication simulator (DO NOT use in production)

### Documentation (in `/docs/` folder)
- `CLAUDE.md` - This file (project overview and instructions)
- `README.md` - Main project documentation (GitHub landing page)
- `SHAREPOINT-DEPLOYMENT.md` - Complete SharePoint deployment guide (10 parts)
- `DOCUMENTACAO_TECNICA.md` - Full technical documentation
- `ROTEIRO_TESTES.md` - Complete test cases
- `CHECKLIST_VALIDACAO.md` - Validation checklist
- `APRESENTACAO_TI.md` - IT presentation
- `GUIA_CONFIGURACAO_SHAREPOINT.md` - SharePoint configuration guide
- `ESTRUTURA_PROJETO.md` - Project structure
- `PLANEJAMENTO_BACKEND_SEGURO.md` - Secure backend planning

### Authentication
- `usuarios.json` - User credentials for localStorage version

### Git Configuration
- `.gitignore` - Excludes `.claude/`, `.claude`, logs, cache, IDE configs

## Architecture

### Single-File Structure
The local application is contained in `sistema-npt-local-2025-12.html`:
- **Frontend**: HTML5 with Bootstrap 5.3.0
- **Styling**: Embedded CSS with Bootstrap components
- **Logic**: Modern vanilla JavaScript (ES6+) with no build process
- **Data Storage**: Browser localStorage (`registrosNPT_v2` key)
- **Authentication**: JSON-based user credentials loaded from `usuarios.json`

### Official HUWC Workflow (Vigência: 02/12/2025)

The system implements a 4-stage workflow:

**Stage 1: Prescrição (Prescription Registration)**
- Medical prescription received via email (fscmhuwc@gmail.com)
- Pharmacist forwards to Pronutrir supplier
- Print 2 copies: Via 1 (archive), Via 2 (verification)
- Status: "Aguardando Bolsa"

**Stage 2: Recebimento da Bolsa (Bag Receipt - Afternoon)**
- Physical bag arrives from Pronutrir
- Mandatory verification: label, patient name, bed, flow rate, temperature, integrity
- Can be performed by pharmacist or trained technician
- If inconsistent → immediate return to Pronutrir + occurrence registration
- Status: "Conforme" or "Inconsistente"

**Stage 3: Dispensação (Dispensing - Night ~21h)**
- Re-verification required (prescription vs bag)
- Bag sent to unit with prescription
- Record who delivered and who received
- Fill Google Forms indicator (dispensed bags)
- Status: "Dispensada"

**Stage 4: Perdas/Devoluções (Losses/Returns)**
- Record returns to Pronutrir or losses
- Common reasons: wrong temperature, composition, volume, patient ID, integrity, cancellation, discharge, death, expiration
- Fill Google Forms indicator (lost bags)
- Status: "Devolvida"

### Data Schema

**Prescrição Record**
```javascript
{
  tipo: 'Prescrição',
  idPrescricao: string,    // Unique ID (auto-generated: NPT-00001, NPT-00002, etc.)
  paciente: string,
  prontuario: string,      // Medical record number
  leito: string,           // Bed number
  vazao: string,           // Flow rate (e.g., "50 mL/h")
  volume: string,          // Total volume (e.g., "1200 mL")
  composicao: string,      // Composition description
  observacoes: string,
  dataHora: string,        // Timestamp
  usuario: string,         // Authenticated user
  status: 'Aguardando Bolsa' | 'Bolsa Recebida' | 'Dispensada' | 'Devolvida',
  detalhes: string
}
```

**Recebimento Record**
```javascript
{
  tipo: 'Recebimento',
  idPrescricao: string,    // Reference to prescription
  lote: string,            // Lot number from Pronutrir
  paciente: string,        // Auto-filled from prescription
  leito: string,           // Auto-filled from prescription
  temperatura: 'Sim' | 'Não',
  integridade: 'Íntegra' | 'Violada',
  status: 'Conforme' | 'Inconsistente',
  conferente: string,      // Name of person who verified
  observacoes: string,
  dataHora: string,
  usuario: string,
  detalhes: string
}
```

**Dispensação Record**
```javascript
{
  tipo: 'Dispensação',
  idPrescricao: string,    // Reference to prescription
  lote: string,            // Auto-filled from receipt
  paciente: string,        // Auto-filled
  leito: string,           // Auto-filled
  horaDispensa: string,    // Time of dispensing (default: 21:00)
  entregou: string,        // Who delivered
  recebeu: string,         // Who received (unit staff)
  observacoes: string,
  dataHora: string,
  usuario: string,
  detalhes: string
}
```

**Perda/Devolução Record**
```javascript
{
  tipo: 'Perda/Devolução',
  idPrescricao: string,
  tipoPerdaString: 'Devolução' | 'Perda',
  motivo: string,          // Dropdown selection
  detalhes: string,        // Required detailed description
  dataHora: string,
  usuario: string
}
```

### Key Linking Mechanism

1. **idPrescricao** is the master key linking all stages
2. Prescription creates initial record with unique ID
3. Receipt references idPrescricao, adds lote number
4. Dispensing references idPrescricao to find receipt and prescription data
5. Loss/return can occur at any stage using idPrescricao or lote

### Dynamic Select Population

- **Recebimento dropdown**: Shows only prescriptions with status "Aguardando Bolsa"
- **Dispensação dropdown**: Shows only receipts with status "Conforme" that haven't been dispensed yet
- Automatically updates after each transaction
- Auto-fills patient/bed/flow/volume data when selection changes

### Authentication System
- Modal-based login before ALL operations
- Loads credentials from `usuarios.json` with fallback to defaults
- Each transaction records authenticated user
- No session persistence (login required per operation)

## User Credentials

User authentication is managed through `usuarios.json` with the following structure:
```json
{
  "username": "password"
}
```

Default users (fallback if usuarios.json unavailable):
- admin: 12345
- tecnico1: senha1
- tecnico2: senha2
- farmacia: farm123
- supervisor: super456
- teste: 123

## Running the Application

### Local Version (localStorage)
**To run**: Simply open `sistema-npt-local-2025-12.html` in any modern web browser. No build process, server, or dependencies required.

### SharePoint Version
**To run**: Follow the [SharePoint Deployment Guide](docs/SHAREPOINT-DEPLOYMENT.md) for complete setup instructions.

**Browser Requirements**:
- LocalStorage API support
- ES6+ JavaScript (arrow functions, template literals, const/let)
- Modern HTML5 features
- Bootstrap 5.3.0 support

**External Dependencies** (loaded from CDN):
- Bootstrap 5.3.0 (CSS/JS) - required for tabs, modals, and styling

## Data Management

**LocalStorage Key**: `registrosNPT_v2`
- Data persists across browser sessions
- Stored as JSON array of registro objects
- No backend/database - all data is client-side only
- **Note**: Different key from legacy version to avoid conflicts

**Critical Workflow Validation**:
1. **Prescrição**: Validates unique idPrescricao (prevents duplicates)
2. **Recebimento**: Only shows prescriptions with status "Aguardando Bolsa"
3. **Dispensação**: Only shows receipts with status "Conforme" that haven't been dispensed
4. **Status Updates**: Prescription status automatically updated through workflow stages

## Export Functionality

**CSV Export**: Direct browser download with UTF-8 BOM, proper escaping, and all fields
**PDF Export**: Placeholder (shows alert to use CSV for now)

## External Integrations Required

**Google Forms** (manual - not automated):
- Form for dispensed bags indicator
- Form for lost/returned bags indicator
- Users must fill these manually after registering in system

**Email**: fscmhuwc@gmail.com (manual - prescription reception)

## Auto-Generated Prescription ID

**Format**: `NPT-XXXXX` (e.g., NPT-00001, NPT-00002, NPT-00150)

**Generation Logic**:
- Counter stored in localStorage (`contadorPrescricao_v2`)
- Starts at 1, increments globally (never resets)
- 5-digit zero-padded number
- Auto-displayed in readonly field on prescription form
- Increments after successful save

**Counter Persistence**:
- Saved to localStorage after each prescription
- Loaded on page initialization
- Survives browser refresh
- Independent of registros array

**Functions**:
- `gerarProximoIdPrescricao()` - Generates next ID string
- `atualizarCampoIdPrescricao()` - Updates form field with next ID

## Validation Rules

**Prescription ID**: Auto-generated, no manual input, no duplicate checks needed
**Required Fields**: All fields marked with * are required before submission
**Status Progression**: Prescrição → Bolsa Recebida → Dispensada (or → Devolvida)

## SharePoint Version Features

### Overview
The SharePoint version (`sistema-npt-sharepoint-2025-12.html`) is an enterprise-ready edition that integrates with Microsoft SharePoint Online for persistent data storage, collaboration, and advanced reporting.

### Key Differences from localStorage Version

**Data Storage:**
- SharePoint Lists instead of browser localStorage
- Centralized, persistent, and backed-up data
- Multi-user access with proper concurrency control
- Accessible from any device/browser

**Authentication:**
- Development mode: Simulated authentication (auth-simulator.js)
- Production mode: Microsoft Entra ID (Azure AD) integration
- User tracking on all transactions

**Reports & Dashboards:**
- KPI cards: Total prescriptions, dispensed bags, pending, losses
- Performance metrics: Utilization rate, conformity rate
- Interactive charts (Chart.js):
  - Pie chart: Prescription status distribution
  - Horizontal bar: Top loss/return reasons
  - Line chart: 7-day temporal evolution
- Detailed loss analysis table with percentages

**SharePoint Lists Structure:**
1. **Prescricoes** - Prescription master records
2. **Recebimentos** - Receipt verification records
3. **Dispensacoes** - Dispensing transactions
4. **Perdas** - Loss/return records

### Deployment
See `SHAREPOINT-DEPLOYMENT.md` for complete step-by-step deployment instructions including:
- SharePoint site and list creation
- Column configuration
- Permission setup
- File upload and configuration
- Testing procedures
- Production readiness checklist

### Configuration Files

**config.js:**
- `SITE_URL`: SharePoint site URL (MUST be configured before use)
- `LISTAS`: List names (must match SharePoint exactly)
- `MODO_DESENVOLVIMENTO`: Toggle between dev/production mode
- `DEBUG`: Enable detailed console logging

**sharepoint-api.js:**
- REST API wrapper for SharePoint operations
- CRUD functions (Create, Read, Update, Delete)
- Form Digest management (auto-renewal)
- Specific modules: Prescricoes, Recebimentos, Dispensacoes, Perdas

**auth-simulator.js:**
- Development-only authentication simulator
- Test users: admin, farmacia, tecnico1, tecnico2, supervisor
- **CRITICAL**: Remove from production environment

### When to Use Each Version

**Use localStorage version** (`sistema-npt-local-2025-12.html`) when:
- Single-user or small team
- No SharePoint infrastructure available
- Quick deployment needed
- Testing/prototyping

**Use SharePoint version** (`sistema-npt-sharepoint-2025-12.html`) when:
- Multi-user environment with collaboration needs
- Enterprise data governance required
- Backup and audit trail essential
- Advanced reporting and analytics needed
- Integration with other hospital systems

## Important Limitations

### localStorage Version
- No server-side validation - all security is client-side
- Passwords stored in plain text in `usuarios.json`
- Data loss possible if localStorage is cleared
- No automated data backup mechanism
- Browser-specific - data doesn't sync across devices/browsers
- No integration with Google Forms (manual entry required)
- No email automation (manual forwarding to Pronutrir)

### SharePoint Version
- Requires SharePoint Online subscription
- Network connectivity required (no offline mode)
- Initial setup complexity (see deployment guide)
- Production requires Microsoft Entra ID configuration by IT
- Performance depends on SharePoint service availability
- Browser compatibility: Modern browsers only (Chrome, Edge, Firefox)

---

## Version History

### v2025.12 (December 25, 2025) - Current ✅
- **Added**: Complete Reports & Dashboards in SharePoint version
  - 6 real-time KPIs with color-coded cards
  - 3 interactive Chart.js visualizations
  - Detailed loss analysis table
- **Added**: Complete SharePoint deployment documentation (850+ lines)
- **Added**: Professional README.md with project structure
- **Improved**: Documentation organized in `/docs/` folder
- **Changed**: File naming convention for clarity:
  - `sistema-npt-local-2025-12.html` (localStorage)
  - `sistema-npt-sharepoint-2025-12.html` (SharePoint + Reports)
- **Published**: GitHub repository at https://github.com/romariobc/npt
- **Fixed**: Git configuration with proper .gitignore

### v2025.08 (August 2025) - Legacy
- Initial version with simplified flow
- Basic localStorage implementation
- Deprecated in favor of v2025.12

---

## Development Roadmap

### ✅ Completed
- [x] Full workflow implementation (4 stages)
- [x] SharePoint integration
- [x] Reports and dashboards
- [x] Chart.js visualizations
- [x] Complete documentation
- [x] GitHub repository
- [x] Deployment guides

### 🔄 In Progress
- [ ] Entra ID authentication (production)
- [ ] PDF export for reports
- [ ] Power Automate notifications

### 📋 Planned
- [ ] Power BI integration
- [ ] Custom REST API
- [ ] PWA (Progressive Web App)
- [ ] Mobile-specific interface
- [ ] Advanced analytics (predictive models)

---

## Support and Contact

**For Development Questions**:
- Check this CLAUDE.md file first
- Review documentation in `/docs/` folder
- Check GitHub Issues: https://github.com/romariobc/npt/issues

**For Deployment Support**:
- Follow [SHAREPOINT-DEPLOYMENT.md](docs/SHAREPOINT-DEPLOYMENT.md)
- Contact IT department for Entra ID configuration

**For Clinical/Operational Questions**:
- Email: fscmhuwc@gmail.com
- Hospital Universitário Walter Cantídio

---

**Document Version**: 1.1
**Last Review**: December 25, 2025
**Next Review**: March 2026
