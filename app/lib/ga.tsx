export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Logs the pageview to Google Analytics
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Logs specific events to Google Analytics
export const event = ({ action, category, label, value }: { action: string; category: string; label?: string; value?: number }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};