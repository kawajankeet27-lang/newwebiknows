import * as XLSX from 'xlsx';
import { LeadItem, MeetingRequestItem, AiConsultantLeadItem } from '../types';

export function exportLeadsToExcel(leads: LeadItem[], fileNamePrefix: string = 'Webiknows_Leads_Received') {
  const data = leads.map((lead, idx) => ({
    'S.No': idx + 1,
    'Lead ID': lead.id,
    'Full Name': lead.name,
    'Email Address': lead.email,
    'Phone / Mobile': lead.phone,
    'Company Name': lead.company || 'Independent',
    'Budget Range': lead.budget || 'N/A',
    'Requirements Brief': lead.message,
    'Status': lead.status,
    'Received Date & Time': lead.createdAt,
    'Admin Notes': lead.notes || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 22 },
    { wch: 28 },
    { wch: 18 },
    { wch: 20 },
    { wch: 20 },
    { wch: 45 },
    { wch: 15 },
    { wch: 22 },
    { wch: 30 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads Received');
  
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `${fileNamePrefix}_${dateStr}.xlsx`);
}

export function exportMeetingsToExcel(meetings: MeetingRequestItem[], fileNamePrefix: string = 'Webiknows_Strategy_Sessions') {
  const data = meetings.map((m, idx) => ({
    'S.No': idx + 1,
    'Booking ID': m.id,
    'Full Name': m.name,
    'Email Address': m.email,
    'Phone / Mobile': m.phone || 'N/A',
    'Company Name': m.company || 'Independent',
    'Meeting Date': m.date,
    'Time Slot': m.slot,
    'Topic / Agenda': m.topic || 'N/A',
    'Status': m.status,
    'Created Date': m.createdAt,
    'Admin Notes': m.notes || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 22 },
    { wch: 28 },
    { wch: 18 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 35 },
    { wch: 15 },
    { wch: 22 },
    { wch: 30 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Strategy Sessions');

  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `${fileNamePrefix}_${dateStr}.xlsx`);
}

export function exportAiLeadsToExcel(aiLeads: AiConsultantLeadItem[], fileNamePrefix: string = 'Webiknows_AI_Consultant_Leads') {
  const data = aiLeads.map((l, idx) => ({
    'S.No': idx + 1,
    'Lead ID': l.id,
    'Full Name': l.name,
    'Mobile Number': l.mobile,
    'Email Address': l.email,
    'Service Requested': l.service,
    'Lead Status': l.status,
    'Captured Date & Time': l.createdAt,
    'Admin Notes': l.notes || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 15 },
    { wch: 24 },
    { wch: 18 },
    { wch: 28 },
    { wch: 28 },
    { wch: 15 },
    { wch: 22 },
    { wch: 30 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'AI Consultant Leads');

  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `${fileNamePrefix}_${dateStr}.xlsx`);
}

// Custom Date Range & Month matching helper
export function isMatchingMonthAndDate(createdAtStr: string, selectedMonth: string, startDate: string, endDate: string): boolean {
  if (!createdAtStr) return true;

  let itemDate: Date | null = null;
  try {
    itemDate = new Date(createdAtStr);
    if (isNaN(itemDate.getTime())) {
      itemDate = null;
    }
  } catch {
    itemDate = null;
  }

  // Check Custom Date Range if specified
  if (startDate || endDate) {
    if (!itemDate) {
      // Fallback string inclusion check
      if (startDate && createdAtStr < startDate) return false;
      if (endDate && createdAtStr > endDate) return false;
      return true;
    }

    const itemIso = itemDate.toISOString().split('T')[0];
    if (startDate && itemIso < startDate) return false;
    if (endDate && itemIso > endDate) return false;
    return true;
  }

  // Check Month if specified
  if (selectedMonth && selectedMonth !== 'All') {
    const lower = createdAtStr.toLowerCase();

    if (selectedMonth === '2026-10' || selectedMonth === 'Oct 2026') {
      if (lower.includes('oct') || lower.includes('2026-10') || lower.includes('10/2026')) return true;
    } else if (selectedMonth === '2026-09' || selectedMonth === 'Sep 2026') {
      if (lower.includes('sep') || lower.includes('2026-09') || lower.includes('09/2026')) return true;
    } else if (selectedMonth === '2026-08' || selectedMonth === 'Aug 2026') {
      if (lower.includes('aug') || lower.includes('2026-08') || lower.includes('08/2026')) return true;
    } else {
      if (lower.includes(selectedMonth.toLowerCase())) return true;
    }

    if (itemDate) {
      const m = (itemDate.getMonth() + 1).toString().padStart(2, '0');
      const y = itemDate.getFullYear().toString();
      if (`${y}-${m}` === selectedMonth || `${m}/${y}` === selectedMonth) return true;
    }

    return false;
  }

  return true;
}
