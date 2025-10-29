import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TreePine, Sparkles } from 'lucide-react';

export const LegacyTree = () => {
  const { pastLives, lifeNumber } = useGame();
  
  return (
    <Card className="p-6 bg-card/80 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <TreePine className="w-5 h-5 text-influence" />
        <h2 className="text-xl font-bold">Legacy Tree</h2>
      </div>
      
      {pastLives.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Your legacy begins now.</p>
          <p className="text-sm mt-2">Past lives will appear here after reincarnation.</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {pastLives.map((life, index) => (
              <Card
                key={life.id}
                className="p-4 bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">Life {lifeNumber - pastLives.length + index}</h3>
                    <p className="text-sm text-muted-foreground">{life.profession}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Age {life.age}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-wealth">Wealth</div>
                    <div className="font-semibold">{Math.floor(life.totalWealth)}</div>
                  </div>
                  <div>
                    <div className="text-knowledge">Knowledge</div>
                    <div className="font-semibold">{Math.floor(life.totalKnowledge)}</div>
                  </div>
                  <div>
                    <div className="text-influence">Influence</div>
                    <div className="font-semibold">{Math.floor(life.totalInfluence)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-memory">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {life.fragmentsEarned.map(f => `${f.amount} ${f.type}`).join(', ')}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};
