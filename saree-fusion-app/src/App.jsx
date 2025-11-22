import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation, useNavigate,Navigate } from 'react-router-dom';
import { HomeView } from './components/Home.jsx';
import { UploadView, LoadingView } from './components/UploadSection.jsx';
import { ResultView, FullScreenModal } from './components/FullScreenSareeGeneratedSection.jsx';
import Spinner from 'react-bootstrap/Spinner'; 
import './App.css';
import {Login } from './components/LoginPage.jsx'

// --- ICONS (Keep your existing Icon definitions here) ---
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const UploadIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const SunIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const TwitterIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.5 3 7c1.7 2.9 4.3 5 8 5-.4-1.2-1-2-1.2-3.4 3.4 1.8 7.3-2.6 4-6C17.4 3.7 18.7 5 19.5 6.4 20.9 6.2 22 5.2 22 4z"/></svg>;
const InstagramIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;


// New component to protect routes

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
const isAuthenticated = user !== null; 

    if (!isAuthenticated) {
        // Redirect to the login page
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />; 
};




// --- 1. REFACTORED HEADER (Uses Links & useLocation) ---
const Header = ({ togglemenu, isopenmenu, theme, toggletheme }) => {
    const location = useLocation(); // Gets current URL path
    
    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
       
        <header className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom sticky-top shadow-sm navbar-height vw-100" style={{ zIndex: 10, backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            {/* Left Section: Logo and Desktop Links */}
            <div className="d-flex align-items-center">
                <img src="logo5.png" width={90} height={50} alt="Logo" />             
                <div className="d-none d-lg-flex align-items-center gap-4 ms-3">
                <Link to="/" className={`nav-link-desktop text-decoration-none ${isActive('/')}`}>
                    Home
                </Link>
                <Link to="/upload" className={`nav-link-desktop text-decoration-none ${isActive('/upload')}`}>
                    Design Saree
                </Link>
                </div>
            </div>

            {/* Right Section: Icons */}
            <div className="d-flex align-items-center">
                <button className="btn btn-light rounded-circle p-2 me-3" aria-label="Toggle Theme" onClick={toggletheme} style={{ backgroundColor: 'var(--bg-input)' }}>
                    {theme === 'light' ? 
                        <MoonIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} /> :
                        <SunIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
                    }
                </button>
                <button className="btn btn-light rounded-circle p-2 d-lg-none" aria-label="Toggle Menu" onClick={() => togglemenu()} style={{ backgroundColor: 'var(--bg-input)' }}>
                    <MenuIcon style={{ width: 24, height: 24, color: 'var(--icon-color)' }} />
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`menu-overlay ${isopenmenu ? 'show' : ''}`} onClick={() => togglemenu(false)}>
                <div className="menu-content rounded-3 shadow-lg p-2" style={{ backgroundColor: 'var(--card-bg)' }} onClick={(e) => e.stopPropagation()}>
                    <Link to="/" onClick={() => togglemenu(false)} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <HomeIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                        <span>Home</span>
                    </Link>
                    <Link to="/upload" onClick={() => togglemenu(false)} className="btn w-100 text-start py-2 px-3 mb-1 d-flex align-items-center justify-content-start" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <UploadIcon className="me-2" style={{ color: 'var(--text-primary)' }} />
                        <span>Upload Section</span>
                    </Link>
                    <div className="dropdown-divider my-1" style={{ borderColor: 'var(--border-color)' }}></div>
                    <button onClick={() => togglemenu(false)} className="btn w-100 text-start py-2 px-3 text-danger d-flex align-items-center justify-content-start">
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

// --- 2. REFACTORED FOOTER (Uses Links) ---
const Footer = () => {
    const footerBg = 'var(--footer-bg)';
    const textColor = 'var(--footer-text-color)';
    const linkColor = 'var(--footer-link-color)';

    const footerLinks = [
        { title: "Quick Links", links: ["Home", "Upload Section", "Sale", "About Us"] },
        { title: "Support", links: ["Contact Us", "FAQs", "Shipping & Returns", "Size Guide"] }
    ];

    return (
        <footer className="w-100 mt-auto pt-5" style={{ backgroundColor: footerBg, color: textColor }}>
            <div className="text-center py-4 px-1 cta-strip-gradient">
                <h3 className="fs-3 fw-bold  text-black ">Looking For a Custom Designer Saree?</h3>
                <Link to="/upload" className="btn fw-semibold py-3 px-5 rounded-pill shadow-lg text-uppercase text-black" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    Contact Us
                </Link>
            </div>
            <div className="container-fluid px-5 py-5">
                <div className="row g-4">
                    <div className="col-12 col-md-5 mb-4">
                        <h3 className="fs-5 fw-bold mb-3" style={{ color: 'var(--bs-primary)' }}>Saree Fusion</h3>
                        <p className="fw-light small mb-4" style={{ color: textColor }}>
                            Elegance woven into every thread. Discover our curated collections and design services.
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
                                        <a href="#" className="text-decoration-none fw-light small py-1 d-block" style={{ color: linkColor }} onClick={(e) => e.preventDefault()}>
                                            {link}
                                        </a>
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

// --- 3. LAYOUT COMPONENT (Holds Header, Outlet, Footer, Modal) ---
const Layout = ({ togglemenu, isopenmenu, theme, toggletheme, isFullScreenViewOpen, generatedImageUrl, closeFullScreenView }) => {
    return (
        <div id="app" className="app-container d-flex flex-column">
            <Header 
                togglemenu={togglemenu} 
                isopenmenu={isopenmenu} 
                theme={theme} 
                toggletheme={toggletheme} 
            />

            <main className="flex-grow-1 overflow-y-auto">
                {/* The OUTLET is where Home/Upload/Result views appear */}
                <Outlet />
            </main>
            
            <Footer />

            {isFullScreenViewOpen && generatedImageUrl && (
                <FullScreenModal 
                    imageUrl={generatedImageUrl} 
                    close={closeFullScreenView} 
                />
            )}
        </div>
    );
};
const HomeWrapper = ({ resetUploadState}) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Reset state and local storage when Home is mounted
        resetUploadState();
    }, [resetUploadState]);

    return <HomeView navigate={navigate}/>;
};
// --- 4. MAIN APP COMPONENT (Handles Routing & State) ---
const App = () => {
    // UI State
    const [isopenmenu, setispenmenu] = useState(false);
    const [theme, setTheme] = useState('light');
    

    const [id, setUser] = useState(() => {
    // Check local storage for a user (simulating persistent login)
    return localStorage.getItem('id') ? { id: localStorage.getItem('id') } : null;
});

// A function to handle successful login (called from Login component)
    const handleLoginSuccess = (name) => {
    localStorage.setItem('id', name);
    setUser({ name });
    };

// A function to handle logout (optional, but good practice)
    const handleLogout = () => {
    localStorage.removeItem('sareeFusionUser');
    setUser(null);
    };
    // Data State
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [palluImage, setPalluImage] = useState(null);
    const [bodyImage, setBodyImage] = useState(null);
    const [borderImage, setBorderImage] = useState(null);
   
    
    // ID States
    const [palluId, setPalluId] = useState(() => localStorage.getItem('palluId') || null);
    const [bodyId, setBodyId] = useState(() => localStorage.getItem('bodyId') || null);
    const [borderId, setBorderId] = useState(() => localStorage.getItem('borderId') || null);
    const [templeteId, setTempleteId] = useState(() => localStorage.getItem('templeteId') || null);
    const [description, setDescription] = useState(() => localStorage.getItem('description') || '');
    const [designNo , setDesignNo] = useState(() => parseInt(localStorage.getItem('designNo') || '0'));
    // Cropped Data
    const [croppedPallu, setCroppedPallu] = useState(null);
    const [croppedBody, setCroppedBody] = useState(null);
    const [croppedBorder, setCroppedBorder] = useState(null);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [imageTypeToCrop, setImageTypeToCrop] = useState(null);
    
    // Full Screen Modal
    const [isFullScreenViewOpen, setIsFullScreenViewOpen] = useState(false);

    // --- Effects & Handlers ---
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
    }, [theme]);
    useEffect(() => {
        if (palluId) localStorage.setItem('palluId', palluId);
        if (bodyId) localStorage.setItem('bodyId', bodyId);
        if (borderId) localStorage.setItem('borderId', borderId);
        if (templeteId) localStorage.setItem('templeteId', templeteId);
        localStorage.setItem('description', description);
        localStorage.setItem('designNo', designNo.toString());
    }, [palluId, bodyId, borderId, templeteId, description, designNo]);



    const resetUploadState = useCallback(() => {
        console.log("Cleaning up previous session data...");
        
        // Clear LocalStorage
        localStorage.removeItem('palluId');
        localStorage.removeItem('bodyId');
        localStorage.removeItem('borderId');
        localStorage.removeItem('templeteId');
        localStorage.removeItem('description');
        localStorage.removeItem('designNo');

        // Reset React State
        setPalluId(null);
        setBodyId(null);
        setBorderId(null);
        setTempleteId(null);
        setDescription('');
        setDesignNo(0);
        setGeneratedImageUrl('');
        setPalluImage(null);
        setBodyImage(null);
        setBorderImage(null);
        setCroppedPallu(null);
        setCroppedBody(null);
        setCroppedBorder(null);
    }, []);
    const toggletheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);
    const togglemenu = useCallback((forceState) => setispenmenu(prev => forceState !== undefined ? forceState : !prev), []);
    const openFullScreenView = useCallback(() => setIsFullScreenViewOpen(true), []);
    const closeFullScreenView = useCallback(() => setIsFullScreenViewOpen(false), []);

    const closeCropModal = useCallback(() => {
        setIsCropModalOpen(false);
        setImageTypeToCrop(null);
    }, []);

    const openModalCroped = useCallback((type, imageSrc) => {
        if (!imageSrc) return;
        setImageTypeToCrop(type);
        setIsCropModalOpen(true);
    }, []);

    // Prepared cropped images object
    const croppedImages = {
        pallu: croppedPallu, 
        body: croppedBody, 
        border: croppedBorder 
    };
    
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}  />} />
                {/* Parent Route: Layout */}
                <Route element={
                    <ProtectedRoute user={id} redirectPath="/login">
                    <Layout 
                        togglemenu={togglemenu} 
                        isopenmenu={isopenmenu} 
                        theme={theme} 
                        toggletheme={toggletheme}
                        isFullScreenViewOpen={isFullScreenViewOpen}
                        generatedImageUrl={generatedImageUrl}
                        closeFullScreenView={closeFullScreenView}
                    />
                    </ProtectedRoute>
                }>
                    {/* CHILD ROUTES */}

                    <Route path="/" element={<HomeWrapper resetUploadState={resetUploadState} />} />
                    
                    <Route path="/upload" element={
                        <UploadWrapper 
                            // Pass all props needed for upload/cropping
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
                            palluId={palluId} setPalluId={setPalluId}
                            borderId={borderId} setBorderId={setBorderId}
                            bodyId={bodyId} setBodyId={setBodyId}
                            templeteId={templeteId}
                            setTempleteId={setTempleteId}
                            designNo={designNo}
                            setDesignNo = {setDesignNo}
                            // Important: Pass setter for result
                            setGeneratedImageUrl={setGeneratedImageUrl}
                            userid ={id}
                        />
                    } />

                    <Route path="/loading" element={<LoadingView />} />
                    
                    <Route path="/result" element={
                        <ResultView
                            generatedImageUrl={generatedImageUrl}
                            croppedImages={croppedImages}
                            openFullScreenView={openFullScreenView}
                            theme={theme}
                            palluId={palluId} setPalluId={setPalluId}
                            borderId={borderId} setBorderId={setBorderId}
                            bodyId={bodyId} setBodyId={setBodyId}
                            templeteId={templeteId}
                            setTempleteId={setTempleteId}
                            designNo={designNo}
                            setDesignNo = {setDesignNo}
                            description = {description}
                            userid = {id}
                        />
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

// --- WRAPPER TO HANDLE NAVIGATION LOGIC ---
// We create this wrapper to use 'useNavigate' which is only available inside <BrowserRouter>
const UploadWrapper = (props) => {
    const navigate = useNavigate();

    const startGeneration = async () => {
        const { palluImage, bodyImage, borderImage, description, croppedPallu, croppedBody, croppedBorder , palluId , borderId , 
            bodyId , templeteId , designNo , setDesignNo , userid} = props;

        // Validation
        if(!(palluId || borderId || bodyId) && !description){
           alert("Atleast Descrption is needed")
           navigate('/upload') 
        }
        
        // 1. Go to Loading


        const formData = new FormData();
        formData.append('border_id' , borderId)
        formData.append('pallu_id' , palluId)
        formData.append('body_id' , bodyId)
        formData.append('prompt' , description)
        formData.append('id' , userid)
        console.log("Simulating API request:", formData);

        // Mock Result
        const mockImageUrl = 'https://placehold.co/500x700/8EC5FC/374151?text=Saree+Fusion+Result';
        props.setGeneratedImageUrl(mockImageUrl);

        // 3. Go to Result
        navigate('/result');
    };

    return <UploadView {...props} startGeneration={startGeneration} navigate={navigate} />;
};

export default App;