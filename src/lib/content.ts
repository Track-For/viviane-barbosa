export function isConfiguredValue(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  const normalized = value.trim();
  return normalized.length > 0 && !/^\[[^\]]+\]$/.test(normalized);
}

export function getConfiguredValue(value: string | null | undefined) {
  return isConfiguredValue(value) ? value.trim() : null;
}

export function getConfiguredUrl(value: string | null | undefined) {
  const configured = getConfiguredValue(value);

  if (!configured) {
    return null;
  }

  try {
    return new URL(configured).toString();
  } catch {
    return null;
  }
}

export function getInstagramUrl(value: string | null | undefined) {
  const configured = getConfiguredValue(value);

  if (!configured) {
    return null;
  }

  if (/^https?:\/\//i.test(configured)) {
    return getConfiguredUrl(configured);
  }

  return `https://www.instagram.com/${configured.replace(/^@/, "").replace(/\/$/, "")}/`;
}
