"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [malkod, setMalkod] = useState("");

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white font-sans text-black">
      <h1 className="text-4xl font-bold text-black">Kızmazlar QR</h1>
      <p className="mx-auto mt-2 max-w-md text-center text-lg text-black">
        Ürünleri görüntülemek için raflardaki QR kodları okutun.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Image
          src="/qr-code.png"
          alt="QR Code"
          width={200}
          height={200}
          className="rounded-lg border border-zinc-300"
        />
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Link href="/qr">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Yeni QR oluştur
          </button>
        </Link>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-black text-bold">
          Ürün görüntülemek için aşağıdaki alana malkod girin.
        </p>
      </div>
      <div className="mt-6 flex flex-nowrap items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Malkod girin"
          className="min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black placeholder:text-zinc-500"
          value={malkod}
          onChange={(e) => setMalkod(e.target.value)}
        ></input>
        <Link href="/urun/[malkod]" as={`/urun/${malkod}`}>
          <button className="shrink-0 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Git
          </button>
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-4">
      <p className="text-sm text-black">
        &copy; {new Date().getFullYear()} Kızmazlar QR. Tüm hakları saklıdır.
      </p>
    </div>
  );
}
