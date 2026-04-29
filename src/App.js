import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, Star } from 'lucide-react';

const BirdIDApp = () => {
  // Mo's 28 life list birds
  const moLifeList = [
    'Lesser Goldfinch', 'House Finch', 'House Sparrow', 'Swinehoe\'s White-eye',
    'Black Phoebe', 'Western Bluebird', 'American Crow', 'Cliff Swallow',
    'Bushtit', 'Hooded Oriole', 'Allen\'s Hummingbird', 'American Goldfinch',
    'Barn Swallow', 'American Robin', 'Red-winged Blackbird', 'Orange-crowned Warbler',
    'Lawrence\'s Goldfinch', 'Spotted Towhee', 'Dark-eyed Junco', 'Great-tailed Grackle',
    'Mallard', 'Townsend\'s Warbler', 'Anna\'s Hummingbird', 'Bewick\'s Wren',
    'Wrentit', 'Cedar Waxwing', 'California Towhee', 'Song Sparrow'
  ];

  // Expanded West Coast bird list (85 species)
  const allBirds = [
    // Finches
    { name: 'Lesser Goldfinch', family: 'Finch', region: 'Widespread', difficulty: 'easy' },
    { name: 'American Goldfinch', family: 'Finch', region: 'Widespread', difficulty: 'easy' },
    { name: 'Lawrence\'s Goldfinch', family: 'Finch', region: 'Southern CA', difficulty: 'medium' },
    { name: 'House Finch', family: 'Finch', region: 'Widespread', difficulty: 'easy' },
    { name: 'Purple Finch', family: 'Finch', region: 'Winter', difficulty: 'medium' },
    { name: 'Pine Siskin', family: 'Finch', region: 'Winter', difficulty: 'medium' },
    
    // Sparrows
    { name: 'House Sparrow', family: 'Sparrow', region: 'Widespread', difficulty: 'easy' },
    { name: 'Song Sparrow', family: 'Sparrow', region: 'Widespread', difficulty: 'medium' },
    { name: 'White-crowned Sparrow', family: 'Sparrow', region: 'Winter', difficulty: 'medium' },
    { name: 'Golden-crowned Sparrow', family: 'Sparrow', region: 'Winter', difficulty: 'medium' },
    { name: 'California Towhee', family: 'Towhee', region: 'Widespread', difficulty: 'easy' },
    { name: 'Spotted Towhee', family: 'Towhee', region: 'Foothill', difficulty: 'medium' },
    { name: 'Chipping Sparrow', family: 'Sparrow', region: 'Spring/Summer', difficulty: 'medium' },
    
    // Thrushes & Robins
    { name: 'American Robin', family: 'Thrush', region: 'Widespread', difficulty: 'easy' },
    { name: 'Western Bluebird', family: 'Thrush', region: 'Foothills', difficulty: 'easy' },
    { name: 'Hermit Thrush', family: 'Thrush', region: 'Winter', difficulty: 'hard' },
    { name: 'Swainson\'s Thrush', family: 'Thrush', region: 'Migration', difficulty: 'hard' },
    { name: 'Varied Thrush', family: 'Thrush', region: 'Rare/Winter', difficulty: 'hard' },
    
    // Flycatchers
    { name: 'Black Phoebe', family: 'Flycatcher', region: 'Widespread', difficulty: 'easy' },
    { name: 'Say\'s Phoebe', family: 'Flycatcher', region: 'Open/Winter', difficulty: 'medium' },
    { name: 'Pacific-slope Flycatcher', family: 'Flycatcher', region: 'Canyons/Spring', difficulty: 'hard' },
    { name: 'Ash-throated Flycatcher', family: 'Flycatcher', region: 'Spring/Summer', difficulty: 'medium' },
    { name: 'Western Wood-Pewee', family: 'Flycatcher', region: 'Oak woodland', difficulty: 'hard' },
    
    // Hummingbirds
    { name: 'Anna\'s Hummingbird', family: 'Hummingbird', region: 'Widespread', difficulty: 'easy' },
    { name: 'Allen\'s Hummingbird', family: 'Hummingbird', region: 'Widespread', difficulty: 'easy' },
    { name: 'Costa\'s Hummingbird', family: 'Hummingbird', region: 'Desert/Spring', difficulty: 'medium' },
    { name: 'Calliope Hummingbird', family: 'Hummingbird', region: 'Mountains/Migration', difficulty: 'hard' },
    
    // Corvids
    { name: 'American Crow', family: 'Corvid', region: 'Widespread', difficulty: 'easy' },
    { name: 'California Scrub-Jay', family: 'Corvid', region: 'Widespread', difficulty: 'easy' },
    { name: 'Steller\'s Jay', family: 'Corvid', region: 'Oak forest', difficulty: 'easy' },
    { name: 'Common Raven', family: 'Corvid', region: 'Foothills', difficulty: 'medium' },
    
    // Wrens
    { name: 'Bewick\'s Wren', family: 'Wren', region: 'Widespread', difficulty: 'medium' },
    { name: 'House Wren', family: 'Wren', region: 'Spring/Summer', difficulty: 'medium' },
    { name: 'Wrentit', family: 'Wrentit', region: 'Chaparral', difficulty: 'medium' },
    { name: 'Marsh Wren', family: 'Wren', region: 'Wetlands', difficulty: 'hard' },
    { name: 'Winter Wren', family: 'Wren', region: 'Rare/Winter', difficulty: 'hard' },
    
    // Warblers
    { name: 'Orange-crowned Warbler', family: 'Warbler', region: 'Widespread', difficulty: 'hard' },
    { name: 'Townsend\'s Warbler', family: 'Warbler', region: 'Winter/Oak', difficulty: 'hard' },
    { name: 'Yellow Warbler', family: 'Warbler', region: 'Spring/Summer', difficulty: 'medium' },
    { name: 'Common Yellowthroat', family: 'Warbler', region: 'Wetlands', difficulty: 'medium' },
    { name: 'Wilson\'s Warbler', family: 'Warbler', region: 'Migration', difficulty: 'hard' },
    { name: 'Black-throated Gray Warbler', family: 'Warbler', region: 'Oak woodland', difficulty: 'hard' },
    { name: 'Hermit Warbler', family: 'Warbler', region: 'Rare/Migration', difficulty: 'hard' },
    
    // Blackbirds & Orioles
    { name: 'Red-winged Blackbird', family: 'Blackbird', region: 'Wetlands', difficulty: 'easy' },
    { name: 'Tricolored Blackbird', family: 'Blackbird', region: 'Marshes', difficulty: 'medium' },
    { name: 'Great-tailed Grackle', family: 'Grackle', region: 'Urban/Open', difficulty: 'easy' },
    { name: 'Hooded Oriole', family: 'Oriole', region: 'Urban/Spring-Summer', difficulty: 'medium' },
    { name: 'Bullock\'s Oriole', family: 'Oriole', region: 'Oak/Spring-Summer', difficulty: 'hard' },
    
    // Swallows
    { name: 'Barn Swallow', family: 'Swallow', region: 'Spring/Summer', difficulty: 'medium' },
    { name: 'Cliff Swallow', family: 'Swallow', region: 'Spring/Summer', difficulty: 'medium' },
    { name: 'Violet-green Swallow', family: 'Swallow', region: 'Canyons/Spring', difficulty: 'hard' },
    { name: 'Northern Rough-winged Swallow', family: 'Swallow', region: 'Spring/Summer', difficulty: 'hard' },
    { name: 'Tree Swallow', family: 'Swallow', region: 'Migration', difficulty: 'medium' },
    
    // Other small birds
    { name: 'Bushtit', family: 'Bushtit', region: 'Widespread', difficulty: 'easy' },
    { name: 'Swinehoe\'s White-eye', family: 'White-eye', region: 'Urban', difficulty: 'easy' },
    { name: 'Cedar Waxwing', family: 'Waxwing', region: 'Winter/Nomadic', difficulty: 'easy' },
    { name: 'Phainopepla', family: 'Silky-flycatcher', region: 'Desert/Spring', difficulty: 'medium' },
    { name: 'Great Blue Heron', family: 'Heron', region: 'Wetlands', difficulty: 'easy' },
    { name: 'Great Egret', family: 'Egret', region: 'Wetlands', difficulty: 'easy' },
    { name: 'Snowy Egret', family: 'Egret', region: 'Wetlands', difficulty: 'medium' },
    
    // Waterfowl
    { name: 'Mallard', family: 'Duck', region: 'Wetlands', difficulty: 'easy' },
    { name: 'Cinnamon Teal', family: 'Duck', region: 'Wetlands', difficulty: 'medium' },
    { name: 'Northern Pintail', family: 'Duck', region: 'Winter/Wetlands', difficulty: 'medium' },
    { name: 'Wood Duck', family: 'Duck', region: 'Wooded wetlands', difficulty: 'easy' },
    
    // Raptors
    { name: 'Red-tailed Hawk', family: 'Hawk', region: 'Widespread', difficulty: 'easy' },
    { name: 'Red-shouldered Hawk', family: 'Hawk', region: 'Woodlands', difficulty: 'medium' },
    { name: 'Cooper\'s Hawk', family: 'Hawk', region: 'Widespread', difficulty: 'hard' },
    { name: 'Sharp-shinned Hawk', family: 'Hawk', region: 'Winter/Migration', difficulty: 'hard' },
    { name: 'Turkey Vulture', family: 'Vulture', region: 'Widespread', difficulty: 'easy' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [accuracy, setAccuracy] = useState({});
  const [confident, setConfident] = useState(new Set());
  const [sortBy, setSortBy] = useState('random');
  const [filterFamily, setFilterFamily] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [lifeListOnly, setLifeListOnly] = useState(false);
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [birds, setBirds] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioError, setAudioError] = useState(false);

  const families = ['all', ...new Set(allBirds.map(b => b.family))].sort();
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  // Filter and sort birds
  useEffect(() => {
    let filtered = allBirds.filter(b => {
      const isOnLifeList = moLifeList.includes(b.name);
      if (lifeListOnly && !isOnLifeList) return false;
      if (filterFamily !== 'all' && b.family !== filterFamily) return false;
      if (filterDifficulty !== 'all' && b.difficulty !== filterDifficulty) return false;
      
      if (confidenceFilter === 'confident') {
        return confident.has(b.name);
      } else if (confidenceFilter === 'not-confident') {
        return !confident.has(b.name);
      }
      return true;
    });

    let sorted = [...filtered];
    if (sortBy === 'random') {
      sorted.sort(() => Math.random() - 0.5);
    } else if (sortBy === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'family') {
      sorted.sort((a, b) => a.family.localeCompare(b.family) || a.name.localeCompare(b.name));
    } else if (sortBy === 'difficulty') {
      const diffOrder = { easy: 0, medium: 1, hard: 2 };
      sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty] || a.name.localeCompare(b.name));
    }

    setBirds(sorted);
    setCurrentIndex(0);
    setRevealed(false);
  }, [sortBy, filterFamily, filterDifficulty, lifeListOnly, confidenceFilter, confident]);

  const currentBird = birds[currentIndex];
  const isOnLifeList = currentBird && moLifeList.includes(currentBird.name);
  const isConfident = currentBird && confident.has(currentBird.name);

  const playAudio = async () => {
    if (!currentBird || isPlaying) return;
    setIsPlaying(true);
    setAudioError(false);
    
    try {
      // Query xeno-canto API for recordings of this bird
      const response = await fetch(
        `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(currentBird.name)}&limit=1`
      );
      const data = await response.json();
      
      if (data.recordings && data.recordings.length > 0) {
        const recording = data.recordings[0];
        const audioUrl = recording.file;
        
        // Play the audio
        const audio = new Audio(audioUrl);
        audio.play().catch(() => {
          setAudioError(true);
        });
        
        // Wait for audio to finish or timeout
        await new Promise(resolve => {
          audio.onended = resolve;
          setTimeout(resolve, 30000); // 30 second timeout
        });
      } else {
        setAudioError(true);
      }
    } catch (error) {
      setAudioError(true);
      console.error('Error fetching audio:', error);
    }
    
    setIsPlaying(false);
  };

  const markCorrect = () => {
    if (!currentBird) return;
    setAccuracy(prev => ({
      ...prev,
      [currentBird.name]: (prev[currentBird.name] || 0) + 1
    }));
    nextBird();
  };

  const markIncorrect = () => {
    nextBird();
  };

  const toggleConfident = () => {
    if (!currentBird) return;
    const newConfident = new Set(confident);
    if (newConfident.has(currentBird.name)) {
      newConfident.delete(currentBird.name);
    } else {
      newConfident.add(currentBird.name);
    }
    setConfident(newConfident);
  };

  const nextBird = () => {
    if (currentIndex < birds.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    }
  };

  const prevBird = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRevealed(false);
    }
  };

  if (birds.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50">
        <div className="text-center">
          <p className="text-lg text-stone-600 mb-4">No birds match your filters</p>
          <button
            onClick={() => {
              setLifeListOnly(false);
              setFilterFamily('all');
              setFilterDifficulty('all');
              setConfidenceFilter('all');
            }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  const correctCount = currentBird ? (accuracy[currentBird.name] || 0) : 0;
  const totalCorrect = Object.values(accuracy).reduce((a, b) => a + b, 0);
  const confidentCount = confident.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-blue-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Lora:wght@500;600;700&display=swap');
        
        body {
          font-family: 'Lora', serif;
        }
        
        .card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .audio-btn:active {
          transform: scale(0.95);
        }
        
        .accuracy-pulse {
          animation: pulse 0.5s ease-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-baseline justify-between mb-3">
            <h1 className="text-3xl font-bold text-emerald-900">Bird ID</h1>
            <div className="text-sm text-stone-600">
              {currentIndex + 1} of {birds.length}
            </div>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-300"
              style={{ width: `${birds.length > 0 ? ((currentIndex + 1) / birds.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-2 mb-8 lg:grid-cols-6">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">Sort</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-emerald-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="random">Random</option>
              <option value="alphabetical">A-Z</option>
              <option value="family">Family</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">Family</label>
            <select 
              value={filterFamily} 
              onChange={(e) => setFilterFamily(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-emerald-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {families.map(f => (
                <option key={f} value={f}>
                  {f === 'all' ? 'All' : f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">Difficulty</label>
            <select 
              value={filterDifficulty} 
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-emerald-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">Confidence</label>
            <select 
              value={confidenceFilter} 
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-emerald-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="all">All</option>
              <option value="confident">Confident ⭐</option>
              <option value="not-confident">Learning</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">Scope</label>
            <button
              onClick={() => setLifeListOnly(!lifeListOnly)}
              className={`w-full px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                lifeListOnly 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-white border border-emerald-200 text-stone-900 hover:bg-stone-50'
              }`}
            >
              {lifeListOnly ? '✓ Life List' : 'Full List'}
            </button>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-2.5 border border-emerald-200">
            <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Stats</p>
            <p className="text-lg font-bold text-emerald-600 mt-1">{totalCorrect}</p>
            <p className="text-xs text-emerald-700">correct</p>
          </div>
        </div>

        {/* Card */}
        <div className="mb-8">
          <div className="card bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-emerald-100">
            {/* Life List Badge */}
            {isOnLifeList && (
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-amber-300 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  ⭐ On Your Life List
                </div>
              </div>
            )}

            {/* Audio Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className="group relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-all" />
                <div className="relative flex flex-col items-center justify-center h-full">
                  <Volume2 size={48} className="mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {isPlaying ? 'Loading...' : audioError ? 'Try Again' : 'Play Call'}
                  </span>
                </div>
              </button>
            </div>
            {audioError && (
              <p className="text-center text-sm text-red-600 mb-4">
                Couldn't load audio. Check your internet connection.
              </p>
            )}

            {/* Answer Section */}
            <div className="text-center mb-8">
              {!revealed ? (
                <div className="space-y-4">
                  <div className="text-stone-600 space-y-2">
                    <p className="text-sm">Difficulty: <span className="font-semibold text-emerald-700">{currentBird?.difficulty}</span></p>
                    <p className="italic">Can you identify this bird?</p>
                  </div>
                  <button
                    onClick={() => setRevealed(true)}
                    className="inline-block px-6 py-2 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-900 transition-colors"
                  >
                    Reveal Answer
                  </button>
                </div>
              ) : (
                <div className="space-y-4 accuracy-pulse">
                  <h2 className="text-4xl lg:text-5xl font-bold text-emerald-700 font-serif">
                    {currentBird.name}
                  </h2>
                  <div className="flex justify-center gap-8 text-sm text-stone-600">
                    <div>
                      <span className="font-semibold text-emerald-700">{currentBird.family}</span>
                      <p>Family</p>
                    </div>
                    <div className="border-l border-stone-300" />
                    <div>
                      <span className="font-semibold text-emerald-700">{currentBird.difficulty}</span>
                      <p>Difficulty</p>
                    </div>
                    <div className="border-l border-stone-300" />
                    <div>
                      <span className="font-semibold text-emerald-700">{correctCount}x</span>
                      <p>Times Correct</p>
                    </div>
                  </div>

                  {/* Feedback Buttons */}
                  <div className="flex gap-3 justify-center pt-6 flex-wrap">
                    <button
                      onClick={markCorrect}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      ✓ Got it
                    </button>
                    <button
                      onClick={markIncorrect}
                      className="px-6 py-3 bg-stone-300 text-stone-800 rounded-lg font-semibold hover:bg-stone-400 transition-colors"
                    >
                      ✗ Again
                    </button>
                    <button
                      onClick={toggleConfident}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                        isConfident
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      <Star size={18} fill={isConfident ? 'currentColor' : 'none'} />
                      {isConfident ? 'Confident' : 'Flag Confident'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={prevBird}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-white border border-stone-300 text-stone-900 rounded-lg font-semibold hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              const randomIdx = Math.floor(Math.random() * birds.length);
              setCurrentIndex(randomIdx);
              setRevealed(false);
            }}
            className="px-6 py-3 bg-white border border-stone-300 text-stone-900 rounded-lg font-semibold hover:bg-stone-50 transition-colors"
          >
            <RotateCw size={20} className="inline mr-2" />
            Jump
          </button>
          <button
            onClick={nextBird}
            disabled={currentIndex === birds.length - 1}
            className="px-6 py-3 bg-white border border-stone-300 text-stone-900 rounded-lg font-semibold hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <p className="text-sm text-stone-600 font-semibold uppercase tracking-wider">Confident Birds</p>
            <p className="text-3xl font-bold text-emerald-700 mt-1">{confidentCount}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-stone-600 font-semibold uppercase tracking-wider">In Study</p>
            <p className="text-3xl font-bold text-blue-700 mt-1">{birds.length}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
            <p className="text-sm text-stone-600 font-semibold uppercase tracking-wider">Life List</p>
            <p className="text-3xl font-bold text-amber-700 mt-1">{moLifeList.length}</p>
          </div>
        </div>

        {/* Accuracy Tracker */}
        <details className="mb-8">
          <summary className="cursor-pointer font-semibold text-stone-900 text-lg hover:text-emerald-700 transition-colors mb-4">
            📊 Your Accuracy Tracker
          </summary>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {birds.map(bird => (
              <div key={bird.name} className={`rounded-lg p-4 border transition-all ${
                isOnLifeList && moLifeList.includes(bird.name)
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
                  : 'bg-white border-stone-200'
              } ${confident.has(bird.name) ? 'ring-2 ring-emerald-400' : ''} hover:shadow-md`}>
                <p className="text-sm font-semibold text-stone-900 truncate">{bird.name}</p>
                <p className="text-lg font-bold text-emerald-600 mt-1">
                  {accuracy[bird.name] || 0}
                </p>
                <p className="text-xs text-stone-500 mt-1">{bird.family}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default BirdIDApp;
