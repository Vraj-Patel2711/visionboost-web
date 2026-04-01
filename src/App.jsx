import { useState, useMemo } from 'react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{ cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
             <BrandLogo />
          </div>
          <nav style={styles.navGroup}>
            <button style={styles.navLink} onClick={() => setCurrentView('home')}>Home</button>
            <button style={styles.navLink} onClick={() => setCurrentView('workspace')}>Workspace</button>
            <button style={styles.navLink}>Developer API</button>
            <button onClick={toggleFullScreen} style={{...styles.buttonSecondary, marginLeft: '20px', padding: '8px 16px', fontSize: '14px'}}>
              ⛶ Fullscreen
            </button>
          </nav>
        </div>
      </header>

      {currentView === 'home' ? (
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <HomeView onLaunch={() => setCurrentView('workspace')} />
        </div>
      ) : (
        <WorkspaceView />
      )}
    </div>
  );
}

// ==========================================
// 1. HOME PAGE 
// ==========================================
function HomeView({ onLaunch }) {
  return (
    <main style={styles.homeMain}>
      <section style={styles.heroSection}>
        <h2 style={styles.heroTitle}>Reveal the Unseen.<br/>Enhance the Real.</h2>
        <p style={styles.heroSubtitle}>
          Our vision is to make augmented reality more natural, reliable, and accessible.
          Using AI to enhance real-world visuals in real time, we bridge the gap between 
          physical and digital environments across any lighting condition.
        </p>
        <div style={styles.heroButtons}>
          <button onClick={onLaunch} style={styles.buttonPrimary}>
            Launch Web App →
          </button>
          <button style={styles.buttonSecondary}>
            Read Our Philosophy
          </button>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h3 style={styles.sectionTitle}>Built for Absolute Clarity</h3>
        <p style={styles.sectionSubtitle}>
          Our AI enhancement pipeline operates completely in real-time, solving the 
          hardest computational vision challenges on device.
        </p>
        
        <div style={styles.grid}>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Real-Time Noise Reduction</h4>
            <p style={styles.cardText}>Eliminates visual artifacts instantly, providing a crisp, distortion-free view in standard environments.</p>
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Adaptive Low-Light Vision</h4>
            <p style={styles.cardText}>Transforms dark surroundings into clear, highly visible scenes without the artificial lag of traditional night vision.</p>
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Dynamic Color Balancing</h4>
            <p style={styles.cardText}>Restores natural, vivid colors to washed-out or heavily tinted physical spaces, enhancing authentic perception.</p>
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Sharpening & Detail Extraction</h4>
            <p style={styles.cardText}>Highlights micro-details and sharpens edges, making text readable and objects identifiable from afar.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ==========================================
// PRESET DEFINITIONS
// ==========================================
const PRESETS = [
  {
    name: "Default",
    settings: { noiseReduction: 25, lowLightEnhance: 80, colorBalance: 60, edgeSharpening: 70 }
  },
  {
    name: "Night Vision",
    settings: { noiseReduction: 30, lowLightEnhance: 100, colorBalance: 40, edgeSharpening: 90 }
  },
  {
    name: "Cinematic",
    settings: { noiseReduction: 70, lowLightEnhance: 60, colorBalance: 95, edgeSharpening: 50 }
  },
  {
    name: "Document Crisp",
    settings: { noiseReduction: 90, lowLightEnhance: 90, colorBalance: 20, edgeSharpening: 100 }
  },
  {
    name: "Vivid Color",
    settings: { noiseReduction: 40, lowLightEnhance: 85, colorBalance: 100, edgeSharpening: 60 }
  }
];

// ==========================================
// 2. WORKSPACE COMPONENT (Full-Screen Editor)
// ==========================================
function WorkspaceView() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [activePreset, setActivePreset] = useState("Default");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [settings, setSettings] = useState(PRESETS[0].settings);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file)); 
      setActivePreset("Default");
      setSettings(PRESETS[0].settings);
    }
  };

  const applyPreset = (presetName, presetSettings) => {
    setActivePreset(presetName);
    setSettings(presetSettings);
  };

  // If a user manually moves a slider, we remove the "active" highlight from the preset buttons
  const handleManualSettingChange = (settingName, value) => {
    setActivePreset(null);
    setSettings({...settings, [settingName]: parseInt(value)});
  };

  // 🧠 ON-DEVICE AI ANALYSIS ENGINE
  const runAIAnalysis = () => {
    if (!imagePreviewUrl) return;
    
    setIsAnalyzing(true);
    setActivePreset("AI Suggested");

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      
      const pixelCount = data.length / 4;
      const avgR = r / pixelCount;
      const avgG = g / pixelCount;
      const avgB = b / pixelCount;

      // Calculate perceived brightness (0-255)
      const brightness = (avgR * 0.299 + avgG * 0.587 + avgB * 0.114); 
      
      // Calculate color saturation variance
      const maxColor = Math.max(avgR, avgG, avgB);
      const minColor = Math.min(avgR, avgG, avgB);
      const saturation = maxColor === 0 ? 0 : (maxColor - minColor) / maxColor;

      // Smart Mapping Heuristics
      let suggestedLowLight = Math.max(10, Math.min(100, 130 - (brightness / 255) * 100));
      let suggestedColor = Math.max(20, Math.min(100, (1 - saturation) * 120));

      // Simulate a quick processing delay for UX feel, then apply the smart values
      setTimeout(() => {
        setSettings({
          noiseReduction: Math.floor(Math.random() * 30) + 40,
          lowLightEnhance: Math.floor(suggestedLowLight),
          colorBalance: Math.floor(suggestedColor),
          edgeSharpening: Math.floor(Math.random() * 20) + 70,
        });
        setIsAnalyzing(false);
      }, 600);
    };
    img.src = imagePreviewUrl;
  };

  const imageFilterStyle = useMemo(() => {
    if (!imagePreviewUrl) return {};
    const brightness = 50 + settings.lowLightEnhance;      
    const saturate = settings.colorBalance * 1.5;          
    const contrast = 50 + settings.edgeSharpening;         
    const blur = (settings.noiseReduction / 100) * 1.5;    

    return {
      filter: `brightness(${brightness}%) saturate(${saturate}%) contrast(${contrast}%) blur(${blur}px)`,
      transition: 'filter 0.3s ease-out' 
    };
  }, [settings, imagePreviewUrl]);

  const triggerDownload = () => {
     alert("Enhancements Applied! Image ready for download.");
  };

  return (
    <main style={styles.workspaceMainFullscreen}>
      
      {/* LEFT SIDE: Massive Visual Feed Area */}
      <section style={styles.imageViewerArea}>
        {imagePreviewUrl ? (
          <div style={styles.imageContainer}>
            <img 
              src={imagePreviewUrl} 
              alt="Visual Feed" 
              style={{...styles.previewImage, ...imageFilterStyle}} 
            />
            <p style={styles.statusText}>Live Enhanced Vision</p>
          </div>
        ) : (
          <div style={styles.uploadPlaceholder}>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '10px' }}>Workspace is empty</h2>
            <p style={{ color: '#888', fontSize: '18px', marginBottom: '30px' }}>Upload a visual feed to begin enhancement.</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={styles.fileInput} 
              id="file-upload-center"
            />
            <label htmlFor="file-upload-center" style={{...styles.buttonPrimary, padding: '16px 32px', fontSize: '18px'}}>
              Select Image
            </label>
          </div>
        )}
      </section>

      {/* RIGHT SIDE: Fixed AI Settings Sidebar */}
      <aside style={styles.settingsSidebar}>
        
        {/* AI AUTO-ENHANCE FEATURE */}
        <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #333' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{color: '#00E5FF'}}>✦</span> VisionBoost AI
          </h2>
          <button 
            onClick={runAIAnalysis} 
            disabled={!imagePreviewUrl || isAnalyzing}
            style={{
              ...styles.buttonPrimary, 
              width: '100%', 
              backgroundColor: activePreset === "AI Suggested" ? '#fff' : '#00E5FF',
              color: activePreset === "AI Suggested" ? '#000' : '#000',
              opacity: imagePreviewUrl ? 1 : 0.5,
              cursor: imagePreviewUrl ? 'pointer' : 'not-allowed'
            }}
          >
            {isAnalyzing ? "Analyzing Pixels..." : "✨ Auto-Enhance (AI)"}
          </button>
        </div>

        {/* QUICK PRESETS SECTION */}
        <div style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px' }}>Quick Presets</h2>
          <div style={styles.presetContainer}>
            {PRESETS.map((preset) => (
              <button 
                key={preset.name}
                onClick={() => applyPreset(preset.name, preset.settings)}
                style={{
                  ...styles.presetButton,
                  backgroundColor: activePreset === preset.name ? '#00E5FF' : '#222',
                  color: activePreset === preset.name ? '#000' : '#ccc',
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* MANUAL ADJUSTMENTS SECTION */}
        <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px' }}>
          Manual Adjustments
        </h2>
        
        <SettingSlider label="Noise Reduction" value={settings.noiseReduction} onChange={(e) => handleManualSettingChange('noiseReduction', e.target.value)} />
        <SettingSlider label="Low-Light Enhance" value={settings.lowLightEnhance} onChange={(e) => handleManualSettingChange('lowLightEnhance', e.target.value)} />
        <SettingSlider label="Color Balance" value={settings.colorBalance} onChange={(e) => handleManualSettingChange('colorBalance', e.target.value)} />
        <SettingSlider label="Edge Sharpening" value={settings.edgeSharpening} onChange={(e) => handleManualSettingChange('edgeSharpening', e.target.value)} />

        {/* BOTTOM ACTIONS */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          {imagePreviewUrl && (
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={styles.fileInput} 
                id="file-upload-sidebar"
              />
              <label htmlFor="file-upload-sidebar" style={{...styles.buttonSecondary, width: '100%', display: 'block', textAlign: 'center', boxSizing: 'border-box'}}>
                Load New Image
              </label>
            </div>
          )}

          <button onClick={() => applyPreset("Default", PRESETS[0].settings)} style={{...styles.buttonSecondary, width: '100%', border: 'none', color: '#888', marginBottom: '15px'}}>
            Reset to Default
          </button>

          {imagePreviewUrl && (
              <button onClick={triggerDownload} style={{...styles.buttonPrimary, width: '100%', border: 'none'}}>
                Save Enhancements
              </button>
          )}
        </div>
      </aside>

    </main>
  );
}

// ==========================================
// 3. UI COMPONENTS & STYLES
// ==========================================
const BrandLogo = () => (
  <svg width="180" height="35" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" stroke="#00E5FF" strokeWidth="3"/>
    <path d="M20 10 A 10 10 0 0 1 30 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="4" fill="#00E5FF"/>
    <text x="45" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
      Vision<tspan fill="#00E5FF">Boost</tspan>
    </text>
  </svg>
);

const SettingSlider = ({ label, value, onChange }) => (
  <div style={{ marginBottom: '25px', textAlign: 'left' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#ccc', fontSize: '15px' }}>
      <span>{label}</span>
      <span style={{ color: '#00E5FF' }}>{value}%</span>
    </div>
    <input type="range" min="0" max="100" value={value} onChange={onChange} style={{ width: '100%', accentColor: '#00E5FF', height: '6px' }} />
  </div>
);

const styles = {
  container: { height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0A', color: '#fff', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' },
  header: { padding: '0 20px', height: '70px', borderBottom: '1px solid #222', backgroundColor: '#121212', display: 'flex', alignItems: 'center', flexShrink: 0 },
  headerContent: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#00E5FF', margin: 0, letterSpacing: '1px', fontSize: '24px', fontWeight: 'bold' },
  navGroup: { display: 'flex', alignItems: 'center' },
  navLink: { backgroundColor: 'transparent', color: '#ccc', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '20px' },
  
  homeMain: { maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' },
  heroSection: { textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto' },
  heroTitle: { fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' },
  heroSubtitle: { fontSize: '18px', color: '#aaa', marginBottom: '40px', lineHeight: '1.6' },
  heroButtons: { display: 'flex', justifyContent: 'center', gap: '20px' },
  featuresSection: { textAlign: 'center' },
  sectionTitle: { fontSize: '32px', marginBottom: '16px', color: '#fff' },
  sectionSubtitle: { color: '#aaa', maxWidth: '600px', margin: '0 auto 40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#151515', padding: '24px', borderRadius: '12px', border: '1px solid #222', textAlign: 'left' },
  cardTitle: { color: '#00E5FF', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' },
  cardText: { color: '#888', lineHeight: '1.5', fontSize: '14px' },

  workspaceMainFullscreen: { display: 'flex', flex: 1, flexDirection: 'row', overflow: 'hidden' },
  
  imageViewerArea: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', backgroundColor: '#0A0A0A', position: 'relative' },
  imageContainer: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  previewImage: { maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  statusText: { color: '#00E5FF', marginTop: '20px', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' },
  uploadPlaceholder: { textAlign: 'center', padding: '60px', border: '2px dashed #333', borderRadius: '12px', backgroundColor: '#111' },
  fileInput: { display: 'none' },
  
  settingsSidebar: { width: '380px', backgroundColor: '#121212', borderLeft: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0 },
  
  presetContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  presetButton: { padding: '8px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', transition: 'all 0.2s ease' },

  buttonPrimary: { display: 'inline-block', backgroundColor: '#00E5FF', color: '#000', padding: '14px 28px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', border: 'none', transition: 'background-color 0.2s' },
  buttonSecondary: { backgroundColor: 'transparent', color: '#fff', border: '1px solid #555', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', fontSize: '16px', transition: 'border-color 0.2s' }
};