import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Download, Sparkles, RefreshCw, ZoomIn, ZoomOut, Check, Image as ImageIcon, Users, User, Heart, Star, Sliders, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

const BTS_MEMBERS = [
  { id: 'jungkook', name: 'Jung Kook', role: 'Main Vocalist', image: '/images/bts/member_jungkook.jpg', signature: 'Jung Kook 💜', tone: 'warm' },
  { id: 'jimin', name: 'Jimin', role: 'Lead Vocalist & Dancer', image: '/images/bts/member_jimin.jpg', signature: 'Jimin ✨', tone: 'dreamy' },
  { id: 'v', name: 'V (Taehyung)', role: 'Vocalist & Visual', image: '/images/bts/member_v.jpg', signature: 'V • Borahae 💜', tone: 'vintage' },
  { id: 'rm', name: 'RM (Namjoon)', role: 'Leader & Main Rapper', image: '/images/bts/member_rm.jpg', signature: 'RM • BTS 🐨', tone: 'bold' },
  { id: 'jin', name: 'Jin (Seokjin)', role: 'Vocalist & Visual', image: '/images/bts/member_jin.jpg', signature: 'Worldwide Handsome Jin 🐹', tone: 'bright' },
  { id: 'suga', name: 'SUGA (Yoongi)', role: 'Lead Rapper & Producer', image: '/images/bts/member_suga.jpg', signature: 'SUGA / Agust D 🐱', tone: 'cool' },
  { id: 'jhope', name: 'j-hope (Hoseok)', role: 'Main Dancer & Rapper', image: '/images/bts/member_jhope.jpg', signature: 'Your Hope, j-hope 🐿️', tone: 'energetic' }
];

const BTS_GROUP_POSES = [
  { id: 'group_hero', name: 'BTS OT7 Studio Gala', image: '/images/bts/group_hero.jpg', caption: 'BTS × ARMY Forever' },
  { id: 'group_stage', name: 'BTS OT7 Concert Stage', image: '/images/bts/group_stage.jpg', caption: 'Love Yourself Stadium Tour' },
  { id: 'group_portrait', name: 'BTS OT7 Formal Portrait', image: '/images/bts/group_portrait.jpg', caption: 'Grammy Red Carpet Edition' },
  { id: 'group_login', name: 'BTS OT7 Purple Horizon', image: '/images/bts/group_login.jpg', caption: 'Proof Anthology Edition' }
];

const FRAME_STYLES = [
  { id: 'photocard', name: '4-Cut Studio Strip', desc: 'Korean Life4Cuts photobooth with Borahae frame' },
  { id: 'duo', name: 'Studio Duo Portrait', desc: 'Realistic side-by-side studio photo with ambient tone blend' },
  { id: 'polaroid', name: 'Vintage Polaroid', desc: 'Classic white-border polaroid with BTS handwriting' },
  { id: 'vip', name: 'VIP Backstage Pass', desc: 'Holographic concert laminate pass' }
];

const PhotoFrameView = () => {
  const [photoType, setPhotoType] = useState('member'); // 'member' | 'group'
  const [selectedMember, setSelectedMember] = useState(BTS_MEMBERS[0]);
  const [selectedGroup, setSelectedGroup] = useState(BTS_GROUP_POSES[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_STYLES[0]);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoName, setUserPhotoName] = useState('');

  // Transform controls
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [filterStyle, setFilterStyle] = useState('studio'); // 'studio' | 'kpop_glow' | 'vintage_purple' | 'black_white'

  // Camera capture modal state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDataUrl, setGeneratedDataUrl] = useState(null);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Trigger frame re-render whenever inputs change
  useEffect(() => {
    renderPhotoFrame();
  }, [photoType, selectedMember, selectedGroup, selectedFrame, userPhoto, zoom, posX, posY, brightness, filterStyle]);

  // Clean camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setUserPhoto(img);
          setPosX(0);
          setPosY(0);
          setZoom(1);
        };
        img.src = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or unavailable. Please upload a photo instead.");
    }
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = videoRef.current.videoWidth || 640;
    tempCanvas.height = videoRef.current.videoHeight || 640;
    const ctx = tempCanvas.getContext('2d');
    // Mirror selfie
    ctx.translate(tempCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, tempCanvas.width, tempCanvas.height);

    const img = new Image();
    img.onload = () => {
      setUserPhoto(img);
      setUserPhotoName('Selfie Photo');
      stopCamera();
      setPosX(0);
      setPosY(0);
      setZoom(1);
    };
    img.src = tempCanvas.toDataURL('image/png');
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const renderPhotoFrame = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsGenerating(true);

    const W = 1080;
    const H = 1440;
    canvas.width = W;
    canvas.height = H;

    // 1. Background Fill
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#150628');
    bgGrad.addColorStop(0.5, '#0d031c');
    bgGrad.addColorStop(1, '#1b0733');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Decorative Purple Studio Glow
    const glowGrad = ctx.createRadialGradient(W / 2, H / 3, 50, W / 2, H / 3, 700);
    glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Load BTS Image
    const btsSrc = photoType === 'member' ? selectedMember.image : selectedGroup.image;
    const btsImg = await loadImage(btsSrc);

    // 3. Render according to Frame Style
    if (selectedFrame.id === 'photocard') {
      renderPhotocard4Cut(ctx, W, H, btsImg, userPhoto);
    } else if (selectedFrame.id === 'duo') {
      renderStudioDuo(ctx, W, H, btsImg, userPhoto);
    } else if (selectedFrame.id === 'polaroid') {
      renderVintagePolaroid(ctx, W, H, btsImg, userPhoto);
    } else if (selectedFrame.id === 'vip') {
      renderVipPass(ctx, W, H, btsImg, userPhoto);
    }

    // Save final data url
    setGeneratedDataUrl(canvas.toDataURL('image/png'));
    setIsGenerating(false);
  };

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  // Helper to draw user photo with transforms
  const drawUserPhotoInRect = (ctx, userImg, x, y, w, h) => {
    if (!userImg) {
      // Placeholder
      ctx.save();
      ctx.fillStyle = '#1e0a36';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

      ctx.fillStyle = '#d8b4fe';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ YOUR PHOTO HERE ✨', x + w / 2, y + h / 2 - 20);
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#c084fc';
      ctx.fillText('Upload photo or take a selfie', x + w / 2, y + h / 2 + 20);
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();

    // Lighting/Filter adjustments
    if (filterStyle === 'kpop_glow') {
      ctx.filter = `brightness(${brightness * 1.08}%) saturate(115%) contrast(105%)`;
    } else if (filterStyle === 'vintage_purple') {
      ctx.filter = `brightness(${brightness * 0.98}%) sepia(25%) hue-rotate(240deg) saturate(110%)`;
    } else if (filterStyle === 'black_white') {
      ctx.filter = `grayscale(100%) brightness(${brightness}%) contrast(120%)`;
    } else {
      ctx.filter = `brightness(${brightness}%) saturate(105%) contrast(102%)`;
    }

    const drawW = w * zoom;
    const drawH = (userImg.height / userImg.width) * drawW;
    const drawX = x + (w - drawW) / 2 + posX;
    const drawY = y + (h - drawH) / 2 + posY;

    ctx.drawImage(userImg, drawX, drawY, drawW, drawH);
    ctx.restore();
  };

  // 1. 4-CUT STUDIO STRIP
  const renderPhotocard4Cut = (ctx, W, H, btsImg, userImg) => {
    // Outer Frame Border
    const pad = 40;
    ctx.fillStyle = '#ffffff';
    ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 28);
    ctx.fill();

    // Inner Lavender tint
    ctx.fillStyle = '#f8f4ff';
    ctx.roundRect(pad + 12, pad + 12, W - pad * 2 - 24, H - pad * 2 - 24, 20);
    ctx.fill();

    // Top Slot: BTS (OT7 or Bias)
    const slotPad = pad + 32;
    const slotW = W - slotPad * 2;
    const slotH = (H - pad * 2 - 220) / 2;

    // Slot 1: BTS
    ctx.save();
    ctx.roundRect(slotPad, slotPad, slotW, slotH, 16);
    ctx.clip();
    if (btsImg) {
      ctx.drawImage(btsImg, slotPad, slotPad, slotW, slotH);
    }
    // BTS Badge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(slotPad, slotPad + slotH - 44, slotW, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`💜 ${photoType === 'member' ? selectedMember.name : 'BTS OT7'}`, slotPad + 16, slotPad + slotH - 14);
    ctx.restore();

    // Slot 2: User Photo
    const slot2Y = slotPad + slotH + 20;
    ctx.save();
    ctx.roundRect(slotPad, slot2Y, slotW, slotH, 16);
    ctx.clip();
    drawUserPhotoInRect(ctx, userImg, slotPad, slot2Y, slotW, slotH);
    ctx.restore();

    // Bottom Branding Area
    const bottomY = slot2Y + slotH + 20;
    ctx.fillStyle = '#6b21a8';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BTS WORLD • LIFE4CUTS', W / 2, bottomY + 36);

    ctx.fillStyle = '#9333ea';
    ctx.font = '20px sans-serif';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    ctx.fillText(`With ${photoType === 'member' ? selectedMember.name : 'BTS'} • ${dateStr} • Borahae 💜`, W / 2, bottomY + 74);
  };

  // 2. STUDIO DUO PORTRAIT (Realistic Side-by-Side)
  const renderStudioDuo = (ctx, W, H, btsImg, userImg) => {
    const pad = 48;
    const innerW = W - pad * 2;
    const innerH = H - pad * 2 - 120;

    // Outer Purple/Gold Trim
    const borderGrad = ctx.createLinearGradient(0, 0, W, H);
    borderGrad.addColorStop(0, '#c084fc');
    borderGrad.addColorStop(0.5, '#f472b6');
    borderGrad.addColorStop(1, '#818cf8');
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderGrad;
    ctx.strokeRect(pad - 10, pad - 10, innerW + 20, innerH + 140);

    const halfW = (innerW - 16) / 2;

    // Left Half: User
    drawUserPhotoInRect(ctx, userImg, pad, pad, halfW, innerH);

    // Right Half: BTS Member / Group
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad + halfW + 16, pad, halfW, innerH);
    ctx.clip();
    if (btsImg) {
      // Scale and center BTS image
      const btsW = halfW;
      const btsH = innerH;
      ctx.drawImage(btsImg, pad + halfW + 16, pad, btsW, btsH);
    }
    ctx.restore();

    // Studio Center Blending Seam
    const seamGrad = ctx.createLinearGradient(pad + halfW - 20, 0, pad + halfW + 36, 0);
    seamGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
    seamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    seamGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = seamGrad;
    ctx.fillRect(pad + halfW - 10, pad, 36, innerH);

    // Bottom Gold Plate Banner
    const bannerY = pad + innerH + 20;
    ctx.fillStyle = '#140524';
    ctx.fillRect(pad, bannerY, innerW, 80);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, bannerY, innerW, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${photoType === 'member' ? selectedMember.name : 'BTS OT7'} × ARMY`, W / 2, bannerY + 36);

    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(photoType === 'member' ? selectedMember.signature : 'Forever Bulletproof 💜 BTS WORLD', W / 2, bannerY + 64);
  };

  // 3. VINTAGE POLAROID
  const renderVintagePolaroid = (ctx, W, H, btsImg, userImg) => {
    const pad = 50;
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(pad, pad, W - pad * 2, H - pad * 2);

    // Inner photo area
    const photoPad = pad + 36;
    const photoW = W - photoPad * 2;
    const photoH = H - pad * 2 - 240;

    const splitW = (photoW - 12) / 2;

    // Side 1: User
    drawUserPhotoInRect(ctx, userImg, photoPad, photoPad, splitW, photoH);

    // Side 2: BTS Member
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoPad + splitW + 12, photoPad, splitW, photoH);
    ctx.clip();
    if (btsImg) {
      ctx.drawImage(btsImg, photoPad + splitW + 12, photoPad, splitW, photoH);
    }
    ctx.restore();

    // Polaroid Bottom Handwritten Text
    const bottomY = photoPad + photoH + 40;
    ctx.fillStyle = '#2e1065';
    ctx.font = 'italic bold 38px serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Memories with ${photoType === 'member' ? selectedMember.name : 'BTS'} 💜`, W / 2, bottomY + 35);

    ctx.fillStyle = '#7e22ce';
    ctx.font = '22px sans-serif';
    ctx.fillText('BTS WORLD SPECIAL EDITION • BORAHAE', W / 2, bottomY + 80);
  };

  // 4. VIP BACKSTAGE PASS
  const renderVipPass = (ctx, W, H, btsImg, userImg) => {
    const pad = 40;
    const passW = W - pad * 2;
    const passH = H - pad * 2;

    // Dark VIP Metallic Card
    const passGrad = ctx.createLinearGradient(0, 0, W, H);
    passGrad.addColorStop(0, '#0a0214');
    passGrad.addColorStop(0.5, '#1e053a');
    passGrad.addColorStop(1, '#0f0220');
    ctx.fillStyle = passGrad;
    ctx.roundRect(pad, pad, passW, passH, 32);
    ctx.fill();

    // Holographic Foil Border
    const holoGrad = ctx.createLinearGradient(pad, pad, pad + passW, pad + passH);
    holoGrad.addColorStop(0, '#ec4899');
    holoGrad.addColorStop(0.25, '#8b5cf6');
    holoGrad.addColorStop(0.5, '#06b6d4');
    holoGrad.addColorStop(0.75, '#eab308');
    holoGrad.addColorStop(1, '#ec4899');
    ctx.strokeStyle = holoGrad;
    ctx.lineWidth = 8;
    ctx.roundRect(pad, pad, passW, passH, 32);
    ctx.stroke();

    // Top Header: BTS WORLD VIP LAMINATE
    ctx.fillStyle = '#ffffff';
    ctx.font = 'black 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ BTS WORLD OFFICIAL VIP PASS ★', W / 2, pad + 60);

    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('ALL ACCESS BACKSTAGE PHOTO COMPOSITE', W / 2, pad + 96);

    // Main Photos Area
    const photoY = pad + 120;
    const photoH = passH - 260;
    const halfW = (passW - 48) / 2;

    drawUserPhotoInRect(ctx, userImg, pad + 20, photoY, halfW, photoH);

    ctx.save();
    ctx.beginPath();
    ctx.rect(pad + 20 + halfW + 8, photoY, halfW, photoH);
    ctx.clip();
    if (btsImg) {
      ctx.drawImage(btsImg, pad + 20 + halfW + 8, photoY, halfW, photoH);
    }
    ctx.restore();

    // Bottom Bar
    const bottomY = photoY + photoH + 20;
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`ISSUED TO: ARMY VIP • BIAS: ${photoType === 'member' ? selectedMember.name.toUpperCase() : 'OT7'}`, W / 2, bottomY + 30);
  };

  const handleDownload = () => {
    if (!generatedDataUrl) return;
    const link = document.createElement('a');
    const biasName = photoType === 'member' ? selectedMember.id : 'ot7';
    link.download = `BTS_World_PhotoFrame_${biasName}_${Date.now()}.png`;
    link.href = generatedDataUrl;
    link.click();

    try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>BTS AI PHOTO FRAME & BOOTH</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-pink-300">
          Photo with BTS
        </h1>
        <p className="text-purple-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          Choose a BTS member or OT7 group pose, upload your photo or take a selfie, and create a realistic framed memory to download!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT CONFIGURATION CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          {/* STEP 1: CHOOSE PHOTO TYPE (MEMBERS OR GROUP) */}
          <div className="p-4 rounded-2xl bg-[#140524]/90 border border-purple-500/30 space-y-3 shadow-xl">
            <div className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-pink-400" />
              <span>1. CHOOSE BTS OPTION</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPhotoType('member')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 border transition-all ${
                  photoType === 'member'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-lg'
                    : 'bg-purple-950/60 text-purple-300 border-purple-500/20 hover:bg-purple-900/50'
                }`}
              >
                <User className="w-3.5 h-3.5" /> BTS MEMBERS
              </button>

              <button
                onClick={() => setPhotoType('group')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 border transition-all ${
                  photoType === 'group'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-lg'
                    : 'bg-purple-950/60 text-purple-300 border-purple-500/20 hover:bg-purple-900/50'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> GROUP (OT7)
              </button>
            </div>

            {/* Selection Grid for Members or Group */}
            {photoType === 'member' ? (
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-1">
                {BTS_MEMBERS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMember(m)}
                    className={`p-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      selectedMember.id === m.id
                        ? 'bg-purple-800 border-pink-400 shadow-md ring-2 ring-pink-400/50 scale-105'
                        : 'bg-purple-950/40 border-purple-500/20 hover:bg-purple-900/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={m.image} alt={m.name} className="w-9 h-9 rounded-lg object-cover object-[50%_15%]" />
                    <span className="text-[9px] font-bold text-purple-200 truncate w-full text-center">{m.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {BTS_GROUP_POSES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGroup(g)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      selectedGroup.id === g.id
                        ? 'bg-purple-800 border-pink-400 shadow-md ring-2 ring-pink-400/50'
                        : 'bg-purple-950/40 border-purple-500/20 hover:bg-purple-900/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={g.image} alt={g.name} className="w-12 h-9 rounded-lg object-cover" />
                    <div className="truncate">
                      <div className="text-[10px] font-bold text-purple-100 truncate">{g.name}</div>
                      <div className="text-[8px] text-purple-300 truncate">{g.caption}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STEP 2: CHOOSE / UPLOAD YOUR PHOTO */}
          <div className="p-4 rounded-2xl bg-[#140524]/90 border border-purple-500/30 space-y-3 shadow-xl">
            <div className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-pink-400" />
              <span>2. CHOOSE YOUR PHOTO</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-3 rounded-xl bg-purple-900/70 border border-purple-400/40 text-purple-100 text-xs font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-purple-800 transition-all shadow-md"
              >
                <Upload className="w-3.5 h-3.5 text-pink-400" />
                <span>UPLOAD PHOTO</span>
              </button>

              <button
                onClick={startCamera}
                className="py-3 px-3 rounded-xl bg-purple-900/70 border border-purple-400/40 text-purple-100 text-xs font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-purple-800 transition-all shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-pink-400" />
                <span>TAKE SELFIE</span>
              </button>
            </div>

            {userPhotoName && (
              <div className="text-[11px] text-emerald-300 font-bold bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/40 flex items-center justify-between">
                <span className="truncate">✓ {userPhotoName}</span>
                <button onClick={() => { setUserPhoto(null); setUserPhotoName(''); }} className="text-rose-400 text-xs font-bold ml-2">REMOVE</button>
              </div>
            )}

            {/* Photo Adjustments (Zoom & Position) */}
            {userPhoto && (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/20 space-y-2">
                <div className="text-[10px] font-black uppercase text-purple-300 flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-pink-400" /> ADJUST YOUR PHOTO POSITION
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-purple-300 text-[10px]">
                    <span>ZOOM</span>
                    <span>{zoom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.5"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-pink-500 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                  />

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <div className="text-[10px] text-purple-300">MOVE HORIZONTAL</div>
                      <input
                        type="range"
                        min="-200"
                        max="200"
                        value={posX}
                        onChange={(e) => setPosX(parseInt(e.target.value))}
                        className="w-full accent-pink-500 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] text-purple-300">MOVE VERTICAL</div>
                      <input
                        type="range"
                        min="-200"
                        max="200"
                        value={posY}
                        onChange={(e) => setPosY(parseInt(e.target.value))}
                        className="w-full accent-pink-500 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: CHOOSE FRAME STYLE */}
          <div className="p-4 rounded-2xl bg-[#140524]/90 border border-purple-500/30 space-y-3 shadow-xl">
            <div className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>3. CHOOSE FRAME STYLE</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FRAME_STYLES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFrame(f)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedFrame.id === f.id
                      ? 'bg-purple-800 border-pink-400 shadow-md ring-2 ring-pink-400/50'
                      : 'bg-purple-950/40 border-purple-500/20 hover:bg-purple-900/50'
                  }`}
                >
                  <div className="text-xs font-bold text-purple-100">{f.name}</div>
                  <div className="text-[9px] text-purple-300 line-clamp-1">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* DOWNLOAD ACTION BUTTON */}
          <button
            onClick={handleDownload}
            disabled={!generatedDataUrl}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-purple-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>DOWNLOAD PHOTO FRAME (HD PNG)</span>
          </button>
        </div>

        {/* RIGHT LIVE PREVIEW CANVAS */}
        <div className="lg:col-span-7 space-y-3">
          <div className="rounded-3xl bg-[#140524]/95 border border-purple-500/40 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
              <div className="text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-pink-400" />
                <span>LIVE PHOTO BOOTH PREVIEW</span>
              </div>
              <span className="text-[10px] text-purple-400 font-bold uppercase">{selectedFrame.name}</span>
            </div>

            {/* Responsive Canvas Container */}
            <div className="flex justify-center items-center bg-[#0b0314] p-2 sm:p-4 rounded-2xl border border-purple-500/30 overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-h-[65vh] w-auto max-w-full rounded-xl shadow-2xl object-contain border border-purple-500/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CAMERA MODAL */}
      {cameraActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-3xl bg-[#140524] border border-purple-500/50 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <span className="font-bold text-sm text-purple-100 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-pink-400" /> TAKE SELFIE WITH BTS
              </span>
              <button onClick={stopCamera} className="text-purple-400 hover:text-white text-xs font-bold">CLOSE</button>
            </div>

            {cameraError ? (
              <div className="p-3 bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs rounded-xl">
                {cameraError}
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden aspect-square bg-black border border-purple-500/40 relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={captureCameraPhoto}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                📸 CAPTURE PHOTO
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-3 rounded-xl bg-purple-900/60 text-purple-200 font-bold text-xs uppercase"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoFrameView;
