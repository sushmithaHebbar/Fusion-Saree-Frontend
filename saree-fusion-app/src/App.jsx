import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Icon SVGs (Using lucide-react style icons) ---
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const UploadIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const PlusIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
const RedoIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M21.5 8a10 10 0 1 0 0 8"/><path d="M2.5 16a10 10 0 1 1 0-8"/></svg>;
const CheckIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowRightIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 4 19 12 12 20"/><line x1="19" x2="5" y1="12" y2="12"/></svg>;
const SaveIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 2v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M20.78 4.22l-1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/></svg>;
const SunIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const TwitterIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.5 3 7c1.7 2.9 4.3 5 8 5-.4-1.2-1-2-1.2-3.4 3.4 1.8 7.3-2.6 4-6C17.4 3.7 18.7 5 19.5 6.4 20.9 6.2 22 5.2 22 4z"/></svg>;
const InstagramIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;


// --- DATA ---
const CAROUSEL_ITEMS = [
    { id: 1, src: "https://www.parisera.com/cdn/shop/files/DSC_4630-1_Copy.jpg?v=1750314810", title: "Classic Fusion Design", description: "A perfect blend of modern silhouettes with traditional Banarasi silk." },
    { id: 2, src: "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/cp-4-840x425.jpg", title: "Aqua Border Saree", description: "Featuring a delicate aqua border with silver thread work, ideal for evening events." },
    { id: 3, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 4, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 5, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
]; 
const AUTO_ADVANCE_TIME = 5000; // 5 seconds

// --- COMPONENTS ---

const Header = ({ setPage, toggleMenu, isMenuOpen, currentPage, theme, toggleTheme }) => (
    <header className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom sticky-top shadow-sm navbar-height" style={{ zIndex: 10, backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
        {/* Left Section: Logo and Desktop Links */}
        <div className="d-flex align-items-center">
            {/* Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" className="me-2" style={{ width: 28, height: 28, color: 'var(--bs-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="M15 2H9"></path>
                <path d="M12 2v2"></path>
                <path d="M12 11v6"></path>
                <path d="M12 11l-3 3"></path>
                <path d="M12 11l3 3"></path>
            </svg>
            <span className="fs-4 fw-bold me-4" style={{ color: 'var(--bs-primary)' }}>Saree Fusion</span>

            {/* Desktop Navigation Links (Visible on large screens) */}
            <div className="d-none d-lg-flex align-items-center gap-4 ms-3">
                <button 
                    onClick={() => setPage('home')} 
                    className={`nav-link-desktop ${currentPage === 'home' ? 'active-link' : ''}`}
                >
                    Home
                </button>
                <button 
                    onClick={() => setPage('upload')} 
                    className={`nav-link-desktop ${currentPage === 'upload' ? 'active-link' : ''}`}
                >
                    Design Studio
                </button>
            </div>
        </div>

        {/* Right Section: Icons */}
        <div className="d-flex align-items-center">
            {/* Theme Toggle Button */}
            <button className="btn btn-light rounded-circle p-2 me-3" aria-label="Toggle Theme" onClick={toggleTheme} style={{ backgroundColor: 'var(--bg-input)' }}>
                {theme === 'light' ? 
                    <MoonIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} /> :
                    <SunIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
                }
            </button>

            <button className="btn btn-light rounded-circle p-2 me-3" aria-label="Search" style={{ backgroundColor: 'var(--bg-input)' }}>
                <SearchIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
            </button>
            {/* Menu Toggle (Hidden on large screens where desktop links are shown) */}
            <button className="btn btn-light rounded-circle p-2 d-lg-none" aria-label="Toggle Menu" onClick={() => toggleMenu()} style={{ backgroundColor: 'var(--bg-input)' }}>
                <MenuIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
            </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`menu-overlay ${isMenuOpen ? 'show' : ''}`} onClick={() => toggleMenu(false)}>
            <div className="menu-content rounded-3 shadow-lg p-2" style={{ backgroundColor: 'var(--card-bg)' }} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { setPage('home'); toggleMenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                    <HomeIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                    <span>Home</span>
                </button>
                <button onClick={() => { setPage('upload'); toggleMenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                    <UploadIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                    <span>Design Studio</span>
                </button>
                <div className="dropdown-divider my-1" style={{ borderColor: 'var(--border-color)' }}></div>
                <button onClick={() => toggleMenu(false)} className="btn w-100 text-start py-2 px-3 text-danger d-flex align-items-center justify-content-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                    <span>Close</span>
                </button>
            </div>
        </div>
    </header>
);

const HeroSection = ({ setPage }) => (
    // The hero section must handle its own responsive margins since the app-container no longer provides them.
    <div className="hero-section position-relative overflow-hidden m-4 mb-5">
        <img 
            src="https://placehold.co/1300x700/374151/FFFFFF?text=Elegant+Saree+Hero+Image" 
            alt="Beautifully crafted handloom saree worn by models in a traditional setting" 
            className="hero-image w-100 h-auto"
            onError={(e) => { e.target.src = "https://placehold.co/1300x700/4B0082/FFFFFF?text=Handloom+Saree+Background"; }}
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
            <h1 className="hero-title fw-light text-white mb-3 text-uppercase">
                Beautifully Crafted <br/> <span className="fw-bold">Handloom Saree</span>
            </h1>
            <p className="text-white mb-4 small fw-medium">By Indian Artisans</p>
            <div className="d-flex flex-column flex-sm-row gap-3">
                <button 
                    className="btn btn-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button"
                    onClick={() => setPage('upload')}
                >
                    Shop Now
                </button>
                <button 
                    className="btn btn-outline-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button-secondary"
                    onClick={() => setPage('upload')}
                >
                    Shop Banarasi
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

    // Logic to update item classes and position based on centerIndex
    const updateCarouselClasses = useCallback(() => {
        const items = itemsRef.current;
        const content = contentRef.current;
        const wrapper = wrapperRef.current;
        if (!items || !content || !wrapper || items.length === 0) return;

        // 1. Apply 3D visibility classes based on centerIndex
        items.forEach((item, index) => {
            if (!item) return;
            item.className = 'owl-item'; // Reset class
            
            // Calculate distance from the center (0, 1, 2, ...)
            const distance = Math.abs(index - centerIndex);

            if (distance === 0) {
                item.classList.add('active', 'middle');
            } else if (distance === 1) {
                item.classList.add('active', 'middle_beside');
            } else if (distance > 1) {
                item.classList.add('active'); // General active for opacity transition
            }
        });

        // 2. Calculate and apply content horizontal translation (to center the middle item)
        // Check if items[0] exists before accessing offsetWidth
        const itemWidth = items[0]?.offsetWidth || (wrapper.clientWidth * 0.7); // Fallback to 70% of wrapper width
        const wrapperWidth = wrapper.clientWidth;
        
        // This calculation centers the current 'middle' item visually
        const offset = -(centerIndex * itemWidth) + (wrapperWidth / 2) - (itemWidth / 2);
        
        content.style.transform = `translateX(${offset}px)`;
    }, [centerIndex]);

    // Handles movement and loop
    const moveCarousel = useCallback((direction) => {
        setCenterIndex(prevIndex => {
            let newIndex = prevIndex + direction;
            if (newIndex >= items.length) {
                newIndex = 0; // Loop back to start (Classic Fusion)
            } else if (newIndex < 0) {
                newIndex = items.length - 1; // Loop to end
            }
            return newIndex;
        });
    }, [items.length]);

    // Initial load, state change, and window resize effects
    useEffect(() => {
        updateCarouselClasses();
    }, [centerIndex, updateCarouselClasses]);

    // Auto-advance and Resize listeners
    useEffect(() => {
        // Auto-advance interval
        const interval = setInterval(() => moveCarousel(1), AUTO_ADVANCE_TIME);

        // Resize listener
        window.addEventListener('resize', updateCarouselClasses);

        // Cleanup
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', updateCarouselClasses);
        };
    }, [moveCarousel, updateCarouselClasses]);

    return (
        // The container needs max-width for desktop, but padding for mobile centering
        <div id="custom-owl-wrapper" ref={wrapperRef} className="owl_wrapper mb-5">
            <button className="prev no_select" aria-label="Previous Design" onClick={() => moveCarousel(-1)}>&lt;</button>
            <div ref={contentRef} className="owl_content">
                {items.map((item, index) => (
                    <div 
                        key={item.id} 
                        ref={el => itemsRef.current[index] = el}
                        className="owl-item"
                    >
                        {/* Placeholder image for a saree */}
                        <div className="carousel-image-container">
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

const HomeView = ({ setPage }) => (
    <div className="d-flex d-lg-flex flex-column">
        
        <HeroSection setPage={setPage} />

        <CustomCarousel items={CAROUSEL_ITEMS} />

        {/* Start of Centered Content: Applied align-desktop here */}
        <div className="align-desktop d-flex flex-column gap-4 pb-5">
            <h2 className="text-center fw-bold fs-3 mb-4" style={{ color: 'var(--text-primary)' }}>Design Components</h2>
            
            {/* Upload Sections */}
            <div className="row g-3">
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => setPage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-red)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0 3 3v7a3 3 0 0 0 3 3h-3l-2 3h-2l-2-3H6a3 3 0 0 0 3-3V5a3 3 0 0 0 3-3z"/><path d="M4 14.5A.5.5 0 0 1 4.5 14h15a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 14.5z"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD BODY</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => setPage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-gold)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M4 7h16"/><path d="M17 7c0 1.5 0 3-2 3c-2 0-2-3-4-3c-2 0-2 3-4 3c-2 0-2-1.5-2-3"/><path d="M17 10h5"/><path d="M2 10h5"/><path d="M12 10v7"/><path d="M12 22l-2-3h4z"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD PALLU</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card border-0 shadow-lg p-3 rounded-4 h-100 text-center cursor-pointer upload-card" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => setPage('upload')}>
                        <span className="fs-2 upload-icon" style={{ color: 'var(--accent-orange)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="4" x="2" y="18" rx="1"/><rect width="20" height="4" x="2" y="12" rx="1"/><rect width="20" height="4" x="2" y="6" rx="1"/></svg>
                        </span>
                        <p className="mt-2 mb-0 small fw-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>UPLOAD BORDER</p>
                    </div>
                </div>
            </div>

            {/* CTA Button and Tagline */}
            <div className="d-flex flex-column align-items-center pt-4">
                <button onClick={() => setPage('upload')} className="btn btn-primary-custom w-100 py-3 rounded-4 shadow-xl mb-4 d-flex align-items-center justify-content-center cta-button">
                    <span className="fs-5">Design Your Custom Saree</span>
                    <ArrowRightIcon className="ms-3" style={{ width: 24, height: 24 }} />
                </button>
                <p className="text-center small px-2 fw-medium" style={{ color: 'var(--text-secondary)' }}>
                    **INHERIT TRADITION MEETS INNOVATION.** DESIGN YOUR DREAM SAREE WITH YOUR UNIQUE BLEND OF BODY, BORDER, AND PALLU.
                </p>
            </div>
        </div>
        {/* End of Centered Content */}
    </div>
);

const UploadView = ({ startGeneration }) => (
    <div className="align-desktop d-flex d-xl-flex flex-column pb-5">
        <h1 className="fs-4 fw-bold mb-4 border-bottom pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>Design Workspace</h1>
        <div className="d-flex flex-column gap-4">
            {/* Upload Paluu / Border Section */}
            <div className="card shadow-lg rounded-4 border-0 p-3 upload-section-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h6 fw-semibold text-primary">Upload Paluu / Borders</h2>
                    <button className="btn btn-outline-primary rounded-circle p-1 border-2" style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}>
                        <PlusIcon />
                    </button>
                </div>
                <div className="border border-2 border-dashed rounded-4 p-4 text-center upload-area" style={{ height: 120, borderColor: 'var(--border-color-dashed)' }}>
                    <p className="mb-0 fw-medium" style={{ color: 'var(--text-secondary)' }}>Drop Files or Click to Upload</p>
                </div>
            </div>

            {/* Upload Body Section */}
            <div className="card shadow-lg rounded-4 border-0 p-3 upload-section-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h6 fw-semibold text-primary">Upload Body Image</h2>
                    <button className="btn btn-outline-primary rounded-circle p-1 border-2" style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}>
                        <PlusIcon />
                    </button>
                </div>
                <div className="border border-2 border-dashed rounded-4 p-4 text-center upload-area" style={{ height: 120, borderColor: 'var(--border-color-dashed)' }}>
                    <p className="mb-0 fw-medium" style={{ color: 'var(--text-secondary)' }}>Drop Model Image Here</p>
                </div>
            </div>

            {/* Prompt/Description Input */}
            <div className="card shadow-lg rounded-4 border-0 p-3 upload-section-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h2 className="h6 fw-semibold text-primary mb-3">Design Description</h2>
                <textarea 
                    className="form-control rounded-3"
                    rows="4"
                    placeholder="Describe the desired colors, patterns, and style (e.g., 'A magenta silk saree with a golden zari peacock motif on the pallu and a geometric border')."
                    style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border-color-dashed)' }}
                ></textarea>
            </div>


            {/* Generate Button */}
            <button onClick={startGeneration} className="btn btn-primary-custom w-100 py-3 mt-4 rounded-4 shadow-xl cta-button">
                <span className="fs-5">GENERATE FUSION</span>
            </button>
        </div>
    </div>
);

const ResultView = ({ generatedImageUrl, setPage }) => (
    <div className="align-desktop pb-5">
        <h1 className="fs-4 fw-bold mb-4 border-bottom pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>Generated Results</h1>
        <div className="d-flex flex-column gap-4">
            {/* Main Result Display */}
            <div className="card shadow-2xl rounded-4 overflow-hidden position-relative result-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                <img src={generatedImageUrl} alt="AI Generated Saree Design" className="card-img-top w-100 h-auto object-fit-cover rounded-4" />
                <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
                     <span className="badge bg-success rounded-pill fw-semibold text-uppercase d-flex align-items-center px-3 py-2" style={{ width: 'fit-content' }}>
                         <CheckIcon className="me-1" style={{ width: 16, height: 16 }} /> Final Generated Image
                     </span>
                </div>
            </div>

            {/* Action Buttons (Redo/Save) */}
            <div className="d-flex justify-content-center gap-3">
                <button onClick={() => setPage('upload')} className="btn btn-outline-primary fw-semibold rounded-pill border-2 shadow-sm d-flex align-items-center justify-content-center py-2 px-4 action-button" style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}>
                    <RedoIcon className="me-2" />
                    <span className="ms-2">Re-Generate</span>
                </button>
                <button onClick={() => setPage('home')} className="btn btn-primary-custom fw-semibold rounded-pill shadow-lg d-flex align-items-center justify-content-center py-2 px-4 action-button">
                    <SaveIcon className="me-2" />
                    <span>Save & View</span>
                </button>
            </div>

            {/* Other Generated Results (Simulated) */}
            <div className="pt-3">
                <h2 className="h6 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Other Variations</h2>
                <div className="row g-3">
                    <div className="col-6">
                        <div className="rounded-4 d-flex align-items-center justify-content-center small shadow-sm" style={{ height: 180, backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }}>Generated Result 2</div>
                    </div>
                    <div className="col-6">
                        <div className="rounded-4 d-flex align-items-center justify-content-center small shadow-sm" style={{ height: 180, backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }}>Generated Result 3</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const LoadingView = () => (
    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ minHeight: 500 }}>
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: 'var(--bs-primary)' }}>
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-5 fw-semibold" style={{ color: 'var(--bs-primary)' }}>Fusing Design...</p>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Please wait while the AI crafts your unique Saree fusion.</p>
    </div>
);

// New Footer Component
const Footer = ({ setPage }) => {
    // Determine background color based on theme
    const footerBg = 'var(--footer-bg)';
    const textColor = 'var(--footer-text-color)';
    const linkColor = 'var(--footer-link-color)';

    const footerLinks = [
        { title: "Quick Links", links: ["Home", "Design Studio", "Sale", "About Us"] },
        { title: "Support", links: ["Contact Us", "FAQs", "Shipping & Returns", "Size Guide"] }
    ];

    const LinkItem = ({ text }) => (
        <a href="#" className="text-decoration-none fw-light small py-1 d-block" style={{ color: linkColor }} onClick={(e) => { e.preventDefault(); /* Handle navigation */ }}>
            {text}
        </a>
    );

    return (
        <footer className="w-100 mt-auto pt-5" style={{ backgroundColor: footerBg, color: textColor }}>
            {/* Top CTA Strip */}
            <div className="text-center py-4 px-1 cta-strip-gradient">
                <h3 className="fs-3 fw-bold text-white ">Looking For a Custom Designer Saree?</h3>
                <button 
                    className="btn fw-semibold py-3 px-5 rounded-pill shadow-lg text-uppercase"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)' }}
                    onClick={() => setPage('upload')}
                >
                    Contact Us
                </button>
            </div>

            {/* Main Link Columns */}
            <div className="container-fluid px-5 py-5">
                <div className="row g-4">
                    {/* Column 1: Branding & Social */}
                    <div className="col-12 col-md-5 mb-4">
                        <h3 className="fs-5 fw-bold mb-3" style={{ color: 'var(--bs-primary)' }}>Saree Fusion</h3>
                        <p className="fw-light small mb-4" style={{ color: textColor }}>
                            Elegance woven into every thread. Discover our curated collections and design services for all your special occasions.
                        </p>
                        <div className="d-flex gap-3 social-icons">
                            <TwitterIcon style={{ color: 'var(--bs-primary)' }} />
                            <InstagramIcon style={{ color: 'var(--bs-primary)' }} />
                            <FacebookIcon style={{ color: 'var(--bs-primary)' }} />
                        </div>
                    </div>

                    {/* Column 2 & 3: Links */}
                    {footerLinks.map(col => (
                        <div key={col.title} className="col-6 col-md-3">
                            <h4 className="fs-6 fw-bold mb-3 text-uppercase" style={{ color: 'var(--bs-primary)' }}>{col.title}</h4>
                            <ul className="list-unstyled">
                                {col.links.map(link => (
                                    <li key={link}>
                                        <LinkItem text={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright Strip */}
            <div className="text-center py-3 small fw-light" style={{ backgroundColor: 'var(--footer-sub-bg)', color: textColor }}>
                &copy; {new Date().getFullYear()} Saree Fusion. All rights reserved.
            </div>
        </footer>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    const [currentPage, setPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    // Effect to apply the theme class to the document body
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
    }, [theme]);


    const toggleMenu = useCallback((forceState) => {
        setIsMenuOpen(prev => forceState !== undefined ? forceState : !prev);
    }, []);

    const startGeneration = useCallback(async () => {
        setPage('loading');
        // Simulate API call and network latency
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mocked URL for the generated image
        const mockImageUrl = 'https://placehold.co/500x700/8EC5FC/374151?text=Saree+Fusion+Result';
        setGeneratedImageUrl(mockImageUrl);
        setPage('result');
        // The real API fetch logic is commented out above for runtime safety.

    }, []);

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomeView setPage={setPage} />;
            case 'upload':
                return <UploadView startGeneration={startGeneration} />;
            case 'loading':
                return <LoadingView />;
            case 'result':
                return <ResultView generatedImageUrl={generatedImageUrl} setPage={setPage} />;
            default:
                return <HomeView setPage={setPage} />;
        }
    };

    return (
        <div id="app" className="app-container d-flex flex-column">
            <style jsx="true">{`
                /* --- THEME VARIABLES --- */
                :root {
                    --bs-primary: #FF5722; /* Primary Orange */
                    --accent-red: #D32F2F; /* Deep Red for accents */
                    --accent-orange: #FF9800; /* Lighter Orange */
                    --accent-gold: #FFC107; /* Gold/Yellow for icons */
                    --icon-color: var(--text-primary); /* Icons use primary text color by default */

                    --bg-primary: white;
                    --bg-input: #f8f9fa; /* Light grey input/secondary background */
                    --text-primary: #333333; /* Darker text */
                    --text-secondary: #6c757d;
                    --shadow-color: rgba(255, 87, 34, 0.3); /* Orange shadow */
                    --card-bg: white;
                    --border-color: rgba(0, 0, 0, 0.1);
                    --border-color-dashed: rgba(255, 87, 34, 0.4);
                    
                    /* Footer Colors (Light Mode) */
                    --footer-bg: #f8f9fa; /* Light grey footer */
                    --footer-text-color: #333333;
                    --footer-link-color: #6c757d;
                    --footer-sub-bg: #e9ecef; /* Even lighter strip */
                }

                .dark-mode {
                    --bs-primary: #FF9800; /* Primary Orange/Amber */
                    --accent-red: #E91E63; 
                    --accent-orange: #FF5722; 
                    --accent-gold: #FFC107; 
                    --icon-color: var(--bs-primary); /* Icons use bright accent color in dark mode */

                    --bg-primary: #1c1c1c;
                    --bg-input: #333333;
                    --text-primary: white;
                    --text-secondary: #a0a0a0;
                    --shadow-color: rgba(255, 152, 0, 0.1); /* Amber shadow */
                    --card-bg: #2d2d2d;
                    --border-color: rgba(255, 255, 255, 0.1);
                    --border-color-dashed: rgba(255, 152, 0, 0.6); 
                    
                    /* Footer Colors (Dark Mode) */
                    --footer-bg: #111111; /* Very dark footer */
                    --footer-text-color: #f8f9fa;
                    --footer-link-color: #a0a0a0;
                    --footer-sub-bg: #000000; /* Pure black strip */
                }

                /* Apply Inter font and the main background color */
                body {
                    font-family: 'Inter', sans-serif;
                    background: var(--bg-primary); 
                    color: var(--text-primary); 
                    min-height: 100vh;
                    padding: 0;
                    margin: 0;
                    transition: background-color 0.3s;
                }
                
                .app-container {
                    width: 100%;
                    min-height: 100vh; 
                    max-width: 100%; 
                    
                    display: flex;
                    flex-direction: column; 
                    overflow: auto; 
                    background-color: var(--bg-primary); 
                    
                    margin: 0; 
                }
                
                /* Desktop/Laptop Styles: Make the app wide, tall, and centered */
                @media (min-width: 1200px) {
                    body {
                        display: d-lg-flex;
                        flex-direction: column;
                        justify-content: flex-start; 
                        align-items: center;
                    }

                    .app-container {
                        min-height: 100vh;
                        max-width: 100%; 
                        margin: 0;
                    }
                    /* FIX: Increase carousel item size slightly on desktop */
                    .owl-item {
                        min-width: 350px; 
                    }
                    
                    /* Ensures internal content aligns within a defined central column */
                    .align-desktop {
                        max-width: 1000px; 
                        margin: 0 auto; 
                        width: 100% !important; 
                        padding: 0 20px;
                    }
                    
                    /* Desktop Navigation Links */
                    .nav-link-desktop {
                        color: var(--text-secondary); 
                        background: none;
                        border: none;
                        font-weight: 500;
                        padding: 0.5rem 0.75rem;
                        border-radius: 0.5rem;
                        transition: color 0.2s, background-color 0.2s;
                    }
                    .nav-link-desktop:hover {
                        color: var(--bs-primary);
                        background-color: rgba(255, 87, 34, 0.1); 
                    }
                    .nav-link-desktop.active-link {
                        color: var(--bs-primary);
                        font-weight: 700;
                        box-shadow: 0 1px 0 0 var(--bs-primary); 
                        border-radius: 0; 
                    }
                }
                /* Mobile specific padding for align-desktop content */
                @media (max-width: 1199px) {
                     .align-desktop {
                        padding: 0 15px; 
                    }
                }

                /* --- General Polish --- */
                .text-primary {
                    color: var(--bs-primary) !important;
                }
                .fw-semibold {
                    font-weight: 600 !important;
                }

                .upload-card:hover {
                    box-shadow: 0 0 0 3px var(--bs-primary), 0 5px 15px var(--shadow-color) !important;
                    transform: translateY(-2px);
                    transition: all 0.2s ease-out;
                }
                .upload-card {
                    transition: all 0.2s ease-out;
                    box-shadow: 0 5px 15px var(--shadow-color) !important;
                }

                .cta-button {
                    /* Adds a subtle lift and glow */
                    box-shadow: 0 6px 15px var(--shadow-color), 0 2px 4px var(--shadow-color) !important;
                    letter-spacing: 0.5px;
                }
                .cta-button:active {
                    transform: scale(0.98);
                    box-shadow: 0 3px 8px var(--shadow-color), 0 1px 2px var(--shadow-color) !important;
                }
                .upload-area {
                    /* Enhanced dashed border with primary color hint */
                    border-color: var(--border-color-dashed) !important;
                    transition: border-color 0.2s;
                }
                .upload-area:hover {
                    border-color: var(--bs-primary) !important;
                }


                /* Custom scrollbar for better aesthetics */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: var(--bs-primary); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-track {
                    background-color: transparent;
                }

                /* Custom Primary Button */
                .btn-primary-custom {
                    background-color: var(--bs-primary);
                    border-color: var(--bs-primary);
                    color: white;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .btn-primary-custom:hover {
                    background-color: var(--accent-red);
                    border-color: var(--accent-red);
                }
                .btn-primary-custom:active {
                    transform: scale(0.98);
                }
                .cursor-pointer {
                    cursor: pointer;
                }


                /* Mobile Menu Overlay Styles */
                .menu-overlay {
                    position: absolute; 
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-primary); 
                    opacity: 0.98;
                    z-index: 2000;
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s;
                    padding-top: 70px; 
                }
                .menu-overlay.show {
                    display: block;
                    opacity: 1;
                }
                .menu-content {
                    position: relative; 
                    top: 0;
                    right: 0;
                    left: 0;
                    width: 100%;
                    transition: transform 0.3s, opacity 0.3s;
                    transform: translateY(0); 
                    opacity: 1;
                    box-shadow: 0 5px 15px var(--shadow-color) !important;
                    margin: 0 1.5rem; 
                }
                /* Hide menu on large screen */
                @media (min-width: 992px) {
                    .menu-overlay {
                        display: none !important;
                    }
                }
                
                /* --- CUSTOM 3D CAROUSEL STYLES (OWL-LIKE) --- */
                .owl_wrapper {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    height: 350px;
                    border-radius: 0; 
                    box-shadow: none !important; 
                    max-width: 100%; 
                    margin: 0 auto; 
                    background-color: var(--card-bg);
                    padding: 0 15px; 
                }
                @media (min-width: 1200px) {
                    .owl_wrapper {
                         height: 500px; 
                         max-width: 1100px; 
                         border-radius: 0; 
                         padding: 0; 
                    }
                }
                .owl_content {
                    display: flex;
                    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); 
                    height: 100%;
                }
                .owl-item {
                    min-width: calc(70% - 30px); 
                    height: 100%;
                    flex-shrink: 0;
                    padding: 0 0.5rem;
                    opacity: 0;
                    transform: scale(0.6);
                    transition: all 0.5s ease-in-out; 
                    z-index: 1;
                    display: flex; 
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .carousel-image-container {
                    position: relative;
                    width: 100%;
                    /* Adjusted height to show the image and leave space for padding/margin */
                    height: 90%; 
                    overflow: hidden;
                    border-radius: 0.75rem;
                    box-shadow: 0 5px 15px var(--shadow-color) !important; 
                }
                .owl-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .owl-item .caption {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    padding: 1rem 0.5rem;
                    color: white;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.8);
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%);
                    border-radius: 0 0 0.75rem 0.75rem;
                }
                /* State Classes managed by JS: .active is applied to all visible items */
                .owl-item.active {
                    opacity: 0.5;
                }
                /* Item beside the center */
                .owl-item.middle_beside {
                    transform: scale(0.85); 
                    opacity: 0.8; 
                    z-index: 2;
                }
                /* Center Item */
                .owl-item.middle {
                    transform: scale(1); 
                    opacity: 1; 
                    z-index: 3;
                }
                /* Navigation Buttons */
                .owl_wrapper .prev, .owl_wrapper .next{
                    position: absolute;
                    top: 50%; 
                    transform: translateY(-50%);
                    width: 45px; 
                    height: 45px;
                    border-radius: 50%;
                    text-align: center;
                    color: #fff;
                    background: rgba(0, 0, 0, 0.6);
                    cursor: pointer;
                    z-index: 5;
                    font-size: 1.8rem; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    user-select: none;
                    transition: background 0.2s, transform 0.1s;
                }
                /* Positioned relative to the owl_wrapper */
                .owl_wrapper .prev { left: 15px; } /* Adjusted back to 15px for centered look */
                .owl_wrapper .next { right: 15px; } /* Adjusted back to 15px for centered look */

                .owl_wrapper .prev:hover, .owl_wrapper .next:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                /* --- HERO SECTION STYLES --- */
                .hero-section {
                    height: 400px; /* Mobile height */
                }
                .hero-image {
                    height: 100%;
                    object-fit: cover;
                }
                .hero-overlay {
                    /* Removed image and kept the overlay gradient for safety */
                    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://t3.ftcdn.net/jpg/07/63/71/26/240_F_763712639_rQX1PTuGWi6u6BthgcgI82xzidM8nZ5K.jpg') center center/cover no-repeat;
                }
                .hero-title {
                    font-size: 1.8rem;
                    line-height: 1.2;
                    letter-spacing: 1px;
                }
                .hero-button {
                    min-width: 150px;
                    background-color: white;
                    color: var(--bs-primary);
                }
                .hero-button:hover {
                    background-color: #f0f0f0;
                }
                .hero-button-secondary {
                    min-width: 150px;
                    transition: background 0.3s;
                }
                .hero-button-secondary:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                @media (min-width: 1200px) {
                    .hero-section {
                        height: 600px; 
                        border-radius: 0;
                    }
                    .hero-title {
                        font-size: 3.5rem;
                    }
                }
                
                /* --- FOOTER STYLES --- */
                .cta-strip-gradient {
                    background: linear-gradient(135deg, var(--accent-red) 0%, var(--bs-primary) 100%);
                }
                .social-icons svg {
                    transition: color 0.2s;
                }
                .social-icons svg:hover {
                    color: var(--accent-gold) !important;
                }
            `}</style>
            
            <Header setPage={setPage} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} currentPage={currentPage} theme={theme} toggleTheme={toggleTheme} />

            <main className="flex-grow-1 overflow-y-auto">
                {renderContent()}
            </main>
            
            <Footer setPage={setPage} />
        </div>
    );
};

export default App; 