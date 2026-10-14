"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryPhotos } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";

export function MemoryGallery() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const photo = active === null ? null : galleryPhotos[active];

  return (
    <section id="gallery" className="relative px-4 py-14 sm:px-6">
      <h2 className="font-marathi text-center text-3xl text-ink sm:text-4xl">
        {t.galleryHeading}
      </h2>
      <p className="mt-3 text-center text-ink-soft">{t.galleryHint}</p>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {galleryPhotos.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-md ring-1 ring-rosegold/20"
          >
            <Image
              src={item.src}
              alt={lang === "mr" ? item.altMr : item.altEn}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 46vw, 30vw"
            />
          </button>
        ))}
      </div>

      {photo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3d2f2a]/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-ivory"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo.src}
                alt={lang === "mr" ? photo.altMr : photo.altEn}
                fill
                className="object-cover"
                sizes="90vw"
              />
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="premium-button absolute top-3 right-3 min-h-10 px-4"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
