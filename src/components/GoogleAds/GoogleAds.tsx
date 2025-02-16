import React, { useEffect } from 'react';
import './GoogleAds.css';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAds() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading Google Ads:', error);
    }
  }, []);

  return (
    <div className="ads-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADS_CLIENT_ID}
        data-ad-slot={import.meta.env.VITE_GOOGLE_ADS_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}