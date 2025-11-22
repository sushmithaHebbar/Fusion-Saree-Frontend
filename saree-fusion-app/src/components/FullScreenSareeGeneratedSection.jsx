//DOne correcting
import React, { useEffect  , useRef} from 'react';
import {useState} from 'react'
import '../App.css'
import { LoadingView } from './UploadSection.jsx';
import Spinner from 'react-bootstrap/esm/Spinner.js';
// Re-defining required icons/helpers locally
const RedoIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M21.5 8a10 10 0 1 0 0 8"/><path d="M2.5 16a10 10 0 1 1 0-8"/></svg>;
const SaveIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 2v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M20.78 4.22l-1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/></svg>;
const CheckIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export const FullScreenModal = ({ imageUrl, close }) => (
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



export const ResultView = ({ generatedImageUrl, startpage, croppedImages, openFullScreenView , 
    palluId, setPalluId,borderId, setBorderId,bodyId, setBodyId,templeteId,setTempleteId,designNo,setDesignNo ,description
 }) => {
    const [isLoading , setIsLoading] =  useState(true)
    const [generateImage , setGeneratedImage] = useState(null)
    // New States for Variations
    const [variantOne, setVariantOne] = useState(null);
    const [variantTwo, setVariantTwo] = useState(null);

    const imagesToDisplay = [
        { type: 'Pallu', src: croppedImages.pallu, placeholder: 'No Pallu Image Used' },
        { type: 'Body', src: croppedImages.body, placeholder: 'No Body Image Used' },
        { type: 'Border', src: croppedImages.border, placeholder: 'No Border Image Used' },
    ].filter(img => img.src); // Only show inputs that were actually used (cropped version exists)
    
    const hasFetched = useRef(false);
    const base_url = import.meta.env.VITE_API_URL;

    // --- FUNCTION 1: Generate Main Image & Return ID ---
    const generateMainImage = async () => {
        try {
            const formData = new FormData();
            formData.append('border_id', borderId); // Use props in real app
            formData.append('pallu_id',palluId);
            formData.append('body_id', bodyId);
            formData.append('prompt', description || "");

            console.log("1. Starting Main Generation...");
            const response = await fetch(`${base_url}/generate-saree`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            
            if (data.file && data.saree_id) {
                const base64Image = `data:image/png;base64,${data.file}`;
                
                // Update UI
                setGeneratedImage(base64Image);
                setTempleteId(data.saree_id); 
                setIsLoading(false); // Show main image immediately
                
                // CRITICAL: Return the ID so the next function can use it NOW
                // (We don't wait for setTempleteId to finish)
                return data.saree_id; 
            }
            return null;
        } catch (e) {
            console.error("Main generation failed", e);
            setIsLoading(false);
            return null;
        }
    };

    // --- FUNCTION 2: Generate Variations using ID ---
    const generateVariant = async (sareeId, currentDesignNo, setVariantImage) => {
        if (!sareeId) return;

        try {
            console.log(`Generating variant for ID: ${sareeId} | DesignNo: ${currentDesignNo}`);
            
            const formData = new FormData();
            formData.append('prompt',`Generate variant ${designNo}` ); // Use the ID passed from step 1
           
            // Add other fields if your API needs them for variations
            
            const response = await fetch(`${base_url}/generate-saree/${sareeId}/${currentDesignNo}`, { 
                method: 'POST', 
               body: formData
            });
            
            const data = await response.json();
            
            if (data.file) {
                const base64Image = `data:image/png;base64,${data.file}`;
                setVariantImage(base64Image);
            }
        } catch (e) {
            console.error("Variant generation failed", e);
        }
    };

    // --- ORCHESTRATOR (The Sequence) ---
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const runSequence = async () => {
            // 1. CALL FIRST FUNCTION and WAIT for the ID
            const newSareeId = await generateMainImage();

            // 2. IF SUCCESSFUL, CALL NEXT FUNCTIONS
            if (newSareeId) {
                // Note: We manage design numbers manually here to ensure sequence
                // Main image was 0 (or 1), so we ask for 1 and 2 next.
                
                // Generate Variant 1
                await generateVariant(newSareeId, 1, setVariantOne);
                
                // Generate Variant 2
                await generateVariant(newSareeId, 2, setVariantTwo);
                
                // Finally update global design number state if needed
                setDesignNo(2);
            }
        };

        runSequence();

    }, []);
  
    
    return (
        <>
        {
            isLoading ? <LoadingView></LoadingView> : 
        <div className="align-desktop pb-5">
            <h1 className="fs-4 fw-bold mb-4 border-bottom pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>Generated Results</h1>
            <div className="d-flex flex-column gap-4">
                
                {/* Inputs Used Section */}
                {imagesToDisplay.length > 0 && (
                    <div className="card shadow-lg rounded-4 border-0 p-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <h2 className="h6 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Inputs Used (Cropped/Edited)</h2>
                        <div className="row g-3">
                            {imagesToDisplay.map((item, index) => (
                                <div key={index} className="col-4">
                                    <div className="rounded-4 overflow-hidden shadow-sm position-relative" style={{ height: 120, backgroundColor: 'var(--bg-input)' }}>
                                        <img src={item.src} alt={`${item.type} Input`} className="w-100 h-100 object-fit-cover" />
                                        <span className="badge bg-dark rounded-pill position-absolute top-0 start-0 m-1 fw-medium">{item.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Result Display */}
                <div className="card shadow-2xl rounded-4 overflow-hidden position-relative result-card" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <img src={generateImage} alt="AI Generated Saree Design" className="card-img-top w-100 h-auto object-fit-cover rounded-4" />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
                        <span className="badge bg-success rounded-pill fw-semibold text-uppercase d-flex align-items-center px-3 py-2" style={{ width: 'fit-content' }}>
                            <CheckIcon className="me-1" style={{ width: 16, height: 16 }} /> Final Generated Image
                        </span>
                    </div>
                </div>

                {/* Action Buttons (Redo/Save) */}
                <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => startpage('upload')} className="btn btn-outline-primary fw-semibold rounded-pill border-2 shadow-sm d-flex align-items-center justify-content-center py-2 px-4 action-button" style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}>
                        <RedoIcon className="me-2" />
                        <span className="ms-2">Re-Generate</span>
                    </button>
                    {/* UPDATED ACTION: Open Full Screen Modal */}
                    <button onClick={openFullScreenView} className="btn btn-primary-custom text-white fw-semibold rounded-pill shadow-lg d-flex align-items-center justify-content-center py-2 px-4 action-button">
                        <SaveIcon className="me-2" />
                        <span>Save & View</span>
                    </button>
                </div>

                {/* Other Generated Results (Simulated) */}
                <div className="pt-3">
    <h2 className="h6 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Other Variations</h2>
    <div className="row g-3">
        
        {/* VARIATION 1 BOX */}
        <div className="col-6">
            <div className="rounded-4 d-flex align-items-center justify-content-center small shadow-sm overflow-hidden"
                style={{ 
                    width: '100%',         // Fills the width of the col-6
                    aspectRatio: '9/16',   // Forces height based on width (Vertical Ratio)
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-secondary)' 
                }}>
                {
                    variantOne ? (
                        <img 
                            src={variantOne} 
                            alt="Variation 1" 
                            className="w-100 h-100 object-fit-cover"
                        />
                    ) : (
                        <Spinner animation="grow" style={{ color: '#8a4bff' }} />
                    )
                }
            </div>
             <p className="text-center mt-2 fw-semibold small text-white">Generated Result 1</p>
        </div>

        {/* VARIATION 2 BOX */}
        <div className="col-6">
             <div className="rounded-4 d-flex align-items-center justify-content-center small shadow-sm overflow-hidden"
                style={{ 
                    width: '100%', 
                    aspectRatio: '9/16',   // Forces height based on width
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-secondary)' 
                }}>
                {
                    variantTwo ? (
                        <img 
                            src={variantTwo} 
                            alt="Variation 2"
                            className="w-100 h-100 object-fit-cover" 
                        />
                    ) : (
                        <Spinner animation="grow" style={{ color: '#8a4bff' }} />
                    )
                }
            </div>
            <p className="text-center mt-2 fw-semibold small text-white">Generated Result 2</p>
        </div>
    </div>
</div>
            </div>
        </div>  
        }
      </>
    );
};