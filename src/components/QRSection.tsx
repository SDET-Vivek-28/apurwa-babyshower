"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/context/LanguageContext";
import { getPublicSiteUrl } from "@/lib/site";

export function QRSection() {
  const { t } = useLanguage();
  const [url, setUrl] = useState(getPublicSiteUrl());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const shareHref = useMemo(() => {
    if (!url) return "#";
    return `https://wa.me/?text=${encodeURIComponent(`${t.shareText}\n${url}`)}`;
  }, [t.shareText, url]);

  const copyLink = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="qr" className="relative px-4 py-14 sm:px-6">
      <h2 className="font-marathi text-center text-3xl text-ink sm:text-4xl">{t.qrHeading}</h2>
      <p className="mt-3 text-center text-ink-soft">{t.qrHint}</p>

      <div className="glass-card mx-auto mt-8 max-w-md rounded-[32px] px-6 py-8 text-center">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-[28px] bg-softwhite p-4 shadow-inner ring-1 ring-rosegold/20">
          {url ? (
            <QRCodeSVG
              value={url}
              size={196}
              bgColor="#FFFDFB"
              fgColor="#3D2F2A"
              level="M"
              includeMargin={false}
            />
          ) : (
            <div className="h-40 w-40 animate-pulse rounded-2xl bg-cream" />
          )}
        </div>
        <p className="mt-4 break-all text-xs text-ink-soft">{url}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={copyLink} className="premium-button">
            {copied ? t.copied : t.copyLink}
          </button>
          <a href={shareHref} target="_blank" rel="noreferrer" className="premium-button">
            {t.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
