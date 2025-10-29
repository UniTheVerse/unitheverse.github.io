import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export const StudyPanel = () => {
  const { wealth, study } = useGame();
  
  const canStudy = wealth >= 10;
  
  return (
    <Card className="p-6 bg-card/80 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-5 h-5 text-knowledge" />
        <h2 className="text-xl font-bold">Study</h2>
      </div>
      
      <p className="text-muted-foreground mb-4">
        Invest time and wealth to gain knowledge. Knowledge unlocks better occupations and increases your influence.
      </p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Cost</span>
          <span className="text-wealth">10 wealth</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Gain</span>
          <span className="text-knowledge">+5 knowledge</span>
        </div>
      </div>
      
      <Button
        className="w-full mt-4"
        onClick={study}
        disabled={!canStudy}
      >
        {canStudy ? 'Study' : 'Not enough wealth'}
      </Button>
    </Card>
  );
};
