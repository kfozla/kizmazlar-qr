import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-5xl items-center px-5 sm:px-6">
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
        </div>
      </header>

      {/* 404 */}
      <section className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100">
            <span className="text-3xl font-bold text-slate-400">404</span>
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Sayfa bulunamadı
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Aradığınız sayfa mevcut değil
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Aradığınız sayfa kaldırılmış, taşınmış veya yanlış bir adres
            girilmiş olabilir.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6">
          <p className="text-center text-xs text-slate-400">
            © 2026 Kızmazlar QR — Ürün Bilgi Sistemi
          </p>
        </div>
      </footer>
    </main>
  );
}
