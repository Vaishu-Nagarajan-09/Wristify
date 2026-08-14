import React from "react";
import watch3 from "../assets/images/watch-img 3.jpeg";
import watch11 from "../assets/images/watch-img 11.jpg";
import watch15 from "../assets/images/watch-img 15.jpg";
import watch2 from "../assets/images/watch-img 2.jpeg";
import watch14 from "../assets/images/watch-img 14.jpg";
import watch10 from "../assets/images/watch-img 10.jpg";

const WristifyJournal = () => {

    const Journal = [
       {
      title: "Superior Craftsmanship",
      desc: "Each Wristify watch is meticulously crafted with precision and attention to detail, reflecting the artistry of expert watchmakers.",
      img: watch3,
    },
    {
      title: "Elegant and Timeless Design",
      desc: "Our timepieces feature clean lines, minimalistic dials, and a sophisticated aesthetic that never goes out of style.",
      img: watch11,
    },
    {
      title: "Attention to Detail",
      desc: "Every component is carefully assembled to ensure flawless performance and enduring beauty.",
      img: watch15,
    },
    {
      title: "Precision Engineering",
      desc: "Powered by high-accuracy movements, Wristify watches deliver unmatched reliability.",
      img: watch2,
    },
    {
      title: "Built for Everyday Excellence",
      desc: "Designed to transition effortlessly from formal occasions to daily wear.",
      img: watch14,
    },
    {
      title: "Luxury That Speaks",
      desc: "A statement of confidence, ambition, and refined taste.",
      img: watch10
    },
    ]

    return(
        <>
         <section className="watch-journal">
            <div className="container">
                <h2 className="journal-title">The Wristify Journal</h2>
                <div className="row">
                    {Journal.map((item, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="journal-card">
                                <img src={item.img}
                                alt={item.title} className="journal-img" />
                                <h4 className="journal-heading">{item.title}</h4>
                                <p className="journal-descrp">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

         </section>
        </>
    )
}

export default WristifyJournal;