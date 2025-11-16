import React, { useState, useEffect, useCallback, useRef } from 'react';
import sareefusion from '../assets/sareefusion.png';

// DATA (Kept local since it's specific to the carousel)
const curouselItem = [
    { id: 1, src: "https://www.parisera.com/cdn/shop/files/DSC_4630-1_Copy.jpg?v=1750314810", title: "Classic Fusion Design", description: "A perfect blend of modern silhouettes with traditional Banarasi silk." },
    { id: 2, src: "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/cp-4-840x425.jpg", title: "Aqua Border Saree", description: "Featuring a delicate aqua border with silver thread work, ideal for evening events." },
    { id: 3, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 4, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 5, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
];
const auto_time = 5000;

// Re-defining required icons/helpers locally for clarity, assuming they are available via context or props if they were used.
const ArrowRightIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 4 19 12 12 20"/><line x1="19" x2="5" y1="12" y2="12"/></svg>;

const HeroSection = ({ startpage }) => (
    <div className="hero-section position-relative overflow-hidden m-4 mb-5">
        <img
            src={sareefusion}
            alt="Beautifully crafted handloom saree worn by models in a traditional setting"
            className="hero-image w-100 h-auto"
            onError={(e) => { e.target.src = "https://placehold.co/1300x700/4B0082/FFFFFF?text=Handloom+Saree+Background"; }}
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
            <h1
            className="hero-title text-white mb-3"
            style={{ fontFamily: "'Italianno', cursive" }}
                >
    Saree Fusion
            </h1>

            <p className="text-white mb-4 small fw-medium">By Saree Designer</p>
            <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                    className="btn btn-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button"
                    onClick={() => startpage('upload')}
                >
                    Explore
                </button>
                <button
                    className="btn btn-outline-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button-secondary"
                    onClick={() => startpage('upload')}
                >
                    Shop
                </button>
            </div>
        </div>
    </div>
);

const CustomCarousel = ({ items }) => {
    const [centerIndex, setCenterIndex] = useState(0);
    const contentRef = useRef(null);
    const wrapperRef = useRef(null);
    const itemsRef = useRef([]);

    const CarouselClasses = useCallback(() => {
        const items = itemsRef.current;
        const content = contentRef.current;
        const wrapper = wrapperRef.current;
        if (!items || !content || !wrapper || items.length === 0) return;

        items.forEach((item, index) => {
            if (!item) return;
            item.className = 'owl-item';
            const distance = Math.abs(index - centerIndex);

            if (distance === 0) {
                item.classList.add('active', 'middle');
            } else if (distance === 1) {
                item.classList.add('active', 'middle_beside');
            } else if (distance > 1) {
                item.classList.add('active');
            }
        });

        const itemWidth = items[0]?.offsetWidth || (wrapper.clientWidth * 0.7);
        const wrapperWidth = wrapper.clientWidth;
        const offset = -(centerIndex * itemWidth) + (wrapperWidth / 2) - (itemWidth / 2);
        
        content.style.transform = `translateX(${offset}px)`;
    }, [centerIndex]);

    const moveCarousel = useCallback((direction) => {
        setCenterIndex(prevIndex => {
            let newIndex = prevIndex + direction;
            if (newIndex >= items.length) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = items.length - 1;
            }
            return newIndex;
        });
    }, [items.length]);

    useEffect(() => {
        CarouselClasses();
    }, [centerIndex, CarouselClasses]);

    useEffect(() => {
        const interval = setInterval(() => moveCarousel(1), auto_time);
        window.addEventListener('resize', CarouselClasses);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', CarouselClasses);
        };
    }, [moveCarousel, CarouselClasses]);

    return (
        <div id="custom-owl-wrapper" ref={wrapperRef} className="owl_wrapper mb-5">
            <button className="prev no_select" aria-label="Previous Design" onClick={() => moveCarousel(-1)}>&lt;</button>
            <div ref={contentRef} className="owl_content">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        ref={el => itemsRef.current[index] = el}
                        className="owl-item"
                    >
                        <div
                            className="carousel-image-container cursor-pointer"
                            onClick={() => window.open(item.src, '_blank')}
                        >
                            <img src={item.src} alt={item.title} className="w-100 h-100 object-fit-cover rounded-3" />
                            <div className="caption mb-0 text-start">
                                <p className="title mb-1">{item.title}</p>
                                <p className="description mb-0">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="next no_select" aria-label="Next Design" onClick={() => moveCarousel(1)}>&gt;</button>
        </div>
    );
};

export const HomeView = ({ startpage }) => (
    <div className="d-flex d-lg-flex flex-column">
        
        <HeroSection startpage={startpage} />

        <CustomCarousel items={curouselItem} />

        <div className="align-desktop d-flex flex-column gap-4 pb-5">
            <h2 className="text text-center fw-bold fs-3 mb-4" >Design Components</h2>
            
            <div className="row g-3">
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => startpage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-red)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0 3 3v7a3 3 0 0 0 3 3h-3l-2 3h-2l-2-3H6a3 3 0 0 0 3-3V5a3 3 0 0 0 3-3z"/><path d="M4 14.5A.5.5 0 0 1 4.5 14h15a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 14.5z"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD BODY</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => startpage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-gold)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M4 7h16"/><path d="M17 7c0 1.5 0 3-2 3c-2 0-2-3-4-3c-2 0-2 3-4 3c-2 0-2-1.5-2-3"/><path d="M17 10h5"/><path d="M2 10h5"/><path d="M12 10v7"/><path d="M12 22l-2-3h4z"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD PALLU</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => startpage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-orange)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="4" x="2" y="18" rx="1"/><rect width="20" height="4" x="2" y="12" rx="1"/><rect width="20" height="4" x="2" y="6" rx="1"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD BORDER</p>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center pt-4">
                {/* <button onClick={() => startpage('upload')} className="btn btn-primary-custom w-100 py-3 rounded-4 shadow-xl mb-4 d-flex align-items-center justify-content-center cta-button">
                    <span className="fs-5">Design Your Custom Saree</span>
                    <ArrowRightIcon className="ms-3" style={{ width: 24, height: 24 }} />
                </button> */}
                
                <p className="text-center large px-10 fw-medium fw-bold" style={{ color: 'var(--text-secondary)' }}>
                    where tradition meets innovation, design your dream saree with your unique blend of body, border, and pallu.
                </p>
            </div>
        </div>
    </div>
);