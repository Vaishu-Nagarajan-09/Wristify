import React from "react";

const VideoPromo = () => {
    return (
        <>
            <section className="video">
                <div className="container">
                    <h2 className="video-title">Video Promo</h2>
                    <p className="video-heading">
                        Witness the craftsmanship, precision, and prestige behind every Wristify <br/>
                        timepiece. Designed for those who lead with confidence and live without limits
                    </p>
                </div>
                <div className="video-image-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-10 col-12">
                            <div className="ratio ratio-16x9 video-img">
                                <iframe
                                    src="https://www.youtube.com/embed/YGQBm9Mnad8"
                                    title="Watch Promo"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default VideoPromo;