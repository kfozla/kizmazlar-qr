import { db } from "../../lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { malkod } = await params;

  const [rows] = await db.query("SELECT * FROM malbilg WHERE malkod = ?", [
    malkod,
  ]);

  if (rows.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-400 flex items-center justify-center text-white">
              <span className="text-3xl">!</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Ürün bulunamadı</h1>

          <p className="mt-2 text-slate-500">
            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
          </p>
          <button className="mt-6 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Link href="/">Ana Sayfaya Dön</Link>
          </button>
        </div>
      </main>
    );
  }

  const urun = rows[0];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
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

          <div className=" items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 flex">
            ✔ Doğrulanmış Ürün
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12">
        {/* Product Name */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Ürün
            <span className="ml-2 font-medium text-slate-400">
              / {urun.malkod}
            </span>
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {urun.malad}
          </h1>
        </div>

        {/* Price Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-400">Güncel Fiyat</p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Fiyat Bilgisi
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-100 p-6 sm:p-8">
            <p className="text-sm font-medium text-slate-500">Satış Fiyatı</p>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                {urun.mal1fiy}
              </span>

              <span className="text-2xl font-semibold text-slate-500">₺</span>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Fiyatlar bilgilendirme amaçlıdır.
          </p>
        </div>

        {/* Product Details */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs text-slate-400">Mal Kodu</p>

            <p className="text-sm font-semibold text-slate-700">
              {urun.malkod}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div>
            <p className="text-xs text-slate-400">Birim</p>

            <p className="text-sm font-semibold text-slate-700">
              {urun.malbirim}
            </p>
          </div>
        </div>

        {/* QR Info */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-sm font-medium text-slate-900">Ürün doğrulama</p>

            <p className="mt-1 text-xs text-slate-500">
              Bu ürün QR kod üzerinden görüntülenmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto ">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6">
          <p className="text-center text-xs text-slate-400">
            © 2026 Kızmazlar QR — Ürün Bilgi Sistemi
          </p>
        </div>
      </footer>
    </main>
  );
}
