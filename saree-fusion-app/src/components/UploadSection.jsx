import React, { useRef, useEffect } from 'react';

// Re-defining required icons/helpers locally
const PlusIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const EditIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
const CheckIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowRightIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 4 19 12 12 20"/><line x1="19" x2="5" y1="12" y2="12"/></svg>;

const UploadArea = ({ title, placeholder, image, setter, clear, openModalCroped, isCropped  , part , setId}) => {
      const fileInputRef = useRef(null);

      const handleFileUpload = (file) => {
            if (!file || !file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                  setter(reader.result); // Stores base64 data URL
            };
            reader.readAsDataURL(file);
      };

      const handleDragOver = (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.classList.add('border-primary', 'bg-light');
      };
  
      const handleDragLeave = (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.classList.remove('border-primary', 'bg-light');
      };
  
      const handleDrop = (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.classList.remove('border-primary', 'bg-light');
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleFileUpload(e.dataTransfer.files[0]);
              e.dataTransfer.clearData();
          }
      };
  
      const handleInputFile = (e) => {
          if (e.target.files && e.target.files.length > 0) {
              handleFileUpload(e.target.files[0]);
          }
      };
  
      return (
          <div className="card shadow-lg rounded-4 border-0 p-3 upload-section-card h-100" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h6 fw-semibold text-primary">{title}</h2>
                  <div className='d-flex gap-2'>
                      {image && (
                          <>
                              <button 
                                  className="btn btn-outline-primary rounded-circle p-1 border-2" 
                                  aria-label="Edit Image"
                                  style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}
                                  onClick={openModalCroped}
                              >
                                  <EditIcon />
                              </button>
                              <button 
                                  className="btn btn-outline-danger rounded-circle p-1 border-2" 
                                  aria-label="Clear Image"
                                  style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
                                  onClick={clear}
                              >
                                  <XIcon style={{ width: 16, height: 16 }}/>
                              </button>
                          </>
                      )}
                      {!image && (
                           <button 
                              className="btn btn-outline-primary rounded-circle p-1 border-2" 
                              aria-label="Upload Image"
                              style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}
                              onClick={() => fileInputRef.current.click()}
                          >
                              <PlusIcon />
                          </button>
                      )}
                  </div>
                  <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleInputFile} 
                      accept="image/*" 
                      hidden 
                  />
              </div>
              <div 
                  className={`border border-2 border-dashed rounded-4 p-2 text-center upload-area d-flex flex-column align-items-center justify-content-center position-relative ${image ? 'p-0' : 'p-4'} ${isCropped ? 'border-success' : ''}`}
                  style={{ height: 120, borderColor: 'var(--border-color-dashed)', overflow: 'hidden' }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={!image ? () => fileInputRef.current.click() : undefined}
              >
                  {image ? (
                      <>
                          <img 
                              src={image} 
                              alt="Uploaded Preview" 
                              className="w-100 h-100 object-fit-cover rounded-4" 
                              style={{ position: 'absolute', top: 0, left: 0 }}
                          />
                           {isCropped && (
                              <span className="badge bg-success rounded-pill fw-semibold text-uppercase d-flex align-items-center px-2 py-1 position-absolute bottom-0 end-0 m-2" style={{ zIndex: 10 }}>
                                  <CheckIcon style={{ width: 12, height: 12, marginRight: '4px' }} /> Edited
                              </span>
                          )}
                      </>
                  ) : (
                      <p className="mb-0 fw-medium" style={{ color: 'var(--text-secondary)' }}>{placeholder}</p>
                  )}
              </div>
          </div>
      );
  };
  
  const CropModal = ({ isOpen, imageType, imageSrc, close, saveCrop }) => {
      // Simplified visual crop simulation using Canvas
      const canvasRef = useRef(null);
      const cropDataRef = useRef({ x: 0, y: 0, size: 0, scale: 1 });
  
      const titleMap = {
          pallu: "Edit Pallu Image",
          body: "Edit Body Image",
          border: "Edit Border Image",
      };
  
      useEffect(() => {
          if (!isOpen || !imageSrc || !canvasRef.current) return;
  
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
              // Set canvas size dynamically
              const maxWidth = Math.min(600, window.innerWidth - 60);
              const ratio = img.height / img.width;
              canvas.width = maxWidth;
              canvas.height = maxWidth * ratio;
  
              // Calculate scale factor between displayed image and original
              const scaleX = img.width / canvas.width;
              const scaleY = img.height / canvas.height;
              cropDataRef.current.scale = { x: scaleX, y: scaleY };
  
              // Draw image
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              // Draw simulated crop overlay (e.g., a square center crop suggestion)
              const cropSize = Math.min(canvas.width, canvas.height) * 0.7;
              const x = (canvas.width - cropSize) / 2;
              const y = (canvas.height - cropSize) / 2;
  
              // Store crop coordinates for later extraction
              cropDataRef.current.x = x;
              cropDataRef.current.y = y;
              cropDataRef.current.size = cropSize;
  
              // Draw semi-transparent overlay
              ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Cut out the crop area (for visualization)
              ctx.clearRect(x, y, cropSize, cropSize);
  
              // Draw crop borders
              ctx.strokeStyle = 'var(--bs-primary)';
              ctx.lineWidth = 3;
              ctx.strokeRect(x, y, cropSize, cropSize);
          };
          img.src = imageSrc;
      }, [imageSrc, isOpen]);
  
      const handleConfirmCrop = () => {
          if (!canvasRef.current || !imageSrc) return;
  
          const canvas = canvasRef.current;
          const img = new Image();
          
          img.onload = () => {
              // Create a new canvas for the cropped image
              const croppedCanvas = document.createElement('canvas');
              const croppedCtx = croppedCanvas.getContext('2d');
              
              // Calculate the actual crop coordinates in the original image
              // The canvas displays the image scaled to fit, so we need to map back to original dimensions
              const displayWidth = canvas.width;
              const displayHeight = canvas.height;
              const originalWidth = img.width;
              const originalHeight = img.height;
              
              // Calculate scale factors
              const scaleX = originalWidth / displayWidth;
              const scaleY = originalHeight / displayHeight;
              
              // Get crop coordinates from the display canvas
              const cropX = cropDataRef.current.x * scaleX;
              const cropY = cropDataRef.current.y * scaleY;
              const cropSize = cropDataRef.current.size * Math.min(scaleX, scaleY);
              
              // Ensure crop coordinates are within image bounds
              const finalCropX = Math.max(0, Math.min(cropX, originalWidth - cropSize));
              const finalCropY = Math.max(0, Math.min(cropY, originalHeight - cropSize));
              const finalCropSize = Math.min(cropSize, originalWidth - finalCropX, originalHeight - finalCropY);
              
              // Set cropped canvas size
              croppedCanvas.width = finalCropSize;
              croppedCanvas.height = finalCropSize;
              
              // Draw the cropped portion from the original image
              croppedCtx.drawImage(
                  img,
                  finalCropX, finalCropY, finalCropSize, finalCropSize,  // Source rectangle (from original image)
                  0, 0, finalCropSize, finalCropSize                      // Destination rectangle (to cropped canvas)
              );
              
              // Convert to data URL and save
              const croppedImageUrl = croppedCanvas.toDataURL('image/png');
              saveCrop(imageType, croppedImageUrl);
              close();
          };
          
          img.src = imageSrc;
      };
      
      if (!isOpen || !imageSrc) return null;
  
      return (
          <div className="modal-overlay modal-open" onClick={close}>
              <div className="modal-content rounded-4 shadow-2xl p-4" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'var(--card-bg)', maxWidth: '650px', width: '90%' }}>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4" style={{ borderColor: 'var(--border-color)' }}>
                      <h5 className="h5 fw-bold" style={{ color: 'var(--text-primary)' }}>{titleMap[imageType]}</h5>
                      <button className="btn btn-outline-secondary p-1 rounded-circle" onClick={close}><XIcon /></button>
                  </div>
  
                  <div className="text-center mb-4 d-flex justify-content-center">
                      <canvas ref={canvasRef} style={{ maxWidth: '50%', borderRadius: '0.5rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} />
                  </div>
                  
                  <p className="small text-center" style={{ color: 'var(--text-secondary)' }}>
                       Click 'Confirm Crop' to apply the simulated edit.
                  </p>
  
                  <div className="d-flex justify-content-end mt-3 gap-3">
                      <button className="btn btn-outline-secondary rounded-pill px-4" onClick={close}>Cancel</button>
                      <button 
                          className="btn btn-primary-custom rounded-pill px-4" 
                          onClick={handleConfirmCrop}
                      >
                          Confirm Crop
                      </button>
                  </div>
              </div>
          </div>
      );
};


export const UploadView = ({ startGeneration, palluImage, setPalluImage, bodyImage, setBodyImage, borderImage, setBorderImage, description, setDescription, croppedPallu, croppedBody, croppedBorder, isCropModalOpen, imageTypeToCrop, closeCropModal, openModalCroped, setCroppedPallu, setCroppedBody, setCroppedBorder }) => {
  
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
                  <h1 className="design-workspace text-center fw-bold mb-4 border-bottom pb-2">Design Workspace</h1>
                  <div className=" card upload-section-card rounded-3 border-2 shadow-4 p-3 d-flex flex-column gap-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                      
                        <div className='row g-3'>
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

                        <button onClick={startGeneration} className="btn btn-primary-custom w-100 py-3 mt-4 rounded-4 shadow-xl cta-button">
                              <span className="fs-5">GENERATE FUSION</span>
                        </button>
                  </div>

                  <CropModal 
                        isOpen={isCropModalOpen}  
                        imageType={imageTypeToCrop}  
                        imageSrc={imageStateMap[imageTypeToCrop]?.image}  
                        close={closeCropModal}
                        saveCrop={saveCrop}
                  />
            </div>
      );
  };
  
  
  
export  const LoadingView = () => (
      <div className="d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ minHeight: 500 }}>
          <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: 'var(--bs-primary)' }}>
              <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 fs-5 fw-semibold" style={{ color: 'var(--bs-primary)' }}>Fusing Design...</p>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Please wait while the AI crafts your unique Saree fusion.</p>
      </div>
  );
  
  