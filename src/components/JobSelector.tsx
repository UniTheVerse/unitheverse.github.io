import { useGame, JOBS } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Lock, CheckCircle } from 'lucide-react';

export const JobSelector = () => {
  const { currentJob, setJob, wealth, knowledge, worldAge } = useGame();
  
  const availableJobs = JOBS.filter(job => job.age <= worldAge);
  
  return (
    <Card className="p-6 bg-card/80 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Occupations</h2>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {availableJobs.map((job) => {
            const canAfford = wealth >= job.cost;
            const hasKnowledge = knowledge >= job.requiredKnowledge;
            const isUnlocked = canAfford && hasKnowledge;
            const isCurrent = currentJob?.id === job.id;
            
            return (
              <Card
                key={job.id}
                className={`p-4 transition-all ${
                  isCurrent
                    ? 'bg-primary/10 border-primary'
                    : isUnlocked
                    ? 'hover:bg-muted/50 cursor-pointer'
                    : 'opacity-50'
                }`}
                onClick={() => isUnlocked && !isCurrent && setJob(job)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {job.name}
                      {isCurrent && <CheckCircle className="w-4 h-4 text-primary" />}
                      {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                      <Badge variant="outline" className="ml-2">Lv {job.level}</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3 text-sm">
                  {job.wealthPerSecond > 0 && (
                    <span className="text-wealth">+{job.wealthPerSecond.toFixed(1)}/s wealth</span>
                  )}
                  {job.knowledgePerSecond > 0 && (
                    <span className="text-knowledge">+{job.knowledgePerSecond.toFixed(1)}/s knowledge</span>
                  )}
                  {job.influencePerSecond > 0 && (
                    <span className="text-influence">+{job.influencePerSecond.toFixed(1)}/s influence</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className={canAfford ? 'text-foreground' : 'text-destructive'}>
                    Cost: {job.cost}
                  </span>
                  <span className={hasKnowledge ? 'text-foreground' : 'text-destructive'}>
                    Requires: {job.requiredKnowledge} knowledge
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      
      {currentJob && (
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => setJob(null)}
        >
          Quit Job
        </Button>
      )}
    </Card>
  );
};
