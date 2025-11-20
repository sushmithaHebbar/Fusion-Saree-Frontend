import React, { useState, useEffect, useCallback } from 'react';
import { HomeView } from './components/Home.jsx';
import { UploadView  , LoadingView} from './components/UploadSection.jsx';
import { ResultView, FullScreenModal  } from './components/FullScreenSareeGeneratedSection.jsx';
import Spinner from 'react-bootstrap/Spinner'; 
// Import CSS files to apply styles
import './App.css';



// --- Shared Icon SVGs ---
// --- Icon SVGs (Using lucide-react style icons) ---
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const UploadIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const PlusIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const EditIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
const RedoIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M21.5 8a10 10 0 1 0 0 8"/><path d="M2.5 16a10 10 0 1 1 0-8"/></svg>;
const CheckIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowRightIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 4 19 12 12 20"/><line x1="19" x2="5" y1="12" y2="12"/></svg>;
const SaveIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 2v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M20.78 4.22l-1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/></svg>;
const SunIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const TwitterIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.5 3 7c1.7 2.9 4.3 5 8 5-.4-1.2-1-2-1.2-3.4 3.4 1.8 7.3-2.6 4-6C17.4 3.7 18.7 5 19.5 6.4 20.9 6.2 22 5.2 22 4z"/></svg>;
const InstagramIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;

// Helper Components defined in App.jsx scope
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
    <header className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom sticky-top shadow-sm navbar-height vw-100" style={{ zIndex: 10, backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
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

// Helper component for file upload area
// New Footer Component
const Footer = ({ startpage }) => {
    // Determine background color based on theme
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
            {/* Top CTA Strip */}
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
    const [currentpage, startpage] = useState('home');
    const [isopenmenu, setispenmenu] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [theme, setTheme] = useState('light');
    
    
    // UPLOAD STATES
    const [palluImage, setPalluImage] = useState(null);
    const [bodyImage, setBodyImage] = useState(null);
    const [borderImage, setBorderImage] = useState(null);
    const [description, setDescription] = useState('');

    // CROPPING/EDITED STATES
    const [croppedPallu, setCroppedPallu] = useState(null);
    const [croppedBody, setCroppedBody] = useState(null);
    const [croppedBorder, setCroppedBorder] = useState(null);

    // MODAL STATE
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [imageTypeToCrop, setImageTypeToCrop] = useState(null); // 'pallu', 'body', or 'border'

    // NEW: Full Screen View State
    const [isFullScreenViewOpen, setIsFullScreenViewOpen] = useState(false);

    const toggletheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    // Effect to apply the theme class to the document body
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
    
    // NEW: Full screen modal handlers
    const openFullScreenView = useCallback(() => setIsFullScreenViewOpen(true), []);
    const closeFullScreenView = useCallback(() => setIsFullScreenViewOpen(false), []);


    const startGeneration = useCallback(async () => {
        
        // 1. Check for minimum requirements (at least one image and description)
        if ((!palluImage && !bodyImage && !borderImage) || description.trim().length < 1) {
            console.error("Please upload an image AND provide a description to generate the fusion.");
            return;
        }

        startpage('loading');

        // 2. Prepare data for backend (simulated request)
        const requestPayload = {
            description: description,
            pallu: croppedPallu || palluImage, 
            body: croppedBody || bodyImage, 
            border: croppedBorder || borderImage,
        };
        
        console.log("Simulating API request with payload:", requestPayload);

        // Simulate API call and network latency
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mocked URL for the generated image
        const mockImageUrl = 'https://placehold.co/500x700/8EC5FC/374151?text=Saree+Fusion+Result';
        setGeneratedImageUrl(mockImageUrl);
        startpage('result');
        // The real API fetch logic is commented out above for runtime safety.

    }, [palluImage, bodyImage, borderImage, croppedPallu, croppedBody, croppedBorder, description]);

    const renderContent = () => {
        // Prepare cropped image display data for ResultView
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
                    openFullScreenView={openFullScreenView} // Passed new handler
                />;
            default:
                return <HomeView startpage={startpage} />;
        }
    };

    return (
        <div id="app" className="app-container d-flex flex-column">
      
            
            <Header startpage={startpage} togglemenu={togglemenu} isopenmenu={isopenmenu} currentpage={currentpage} theme={theme} toggletheme={toggletheme} />

            <main className="flex-grow-1 overflow-y-auto">
                {renderContent()}
            </main>
            
            <Footer startpage={startpage} />

            {/* NEW: Render Full Screen Modal if open */}
            {isFullScreenViewOpen && generatedImageUrl && (
                <FullScreenModal 
                    imageUrl={generatedImageUrl} 
                    close={closeFullScreenView} 
                />
            )}
        </div>
    );
};

export default App;