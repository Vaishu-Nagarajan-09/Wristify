import React from "react";


const WristifyJournal = () => {

    const Journal = [
       {
      title: "Superior Craftsmanship",
      desc: "Each Wristify watch is meticulously crafted with precision and attention to detail, reflecting the artistry of expert watchmakers.",
      img: "images/watch-img 3.jpeg",
    },
    {
      title: "Elegant and Timeless Design",
      desc: "Our timepieces feature clean lines, minimalistic dials, and a sophisticated aesthetic that never goes out of style.",
      img: "images/watch-img 11.jpg",
    },
    {
      title: "Attention to Detail",
      desc: "Every component is carefully assembled to ensure flawless performance and enduring beauty.",
      img: "images/watch-img 15.jpg",
    },
    {
      title: "Precision Engineering",
      desc: "Powered by high-accuracy movements, Wristify watches deliver unmatched reliability.",
      img: "images/watch-img 2.jpeg",
    },
    {
      title: "Built for Everyday Excellence",
      desc: "Designed to transition effortlessly from formal occasions to daily wear.",
      img: "images/watch-img 14.jpg",
    },
    {
      title: "Luxury That Speaks",
      desc: "A statement of confidence, ambition, and refined taste.",
      img: "images/watch-img 10.jpg",
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