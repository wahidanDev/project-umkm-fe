import { useState } from "react";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6">
          {/* Kiri */}
          <div className="text-left">
            <span className={title()}>Lengkapi&nbsp;</span>
            <span className={title({ color: "violet" })}>ibadah&nbsp;</span>
            <span className={title()}>dengan Perlengkapan Muslim Terbaik.</span>
          </div>

          {/* Kanan */}
          <div className="text-left max-w-md">
            <div className={subtitle({ class: "mb-4" })}>
              Sajadah, Busana muslim, Parfum, dan perlengkapan ibadah lengkap
              untuk Anda.
            </div>
            <Button color="primary" variant="shadow" radius="lg">
              Belanja Sekarang
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-xl my-6">
          <div className="relative w-full max-w-[1500px] h-[500px] flex gap-6 overflow-hidden">
            {/* Slide 1: Produk Unggulan */}
            <section
  className={`relative h-full flex flex-col items-start justify-start p-6 transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
  ${slide === 0 ? "w-2/3" : "w-1/6"}`}
  style={{ backgroundImage: "url('/1.png')" }}
>
  <h1
    className={`font-bold transition-all duration-700 ease-in-out
      ${slide === 0
        ? "absolute top-4 left-4 text-3xl text-left opacity-100 translate-x-0 translate-y-0 [writing-mode:horizontal-tb] text-white"
        : "opacity-80 text-xl [writing-mode:vertical-rl] text-white"}`
    }
  >
    Produk Unggulan
  </h1>

  <p
    className={`absolute left-4 top-20 max-w-xs text-left text-lg font-bold text-white transition-all duration-700 ease-in-out
      ${slide === 0 ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"}`
    }
  >
    Busana muslim, sejadah, parfum, dan sarung berkualitas tinggi. Produk favorit pelanggan!
  </p>

  {slide === 0 && (
    <Button
      onPress={() => setSlide((slide + 1) % totalSlides)}
      color="primary"
      variant="shadow"
      radius="full"
      className="absolute right-4 bottom-4"
    >
      ➡️
    </Button>
  )}
</section>


            {/* Slide 2: Promo / Penawaran */}
            <section
              className={`relative h-full flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
      ${slide === 1 ? "w-2/3" : "w-1/6"}`}
              style={{ backgroundImage: "url('/2.png')" }}
            >
              <h1
                className={`font-bold transition-all duration-700 ease-in-out
        ${
          slide === 1
            ? "absolute top-4 left-4 text-3xl text-left opacity-100 translate-x-0 translate-y-0 [writing-mode:horizontal-tb] text-white"
            : "opacity-80 text-xl [writing-mode:vertical-rl] text-white"
        }`}
              >
                Promo & Penawaran
              </h1>

              <p
                className={`text-white text-center text-lg mt-16 transition-all duration-700 ease-in-out
        ${slide === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
              >
                Diskon spesial paket busana + sejadah + parfum. Harga bersahabat
                dan terbatas!
              </p>

              {slide === 1 && (
                <Button
                  onPress={() => setSlide((slide + 1) % totalSlides)}
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="absolute right-4 bottom-4"
                >
                  ➡️
                </Button>
              )}
            </section>

            {/* Slide 3: Keunggulan & Layanan */}
            <section
              className={`relative h-full flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out rounded-xl shadow-md bg-cover bg-center
      ${slide === 2 ? "w-2/3" : "w-1/6"}`}
              style={{ backgroundImage: "url('/3.png')" }}
            >
              <h1
                className={`font-bold transition-all duration-700 ease-in-out
        ${
          slide === 2
            ? "absolute top-4 left-4 text-3xl text-left opacity-100 translate-x-0 translate-y-0 [writing-mode:horizontal-tb] text-white"
            : "opacity-80 text-xl [writing-mode:vertical-rl] text-white"
        }`}
              >
                Keunggulan & Layanan
              </h1>

              <p
                className={`text-white text-center text-lg mt-16 transition-all duration-700 ease-in-out
        ${slide === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
              >
                Testimoni pelanggan, layanan ramah, pengiriman cepat. Belanja
                aman dan nyaman.
              </p>

              {slide === 2 && (
                <Button
                  onPress={() => setSlide((slide + 1) % totalSlides)}
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="absolute right-4 bottom-4"
                >
                  ➡️
                </Button>
              )}
            </section>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
