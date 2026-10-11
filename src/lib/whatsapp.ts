export function hasConfiguredWhatsApp(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 10) {
    return null;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
