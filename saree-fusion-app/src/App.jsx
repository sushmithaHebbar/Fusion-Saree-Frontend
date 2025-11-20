<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { HomeView } from './components/Home.jsx';
import { UploadView } from './components/UploadSection.jsx';
import { ResultView, FullScreenModal } from './components/FullScreenSareeGeneratedSection.jsx';

// Import CSS files to apply styles
import './App.css';
import './components/Home.css';
import './components/UploadSection.css';
import './components/FullScreenSareeGeneratedSection.css';


// --- Shared Icon SVGs ---
=======
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
// --- Icon SVGs (Using lucide-react style icons) ---
>>>>>>> 8f0345476e517be9e5a7b89662ebbb43d011ab27
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const UploadIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const SunIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const TwitterIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.5 3 7c1.7 2.9 4.3 5 8 5-.4-1.2-1-2-1.2-3.4 3.4 1.8 7.3-2.6 4-6C17.4 3.7 18.7 5 19.5 6.4 20.9 6.2 22 5.2 22 4z"/></svg>;
const InstagramIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;


<<<<<<< HEAD
// Helper Components defined in App.jsx scope
const Header = ({ startpage, togglemenu, isopenmenu, currentpage, theme, toggletheme }) => {
    const isDark = theme === 'dark';
    const headerBg = isDark ? '#000000' : '#ffffff'; 
    const headerTextColor = isDark ? 'white' : 'var(--text-primary)'; 
    const headerIconBg = isDark ? '#333333' : '#f0f0f0'; 
    
=======
// --- DATA ---
const curouselItem = [
    { id: 1, src: "https://www.parisera.com/cdn/shop/files/DSC_4630-1_Copy.jpg?v=1750314810", title: "Classic Fusion Design", description: "A perfect blend of modern silhouettes with traditional Banarasi silk." },
    { id: 2, src: "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/cp-4-840x425.jpg", title: "Aqua Border Saree", description: "Featuring a delicate aqua border with silver thread work, ideal for evening events." },
    { id: 3, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 4, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
    { id: 5, src: "https://t3.ftcdn.net/jpg/15/10/74/78/240_F_1510747809_kJhAYaq6rOHXYbtQDEg2avzLq96lUTlo.jpg", title: "Intricate Weave Pattern", description: "Bold, digitally woven patterns on a rich red fabric for a stunning look." },
]; 
const auto_time = 5000; // 5 seconds

// --- COMPONENTS ---

const Header = ({ startpage, togglemenu, isopenmenu, currentpage, theme, toggletheme }) => (
    <header className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom sticky-top shadow-sm navbar-height" style={{ zIndex: 10, backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
        {/* Left Section: Logo and Desktop Links */}
        <div className="d-flex align-items-center">
            {/* Logo */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="me-2" style={{ width: 28, height: 28, color: 'var(--bs-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="M15 2H9"></path>
                <path d="M12 2v2"></path>
                <path d="M12 11v6"></path>
                <path d="M12 11l-3 3"></path>
                <path d="M12 11l3 3"></path>
            </svg>
            <span className="fs-4 fw-bold me-4" style={{ color: 'var(--bs-primary)' }}>Saree Fusion</span> */}
          <img src="logo5.png" width={90} height={50} ></img>              
            {/* Desktop Navigation Links (Visible on large screens) */}
            <div className="d-none d-lg-flex align-items-center gap-4 ms-3">
                <button 
                    onClick={() => startpage('home')} 
                    className={`nav-link-desktop ${currentpage === 'home' ? 'active-link' : ''}`}
                >
                    Home
                </button>
                <button 
                    onClick={() => startpage('upload')} 
                    className={`nav-link-desktop ${currentpage === 'upload' ? 'active-link' : ''}`}
                >
                    Design Saree
                </button>
            </div>
        </div>

        {/* Right Section: Icons */}
        <div className="d-flex align-items-center">
            {/* Theme Toggle Button */}
            <button className="btn btn-light rounded-circle p-2 me-3" aria-label="Toggle Theme" onClick={toggletheme} style={{ backgroundColor: 'var(--bg-input)' }}>
                {theme === 'light' ? 
                    <MoonIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} /> :
                    <SunIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
                }
            </button>

            {/*<button className="btn btn-light rounded-circle p-2 me-3" aria-label="Search" style={{ backgroundColor: 'var(--bg-input)' }}>
                <SearchIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
            </button>*/}
            {/* Menu Toggle (Hidden on large screens where desktop links are shown) */}
            <button className="btn btn-light rounded-circle p-2 d-lg-none" aria-label="Toggle Menu" onClick={() => togglemenu()} style={{ backgroundColor: 'var(--bg-input)' }}>
                <MenuIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
            </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`menu-overlay ${isopenmenu ? 'show' : ''}`} onClick={() => togglemenu(false)}>
            <div className="menu-content rounded-3 shadow-lg p-2" style={{ backgroundColor: 'var(--card-bg)' }} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { startpage('home'); togglemenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                    <HomeIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                    <span>Home</span>
                </button>
                <button onClick={() => { startpage('upload'); togglemenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                    <UploadIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                    <span>Upload Section</span>
                </button>
                <div className="dropdown-divider my-1" style={{ borderColor: 'var(--border-color)' }}></div>
                <button onClick={() => togglemenu(false)} className="btn w-100 text-start py-2 px-3 text-danger d-flex align-items-center justify-content-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                    <span>Close</span>
                </button>
            </div>
        </div>
    </header>
);

const HeroSection = ({ startpage }) => (
    // The hero section must handle its own responsive margins since the app-container no longer provides them.
    <div className="hero-section position-relative overflow-hidden m-4 mb-5">
        {/* <img 
            src=''
            alt="Beautifully crafted handloom saree worn by models in a traditional setting" 
            className="hero-image w-100 h-auto"
            onError={(e) => { e.target.src = "" }}
        /> */}
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
            <h1
            className="hero-title text-metallic-gold mb-3"
            style={{ fontFamily: "'Trajan Pro'", fontSize: "80px" }}
                >
    Saree Fusion
            </h1>

           <p className="hero-subtext"
  style={{
    fontStyle: "'Playfair Display', serif",
    fontSize: "20px",
    color: "#f8d87f",
    fontWeight: "500",
    letterSpacing: "0.3px",
  }}
  
>
  Where Expectations Meets Excellence
</p>

            <div className="d-flex flex-column flex-sm-row gap-3">
                <button 
                    className="btn btn-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button"
                    onClick={() => startpage('upload')}
                >
                    Explore
                </button>
                {/* <button 
                    className="btn btn-outline-light text-uppercase fw-semibold py-2 px-4 rounded-pill shadow-lg hero-button-secondary"
                    onClick={() => startpage('upload')}
                >
                    Shop Banarasi
                </button> */}
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
    const CarouselClasses = useCallback(() => {
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
        CarouselClasses();
    }, [centerIndex, CarouselClasses]);

    // Auto-advance and Resize listeners
    useEffect(() => {
        // Auto-advance interval
        const interval = setInterval(() => moveCarousel(1), auto_time);

        // Resize listener
        window.addEventListener('resize', CarouselClasses);

        // Cleanup
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', CarouselClasses);
        };
    }, [moveCarousel, CarouselClasses]);

>>>>>>> 8f0345476e517be9e5a7b89662ebbb43d011ab27
    return (
        <header className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom sticky-top shadow-sm navbar-height" style={{ zIndex: 10, backgroundColor: headerBg, color: headerTextColor, borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center">
                {/* NOTE: Assuming logo1.png is a file reference accessible from the environment root */}
                <img src="logo1.png" width={90} height={70} alt="Saree Fusion Logo" />      
                <div className="d-none d-lg-flex align-items-center gap-4 ms-3">
                    <button
                        onClick={() => startpage('home')}
                        className={`nav-link-desktop ${currentpage === 'home' ? 'active-link' : ''}`}
                        style={{ color: headerTextColor }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => startpage('upload')}
                        className={`nav-link-desktop ${currentpage === 'upload' ? 'active-link' : ''}`}
                        style={{ color: headerTextColor }}
                    >
                        Upload Section
                    </button>
                </div>
            </div>

            <div className="d-flex align-items-center">
                <button className="btn rounded-circle p-2 me-3" aria-label="Toggle Theme" onClick={toggletheme} style={{ backgroundColor: headerIconBg }}>
                    {isDark ?
                        <SunIcon style={{ width: 24, height: 24, color: headerTextColor }} /> :
                        <MoonIcon style={{ width: 24, height: 24, color: headerTextColor }} />
                    }
                </button>

<<<<<<< HEAD
                <button className="btn rounded-circle p-2 me-3" aria-label="Search" style={{ backgroundColor: headerIconBg }}>
                    <SearchIcon style={{ width: 24, height: 24, color: headerTextColor }} />
                </button>
                <button className="btn rounded-circle p-2 d-lg-none" aria-label="Toggle Menu" onClick={() => togglemenu()} style={{ backgroundColor: headerIconBg }}>
                    <MenuIcon style={{ width: 24, height: 24, color: headerTextColor }} />
=======
const FullScreenModal = ({ imageUrl, close }) => (
    <div className="modal-overlay modal-open full-screen-modal" onClick={close}>
        <div className="modal-content full-screen-content p-0" onClick={(e) => e.stopPropagation()}>
            <button 
                className="btn btn-light rounded-circle p-2 position-absolute top-3 end-3 shadow-lg" 
                onClick={close} 
                style={{ zIndex: 5010, background: 'white' }}
            >
                <XIcon style={{ width: 24, height: 24, color: 'var(--text-primary)' }} />
            </button>
            <img 
                src={imageUrl} 
                alt="Full Screen Generated Saree Design" 
                className="w-100 h-100 object-fit-contain" 
                style={{ borderRadius: '0.5rem' }}
            />
        </div>
    </div>
);


const UploadView = ({ startGeneration, palluImage, setPalluImage, bodyImage, setBodyImage, borderImage, setBorderImage, isCropModalOpen, imageTypeToCrop, closeCropModal, openModalCroped, setCroppedPallu, setCroppedBody, setCroppedBorder, description, setDescription, croppedPallu, croppedBody, croppedBorder }) => {
    
    const imageStateMap = {
        pallu: { image: palluImage, setter: setPalluImage, croppedSetter: setCroppedPallu, isCropped: !!croppedPallu },
        body: { image: bodyImage, setter: setBodyImage, croppedSetter: setCroppedBody, isCropped: !!croppedBody },
        border: { image: borderImage, setter: setBorderImage, croppedSetter: setCroppedBorder, isCropped: !!croppedBorder },
    };

    // Helper to clear both original and cropped state
    const clearImage = (type) => {
        imageStateMap[type].setter(null);
        imageStateMap[type].croppedSetter(null);
    };

    const saveCrop = (type, croppedImageUrl) => {
        // Save the cropped image URL
        if (croppedImageUrl) {
            imageStateMap[type].croppedSetter(croppedImageUrl);
        } else {
            // Fallback: use original image if no cropped version provided
            imageStateMap[type].croppedSetter(imageStateMap[type].image);
        }
    };


    return (
        <div className="align-desktop d-flex d-xl-flex flex-column pb-5">
            <h1 className="fs-4 fw-bold mb-4 pt-3 center "
    style={{
        color: 'white',
        borderColor: 'var(--border-color)',
        fontStyle: 'Italic'
    }}>
    Design Workspace
</h1>

            <div className=" card upload-section-card rounded-3 border-2 shadow-4 p-3 d-flex flex-column gap-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                
                {/* START: Responsive Upload Cards Container using Bootstrap Grid */}
                <div className='row g-3'>
                
                    {/* 1. Upload Pallu Image */}
                    <div className="col-12 col-lg-4">
                        <UploadArea 
                            title="Upload Pallu Image" 
                            placeholder="Drop Pallu Image Here" 
                            image={croppedPallu || palluImage} 
                            setter={setPalluImage} 
                            clear={() => clearImage('pallu')}
                            openModalCroped={() => openModalCroped('pallu', palluImage)}
                            isCropped={!!croppedPallu}
                        />
                    </div>

                    {/* 2. Upload Body Image Section */}
                    <div className="col-12 col-lg-4">
                        <UploadArea 
                            title="Upload Body Image" 
                            placeholder="Drop Body Image Here" 
                            image={croppedBody || bodyImage} 
                            setter={setBodyImage} 
                            clear={() => clearImage('body')}
                            openModalCroped={() => openModalCroped('body', bodyImage)}
                            isCropped={!!croppedBody}
                        />
                    </div>
                    
                    {/* 3. Upload Border Image Section */}
                    <div className="col-12 col-lg-4">
                        <UploadArea 
                            title="Upload Border Image" 
                            placeholder="Drop Border Image Here" 
                            image={croppedBorder || borderImage} 
                            setter={setBorderImage} 
                            clear={() => clearImage('border')}
                            openModalCroped={() => openModalCroped('border', borderImage)}
                            isCropped={!!croppedBorder}
                        />
                    </div>
                
                </div>
                {/* END: Responsive Upload Cards Container */}

                {/* Prompt/Description Input */}
                <div className="card shadow-lg rounded-4 border-0 p-3 upload-section-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <h2 className="h6 fw-semibold text-primary mb-3">Design Description</h2>
                    <textarea 
                        className="form-control rounded-3"
                        rows="4"
                        placeholder="Describe the desired colors, patterns, and style (e.g., 'A magenta silk saree with a golden zari peacock motif on the pallu and a geometric border')."
                        style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border-color-dashed)' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>


                {/* Generate Button */}
                <button onClick={startGeneration} className="btn btn-primary-custom w-100 py-3 mt-4 rounded-4 shadow-xl cta-button">
                    <span className="fs-5">GENERATE FUSION</span>
>>>>>>> 8f0345476e517be9e5a7b89662ebbb43d011ab27
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`menu-overlay ${isopenmenu ? 'show' : ''}`} onClick={() => togglemenu(false)}>
                <div className="menu-content rounded-3 shadow-lg p-2" style={{ backgroundColor: 'var(--card-bg)' }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => { startpage('home'); togglemenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                        <HomeIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                        <span>Home</span>
                    </button>
                    <button onClick={() => { startpage('upload'); togglemenu(false); }} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)' }}>
                        <UploadIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                        <span>Upload Section</span>
                    </button>
                    <div className="dropdown-divider my-1" style={{ borderColor: 'var(--border-color)' }}></div>
                    <button onClick={() => togglemenu(false)} className="btn w-100 text-start py-2 px-3 text-danger d-flex align-items-center justify-content-start">
                        <XIcon className="me-2" style={{ width: 20, height: 20 }}/>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

const Footer = ({ startpage }) => {
    const footerBg = 'var(--footer-bg)';
    const textColor = 'var(--footer-text-color)';
    const linkColor = 'var(--footer-link-color)';

    const footerLinks = [
        { title: "Quick Links", links: ["Home", "Upload Section", "Sale", "About Us"] },
        { title: "Support", links: ["Contact Us", "FAQs", "Shipping & Returns", "Size Guide"] }
    ];

    const LinkItem = ({ text }) => (
        <a href="#" className="text-decoration-none fw-light small py-1 d-block" style={{ color: linkColor }} onClick={(e) => { e.preventDefault(); /* Handle navigation */ }}>
            {text}
        </a>
    );

    return (
        <footer className="w-100 mt-auto pt-5" style={{ backgroundColor: footerBg, color: textColor }}>
            <div className="text-center py-4 px-1 cta-strip-gradient">
                <h3 className="fs-3 fw-bold text-white ">Looking For a Custom Designer Saree?</h3>
                <button
                    className="btn fw-semibold py-3 px-5 rounded-pill shadow-lg text-uppercase"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)' }}
                    onClick={() => startpage('upload')}
                >
                    Contact Us
                </button>
            </div>
            <div className="container-fluid px-5 py-5">
                <div className="row g-4">
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

            <div className="text-center py-3 small fw-light" style={{ backgroundColor: 'var(--footer-sub-bg)', color: textColor }}>
                &copy; {new Date().getFullYear()} Saree Fusion. All rights reserved.
            </div>
        </footer>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    const [currentpage, startpage] = useState('home');
    const [isopenmenu, setispenmenu] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [theme, setTheme] = useState('light');
    
    // UPLOAD STATES (Persisted in App state as they control the whole flow)
    const [palluImage, setPalluImage] = useState(null);
    const [bodyImage, setBodyImage] = useState(null);
    const [borderImage, setBorderImage] = useState(null);
    const [description, setDescription] = useState('');

    // CROPPING/EDITED STATES (The result of the virtual crop)
    const [croppedPallu, setCroppedPallu] = useState(null);
    const [croppedBody, setCroppedBody] = useState(null);
    const [croppedBorder, setCroppedBorder] = useState(null);

    // MODAL STATE
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [imageTypeToCrop, setImageTypeToCrop] = useState(null);

    // Full Screen View State
    const [isFullScreenViewOpen, setIsFullScreenViewOpen] = useState(false);

    const toggletheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
    }, [theme]);

    const togglemenu = useCallback((forceState) => {
        setispenmenu(prev => forceState !== undefined ? forceState : !prev);
    }, []);
    
    const closeCropModal = useCallback(() => {
        setIsCropModalOpen(false);
        setImageTypeToCrop(null);
    }, []);

    const openModalCroped = useCallback((type, imageSrc) => {
        if (!imageSrc) return;
        setImageTypeToCrop(type);
        setIsCropModalOpen(true);
    }, []);
    
    const openFullScreenView = useCallback(() => setIsFullScreenViewOpen(true), []);
    const closeFullScreenView = useCallback(() => setIsFullScreenViewOpen(false), []);


    const startGeneration = useCallback(async () => {
        
        if ((!palluImage && !bodyImage && !borderImage) || description.trim().length < 1) {
            console.error("Please upload an image AND provide a description to generate the fusion.");
            return;
        }

        startpage('loading');

        const requestPayload = {
            description: description,
            pallu: croppedPallu || palluImage,
            body: croppedBody || bodyImage,
            border: croppedBorder || borderImage,
        };
        
        console.log("Simulating API request with payload:", requestPayload);

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mocked URL for the generated image
        const mockImageUrl = 'https://placehold.co/500x700/8EC5FC/374151?text=Saree+Fusion+Result';
        setGeneratedImageUrl(mockImageUrl);
        startpage('result');

    }, [palluImage, bodyImage, borderImage, croppedPallu, croppedBody, croppedBorder, description]);

    const renderContent = () => {
        const croppedImages = {
            pallu: croppedPallu,
            body: croppedBody,
            border: croppedBorder
        };
        
        switch (currentpage) {
            case 'home':
                return <HomeView startpage={startpage} />;
            case 'upload':
                return <UploadView
                    startGeneration={startGeneration}
                    palluImage={palluImage} setPalluImage={setPalluImage}
                    bodyImage={bodyImage} setBodyImage={setBodyImage}
                    borderImage={borderImage} setBorderImage={setBorderImage}
                    description={description} setDescription={setDescription}
                    isCropModalOpen={isCropModalOpen}
                    imageTypeToCrop={imageTypeToCrop}
                    closeCropModal={closeCropModal}
                    openModalCroped={openModalCroped}
                    setCroppedPallu={setCroppedPallu}
                    setCroppedBody={setCroppedBody}
                    setCroppedBorder={setCroppedBorder}
                    croppedPallu={croppedPallu}
                    croppedBody={croppedBody}
                    croppedBorder={croppedBorder}
                />;
            case 'loading':
                return <LoadingView />;
            case 'result':
                return <ResultView
                    generatedImageUrl={generatedImageUrl}
                    startpage={startpage}
                    croppedImages={croppedImages}
                    openFullScreenView={openFullScreenView}
                    theme={theme}
                />;
            default:
                return <HomeView startpage={startpage} />;
        }
    };
    
    // Loading view is generic and kept local to App.jsx scope
    const LoadingView = () => (
        <div className="d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ minHeight: 500 }}>
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: 'var(--bs-primary)' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-4 fs-5 fw-semibold" style={{ color: 'var(--bs-primary)' }}>Fusing Design...</p>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Please wait while the AI crafts your unique Saree fusion.</p>
            <img src="uploaded:image_f00025.png-196c4977-9d1f-4acc-a1b9-14f3c5b65db1" alt="Saree design reference" className="hero-mockup mt-4" style={{maxWidth: '250px', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}} />
        </div>
    );

    return (
        <div id="app" className="app-container d-flex flex-column">
<<<<<<< HEAD
=======
            <style jsx="true">{`
                /* --- THEME VARIABLES --- */
                :root {
                --bs-primary: #8a4bff; /* Main Purple */
                --accent-purple: #b07eff; /* Soft Lavender Accent */
                --accent-blue: #6ea8ff; /* Light Blue Accent */
                --accent-pink: #e879f9; /* Soft Pink Glow */
                --icon-color: var(--text-primary);

                --bg-primary:rgb(25, 25, 70); /* Light Lavender Background */
                --bg-input: #f3f0ff; /* Very Light Lavender Background */
                --text-primary: #fffff; /* Deep Indigo Text */
                --text-secondary: white; /* Soft Muted Indigo */
                --shadow-color: rgba(138, 75, 255, 0.25); /* Purple Shadow */
                --card-bg: #f3f0ff;

                --border-color: rgba(138, 75, 255, 0.4); /* Purple Border */
                --border-color-dashed: rgba(142, 75, 255, 0.35);

                /* Gradient Backgrounds */
                --gradient-primary:linear-gradient(135deg, #9ad5ff, #8a4fff);
                --gradient-dark: linear-gradient(135deg, #7c3aed, #2563eb);

                /* Footer Colors (Light Mode) */
                --footer-bg: #f3f0ff; /* Soft Lavender Footer */
                --footer-text-color: #2c2c54;
                --footer-link-color: #6c6f92;
                --footer-sub-bg: #e9e6ff; /* Even Lighter Lavender Strip */
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
                    .hero-subtext {
                    font-family: 'Cormorant Garamond', serif;
                    color: #f5d88a;
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing: 0.4px;
                     margin-top: 6px;
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
                    .navbar {
                    padding: 12px 40px;
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
                    cursor: pointer; /* Indicate interactivity */
                }
                .upload-area:hover {
                    border-color: var(--bs-primary) !important;
                }
                .upload-area.border-primary {
                    border-color: var(--bs-primary) !important;
                }


                /* Custom scrollbar for better aesthetics */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px; /* Added for horizontal scrollbar */
                }
                ::-webkit-scrollbar-thumb {
                    background-color: var(--bs-primary); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-track {
                    background-color: transparent;
                }
                
                /* Ensure horizontal scrolling is smooth on mobile uploads */
                .upload-card-container {
                    white-space: nowrap; /* Prevent wrapping in flex-row mode */
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
                
                /* --- MODAL STYLES --- */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 5000;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .modal-overlay.modal-open {
                    display: flex;
                    opacity: 1;
                }
                .modal-content {
                    transform: translateY(0);
                    transition: transform 0.3s;
                }
                .modal-overlay:not(.modal-open) .modal-content {
                    transform: translateY(-50px);
                }
                
                /* --- FULL SCREEN IMAGE VIEW STYLES --- */
                .full-screen-modal {
                    background-color: rgba(0, 0, 0, 0.95);
                }
                .full-screen-content {
                    width: 98%;
                    height: 98%;
                    max-width: 100%;
                    max-height: 100%;
                    background: none !important;
                    position: relative;
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
                    box-shadow: important; 
                    max-width: 100%; 
                    margin: 0 auto; 
                    // background-color: #2A0A45;  
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
                // .hero-section {
                //     height: 400px; /* Mobile height */
                // }
                .hero-section {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                 align-items: center;
                 padding-top: 40px;
                }

                .hero-image {
                    height: 100%;
                    object-fit: cover;
                }
                .hero-overlay {
                    /* Removed image and kept the overlay gradient for safety */
                    background: url('background image4.jpg') center center/cover no-repeat;
                
                    
                }
                .hero-title {
                color: #D4AF37;
                font-family: 'Playfair Display', serif;
                letter-spacing: 1px;
                font-weight: 700;
                text-shadow: 0px 0px 18px rgba(212, 175, 55, 0.4);
                }

                .hero-button {
                    // min-width: 150px;
                    // background-color: white;
                    // color: var(--bs-primary);
                    // padding: 12px 36px;
                    border-radius: 50px;
                    letter-spacing: 0.8px;
                    font-weight: 600;
                     font-size: 15px;
                       border: 2px solid transparent;
                       
                }
                       
                .hero-button:hover {
                  border: 3px solid #D4AF37; 
                    border-color: #FFD700;  /* Bright Gold */
                     box-shadow: 0 0 15px 5px rgba(212, 175, 55, 0.8); 
                    
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
  height: 100vh;
  margin-top: 0 !important;
  margin-bottom: 0;
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
            
>>>>>>> 8f0345476e517be9e5a7b89662ebbb43d011ab27
            <Header startpage={startpage} togglemenu={togglemenu} isopenmenu={isopenmenu} currentpage={currentpage} theme={theme} toggletheme={toggletheme} />

            <main className="flex-grow-1 overflow-y-auto">
                {renderContent()}
            </main>
            
            <Footer startpage={startpage} />

            {isFullScreenViewOpen && generatedImageUrl && (
                <FullScreenModal
                    imageUrl={generatedImageUrl}
                    close={closeFullScreenView}
                    theme={theme}
                />
            )}
        </div>
    );
};

export default App;