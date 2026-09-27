import os

icons_dir = r"c:\Users\Nicolas\OneDrive\Escritorio\Trabajo\07_Implementacion_Mes_2_Wix_y_Shopify\iconos_svg_figma"
os.makedirs(icons_dir, exist_ok=True)

icons = {
    "cat-aseo-profesional.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M14 12V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 14a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14z" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="18" y="6" width="12" height="6" rx="2" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(26,75,140,0.08)"/>
  <path d="M30 6h6v4h-6z" stroke="#1A4B8C" stroke-width="2" stroke-linejoin="round" fill="#1A4B8C"/>
  <line x1="16" y1="20" x2="22" y2="20" stroke="#00A86B" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="16" y1="26" x2="20" y2="26" stroke="#00A86B" stroke-width="2" stroke-linecap="round"/>
  <line x1="16" y1="32" x2="22" y2="32" stroke="#00A86B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M31 23c0 3.314-2.686 6-6 6s-6-2.686-6-6c0-2.5 6-7 6-7s6 4.5 6 7z" stroke="#00A86B" stroke-width="2" stroke-linejoin="round" fill="rgba(0,168,107,0.12)"/>
</svg>""",

    "cat-bioseguridad.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 4L8 10v14c0 12 16 18 16 18s16-6 16-18V10L24 4z" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="rgba(26,75,140,0.04)"/>
  <path d="M35 11v6m-3-3h6" stroke="#00A86B" stroke-width="2" stroke-linecap="round"/>
  <path d="M19 32v-6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v-3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2h1a3 3 0 0 1 3 3v3c0 3-4 6-9 6h-3c-3 0-4-2-4-4z" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,168,107,0.1)"/>
  <path d="M17 32h14v3H17z" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>""",

    "cat-cafeteria.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M12 12h20l-2 26a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3l-2-26z" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="rgba(26,75,140,0.04)"/>
  <path d="M10 12h24V8a2 2 0 0 0-2-2H12a2 2 0 0 0-2 2v4z" stroke="#1A4B8C" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M22 6V3h4v3" stroke="#00A86B" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 12l-4 4h4" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 14h5a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-6" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="22" y1="18" x2="22" y2="34" stroke="#00A86B" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 3"/>
  <circle cx="22" cy="35" r="2" fill="#00A86B"/>
</svg>""",

    "cat-papeleria.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <ellipse cx="24" cy="14" rx="14" ry="6" stroke="#1A4B8C" stroke-width="2.5" fill="rgba(26,75,140,0.06)"/>
  <ellipse cx="24" cy="14" rx="4" ry="2" stroke="#00A86B" stroke-width="2" fill="#00A86B"/>
  <path d="M10 14v16c0 3.3 6.3 6 14 6s14-2.7 14-6V14" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 36v6c0 1.5 2 2.5 5 2.5h8c3 0 5-1 5-2.5V28" stroke="#00A86B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="24" y1="39" x2="42" y2="39" stroke="#00A86B" stroke-width="1.5" stroke-dasharray="3 3"/>
</svg>""",

    "cat-seguridad-industrial.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M8 24c0-8.837 7.163-16 16-16s16 7.163 16 16v3H8v-3z" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="rgba(26,75,140,0.05)"/>
  <path d="M24 8v16" stroke="#00A86B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M4 27h40v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4z" stroke="#1A4B8C" stroke-width="2.5" stroke-linejoin="round" fill="#1A4B8C"/>
  <path d="M12 36h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" stroke="#00A86B" stroke-width="2" stroke-linejoin="round" fill="rgba(0,168,107,0.1)"/>
  <path d="M26 36h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" stroke="#00A86B" stroke-width="2" stroke-linejoin="round" fill="rgba(0,168,107,0.1)"/>
  <line x1="22" y1="38" x2="26" y2="38" stroke="#00A86B" stroke-width="2"/>
</svg>""",

    "icon-shipping-truck.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M1 3h14v13H1z"/>
  <path d="M15 8h4l3 3v5h-7V8z"/>
  <circle cx="5.5" cy="18.5" r="2.5" stroke="#00A86B" fill="#ffffff"/>
  <circle cx="17.5" cy="18.5" r="2.5" stroke="#00A86B" fill="#ffffff"/>
  <line x1="1" y1="19" x2="3" y2="19"/>
  <line x1="8" y1="19" x2="15" y2="19"/>
</svg>""",

    "icon-express-clock.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="13" r="9"/>
  <polyline points="12 8 12 13 15 15"/>
  <path d="M12 4V1"/>
  <path d="M9 1h6"/>
  <polygon points="19 6 15 11 18 11 16 16 21 10 18 10 19 6" stroke="#00A86B" fill="#00A86B" stroke-width="1"/>
</svg>""",

    "icon-dian-shield.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <polyline points="9 12 11 14 15 10" stroke="#00A86B" stroke-width="2.2"/>
</svg>""",

    "icon-b2b-support.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  <path d="M9.5 12h.01m2.5 0h.01m2.5 0h.01" stroke="#00A86B" stroke-width="2.5" stroke-linecap="round"/>
</svg>""",

    "step-order-confirmed.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <polyline points="14 2 14 8 20 8"/>
  <polyline points="8 13 11 16 16 10" stroke="#00A86B" stroke-width="2"/>
</svg>""",

    "step-warehouse-prep.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
  <line x1="12" y1="22.08" x2="12" y2="12"/>
  <path d="M7 11l3 3 6-6" stroke="#00A86B" stroke-width="2"/>
</svg>""",

    "step-in-transit.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="1" y="5" width="13" height="10" rx="1"/>
  <path d="M14 8h4l3 3v4h-7V8z"/>
  <circle cx="5" cy="18" r="2" stroke="#00A86B"/>
  <circle cx="16" cy="18" r="2" stroke="#00A86B"/>
  <path d="M19 4a3 3 0 0 1 3 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 0 1 3-3z" stroke="#00A86B" fill="#00A86B" transform="scale(0.6) translate(16, -2)"/>
</svg>""",

    "step-delivered.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A86B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01" stroke-width="2.5"/>
</svg>""",

    "ui-cart-b2b.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="21" r="1"/>
  <circle cx="20" cy="21" r="1"/>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>""",

    "ui-target-progress.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="6" stroke="#00A86B"/>
  <circle cx="12" cy="12" r="2" fill="#00A86B"/>
</svg>""",

    "ui-trash-clean.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6"/>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
</svg>"""
}

for name, content in icons.items():
    p = os.path.join(icons_dir, name)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content.strip())

print(f"EXITO: Se crearon {len(icons)} archivos SVG en {icons_dir}")
