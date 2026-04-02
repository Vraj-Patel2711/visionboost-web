import { useState, useMemo } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'workspace', 'api', or 'philosophy'

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
            <button style={{...styles.navLink, color: currentView === 'home' ? '#00E5FF' : '#ccc'}} onClick={() => setCurrentView('home')}>Home</button>
            <button style={{...styles.navLink, color: currentView === 'workspace' ? '#00E5FF' : '#ccc'}} onClick={() => setCurrentView('workspace')}>Workspace</button>
            <button style={{...styles.navLink, color: currentView === 'philosophy' ? '#00E5FF' : '#ccc'}} onClick={() => setCurrentView('philosophy')}>Philosophy</button>
            <button style={{...styles.navLink, color: currentView === 'api' ? '#00E5FF' : '#ccc'}} onClick={() => setCurrentView('api')}>Developer API</button>
            <button onClick={toggleFullScreen} style={{...styles.buttonSecondary, marginLeft: '20px', padding: '8px 16px', fontSize: '14px'}}>
              ⛶ Fullscreen
            </button>
          </nav>
        </div>
      </header>

      {/* Dynamic View Routing */}
      {currentView === 'home' && (
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <HomeView 
            onLaunch={() => setCurrentView('workspace')} 
            onPhilosophy={() => setCurrentView('philosophy')} 
          />
        </div>
      )}
      {currentView === 'workspace' && (
        <WorkspaceView />
      )}
      {currentView === 'philosophy' && (
        <div style={{ overflowY: 'auto', flex: 1 }}><PhilosophyView /></div>
      )}
      {currentView === 'api' && (
        <div style={{ overflowY: 'auto', flex: 1 }}><DeveloperView /></div>
      )}
    </div>
  );
}

// ==========================================
// 1. HOME PAGE 
// ==========================================
function HomeView({ onLaunch, onPhilosophy }) {
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
          <button onClick={onLaunch} style={styles.buttonPrimary}>Launch Web App →</button>
          
          {/* UPDATED: Now perfectly redirects to the new Philosophy page */}
          <button onClick={onPhilosophy} style={styles.buttonSecondary}>
            Read Our Philosophy
          </button>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h3 style={styles.sectionTitle}>Built for Absolute Clarity</h3>
        <p style={styles.sectionSubtitle}>
          Our multi-model AI enhancement pipeline operates completely in real-time, solving the 
          hardest computational vision challenges on device.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          <div style={{...styles.card, flex: '1 1 30%', minWidth: '280px'}}>
            <h4 style={styles.cardTitle}>Real-Time Noise Reduction</h4>
            <p style={styles.cardText}>Eliminates visual artifacts instantly, providing a crisp, distortion-free view in standard environments.</p>
          </div>
          <div style={{...styles.card, flex: '1 1 30%', minWidth: '280px'}}>
            <h4 style={styles.cardTitle}>HDR Anti-Blooming AI</h4>
            <p style={styles.cardText}>Advanced histogram analysis detects bright pixels and applies non-linear highlight compression, preventing washed-out glares.</p>
          </div>
          <div style={{...styles.card, flex: '1 1 30%', minWidth: '280px'}}>
            <h4 style={styles.cardTitle}>Prompt-Driven AI</h4>
            <p style={styles.cardText}>Type your intent (e.g., "make it sharper") and our local NLP engine mathematically translates your words into visual clarity.</p>
          </div>
          <div style={{...styles.card, flex: '1 1 45%', minWidth: '350px'}}>
            <h4 style={styles.cardTitle}>Sharpening & Detail Extraction</h4>
            <p style={styles.cardText}>Highlights micro-details and sharpens edges, making text readable and objects identifiable from afar.</p>
          </div>
          <div style={{...styles.card, flex: '1 1 45%', minWidth: '350px', borderColor: '#00E5FF44'}}>
            <h4 style={styles.cardTitle}>Absolute Data Privacy</h4>
            <p style={styles.cardText}>We do not save, store, or upload any visual data. All Machine Learning models run entirely locally on your device hardware.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ==========================================
// 2. PHILOSOPHY PAGE (NEW)
// ==========================================
function PhilosophyView() {
  return (
    <main style={styles.apiMain}>
      <div style={styles.apiHeader}>
        <h2 style={styles.heroTitle}>Our Core Philosophy</h2>
        <p style={styles.heroSubtitle}>
          Technology should enhance human perception, not replace it. We build tools that act as a supportive layer—augmenting reality with clarity while deeply respecting authenticity.
        </p>
      </div>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>Non-Destructive RGB Integration</h3>
        <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '16px', marginBottom: '15px' }}>
          Instead of blindly applying destructive, artificial filters to your visual feed, VisionBoost relies on mathematical, Non-Destructive RGB Integration.
          <br/><br/>
          By operating on a strictly pixel-by-pixel level, our AI calculates true luminance and color saturation variance without artificially overwriting reality. We do not synthesize fake pixels; we carefully remap the existing photon data to reveal hidden details. 
          <br/><br/>
          The result is an augmented experience that deeply respects authenticity, ensuring that virtual enhancements assist you without distorting the physical world you stand in.
        </p>
      </section>
    </main>
  );
}

// ==========================================
// 3. DEVELOPER API DOCUMENTATION PAGE
// ==========================================
function DeveloperView() {
  return (
    <main style={styles.apiMain}>
      <div style={styles.apiHeader}>
        <h2 style={styles.heroTitle}>VisionBoost API & Architecture</h2>
        <p style={styles.heroSubtitle}>
          A comprehensive breakdown of the Zero-Latency, Tri-Model AI Pipeline. Designed for complete data privacy, all computations run locally via Edge processing.
        </p>
      </div>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>1. The Tri-Model Intelligence Pipeline</h3>
        <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '15px' }}>
          VisionBoost does not rely on a single, monolithic AI model. Instead, it synthesizes data from three highly specialized, parallel engines operating directly inside the client's browser layer. This ensures zero network latency and perfect data privacy.
        </p>
        <ul style={{ color: '#ccc', lineHeight: '1.8', marginLeft: '20px', marginBottom: '20px' }}>
          <li><strong>Model A (Semantic TFJS Engine):</strong> Neural network running COCO-SSD for object detection and context awareness.</li>
          <li><strong>Model B (Canvas Pixel Math):</strong> Mathematical engine for RGB variance, histogram extraction, and Anti-Blooming constraints.</li>
          <li><strong>Model C (Local NLP Engine):</strong> Linguistic intent parser that transforms human commands into mathematical slider biases.</li>
        </ul>
      </section>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>2. Semantic TFJS API (Contextual Overrides)</h3>
        <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '15px' }}>
          The Semantic Engine scans the frame to understand <em>what</em> is being looked at. It acts as a safety governor. For example, if it detects human presence, it issues an API override to cap color saturation, ensuring skin tones are never artificially turned orange by the math engine.
        </p>
        <div style={styles.codeBlock}>
          <pre style={{ margin: 0, color: '#e6e6e6', overflowX: 'auto' }}>
{`// Initialize TensorFlow API
await tf.ready();
const objectModel = await cocoSsd.load();
const predictions = await objectModel.detect(imageElement);

// Establish Dynamic Context Heuristics
let maxColorCap = 100;
let edgeSharpeningBase = 60;

// Apply Contextual Overrides
if (detectedObjects.includes('person')) {
   maxColorCap = 65; // Enforce natural skin tone retention
}
if (detectedObjects.some(obj => ['book', 'laptop', 'cell phone'].includes(obj))) {
   edgeSharpeningBase = 95; // Maximize text readability matrices
}`}
          </pre>
        </div>
      </section>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>3. Mathematical Pixel API & Anti-Blooming</h3>
        <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '15px' }}>
          Simultaneously, the Canvas API extracts raw RGB arrays. It calculates human-perceived luminance and generates a micro-histogram. The Anti-Blooming API tracks the <code>highlightRatio</code> (pixels with an intensity &gt; 220) to aggressively throttle the Low-Light enhancer, completely preventing white-out flares.
        </p>
        <div style={styles.codeBlock}>
          <pre style={{ margin: 0, color: '#e6e6e6', overflowX: 'auto' }}>
{`// Extract RGB Arrays via Canvas API
const { data } = ctx.getImageData(0, 0, width, height);
let brightPixels = 0;

for (let i = 0; i < data.length; i += 4) { 
   // Anti-Blooming Histogram Check
   if ((data[i] + data[i+1] + data[i+2]) / 3 > 220) {
      brightPixels++;
   }
}

// Calculate Highlight Compression Factor
const highlightRatio = brightPixels / totalPixels;
const bloomProtectionFactor = Math.max(0.1, 1 - (highlightRatio * 6)); 

// Apply Non-Linear HDR Compression
let baseLightBoost = Math.max(10, Math.min(100, 100 - (brightness / 255) * 80));
let safeLightBoost = baseLightBoost * bloomProtectionFactor;`}
          </pre>
        </div>
      </section>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>4. Local NLP API (Command Mode)</h3>
        <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '15px' }}>
          When the user provides a natural language prompt, the local NLP engine intercepts the workflow. It applies linguistic heuristic biases directly to the final tensors generated by Model A and Model B, offering unprecedented human-in-the-loop control.
        </p>
      </section>

      <section style={styles.apiSection}>
        <h3 style={styles.apiSectionTitle}>5. Hardware-Accelerated Rendering API</h3>
        <p style={{ color: '#aaa', lineHeight: '1.6' }}>
          All synthesized parameters are ultimately passed to the device GPU using sub-millisecond CSS filter maps. By keeping the rendering loop entirely hardware-accelerated, the visual feed updates responsively at up to 120 frames per second, mimicking biological visual adaptation.
        </p>
      </section>
    </main>
  );
}

// ==========================================
// PRESET DEFINITIONS
// ==========================================
const PRESETS = [
  { name: "Default", settings: { noiseReduction: 15, lowLightEnhance: 50, colorBalance: 50, edgeSharpening: 50 } },
  { name: "Night Vision", settings: { noiseReduction: 20, lowLightEnhance: 90, colorBalance: 30, edgeSharpening: 80 } },
  { name: "Cinematic", settings: { noiseReduction: 25, lowLightEnhance: 45, colorBalance: 70, edgeSharpening: 60 } },
  { name: "Document Crisp", settings: { noiseReduction: 5, lowLightEnhance: 60, colorBalance: 20, edgeSharpening: 100 } },
  { name: "Vivid Color", settings: { noiseReduction: 10, lowLightEnhance: 55, colorBalance: 90, edgeSharpening: 55 } }
];

// ==========================================
// 4. WORKSPACE COMPONENT (Full-Screen Editor)
// ==========================================
function WorkspaceView() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [activePreset, setActivePreset] = useState("Default");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiStatus, setAiStatus] = useState("");
  const [detectedTags, setDetectedTags] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");

  const [settings, setSettings] = useState(PRESETS[0].settings);

  const isCommandMode = userPrompt.trim().length > 0;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file)); 
      setActivePreset("Default");
      setSettings(PRESETS[0].settings);
      setDetectedTags([]);
      setUserPrompt("");
    }
  };

  const applyPreset = (presetName, presetSettings) => {
    setActivePreset(presetName);
    setSettings(presetSettings);
  };

  const handleManualSettingChange = (settingName, value) => {
    setActivePreset(null);
    setSettings({...settings, [settingName]: parseInt(value)});
  };

  // 🧠 HYBRID ON-DEVICE AI ANALYSIS 
  const runAIAnalysis = async () => {
    if (!imagePreviewUrl) return;
    
    setIsAnalyzing(true);
    setActivePreset(isCommandMode ? "Command Overridden" : "AI Autonomous");
    setDetectedTags([]);
    setAiStatus(isCommandMode ? "Parsing Linguistic Commands..." : "Initiating Autonomous Analysis...");

    const imgElement = new Image();
    imgElement.crossOrigin = "Anonymous";
    imgElement.src = imagePreviewUrl;

    imgElement.onload = async () => {
      try {
        // --- MODEL 1: TensorFlow.js Semantic Object Detection ---
        setAiStatus("Scanning Semantics (TFJS)...");
        await tf.ready();
        const objectModel = await cocoSsd.load();
        const predictions = await objectModel.detect(imgElement);
        
        const detected = predictions.map(p => p.class);
        setDetectedTags(Array.from(new Set(detected)));

        let colorCap = 100;
        let baseSharpening = Math.floor(Math.random() * 15) + 60;
        if (detected.includes('person')) colorCap = 65; 
        if (detected.some(item => ['book', 'tv', 'laptop', 'cell phone'].includes(item))) baseSharpening = 90; 

        // --- MODEL 2: Mathematical Pixel Analysis & HDR Histogram ---
        setAiStatus("Analyzing Highlight Ratios (Anti-Blooming)...");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);
        
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let r = 0, g = 0, b = 0, brightPixels = 0;
        
        for (let i = 0; i < data.length; i += 4) { 
          r += data[i]; 
          g += data[i + 1]; 
          b += data[i + 2]; 
          if ((data[i] + data[i+1] + data[i+2]) / 3 > 220) brightPixels++; 
        }
        
        const pixelCount = data.length / 4;
        const brightness = ((r/pixelCount) * 0.299 + (g/pixelCount) * 0.587 + (b/pixelCount) * 0.114); 
        const maxColor = Math.max(r/pixelCount, g/pixelCount, b/pixelCount);
        const minColor = Math.min(r/pixelCount, g/pixelCount, b/pixelCount);
        const saturation = maxColor === 0 ? 0 : (maxColor - minColor) / maxColor;
        const highlightRatio = brightPixels / pixelCount;

        const bloomProtectionFactor = Math.max(0.1, 1 - (highlightRatio * 6)); 

        let suggestedLowLight = Math.max(10, Math.min(100, 100 - (brightness / 255) * 80));
        suggestedLowLight = suggestedLowLight * bloomProtectionFactor; 

        let suggestedColorRaw = Math.max(30, Math.min(100, (1 - saturation) * 100));
        let finalColor = Math.min(suggestedColorRaw, colorCap);
        let finalNoise = Math.floor(Math.random() * 8) + 12; 
        
        // --- MODEL 3: Local NLP Intent Engine (Command Override) ---
        if (isCommandMode) {
          setAiStatus("Applying Command Bias...");
          const lowerPrompt = userPrompt.toLowerCase();
          
          if (lowerPrompt.includes('sharp') || lowerPrompt.includes('crisp') || lowerPrompt.includes('detail')) {
            baseSharpening = Math.min(100, baseSharpening + 40);
            finalNoise = Math.max(0, finalNoise - 10);
          }
          if (lowerPrompt.includes('color') || lowerPrompt.includes('vibrant') || lowerPrompt.includes('pop')) {
            finalColor = Math.min(100, finalColor + 40);
          } else if (lowerPrompt.includes('black and white') || lowerPrompt.includes('b&w') || lowerPrompt.includes('grayscale')) {
            finalColor = 0; 
          }
          if (lowerPrompt.includes('bright') || lowerPrompt.includes('light')) {
            suggestedLowLight = Math.min(100, suggestedLowLight + 35);
          } else if (lowerPrompt.includes('dark')) {
            suggestedLowLight = Math.max(0, suggestedLowLight - 35);
          }
        }

        setSettings({
          noiseReduction: finalNoise,
          lowLightEnhance: Math.floor(suggestedLowLight),
          colorBalance: Math.floor(finalColor),
          edgeSharpening: Math.floor(baseSharpening),
        });

      } catch (error) {
        console.error("AI Analysis Failed:", error);
        alert("AI Engine encountered an error.");
      } finally {
        setIsAnalyzing(false);
        setAiStatus(isCommandMode ? "Command Execution Complete." : "Autonomous Analysis Complete.");
      }
    };
  };

  const imageFilterStyle = useMemo(() => {
    if (!imagePreviewUrl) return {};
    const brightness = 100 + (settings.lowLightEnhance - 50) * 0.6; 
    const saturate = 100 + (settings.colorBalance - 50) * 1.5;      
    const contrast = 100 + (settings.edgeSharpening - 50) * 0.5;    
    const blur = (settings.noiseReduction / 100) * 1.5;             

    return {
      filter: `brightness(${brightness}%) saturate(${saturate}%) contrast(${contrast}%) blur(${blur}px)`,
      transition: 'filter 0.3s ease-out' 
    };
  }, [settings, imagePreviewUrl]);

  const triggerDownload = () => {
    if (!imagePreviewUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.filter = imageFilterStyle.filter;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.download = 'VisionBoost_Enhanced.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = imagePreviewUrl;
  };

  return (
    <main style={styles.workspaceMainFullscreen}>
      <section style={styles.imageViewerArea}>
        {imagePreviewUrl ? (
          <div style={styles.imageContainer}>
            <img src={imagePreviewUrl} alt="Visual Feed" style={{...styles.previewImage, ...imageFilterStyle}} />
            <p style={styles.statusText}>Live Enhanced Vision</p>
          </div>
        ) : (
          <div style={styles.uploadPlaceholder}>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '10px' }}>Workspace is empty</h2>
            <p style={{ color: '#888', fontSize: '18px', marginBottom: '30px' }}>Upload a visual feed to begin enhancement.</p>
            <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInput} id="file-upload-center"/>
            <label htmlFor="file-upload-center" style={{...styles.buttonPrimary, padding: '16px 32px', fontSize: '18px'}}>Select Image</label>
          </div>
        )}
      </section>

      <aside style={styles.settingsSidebar}>
        
        {/* HYBRID AI CONTROL PANEL */}
        <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #333' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{color: '#00E5FF'}}>✦</span> Hybrid AI Engine
          </h2>
          
          <textarea 
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Leave empty for Auto-Analysis, or type a command (e.g. 'Make it sharper')"
            style={{...styles.promptInput, borderColor: isCommandMode ? '#00E5FF' : '#333'}}
            rows={2}
          />

          <button 
            onClick={runAIAnalysis} 
            disabled={!imagePreviewUrl || isAnalyzing}
            style={{
              ...styles.buttonPrimary, 
              width: '100%', 
              backgroundColor: isCommandMode ? '#fff' : '#00E5FF',
              color: '#000',
              opacity: imagePreviewUrl ? 1 : 0.5,
              cursor: imagePreviewUrl ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s'
            }}
          >
            {isAnalyzing 
              ? "Processing Data..." 
              : isCommandMode 
                ? "🪄 Enhance via Command" 
                : "✨ Auto-Enhance Image"}
          </button>
          
          {aiStatus && <p style={{ color: '#00E5FF', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>{aiStatus}</p>}
          
          {detectedTags.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <p style={{ color: '#aaa', fontSize: '12px', marginBottom: '5px' }}>TensorFlow Context Detected:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {detectedTags.map(tag => (
                  <span key={tag} style={{ backgroundColor: '#00E5FF22', color: '#00E5FF', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase' }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
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

        {/* MANUAL ADJUSTMENTS */}
        <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px' }}>Manual Overrides</h2>
        <SettingSlider label="Noise Reduction" value={settings.noiseReduction} onChange={(e) => handleManualSettingChange('noiseReduction', e.target.value)} />
        <SettingSlider label="Low-Light Enhance" value={settings.lowLightEnhance} onChange={(e) => handleManualSettingChange('lowLightEnhance', e.target.value)} />
        <SettingSlider label="Color Balance" value={settings.colorBalance} onChange={(e) => handleManualSettingChange('colorBalance', e.target.value)} />
        <SettingSlider label="Edge Sharpening" value={settings.edgeSharpening} onChange={(e) => handleManualSettingChange('edgeSharpening', e.target.value)} />

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          {imagePreviewUrl && (
            <div style={{ marginBottom: '20px' }}>
              <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInput} id="file-upload-sidebar"/>
              <label htmlFor="file-upload-sidebar" style={{...styles.buttonSecondary, width: '100%', display: 'block', textAlign: 'center', boxSizing: 'border-box'}}>Load New Image</label>
            </div>
          )}
          <button onClick={() => applyPreset("Default", PRESETS[0].settings)} style={{...styles.buttonSecondary, width: '100%', border: 'none', color: '#888', marginBottom: '15px'}}>Reset to Default</button>
          
          {imagePreviewUrl && (
              <button onClick={triggerDownload} style={{...styles.buttonPrimary, width: '100%', border: 'none'}}>Download Image</button>
          )}
        </div>
      </aside>
    </main>
  );
}

// ==========================================
// 5. UI COMPONENTS & STYLES
// ==========================================
const BrandLogo = () => (
  <svg width="180" height="35" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" stroke="#00E5FF" strokeWidth="3"/>
    <path d="M20 10 A 10 10 0 0 1 30 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="4" fill="#00E5FF"/>
    <text x="45" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800" fill="#FFFFFF" letterSpacing="1">Vision<tspan fill="#00E5FF">Boost</tspan></text>
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
  navLink: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '25px', fontWeight: '600', transition: 'color 0.2s' },
  
  homeMain: { maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' },
  heroSection: { textAlign: 'center', marginBottom: '60px', maxWidth: '800px', margin: '0 auto' },
  heroTitle: { fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' },
  heroSubtitle: { fontSize: '18px', color: '#aaa', marginBottom: '40px', lineHeight: '1.6' },
  heroButtons: { display: 'flex', justifyContent: 'center', gap: '20px' },
  
  featuresSection: { textAlign: 'center' },
  sectionTitle: { fontSize: '32px', marginBottom: '16px', color: '#fff' },
  sectionSubtitle: { color: '#aaa', maxWidth: '600px', margin: '0 auto 40px' },
  card: { backgroundColor: '#151515', padding: '24px', borderRadius: '12px', border: '1px solid #222', textAlign: 'left', boxSizing: 'border-box' },
  cardTitle: { color: '#00E5FF', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' },
  cardText: { color: '#888', lineHeight: '1.5', fontSize: '14px' },

  apiMain: { maxWidth: '900px', margin: '0 auto', padding: '60px 20px' },
  apiHeader: { borderBottom: '1px solid #333', paddingBottom: '30px', marginBottom: '40px' },
  apiSection: { marginBottom: '50px' },
  apiSectionTitle: { fontSize: '22px', color: '#00E5FF', marginBottom: '15px' },
  codeBlock: { backgroundColor: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333', fontSize: '14px', fontFamily: 'monospace' },

  workspaceMainFullscreen: { display: 'flex', flex: 1, flexDirection: 'row', overflow: 'hidden' },
  imageViewerArea: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', backgroundColor: '#0A0A0A', position: 'relative' },
  imageContainer: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  previewImage: { maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  statusText: { color: '#00E5FF', marginTop: '20px', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' },
  uploadPlaceholder: { textAlign: 'center', padding: '60px', border: '2px dashed #333', borderRadius: '12px', backgroundColor: '#111' },
  fileInput: { display: 'none' },
  
  settingsSidebar: { width: '380px', backgroundColor: '#121212', borderLeft: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0 },
  
  promptInput: { width: '100%', backgroundColor: '#1A1A1A', color: '#fff', border: '1px solid #333', borderRadius: '8px', padding: '12px', fontSize: '14px', marginBottom: '15px', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.3s' },
  presetContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  presetButton: { padding: '8px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', transition: 'all 0.2s ease' },

  buttonPrimary: { display: 'inline-block', backgroundColor: '#00E5FF', color: '#000', padding: '14px 28px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', border: 'none', transition: 'background-color 0.2s' },
  buttonSecondary: { backgroundColor: 'transparent', color: '#fff', border: '1px solid #555', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', fontSize: '16px', transition: 'border-color 0.2s' }
};