import { Coins, BookOpen, Crown, Sparkles } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';

export const ResourceDisplay = () => {
  const { wealth, knowledge, influence, memoryFragments } = useGame();
  
  const totalFragments = memoryFragments.reduce((sum, f) => sum + f.amount, 0);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card className="p-4 bg-card/80 backdrop-blur border-wealth/20">
        <div className="flex items-center gap-3">
          <Coins className="w-8 h-8 text-wealth animate-pulse-glow" />
          <div>
            <p className="text-xs text-muted-foreground">Wealth</p>
            <p className="text-2xl font-bold text-wealth">{Math.floor(wealth)}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-card/80 backdrop-blur border-knowledge/20">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-knowledge animate-pulse-glow" />
          <div>
            <p className="text-xs text-muted-foreground">Knowledge</p>
            <p className="text-2xl font-bold text-knowledge">{Math.floor(knowledge)}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-card/80 backdrop-blur border-influence/20">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8 text-influence animate-pulse-glow" />
          <div>
            <p className="text-xs text-muted-foreground">Influence</p>
            <p className="text-2xl font-bold text-influence">{Math.floor(influence)}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-card/80 backdrop-blur border-memory/20">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-memory animate-pulse-glow" />
          <div>
            <p className="text-xs text-muted-foreground">Memories</p>
            <p className="text-2xl font-bold text-memory">{totalFragments}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
