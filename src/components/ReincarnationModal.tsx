import { useGame } from '@/contexts/GameContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp } from 'lucide-react';

export const ReincarnationModal = () => {
  const { 
    age, 
    isPlaying, 
    reincarnate, 
    currentJob,
    lifetimeWealth,
    lifetimeKnowledge,
    lifetimeInfluence,
  } = useGame();
  
  const isDead = age >= 85;
  const totalResources = lifetimeWealth + lifetimeKnowledge + lifetimeInfluence;
  const estimatedFragments = Math.floor(Math.log10(Math.max(1, totalResources)));
  const estimatedAgePoints = Math.floor(lifetimeInfluence / 100);
  
  return (
    <Dialog open={isDead && !isPlaying}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-memory" />
            End of Life
          </DialogTitle>
          <DialogDescription>
            Your journey in this life has come to an end. Your legacy continues...
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="p-4 bg-muted/50">
            <h3 className="font-semibold mb-2">Life Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Profession:</div>
              <div className="font-semibold">{currentJob?.name || 'Unemployed'}</div>
              <div>Age at Death:</div>
              <div className="font-semibold">{Math.floor(age)} years</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-muted/50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Lifetime Achievements
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-wealth">Total Wealth</span>
                <span className="font-semibold">{Math.floor(lifetimeWealth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-knowledge">Total Knowledge</span>
                <span className="font-semibold">{Math.floor(lifetimeKnowledge)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-influence">Total Influence</span>
                <span className="font-semibold">{Math.floor(lifetimeInfluence)}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-memory/10 border-memory">
            <h3 className="font-semibold mb-2 text-memory flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Reincarnation Rewards
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Memory Fragments</span>
                <span className="font-semibold text-memory">+{estimatedFragments}</span>
              </div>
              <div className="flex justify-between">
                <span>Age Points</span>
                <span className="font-semibold text-secondary">+{estimatedAgePoints}</span>
              </div>
            </div>
          </Card>
          
          <Button
            className="w-full"
            size="lg"
            onClick={reincarnate}
          >
            Begin New Life
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
