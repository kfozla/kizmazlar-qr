import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        Kızmazlar QR
      </h1>
      <p className="mt-2 text-lg text-zinc-700 dark:text-white">
        Ürünleri görüntülemek için raflardaki QR kodları okutun.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Image
          src="/qr-code.png"
          alt="QR Code"
          width={200}
          height={200}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700"
        />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-100 py-4 dark:bg-zinc-900">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Kızmazlar QR. Tüm hakları saklıdır.
      </p>
    </div>
  );
}
