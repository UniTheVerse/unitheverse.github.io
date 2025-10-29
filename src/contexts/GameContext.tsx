import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Types
export interface Job {
  id: string;
  name: string;
  age: number;
  requiredKnowledge: number;
  cost: number;
  wealthPerSecond: number;
  knowledgePerSecond: number;
  influencePerSecond: number;
  level: number;
  description: string;
}

export interface MemoryFragment {
  type: 'rational' | 'material' | 'heroic' | 'empathic' | 'philosophical';
  amount: number;
}

export interface PastLife {
  id: string;
  profession: string;
  age: number;
  totalWealth: number;
  totalKnowledge: number;
  totalInfluence: number;
  fragmentsEarned: MemoryFragment[];
  timestamp: number;
}

interface GameState {
  // Resources
  wealth: number;
  knowledge: number;
  influence: number;
  memoryFragments: MemoryFragment[];
  
  // Progress
  age: number; // Player's current age in life
  worldAge: number; // 1 = Rural, 2 = Guild, 3 = Industrial
  agePoints: number;
  
  // Current state
  currentJob: Job | null;
  lifeNumber: number;
  pastLives: PastLife[];
  
  // Stats
  lifetimeWealth: number;
  lifetimeKnowledge: number;
  lifetimeInfluence: number;
  
  // Game time
  isPlaying: boolean;
  lastUpdate: number;
}

interface GameContextType extends GameState {
  setJob: (job: Job | null) => void;
  study: () => void;
  reincarnate: () => void;
  spendFragments: (type: string, amount: number) => void;
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const JOBS: Job[] = [
  // Age 1 - Rural Dawn
  { id: 'beggar', name: 'Beggar', age: 1, requiredKnowledge: 0, cost: 0, wealthPerSecond: 0.5, knowledgePerSecond: 0, influencePerSecond: 0, level: 1, description: 'Ask for coins on the street' },
  { id: 'farmer', name: 'Farmer', age: 1, requiredKnowledge: 10, cost: 50, wealthPerSecond: 1.5, knowledgePerSecond: 0.2, influencePerSecond: 0.1, level: 1, description: 'Work the land' },
  { id: 'miner', name: 'Miner', age: 1, requiredKnowledge: 25, cost: 150, wealthPerSecond: 3, knowledgePerSecond: 0, influencePerSecond: 0.2, level: 1, description: 'Extract valuable resources' },
  
  // Age 2 - Guild Era
  { id: 'blacksmith', name: 'Blacksmith', age: 2, requiredKnowledge: 100, cost: 500, wealthPerSecond: 5, knowledgePerSecond: 1, influencePerSecond: 0.5, level: 1, description: 'Forge tools and weapons' },
  { id: 'merchant', name: 'Merchant', age: 2, requiredKnowledge: 250, cost: 1500, wealthPerSecond: 8, knowledgePerSecond: 1.5, influencePerSecond: 1, level: 1, description: 'Trade goods across lands' },
  { id: 'scholar', name: 'Scholar', age: 2, requiredKnowledge: 400, cost: 2500, wealthPerSecond: 3, knowledgePerSecond: 4, influencePerSecond: 1.5, level: 1, description: 'Study ancient texts' },
  
  // Age 3 - Industrial Awakening
  { id: 'engineer', name: 'Engineer', age: 3, requiredKnowledge: 800, cost: 5000, wealthPerSecond: 12, knowledgePerSecond: 6, influencePerSecond: 3, level: 1, description: 'Design machines' },
  { id: 'banker', name: 'Banker', age: 3, requiredKnowledge: 1200, cost: 10000, wealthPerSecond: 20, knowledgePerSecond: 3, influencePerSecond: 4, level: 1, description: 'Manage capital flows' },
  { id: 'inventor', name: 'Inventor', age: 3, requiredKnowledge: 2000, cost: 25000, wealthPerSecond: 15, knowledgePerSecond: 10, influencePerSecond: 8, level: 1, description: 'Create new technologies' },
];

const initialState: GameState = {
  wealth: 10,
  knowledge: 0,
  influence: 0,
  memoryFragments: [
    { type: 'rational', amount: 0 },
    { type: 'material', amount: 0 },
    { type: 'heroic', amount: 0 },
    { type: 'empathic', amount: 0 },
    { type: 'philosophical', amount: 0 },
  ],
  age: 16,
  worldAge: 1,
  agePoints: 0,
  currentJob: null,
  lifeNumber: 1,
  pastLives: [],
  lifetimeWealth: 0,
  lifetimeKnowledge: 0,
  lifetimeInfluence: 0,
  isPlaying: true,
  lastUpdate: Date.now(),
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const now = Date.now();
        const deltaSeconds = (now - prev.lastUpdate) / 1000;
        
        let newState = { ...prev, lastUpdate: now };
        
        // Auto-age
        const ageGain = deltaSeconds / 10; // 10 seconds per year
        newState.age = Math.min(prev.age + ageGain, 85);
        
        // Death check
        if (newState.age >= 85 && prev.age < 85) {
          // Trigger death (will be handled by UI)
          newState.isPlaying = false;
        }
        
        // Resource generation from job
        if (prev.currentJob && newState.age < 85) {
          const jobMultiplier = 1 + (prev.currentJob.level - 1) * 0.1;
          const ageMultiplier = prev.age < 60 ? 1 : Math.max(0.3, 1 - (prev.age - 60) * 0.02);
          
          newState.wealth += prev.currentJob.wealthPerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          newState.knowledge += prev.currentJob.knowledgePerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          newState.influence += prev.currentJob.influencePerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          
          newState.lifetimeWealth += prev.currentJob.wealthPerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          newState.lifetimeKnowledge += prev.currentJob.knowledgePerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          newState.lifetimeInfluence += prev.currentJob.influencePerSecond * deltaSeconds * jobMultiplier * ageMultiplier;
          
          // Level up job
          if (Math.random() < 0.01) {
            newState.currentJob = { ...prev.currentJob, level: prev.currentJob.level + 1 };
          }
        }
        
        return newState;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isPlaying]);

  const setJob = useCallback((job: Job | null) => {
    setGameState((prev) => {
      if (job && job.cost > prev.wealth) return prev;
      if (job && job.requiredKnowledge > prev.knowledge) return prev;
      if (job && job.age > prev.worldAge) return prev;
      
      return {
        ...prev,
        currentJob: job,
        wealth: job ? prev.wealth - job.cost : prev.wealth,
      };
    });
  }, []);

  const study = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      knowledge: prev.knowledge + 5,
      wealth: Math.max(0, prev.wealth - 10),
    }));
  }, []);

  const reincarnate = useCallback(() => {
    setGameState((prev) => {
      // Calculate fragments earned
      const totalResources = prev.lifetimeWealth + prev.lifetimeKnowledge + prev.lifetimeInfluence;
      const fragmentGain = Math.floor(Math.log10(Math.max(1, totalResources)));
      
      // Determine fragment type based on dominant resource
      let fragmentType: MemoryFragment['type'] = 'philosophical';
      if (prev.lifetimeWealth > prev.lifetimeKnowledge && prev.lifetimeWealth > prev.lifetimeInfluence) {
        fragmentType = 'material';
      } else if (prev.lifetimeKnowledge > prev.lifetimeInfluence) {
        fragmentType = 'rational';
      } else {
        fragmentType = 'heroic';
      }
      
      const newFragments = [...prev.memoryFragments];
      const fragmentIndex = newFragments.findIndex(f => f.type === fragmentType);
      if (fragmentIndex >= 0) {
        newFragments[fragmentIndex].amount += fragmentGain;
      }
      
      // Calculate age points
      const agePointGain = Math.floor(prev.lifetimeInfluence / 100);
      const newAgePoints = prev.agePoints + agePointGain;
      
      // Determine world age
      let newWorldAge = prev.worldAge;
      if (newAgePoints >= 100 && prev.worldAge < 2) newWorldAge = 2;
      if (newAgePoints >= 500 && prev.worldAge < 3) newWorldAge = 3;
      
      // Record past life
      const pastLife: PastLife = {
        id: `life-${prev.lifeNumber}`,
        profession: prev.currentJob?.name || 'Unemployed',
        age: Math.floor(prev.age),
        totalWealth: prev.lifetimeWealth,
        totalKnowledge: prev.lifetimeKnowledge,
        totalInfluence: prev.lifetimeInfluence,
        fragmentsEarned: [{ type: fragmentType, amount: fragmentGain }],
        timestamp: Date.now(),
      };
      
      return {
        ...initialState,
        worldAge: newWorldAge,
        agePoints: newAgePoints,
        memoryFragments: newFragments,
        lifeNumber: prev.lifeNumber + 1,
        pastLives: [...prev.pastLives, pastLife],
        wealth: 10 + newFragments[1].amount * 2, // Material bonus
        knowledge: newFragments[0].amount * 5, // Rational bonus
        isPlaying: true,
        lastUpdate: Date.now(),
      };
    });
  }, []);

  const spendFragments = useCallback((type: string, amount: number) => {
    setGameState((prev) => {
      const newFragments = [...prev.memoryFragments];
      const fragmentIndex = newFragments.findIndex(f => f.type === type);
      if (fragmentIndex >= 0 && newFragments[fragmentIndex].amount >= amount) {
        newFragments[fragmentIndex].amount -= amount;
        return { ...prev, memoryFragments: newFragments };
      }
      return prev;
    });
  }, []);

  const saveGame = useCallback(() => {
    localStorage.setItem('legacyloop-save', JSON.stringify(gameState));
  }, [gameState]);

  const loadGame = useCallback(() => {
    const saved = localStorage.getItem('legacyloop-save');
    if (saved) {
      setGameState(JSON.parse(saved));
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState({ ...initialState, lastUpdate: Date.now() });
    localStorage.removeItem('legacyloop-save');
  }, []);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(saveGame, 30000);
    return () => clearInterval(interval);
  }, [saveGame]);

  // Load on mount
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        setJob,
        study,
        reincarnate,
        spendFragments,
        saveGame,
        loadGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export { JOBS };
