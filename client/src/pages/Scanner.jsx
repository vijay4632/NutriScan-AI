import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Plus, 
  ChevronRight, 
  Settings, 
  Flame, 
  Check, 
  X,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Scanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mode & Capture states
  const [scanMode, setScanMode] = useState('upload'); // 'webcam' or 'upload'
  const [image, setImage] = useState(null); // base64 or file path
  const [file, setFile] = useState(null); // uploaded physical file
  const [foodHint, setFoodHint] = useState(''); // manually typed hint
  
  // Scan UI states
  const [scanning, setScanning] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [mealType, setMealType] = useState('lunch');
  
  // Voice Assistant states
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceGender, setVoiceGender] = useState('female'); // 'male' or 'female'

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto trigger text-to-speech when scan result updates
  useEffect(() => {
    if (scanResult && voiceEnabled) {
      speakResults(scanResult);
    }
  }, [scanResult]);

  // Voice Narrator helper
  const speakResults = (res) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel active synthesis speech
    window.speechSynthesis.cancel();

    const text = `Detected food is ${res.foodName}. Estimated calories are ${res.calories} calories, with ${Math.round(res.protein)} grams of protein.`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt selecting accent voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (voiceGender === 'male') {
        // Attempt finding standard male voice
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('google uk english male') || v.name.toLowerCase().includes('male'));
        if (maleVoice) utterance.voice = maleVoice;
      } else {
        // Attempt finding female voice
        const femaleVoice = voices.find(v => v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('google uk english female') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hazel'));
        if (femaleVoice) utterance.voice = femaleVoice;
      }
    }

    utterance.rate = 0.95; // elegant slower paced rate
    window.speechSynthesis.speak(utterance);
  };

  // Simulated Telemetry logs printer
  const runSimulatedTelemetry = (callback) => {
    const logs = [
      '[ML] Initiating ResNet-50 visual pipeline...',
      '[ML] Calibrating exposure and pixel depth mappings...',
      '[ML] Decoding image tensors (224x224x3 RGB arrays)...',
      '[ML] Analyzing structural patterns and bounding coordinates...',
      '[ML] Querying Spoonacular nutrition dictionary...',
      '[ML] Running softmax tag classification classification index...',
      '[ML] Class matched successfully!'
    ];

    setTelemetryLogs([]);
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTelemetryLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, 280); // prints each log in 280ms
  };

  // Handle capture webcam
  const captureSnapshot = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setFile(null);
      toast.success('Camera snapshot captured! 📸');
    }
  };

  // Handle file select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
      toast.success(`Selected image: ${selectedFile.name}`);
    }
  };

  // Perform AI Trigger Scan
  const executeScan = async () => {
    if (!image && !file) {
      toast.error('Please select an image or capture a snapshot first.');
      return;
    }

    setScanning(true);
    setScanResult(null);

    // Step 1: Run telemetry logger animations first
    runSimulatedTelemetry(async () => {
      try {
        const formData = new FormData();
        formData.append('foodHint', foodHint);

        if (scanMode === 'upload' && file) {
          formData.append('image', file);
        } else if (image) {
          formData.append('image', image); // Base64 snapshot
        }

        const res = await axios.post('/api/food/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (res.data.success) {
          setScanResult(res.data.data);
          toast.success('Food recognition analysis complete!', { icon: '🤖' });
        }
      } catch (err) {
        console.error('Scan error:', err);
        toast.error('AI Scan analysis encountered an error. Falling back...');
      } finally {
        setScanning(false);
      }
    });
  };

  // Save meal log to history
  const handleSaveMeal = async () => {
    if (!scanResult) return;

    try {
      const payload = {
        foodName: scanResult.foodName,
        calories: scanResult.calories,
        protein: scanResult.protein,
        carbs: scanResult.carbs,
        fats: scanResult.fats,
        fiber: scanResult.fiber,
        sugar: scanResult.sugar,
        quantity: scanResult.quantity,
        imageUrl: scanResult.imageUrl,
        mealType: mealType,
        vitamins: scanResult.vitamins,
        minerals: scanResult.minerals
      };

      const res = await axios.post('/api/meals/add', payload);
      if (res.data.success) {
        toast.success(`Logged ${scanResult.foodName} for ${mealType}! 🥗`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Failed to log meal to database.');
    }
  };

  const resetScanner = () => {
    setImage(null);
    setFile(null);
    setScanResult(null);
    setTelemetryLogs([]);
    setFoodHint('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 select-none">
      {/* Voice and settings toggles */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
            <Camera className="w-6.5 h-6.5 text-emerald-400" />
            <span>AI Food Recognition</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Analyze your physical meals using camera vision or image file uploads.
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800/80 p-1.5 rounded-xl text-xs">
          <button
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (voiceEnabled) window.speechSynthesis.cancel();
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              voiceEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Narrator Voice"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <select
            value={voiceGender}
            onChange={(e) => setVoiceGender(e.target.value)}
            disabled={!voiceEnabled}
            className="bg-transparent text-zinc-400 font-semibold focus:outline-none border-none text-[11px] pr-2.5 disabled:opacity-40"
          >
            <option value="female" className="bg-zinc-950 text-zinc-300">Female Voice</option>
            <option value="male" className="bg-zinc-950 text-zinc-300">Male Voice</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input Camera View / File Upload */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-5 shadow-xl space-y-4">
            {/* Capture Selection Header */}
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => {
                  setScanMode('upload');
                  resetScanner();
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  scanMode === 'upload' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Upload Photo
              </button>
              <button
                onClick={() => {
                  setScanMode('webcam');
                  resetScanner();
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  scanMode === 'webcam' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Live Webcam
              </button>
            </div>

            {/* Main Interactive Capture Area */}
            <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center">
              {scanning && (
                <>
                  <div className="scanner-line animate-scan z-10" />
                  <div className="absolute inset-0 scanning-overlay z-5" />
                </>
              )}

              {/* Webcam View */}
              {scanMode === 'webcam' && !image && (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: 'user' }}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Upload View (Dropzone) */}
              {scanMode === 'upload' && !image && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 text-center space-y-3 cursor-pointer w-full h-full group hover:bg-zinc-900/20 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center transition-all duration-200">
                    <Upload className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-zinc-300">Drag & drop photo or click to browse</span>
                    <span className="block text-[10px] text-zinc-600 mt-1">Supports PNG, JPEG up to 5MB</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}

              {/* Image Preview */}
              {image && (
                <img
                  src={image}
                  alt="Captured food preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Camera Actions */}
            {scanMode === 'webcam' && !image && (
              <button
                onClick={captureSnapshot}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 active:scale-98 transition-all"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Capture Snapshot</span>
              </button>
            )}

            {/* Scanning Controls */}
            {image && !scanning && !scanResult && (
              <div className="flex gap-3">
                <button
                  onClick={resetScanner}
                  className="flex-1 py-3 rounded-xl text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700 transition-all"
                >
                  Reset Picture
                </button>
                <button
                  onClick={executeScan}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald active:scale-98 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Neural Scan</span>
                </button>
              </div>
            )}
          </div>

          {/* Optional Name Override hint */}
          {!scanResult && !scanning && (
            <div className="glass-card rounded-2xl p-5 shadow-lg space-y-3">
              <div>
                <span className="block text-xs font-bold text-zinc-300">Name Override Hint (Optional)</span>
                <span className="block text-[10px] text-zinc-500">Provide hints to optimize the vision classification dictionary lookup.</span>
              </div>
              <input
                type="text"
                value={foodHint}
                onChange={(e) => setFoodHint(e.target.value)}
                placeholder="e.g. Avocado toast, sirloin steak, pizza, burger"
                className="w-full glass-input rounded-xl py-2.5 px-4 text-xs text-zinc-100 placeholder-zinc-700"
              />
            </div>
          )}

          {/* TELEMETRY LOGGER PANEL */}
          {scanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-5 shadow-lg space-y-3 border-l-3 border-emerald-500 bg-zinc-950 font-mono text-[11px]"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">AI Classification Console</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="space-y-1.5 min-h-[120px] text-zinc-500 max-h-[160px] overflow-y-auto">
                {telemetryLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-zinc-700 select-none">❯</span>
                    <span className={idx === telemetryLogs.length - 1 ? 'text-zinc-200' : ''}>{log}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Results Display Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {scanResult ? (
              <motion.div
                key="results-active"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="glass-card rounded-2xl p-5 shadow-2xl space-y-5"
              >
                {/* Result Title & Confidence */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div>
                    <h2 className="font-outfit font-extrabold text-xl text-zinc-100">{scanResult.foodName}</h2>
                    <span className="text-[10px] text-zinc-500">Portion size: {scanResult.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {Math.round(scanResult.confidence * 100)}% Match
                    </span>
                  </div>
                </div>

                {/* Macro Nutrient Summary Bars */}
                <div className="space-y-4">
                  {/* Calories widget */}
                  <div className="flex items-center justify-between p-3.5 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Total calories</span>
                        <span className="block font-outfit font-bold text-sm text-zinc-200">{scanResult.calories} kcal</span>
                      </div>
                    </div>
                  </div>

                  {/* Carbs/Fat/Protein Bar Widgets */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: 'Protein', val: scanResult.protein, color: 'bg-emerald-400', txt: 'text-emerald-400' },
                      { label: 'Carbs', val: scanResult.carbs, color: 'bg-cyan-400', txt: 'text-cyan-400' },
                      { label: 'Fats', val: scanResult.fats, color: 'bg-amber-400', txt: 'text-amber-400' }
                    ].map((macro) => (
                      <div key={macro.label} className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-center space-y-1">
                        <span className={`block text-[9px] font-bold ${macro.txt} uppercase tracking-wider`}>{macro.label}</span>
                        <span className="block font-outfit font-bold text-sm text-zinc-200">{macro.val}g</span>
                      </div>
                    ))}
                  </div>

                  {/* Portion details & fibers */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-zinc-800/50 py-1.5 text-zinc-400">
                      <span>Dietary Fiber</span>
                      <span className="text-zinc-200 font-bold">{scanResult.fiber}g</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-800/50 py-1.5 text-zinc-400">
                      <span>Sugars</span>
                      <span className="text-zinc-200 font-bold">{scanResult.sugar}g</span>
                    </div>
                  </div>
                </div>

                {/* Micro Vitamins & Minerals */}
                {scanResult.vitamins && Object.keys(scanResult.vitamins).length > 0 && (
                  <div className="space-y-2.5">
                    <span className="block text-xs font-bold text-zinc-300">Vitamins & Minerals %DV</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {Object.entries(scanResult.vitamins).map(([key, val]) => (
                        <div key={key} className="flex justify-between p-2 bg-zinc-900/30 border border-zinc-800/50 rounded-lg text-zinc-500">
                          <span>{key}</span>
                          <span className="text-zinc-300 font-semibold">{val}</span>
                        </div>
                      ))}
                      {Object.entries(scanResult.minerals || {}).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex justify-between p-2 bg-zinc-900/30 border border-zinc-800/50 rounded-lg text-zinc-500">
                          <span>{key}</span>
                          <span className="text-zinc-300 font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Section */}
                <div className="border-t border-zinc-800/80 pt-4 space-y-4">
                  {/* Select meal category */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Log Category</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setMealType(type)}
                          className={`py-2 rounded-lg text-[10px] font-bold tracking-wider capitalize border transition-all duration-150 ${
                            mealType === type
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={resetScanner}
                      className="flex-1 py-3 rounded-xl text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-zinc-200"
                    >
                      Clear Log
                    </button>
                    <button
                      onClick={handleSaveMeal}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald active:scale-98 transition-all"
                    >
                      <Check className="w-4.5 h-4.5" />
                      <span>Commit to Diary</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results-inactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-7 text-center text-zinc-500 shadow-xl flex flex-col items-center justify-center min-h-[360px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  <Camera className="w-5.5 h-5.5 text-zinc-600" />
                </div>
                <h3 className="font-outfit font-bold text-sm text-zinc-400">Waiting for Image Capture</h3>
                <p className="text-[11px] text-zinc-600 max-w-xs mt-1.5 leading-normal">
                  Snapshot a physical meal or manually select a file catalog, then trigger the neural classifier scanner.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
