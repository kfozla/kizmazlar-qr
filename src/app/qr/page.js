"use client";

import { useRef, useState } from "react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [malkodlar, setMalkodlar] = useState([]);
  const [emptyMalkodlar, setEmptyMalkodlar] = useState([]);
  const [maxMalkodUyarisi, setMaxMalkodUyarisi] = useState(false);
  const [loading, setLoading] = useState(false);
  const nextMalkodId = useRef(0);

  const addMalkod = () => {
    if (malkodlar.length >= 16) {
      setMaxMalkodUyarisi(true);
      return;
    }

    setMalkodlar((currentMalkodlar) => [
      ...currentMalkodlar,
      { id: nextMalkodId.current++, value: "" },
    ]);
    setMaxMalkodUyarisi(false);
  };

  const updateMalkod = (id, value) => {
    setMalkodlar((currentMalkodlar) =>
      currentMalkodlar.map((malkod, malkodIndex) =>
        malkod.id === id ? { ...malkod, value } : malkod,
      ),
    );
    setEmptyMalkodlar((currentEmptyMalkodlar) =>
      currentEmptyMalkodlar.filter((malkodId) => malkodId !== id),
    );
  };

  const removeMalkod = (id) => {
    setMalkodlar((currentMalkodlar) =>
      currentMalkodlar.filter((malkod) => malkod.id !== id),
    );
    setMaxMalkodUyarisi(false);
    setEmptyMalkodlar((currentEmptyMalkodlar) =>
      currentEmptyMalkodlar.filter((malkodId) => malkodId !== id),
    );
  };

  const generatePDF = async () => {
    const codes = malkodlar.map((malkod) => malkod.value.trim());

    if (codes.length === 0) {
      return;
    }

    const emptyIds = codes.reduce(
      (ids, code, index) => (code ? ids : [...ids, malkodlar[index].id]),
      [],
    );

    if (emptyIds.length > 0) {
      setEmptyMalkodlar(emptyIds);
      return;
    }

    setLoading(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const baseUrl = process.env.DOMAIN || "http://localhost:3000";

      // A4 ölçüleri
      const pageWidth = 210;
      const pageHeight = 297;

      // 4 sütun
      const columns = 4;

      // QR boyutu
      const qrSize = 38;

      // Yatay/dikey boşluklar
      const horizontalGap = 8;
      const verticalGap = 12;

      const totalWidth = columns * qrSize + (columns - 1) * horizontalGap;

      const startX = (pageWidth - totalWidth) / 2;
      const startY = 20;

      for (let i = 0; i < codes.length; i++) {
        const malkod = codes[i];

        // QR'ın gideceği adres
        const url = `${baseUrl}/urun/${malkod}`;

        // QR oluştur
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 500,
          margin: 2,
          errorCorrectionLevel: "H",
        });

        const column = i % columns;
        const row = Math.floor(i / columns);

        const x = startX + column * (qrSize + horizontalGap);
        const y = startY + row * (qrSize + verticalGap + 8);

        // Sayfa dolduysa yeni sayfa
        if (y + qrSize + 10 > pageHeight - 10) {
          pdf.addPage();

          const newRow = Math.floor((i % (columns * 6)) / columns);

          const newY = startY + newRow * (qrSize + verticalGap + 8);

          pdf.addImage(qrDataUrl, "PNG", x, newY, qrSize, qrSize);

          pdf.setFontSize(9);
          pdf.text(String(malkod), x + qrSize / 2, newY + qrSize + 5, {
            align: "center",
          });

          continue;
        }

        pdf.addImage(qrDataUrl, "PNG", x, y, qrSize, qrSize);

        // Malkod
        pdf.setFontSize(9);
        pdf.text(String(malkod), x + qrSize / 2, y + qrSize + 5, {
          align: "center",
        });
      }

      pdf.save("urun-qr-kodlari.pdf");
    } catch (error) {
      console.error(error);
      alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Kızmazlar Ticaret"
                width={46}
                height={46}
                className="rounded-xl border border-slate-200 object-contain"
              />
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  Kızmazlar Ticaret
                </h2>

                <p className="text-xs text-slate-500">Ürün Bilgi Sistemi</p>
              </div>
            </div>
          </Link>

          <div className=" items-center gap-2 rounded-full px-3 py-2 text-xs font-medium flex text-slate-700 bg-emerald-50">
            Qr Kod Oluşturma Aracı
          </div>
        </div>
      </header>
      <main className=" bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Ürün QR Kodları
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              QR kod oluşturmak istediğiniz ürün kodlarını girin.
            </p>

            <button
              type="button"
              onClick={addMalkod}
              className="mt-6 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              + Malkod Ekle
            </button>

            {maxMalkodUyarisi && (
              <p className="mt-2 text-sm font-medium text-red-600">
                Tek seferde en fazla 16 malkod alanı ekleyebilirsiniz.
              </p>
            )}

            {malkodlar.length > 0 && (
              <div className="mt-4 space-y-3">
                {malkodlar.map((malkod, index) => (
                  <div key={malkod.id}>
                    {emptyMalkodlar.includes(malkod.id) && (
                      <p className="mb-1 text-sm font-medium text-red-600">
                        Bu alan boş bırakılamaz.
                      </p>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={malkod.value}
                        onChange={(e) =>
                          updateMalkod(malkod.id, e.target.value)
                        }
                        placeholder={`Malkod ${index + 1}`}
                        className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => removeMalkod(malkod.id)}
                        aria-label={`Malkod ${index + 1} alanını sil`}
                        className="rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={generatePDF}
              disabled={loading}
              className="mt-4 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "PDF hazırlanıyor..." : "QR Kodları PDF Olarak İndir"}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Her malkod için ayrı bir alan ekleyebilirsiniz.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white mt-auto ">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6">
          <p className="text-center text-xs text-slate-400">
            © 2026 Kızmazlar QR — Ürün Bilgi Sistemi
          </p>
        </div>
      </footer>
    </div>
  );
}
