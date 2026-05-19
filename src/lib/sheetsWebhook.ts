/**
 * Shared helper that POSTs a lead payload to the Google Sheets webhook
 * (Apps Script Web App). Used by both ContactModule and CareersModule so
 * the column order and field names stay consistent across the two forms.
 *
 * The unified Apps Script behind the webhook supports two callers:
 *   1. Legacy Divi forms — posted as URL-encoded params (e.parameter)
 *   2. This React SPA       — posted as JSON in e.postData.contents
 *
 * The script tells them apart by inspecting the body. We send a
 * `formularioOrigen: "spa"` marker for extra robustness.
 *
 * Column layout on the sheet (must match the Apps Script):
 *   A  ID                  ← generated server-side (CCG-NNN)
 *   B  Fecha               ← server-side, dd/MM/yyyy America/Bogota
 *   C  Tipo de lead        ← "CONTACTO" | "NOSOTROS"
 *   D  Nombre Completo
 *   E  Teléfono            ← international format (+57 300 123 4567)
 *   F  Correo
 *   G  Empresa
 *   H  Cargo
 *   I  Sector
 *   J  País                ← derived from phone country code in Spanish
 *   K  Tipo Contacto       ← server-side: Prospecto / Candidato per tipoLead
 *   L  Servicio de Interés
 *   M  Mensaje
 *
 * Uses `mode: 'no-cors'` because Apps Script Web Apps don't return CORS
 * headers; this is fire-and-forget. EmailJS remains the primary channel.
 */

import { parsePhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import esLabels from 'react-phone-number-input/locale/es.json';

const SHEETS_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;

export type LeadType = 'CONTACTO' | 'NOSOTROS';

export interface LeadPayload {
  tipoLead: LeadType;
  nombre: string;
  telefono: string;     // E.164 from PhoneInput, or plain text fallback
  correo: string;
  empresa?: string;
  cargo?: string;
  sector?: string;
  servicio?: string;
  mensaje?: string;
}

/** Try to extract a human-readable country name from an E.164 phone number. */
function countryFromPhone(phone: string): string {
  if (!phone) return '';
  try {
    const parsed = parsePhoneNumber(phone);
    if (!parsed?.country) return '';
    const labels = esLabels as Record<string, string>;
    return labels[parsed.country] || parsed.country;
  } catch {
    return '';
  }
}

/** Pretty-format an E.164 phone as "+57 300 123 4567". Falls back to raw. */
function prettyPhone(phone: string): string {
  if (!phone) return '';
  try {
    return formatPhoneNumberIntl(phone) || phone;
  } catch {
    return phone;
  }
}

export async function sendLeadToSheets(payload: LeadPayload): Promise<void> {
  if (!SHEETS_URL) return; // webhook not configured — silently no-op

  const body = {
    formularioOrigen: 'spa',
    timestamp: new Date().toISOString(),
    tipoLead: payload.tipoLead,
    nombre:   payload.nombre   ?? '',
    telefono: prettyPhone(payload.telefono ?? ''),
    correo:   payload.correo   ?? '',
    empresa:  payload.empresa  ?? '',
    cargo:    payload.cargo    ?? '',
    sector:   payload.sector   ?? '',
    pais:     countryFromPhone(payload.telefono ?? ''),
    servicio: payload.servicio ?? '',
    mensaje:  payload.mensaje  ?? '',
  };

  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      // Apps Script reads e.postData.contents; text/plain avoids the CORS
      // preflight that application/json would trigger.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });
  } catch {
    /* fire-and-forget; EmailJS remains the primary notification channel */
  }
}
