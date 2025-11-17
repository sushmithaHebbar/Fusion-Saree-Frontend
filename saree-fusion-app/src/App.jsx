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


// Helper Components defined in App.jsx scope
const Header = ({ startpage, togglemenu, isopenmenu, currentpage, theme, toggletheme }) => {
    const isDark = theme === 'dark';
    const headerBg = isDark ? '#000000' : '#ffffff'; 
    const headerTextColor = isDark ? 'white' : 'var(--text-primary)'; 
    const headerIconBg = isDark ? '#333333' : '#f0f0f0'; 
    
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

                <button className="btn rounded-circle p-2 me-3" aria-label="Search" style={{ backgroundColor: headerIconBg }}>
                    <SearchIcon style={{ width: 24, height: 24, color: headerTextColor }} />
                </button>
                <button className="btn rounded-circle p-2 d-lg-none" aria-label="Toggle Menu" onClick={() => togglemenu()} style={{ backgroundColor: headerIconBg }}>
                    <MenuIcon style={{ width: 24, height: 24, color: headerTextColor }} />
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


    //IMAGE ID STATES

    const [palluId , setPalluId] = useState(null)
    const [bodyId , setBodyId] = useState(null)
    const [borderId  , setBorderId] = useState(null)

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
        console.log(palluId , borderId , bodyId)
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
                    palluId  ={palluId}
                    borderId ={borderId}
                    bodyId ={bodyId}
                    setBodyId = {setBodyId}
                    setBorderId = {setBorderId}
                    setPalluId = {setPalluId}
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