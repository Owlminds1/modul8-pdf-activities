"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

type Answers = Record<string, string>;

const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  const handleAnswer = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  // ✅ FULL PDF (ALL SLIDES)
  const generateFullPdf = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 25;

    doc.setFontSize(18);
    doc.text("SWOT Analysis Summary", pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setFontSize(12);

    Object.entries(answers).forEach(([question, answer], index) => {
      const qLines = doc.splitTextToSize(
        `${index + 1}. ${question}`,
        pageWidth - 20
      );

      const aLines = doc.splitTextToSize(
        `Answer: ${answer}`,
        pageWidth - 20
      );

      const blockHeight =
        qLines.length * 6 + aLines.length * 6 + 10;

      if (y + blockHeight > pageHeight - 20) {
        doc.addPage();
        y = 25;
      }

      doc.text(qLines, 10, y);
      y += qLines.length * 6;

      doc.text(aLines, 10, y);
      y += aLines.length * 6 + 10;
    });

    doc.save("SWOT_Analysis.pdf");
  };

  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [visibleCount]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <h4 className="text-3xl font-bold text-black text-center">
          Apply the SWOT analysis to your product.
        </h4>
        <p className="text-center text-black text-xl">
          Using the SWOT analysis, you can answer the following questions:
        </p>
      </div>

      <div className="w-[90%] flex justify-center items-center flex-col gap-3">
        <div className="w-full shadow-md p-3 min-h-50">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            modules={[Navigation]}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >

{/* SLIDE 1 */}
<SwiperSlide>
<div className="grid grid-cols-12 gap-10 place-items-center p-3">

<div className="col-span-12 w-[60%]">
<h4 className="text-2xl font-bold text-center">
What is the unique selling point (USP) about my product?
</h4>
</div>

<div className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3">
<h4 className="text-xl text-center">
Is it inexpensive, good quality, compact, or is sold in multiple colors unlike other products?
</h4>

<textarea
placeholder="write here..."
rows={3}
className="p-2 border text-lg w-full rounded-lg"
onChange={(e) =>
handleAnswer(
"Is it inexpensive, good quality, compact, or is sold in multiple colors unlike other products?",
e.target.value
)
}
/>

</div>

<div className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3">

<h4 className="text-xl text-center">
Or does it have all the features whereas the other products don’t?
</h4>

<div className="flex gap-5 justify-center">

{["YES", "NO"].map((v) => (
<label key={v} className="flex gap-2 items-center">

<input
type="radio"
name="usp_features"
className="w-5 h-5 accent-violet-900"
onChange={() =>
handleAnswer(
"Or does it have all the features whereas the other products don’t?",
v
)
}
/>

{v}

</label>
))}

</div>
</div>

</div>
</SwiperSlide>

{/* SLIDE 2 */}
<SwiperSlide>

<div className="grid grid-cols-12 gap-10 place-items-center p-3">

<div className="col-span-12 w-[60%]">

<h4 className="text-2xl font-bold text-center">

How can you improve this product?

</h4>

</div>

{[
"Can you make it more compact while still making it spacious?",
"Can you improve the quality of the material to make it durable?",
"Can you sell it for a higher price to ensure that quality remains good?",
].map((q, i) => (

<div key={q} className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3">

<h4 className="text-xl text-center">{q}</h4>

<div className="flex gap-5 justify-center">

{["YES", "NO"].map((v) => (

<label key={v} className="flex gap-2 items-center">

<input
type="radio"
name={`improve_${i}`}
className="w-5 h-5 accent-violet-900"
onChange={() => handleAnswer(q, v)}
/>

{v}

</label>

))}

</div>

</div>

))}

</div>

</SwiperSlide>

{/* SLIDE 3 */}

<SwiperSlide>

<div className="grid grid-cols-12 gap-10 place-items-center p-3">

<div className="col-span-12 w-[60%]">

<h4 className="text-2xl font-bold text-center">

What are the potential obstacles?

</h4>

</div>

{[
"Are there other companies making the same product?",
"Are the customers going to other products because it’s cheaper than yours?",
].map((q, i) => (

<div key={q} className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3">

<h4 className="text-xl text-center">{q}</h4>

<div className="flex gap-5 justify-center">

{["YES", "NO"].map((v) => (

<label key={v} className="flex gap-2 items-center">

<input
type="radio"
name={`obstacles_${i}`}
className="w-5 h-5 accent-violet-900"
onChange={() => handleAnswer(q, v)}
/>

{v}

</label>

))}

</div>

</div>

))}

</div>

</SwiperSlide>

{/* SLIDE 4 */}

<SwiperSlide>

<div className="grid grid-cols-12 gap-10 place-items-center p-3">

<div className="col-span-12 w-[60%]">

<h4 className="text-2xl font-bold text-center">

How can you create and benefit from opportunities with this product?

</h4>

</div>

{[
"Can you tell your friends and family to try and see how good this product is?",
"Can you ask your first customers to speak about this product?",
"Can you give this product for free to someone using another product to see the difference?",
].map((q, i) => (

<div key={q} className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3">

<h4 className="text-xl text-center">{q}</h4>

<div className="flex gap-5 justify-center">

{["YES", "NO"].map((v) => (

<label key={v} className="flex gap-2 items-center">

<input
type="radio"
name={`opportunities_${i}`}
className="w-5 h-5 accent-violet-900"
onChange={() => handleAnswer(q, v)}
/>

{v}

</label>

))}

</div>

</div>

))}

{/* ✅ BUTTON ONLY LAST SLIDE */}

<div className="col-span-12 w-full text-center">

{activeSlide === 3 && (

<button
onClick={generateFullPdf}
className="text-lg bg-violet-900 text-white min-w-40 px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all duration-300"
>

Download Pdf

</button>

)}

</div>

</div>

</SwiperSlide>

</Swiper>

</div>

<div className="flex justify-between items-center w-full mt-8">

<span
onClick={handlePrev}
className={`${activeSlide === 0 ? "invisible" : "visible"} cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
>

<FaArrowLeft />

</span>

<span
onClick={handleNext}
className={`${activeSlide < 3 ? "visible" : "invisible"} cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
>

<FaArrowRight />

</span>

</div>

</div>

</div>
);
};

export default Slide;