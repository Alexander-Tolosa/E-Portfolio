export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const formatManilaTime = (date = new Date()) =>
  `${date.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  })} PHT`;

const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export const emailStyles = {
  heading: `margin:0 0 20px 0;font-family:${FONT};font-size:20px;font-weight:600;line-height:1.35;color:#1a1a1a;`,
  body: `margin:0 0 16px 0;font-family:${FONT};font-size:15px;line-height:1.65;color:#1a1a1a;`,
  muted: `font-family:${FONT};font-size:13px;line-height:1.6;color:#5c5c5c;`,
  link: "color:#1a1a1a;text-decoration:underline;",
};

/** Plain, single-column wrapper. Tables and inline styles only, for mail clients. */
export function emailShell(content: string, footer: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:32px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
            <tr><td align="left">${content}</td></tr>
            <tr>
              <td align="left" style="padding-top:24px;border-top:1px solid #e4e4e4;">
                <div style="${emailStyles.muted}">${footer}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Two-column label/value rows. Values must already be escaped. */
export function detailRows(rows: [string, string][]) {
  const cells = rows
    .map(
      ([label, value]) => `<tr>
  <td valign="top" style="padding:6px 16px 6px 0;${emailStyles.muted}white-space:nowrap;">${label}</td>
  <td valign="top" style="padding:6px 0;font-family:${FONT};font-size:14px;line-height:1.6;color:#1a1a1a;">${value}</td>
</tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 28px 0;">${cells}</table>`;
}
