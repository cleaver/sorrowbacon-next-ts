const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export function pageview(url: URL) {
  window.gtag('event', 'page_view');
}

export function event(
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams
) {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
}
