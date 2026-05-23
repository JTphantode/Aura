import React, { useState } from 'react';
import './Onboard.css';

const Onboard = ({onFormSubmit}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tier, setTier] = useState('Emerging');
  const [logoerror, setLogoerror] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setError('You must provide a name for your studio');
      return;
    } 
    if (trimmedName.length < 4) {
      setError(`Studio's name must be a minimum of ${4 - trimmedName.length} characters long`); 
      return;
    } 
    if (!imageUpload) {
      setLogoerror('You must provide an image for your logo');
      return;
    }

    // Clean slate on success
    setError('');
    setLogoerror('');
    const data ={
name: name.trim(),
logo: preview,
tier: tier
}
if(onFormSubmit) {
onFormSubmit(data)
}
    console.log("Submitted:", { name: trimmedName, logo: imageUpload, tier });
  };

  const handleChange = (e) => {
    const targetValue = e.target.value;
    setName(targetValue);

    const trimmedLength = targetValue.trim().length;
    if (trimmedLength > 0 && trimmedLength < 4) {
      setError(`Studio's name must be a minimum of ${4 - trimmedLength} characters long`);
    } else {
      setError('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setPreview(URL.createObjectURL(file));
      setError('');
      setLogoerror(''); // Clears the error alert instantly when an image is picked
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        
        <div className='inputs'>
          <label htmlFor="studio-name">Studio's Name</label>
          <input 
            id="studio-name"
            type='text' 
            value={name} 
            onChange={handleChange} 
            placeholder="Enter studio name..."
            autoComplete="off"
          />
          {error && <small className='error'>{error}</small>}
        </div>

        {/* Dynamic Logo Upload Area */}
        <div className="logoUploadSection">
          <label>Studio Logo</label>
          <label htmlFor='logo' className={`customFileUpload ${preview ? 'hasPreview' : ''}`}>
            <input 
              id='logo' 
              type='file' 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hiddenFileInput"
            />
            {preview ? (
              <div className="previewWrapper">
                <img src={preview} alt="Preview" className="imagePreview" />
                <span className="changePhotoOverlay">Change Logo</span>
              </div>
            ) : (
              <div className="uploadPlaceholder">
                <span className="uploadIcon">📷</span>
                <p>Click to upload logo</p>
              </div>
            )}
          </label>

          {/* Fixed: Nesting is now perfectly balanced here */}
          {logoerror && <small className='error'>{logoerror}</small>}
        </div>

        <div className='details'>
          <h4>Select a tier</h4>
          <div className='tier'>
            {['Emerging', 'Creator', 'Network'].map((tierName) => (
              <button 
                key={tierName}
                type='button' 
                className={tier === tierName ? 'activeTier' : ''}
                onClick={() => setTier(tierName)}
              >
                {tierName}
              </button>
            ))}
          </div>
        </div>

        <div className='formConclusion'>
          <small className='smallFormInfo'>The information provided can be edited later</small>
          <button className='formSubmit' type='submit'>Submit Details</button>
        </div>

      </form>
    </section>
  );
};

export default Onboard;
