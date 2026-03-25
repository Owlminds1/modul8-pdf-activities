"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

import MyImage from "@/components/MyImage";

type Answers = Record<string, string>;

const pitchQuestions = [
  "What is your company going to make? Please describe your product and what it does or will do.",
  "Where do you live now, and where would the company be based?",
  "How do or will you make money? How much can you make? (give your best estimate)",
  "Who are your competitors? What do you understand about your business that they don't?",
  "Why did you pick this idea to work on? Do you have domain expertise in this area? How do you know people need what you're making?"
];

const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  const handleAnswer = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const generatePdfForSlide = (
    slideTitle: string,
    questions: string[]
  ) => {
    // validation
    const unanswered = questions.filter((q) => !answers[q]);
    if (unanswered.length > 0) {
      alert("Please answer all questions before downloading the PDF.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 25;

    doc.setFontSize(18);
    doc.text(slideTitle, pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setFontSize(12);

    questions.forEach((q, index) => {
      const answer = answers[q] || "Not answered";

      const qLines = doc.splitTextToSize(
        `${index + 1}. ${q}`,
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

    doc.save(`Pitch-Deck.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <h4 className="text-3xl font-bold text-black text-center">
          {activeSlide === 0
            ? "PITCH"
            : activeSlide === 1
            ? "PITCH QUESTIONS"
            : activeSlide === 2 ?"Presentation Format:":""}
        </h4>
        <p className="text-center text-black text-xl">
          {activeSlide === 0
            ? "Let’s create a pitch deck based on the guidelines set up by Y Combinator."
            : ""}
        </p>
      </div>

      {/* Swiper */}
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
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C64Images/Combinator.jpg" />
                </div>
                <div className="col-span-6 w-full">
                  <ul className="list-disc space-y-3">
                    <li className="text-xl font-medium">
                      You can create any product
                    </li>
                    <li className="text-xl font-medium">
                      Create a pitch deck in 3 minutes
                    </li>
                    <li className="text-xl font-medium">
                      Practice like real startup founders
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 2 */}
            <SwiperSlide>
              <div className="grid grid-cols-12 gap-10 place-items-center p-3">

                <div className="col-span-12 w-full flex justify-center items-center ">
                  <MyImage path="/C64Images/Product.jpg"/>
                </div>
                <div className="col-span-12 w-[60%]">
                  <h4 className="text-2xl font-bold text-center">
                    Questions To Be Answered
                  </h4>
                </div>

                {pitchQuestions.map((q) => (
                  <div
                    key={q}
                    className="col-span-12 w-[60%] shadow p-5 rounded-lg flex flex-col gap-3"
                  >
                    <h4 className="text-xl text-center">{q}</h4>

                    <textarea
                      placeholder="write here..."
                      className="rounded-lg w-full text-lg text-black p-2 outline-0 border"
                      rows={3}
                      value={answers[q] || ""}
                      onChange={(e) =>
                        handleAnswer(q, e.target.value)
                      }
                    />
                  </div>
                ))}

                <div className="col-span-12 w-full text-center">
                  <button
                    onClick={() =>
                      generatePdfForSlide(
                        "Pitch Questions & Answers",
                        pitchQuestions
                      )
                    }
                    className="text-lg bg-violet-900 text-white min-w-40 px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all duration-300"
                  >
                    Download Pdf
                  </button>
                </div>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="grid grid-cols-12 gap-10 place-items-center p-3">

                <div className="col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C64Images/Presentation.png"/>
                </div>
                

                <div
                
                  className="col-span-6 w-full  "
                >
                  <ul   className="list-disc space-y-3">
                {["Please record a one minute video introducing the founder(s).* Make sure the file does not exceed 100 MB. Guidelines>>> In the video please introduce yourselves, explain what you’re doing and why, and tell us anything else you want to about the founders or the project.","The video should be up to 3 minutes long and should contain nothing except the founders talking.","This is not the place to submit a demo or promotional video. If you have a demo for your product, there is a separate place in the application for that. For this video, we want to hear how the founders communicate.","If you have more than one founder, have all of your founders in the video. If you can’t be in the same room at the same time, screen record a video call instead.","Do not recite a written script: Use bullet points instead. Using bullet points, just talk spontaneously as you would to a friend. Reading a written script doesn't help your application or convey communication skills."].map((q) => (

                    <li  key={q} className="text-xl ">{q}</li>
                    
                    
                  ))}
                  </ul>
</div>

               
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center w-full mt-8">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            } cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>

          <span
            onClick={handleNext}
            className={`${
              activeSlide < 2 ? "visible" : "invisible"
            } cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;