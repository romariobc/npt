# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Last Updated**: January 7, 2026
**Version**: 2025.12
**Git Repository**: https://github.com/romariobc/npt

---

## Project Overview

Sistema NPT HUWC (Nutritional Parenteral Therapy) - A single-page web application for managing the complete lifecycle of NPT prescriptions, from medical prescription to final dispensing or loss/return. Implements the official HUWC workflow effective from 02/12/2025.

**Project Status**: ✅ Production Ready | 📦 Published on GitHub | 📊 Full Reports & Dashboards

---

## Recent Changes

### 📐 January 10, 2026 - EBSERH Brand Manual Integration

**EBSERH Manual de Identidade Visual (v2.2)**:
- ✅ Analyzed complete 27-page brand manual (July 2018)
- ✅ Documented official EBSERH colors:
  - Primary Gray #9c9c9f (Pantone Cool Gray 7 C)
  - Institutional Green #97bf29 (Pantone 376 C)
- ✅ Typography standards: Myriad Pro family (5 weights)
- ✅ Logo usage rules:
  - Minimum size: 3cm / 85px
  - Protection area: 1.5× subtitle height
  - Prohibited alterations documented
- ✅ Institutional signatures (co-branding):
  - UFC + HUWC + EBSERH + SUS proportions
  - Horizontal and vertical layouts
  - Government co-branding guidelines
- ✅ Application-specific guidelines:
  - Business cards (90×50mm, Couchê 250g)
  - Uniforms (jaleco shoulder specifications)
  - Vehicle fleet (door/rear/side panels)
  - External signage (8X×1X proportions)
- ✅ Monocolor versions for print/uniforms
- ✅ Color background combinations
- ✅ Sistema NPT implementation checklist (18 items)
- ✅ Integration matrix: SETISD Portal vs EBSERH Manual
- ✅ Files and resources section

### 📋 January 7, 2026 - Portal Integration Documentation

**EBSERH Portal Integration (SETISD)**:
- ✅ Documented Portal SETISD structure and architecture
- ✅ Added complete visual design system specifications
  - Color palette with hex codes
  - Typography standards (Poppins, Open Sans, Outfit)
  - Component specifications (110×110px cards)
- ✅ Created implementation checklist (4 phases, 7-10 weeks)
- ✅ Included portal compliance requirements
- ✅ Added integration timeline and contact information

### ✨ December 25, 2025 - Major Updates

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

---

## EBSERH Brand Guidelines Integration

### Manual de Identidade Visual EBSERH

**Source Document**: `docs/manual_de_identidade_visual.pdf` (Versão 2.2, julho 2018)

This section documents how the Sistema NPT HUWC must comply with the official EBSERH Brand Identity Manual for consistent institutional branding across all touchpoints.

### Official EBSERH Colors

**Primary Gray (EBSER):**
- Pantone: Cool Gray 7 C
- CMYK: C0% M0% Y15% K41%
- RGB: R156 G156 B159
- Hex: `#9c9c9f`

**Institutional Green (H):**
- Pantone: 376 C
- CMYK: C50% M0% Y95% K0%
- RGB: R151 G191 B13
- Hex: `#97bf29`

**Usage in Sistema NPT:**
- Gray for system headers, neutral backgrounds
- Green for accent elements (buttons, active states, highlights)
- Must maintain exact color specifications for brand consistency

### Typography Standards

**Logo Construction:**
- Franklin Gothic BT (EBSERH text)
- Franklin Gothic Medium (subtitle text)

**Supporting Communication:**
- Myriad Pro Regular
- Myriad Pro Semibold
- Myriad Pro Bold
- Myriad Pro Condensed
- Myriad Pro Condensed Bold

**Implementation Notes:**
- Use Myriad Pro as primary typeface for Sistema NPT interface
- Maintains consistency with EBSERH communication materials
- Compatible with web @font-face or Google Fonts alternatives
- Fallback hierarchy: Myriad Pro → Arial → sans-serif

### Logo Usage Rules

**Minimum Size:**
- 3 cm width (approximately 85px at 72 DPI)
- Never reduce below this threshold to maintain legibility

**Protection Area:**
- Clear space: 1.5× the height of "HOSPITAIS UNIVERSITÁRIOS FEDERAIS" text
- Apply to all sides (top, bottom, left, right)
- No graphic elements allowed within this zone

**Prohibited Alterations:**
- ❌ Color changes (must use official gray + green)
- ❌ Distortion (stretching/compressing)
- ❌ Adding effects (shadows, outlines, gradients)
- ❌ Rearranging elements
- ❌ Changing typeface

### Institutional Signatures (Co-Branding)

**Sistema NPT requires tri-partite branding:**

1. **Hospital Logo** (UFC + HUWC)
2. **EBSERH Logo** (middle position)
3. **SUS Logo** (when applicable)

**Horizontal Layout Proportions:**
```
[UFC/HUWC]  [spacing: X]  [EBSERH]  [spacing: X]
```
- X = height of EBSERH letter 'E'
- All logos vertically center-aligned
- EBSERH logo must not exceed 2× the width of partner logos

**Vertical Layout Proportions:**
```
    [UFC/HUWC]
    [spacing: X]
    [EBSERH]
```
- Spacing: 1X between logos
- Center-aligned composition

**Government Co-Branding:**
```
[EBSERH Logo]  [GOVERNO FEDERAL]
```
- For official government communications
- Follow Governo Federal branding manual at www.secom.gov.br

### Monocolor Versions

**When to Use:**

1. **Single-Color Print (100% Black):**
   - Letterhead, invoices, forms
   - Low-cost printing scenarios

2. **Single-Color Print (100% White on dark background):**
   - Dark uniforms (jalecos)
   - Backlit signage
   - Vehicle decals on dark surfaces

3. **Grayscale (Black 100% + Gray 65%):**
   - Newspaper/magazine ads
   - Photocopied materials
   - Fax communications

**Color Specifications for Monocolor:**
- 1st color: Black 100% (C0% M0% Y0% K100%)
- 2nd color: Black 50% (C0% M0% Y0% K50%)

### Document Headers

**Standard Format for Sistema NPT documents:**

```
[SUS Logo]  [UFC Logo]  [HUWC Logo]  UNIVERSIDADE FEDERAL DO CEARÁ
                                      HOSPITAL UNIVERSITÁRIO WALTER CANTÍDIO
                                                                      [EBSERH Logo]
```

**Specifications:**
- Background: White or light gray (#f8f9fa)
- Text: Black or dark gray (#333)
- Logos: Full color
- Typography: Arial or Myriad Pro, 10-12pt
- Spacing: 1.5X between logo groups

### Application-Specific Guidelines

#### 1. Business Cards (Cartão de Visita)

**Specifications:**
- Size: 90mm × 50mm
- Material: Couchê 250g paper
- Printing: 4×4 colors (full color both sides)

**Front Side:**
- EBSERH logo + hospital identifier
- Green accent bar

**Back Side:**
- Name: Gotham font
- Title/Contact: Gadugi font
- Full contact information
- Address

**Sistema NPT Digital Equivalent:**
- Email signatures should follow similar layout
- Include EBSERH logo (minimum 85px width)
- Green accent color (#97bf29)
- Contact information in Gadugi or Arial

#### 2. Uniforms (Jalecos)

**Left Shoulder:**
- Hospital logo (HUWC): 4.5cm × 4.0cm max
- EBSERH logo: 7.0cm width
- Vertical spacing: 1X (height of 'E')

**Right Shoulder:**
- SUS logo: 6.0cm width
- Hospital identifier: 4.5cm × 4.0cm max
- Vertical spacing: 1X

**Sistema NPT Application:**
- User profile photos may show staff in branded uniforms
- Training materials should include uniform branding guidelines

#### 3. Vehicle Fleet (Frota)

**Door Application:**
- Hospital logo + EBSERH logo
- Centered placement
- Avoid door handle area

**Rear Application:**
- Right-aligned: Hospital logo, EBSERH logo
- Minimum EBSERH height: 10cm

**Side Panels (Ambulances/Vans):**
- Hospital logo, EBSERH logo, SUS logo
- Horizontal alignment
- Minimum EBSERH height: 15cm

**Sistema NPT Application:**
- Logistics module may track NPT delivery vehicles
- Vehicle identification codes link to branding compliance

#### 4. External Signage (Identificação Externa)

**Standard Panel Proportions:**
- Total area: 8X (width) × 1X (height)
- Where X = logo height

**Layout:**
```
[1/8X margin] [Hospital Logo] [Hospital Name in FrankGoth BT or Verdana Bold] [EBSERH Logo] [1/8X margin]
```

**Margins:**
- Top/Bottom: 1/8X
- Left/Right: 1/8X
- Between logo and text: 1X

**Background Options:**
- Painted surface (gray #9c9c9f)
- Stainless steel (brushed finish)
- Metal lettering (individual letters mounted)

**Illumination:**
- LED backlit (white or green)
- Spotlit (indirect lighting)

**Sistema NPT Integration:**
- Physical wayfinding to NPT pharmacy
- Digital signage may display NPT status board

### Color Combinations and Backgrounds

**On Light Backgrounds (White, Light Gray, Pastels):**
- Use standard full-color EBSERH logo
- Ensure sufficient contrast (minimum 4.5:1 WCAG AA)

**On Dark Backgrounds (Black, Navy, Dark Gray):**
- Use white version (negative)
- Or use full-color with white buffer box

**On Multicolor Backgrounds (Photos, Patterns):**
- Always place logo on solid white or gray box
- Box must respect protection area (1.5X padding)
- Avoid placing logo over busy imagery

**On Single-Color Backgrounds:**
- Yellow: Use gray logo (#9c9c9f)
- Blue/Purple: Use white logo
- Green: Use white logo (avoid brand green background)

### Sistema NPT Implementation Checklist

**Visual Compliance:**
- [ ] Apply EBSERH gray (#9c9c9f) to headers/navigation
- [ ] Apply EBSERH green (#97bf29) to CTAs and accents
- [ ] Use Myriad Pro typeface (or approved fallback)
- [ ] EBSERH logo minimum 85px width (3cm at 72 DPI)
- [ ] Maintain 1.5X protection area around logos
- [ ] Co-brand with UFC, HUWC, SUS where applicable

**Print Materials:**
- [ ] Business card template (90×50mm, 4×4 colors)
- [ ] Letterhead template with proper header layout
- [ ] Document footer with institutional signatures
- [ ] Export/print functionality maintains color fidelity

**Digital Assets:**
- [ ] SVG logo files for scalability
- [ ] PNG logo files (300 DPI for print, 72 DPI for web)
- [ ] Favicon using EBSERH 'H' in green
- [ ] Email signature template with EBSERH branding

**Accessibility:**
- [ ] Logo alt text: "EBSERH - Hospitais Universitários Federais"
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Scalable logos for high-DPI displays
- [ ] Print-friendly versions (grayscale fallback)

### Files and Resources

**Logo Files (request from EBSERH):**
- `ebserh-logo-horizontal.svg` (web/digital)
- `ebserh-logo-vertical.svg` (narrow spaces)
- `ebserh-logo-mono-black.svg` (single-color print)
- `ebserh-logo-mono-white.svg` (negative/dark backgrounds)

**Brand Manual:**
- Source: `docs/manual_de_identidade_visual.pdf`
- Version: 2.2 (July 2018)
- Pages: 27
- Format: PDF (3.8 MB)

**Contact for Brand Assets:**
- EBSERH Institutional Communication
- Request via: SETISD (fscmhuwc@gmail.com)
- Include: project name, use case, delivery format

### Integration with SETISD Portal

**Portal vs. Manual Alignment:**

| Element | SETISD Portal | EBSERH Manual | Sistema NPT |
|---------|---------------|---------------|-------------|
| Primary Color | #081d41 (Blue) | #9c9c9f (Gray) | Use both contextually |
| Accent Color | #95de24 (Green) | #97bf29 (Green) | #97bf29 (EBSERH) |
| Typography | Poppins/Open Sans | Myriad Pro | Myriad Pro primary |
| Logo Size | 110×110px card | 3cm minimum | 85px web minimum |

**Recommendation:**
- Portal interface: Follow SETISD standards (Poppins, blue palette)
- Sistema NPT app: Follow EBSERH Manual (Myriad Pro, gray/green palette)
- Co-branding areas: Use institutional signatures from Manual page 12-14

---

## EBSERH Portal Integration (SETISD)

### Portal Overview

**Portal SETISD** (Setor de Tecnologia da Informação e Saúde Digital) is the centralized hub for all hospital systems and administrative tools at Complexo Hospitalar UFC (HUWC | MEAC). URL: https://sistemas.huwc.ufc.br/setisd/

**Architecture**: Single-page portal with grid-based card navigation system providing access to 20+ integrated systems.

### Visual Design System

#### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Blue | `#081d41` | Header/Footer backgrounds |
| Secondary Blue | `#092553` | Buttons and input fields |
| Active Blue | `#05468b` | Hover states |
| Accent Green | `#8bc547` | Scrollbars |
| Badge Green | `#95de24` | "New" badges |

#### Typography
- **Font Families**: Poppins, Open Sans, Outfit
- **Size Range**: 0.75rem (badges) → 2rem (main titles)
- **Weights**: 400 (regular), 700 (bold)
- **Hierarchy**: Clear visual hierarchy across all components

#### Component Specifications
- **Card Size**: 110px × 110px
- **Icons**: SVG format with color transition on hover (#424040 → white)
- **Layout**: CSS Grid (8 columns desktop, 4 tablet, 2 mobile)
- **Hover Effect**: Reduced opacity on non-hovered items
- **Badge**: Absolute positioned, green background (#95de24)

### Portal Structure

#### System Categories
1. **Hospital Systems**: AGHU, PACS, Exam Results
2. **Administration & HR**: SIGEPE, Personnel Management, Contract Management, SUS Billing
3. **IT Support**: Support System, Service Desk, Porter Requests
4. **Communication**: Outlook, Institutional Email (HUWC, MEAC)
5. **Documentation**: SEI, Institutional Intranet
6. **Business Intelligence**: Power BI, REDCap, Moodle

#### Authentication Methods
- SSO (Single Sign-On) via SIGEPE
- Integrated login for specific systems (AGHU, SEI, SGE)
- Direct access for Outlook and email

### Integration Guidelines for Sistema NPT

#### Design Requirements
1. **Follow EBSERH Color Palette**
   - Use primary blue (#081d41) for headers/footers
   - Use secondary blue (#092553) for buttons
   - Apply accent green (#95de24) for "new" badge

2. **Typography Standards**
   - Primary font: Poppins (400, 700 weights)
   - Fallbacks: Open Sans, Outfit
   - Maintain size hierarchy (0.75rem - 2rem)

3. **Card Component**
   ```html
   <div class="portal-card" style="width: 110px; height: 110px;">
     <svg class="card-icon"><!-- NPT icon: 💊 or 🧪 --></svg>
     <span class="badge-new">novo</span>
   </div>
   ```

4. **Hover Interactions**
   - Icon color transition: #424040 → white
   - Reduced opacity on sibling cards (0.5)
   - Smooth transition duration: 300ms

#### Technical Integration

**Positioning in Portal:**
- **Category**: Hospital Systems (alongside AGHU, PACS)
- **Icon Suggestion**: 💊 (pill) or 🧪 (test tube) representing Parenteral Nutrition
- **Display Name**: "Sistema NPT" or "Gestão NPT"
- **Badge**: Green "novo" badge for first 3 months

**Access Methods:**
1. **Direct Link Integration**
   - Add card to SETISD grid system
   - Point to SharePoint deployment URL
   - Leverage existing SSO/SIGEPE if available

2. **Authentication Flow**
   - Option A: Use SETISD SSO (requires SIGEPE integration)
   - Option B: Independent auth-simulator.js (development)
   - Option C: Microsoft Entra ID (production - recommended)

3. **Responsive Behavior**
   - Card automatically adjusts in grid (8→4→2 columns)
   - Maintains 110×110px size across breakpoints
   - Touch-friendly on mobile devices

#### Implementation Checklist

**Phase 1: Visual Compliance**
- [ ] Create 110×110px SVG icon for NPT system
- [ ] Apply EBSERH color palette to all UI elements
- [ ] Implement Poppins/Open Sans typography
- [ ] Add hover effects matching portal standards
- [ ] Include green "novo" badge

**Phase 2: Portal Integration**
- [ ] Request card slot in SETISD grid
- [ ] Provide system URL to IT team
- [ ] Submit SVG icon and card metadata
- [ ] Update portal catalog.pdf documentation
- [ ] Test card functionality in portal environment

**Phase 3: Authentication**
- [ ] Coordinate with IT for SSO integration
- [ ] Configure SIGEPE authentication (if applicable)
- [ ] Implement Microsoft Entra ID (production)
- [ ] Remove auth-simulator.js from production
- [ ] Test multi-user access scenarios

**Phase 4: Documentation**
- [ ] Add entry to SETISD catalog.pdf
- [ ] Provide user training materials
- [ ] Update HUWC intranet documentation
- [ ] Create IT support tickets templates
- [ ] Document integration architecture

### Portal Compliance Checklist

**Visual Standards:**
✅ EBSERH color palette (#081d41, #092553, #05468b, #8bc547, #95de24)
✅ Poppins/Open Sans typography
✅ 110×110px card dimensions
✅ SVG icon with hover transitions
✅ Green "novo" badge

**Technical Standards:**
✅ Responsive grid (8/4/2 columns)
✅ Touch-friendly mobile interface
✅ Accessibility (WCAG 2.1 compliant)
✅ Gov.br Barra Brasil integration
✅ Modern browser support (Chrome, Edge, Firefox)

**Institutional Standards:**
✅ EBSERH branding guidelines
✅ UFC/HUWC/MEAC logos
✅ Government portal standards (gov.br)
✅ Healthcare data security requirements
✅ LGPD compliance (data privacy)

### Contact for Integration

**Portal Administration:**
- **Department**: SETISD (Setor de Tecnologia da Informação e Saúde Digital)
- **Location**: Complexo Hospitalar UFC (HUWC | MEAC)
- **Email**: fscmhuwc@gmail.com
- **Portal URL**: https://sistemas.huwc.ufc.br/setisd/

**Integration Timeline:**
- **Phase 1 (Visual)**: 1-2 weeks
- **Phase 2 (Portal)**: 2-3 weeks (pending IT approval)
- **Phase 3 (Auth)**: 3-4 weeks (requires Entra ID setup)
- **Phase 4 (Docs)**: 1 week
- **Total**: 7-10 weeks for full integration

---

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
- [ ] EBSERH Portal SETISD integration (4 phases, 7-10 weeks)
  - [ ] Phase 1: Visual compliance (1-2 weeks)
  - [ ] Phase 2: Portal card integration (2-3 weeks)
  - [ ] Phase 3: SSO/Entra ID authentication (3-4 weeks)
  - [ ] Phase 4: Documentation and training (1 week)
- [ ] Entra ID authentication (production)
- [ ] PDF export for reports
- [ ] Power Automate notifications

### 📋 Planned
- [ ] Power BI integration
- [ ] Custom REST API
- [ ] PWA (Progressive Web App)
- [ ] Mobile-specific interface
- [ ] Advanced analytics (predictive models)
- [ ] SIGEPE SSO integration

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

**Document Version**: 1.3
**Last Review**: January 10, 2026
**Next Review**: March 2026

**Recent Updates**:
- Added EBSERH Brand Manual Integration (complete 27-page analysis)
- Documented official EBSERH colors, typography, logo rules
- Institutional signatures and co-branding specifications
- Application guidelines (cards, uniforms, vehicles, signage)
- Sistema NPT implementation checklist (18 items)
- Integration matrix comparing SETISD Portal vs EBSERH Manual
