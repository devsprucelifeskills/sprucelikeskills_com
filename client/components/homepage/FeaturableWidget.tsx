"use client";
import Script from "next/script";

const WIDGET_ID = "featurable-f12a5930-cd52-4389-8614-e62911612d07";

export default function FeaturableWidget() {
  return (
    <>



      <div id={WIDGET_ID} data-featurable-async className="" />

      <Script
        src="https://featurable.com/assets/v2/carousel_default.min.js"
        strategy="lazyOnload"
      />
    </>
  );
}
