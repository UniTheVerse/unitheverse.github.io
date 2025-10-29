import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Globe } from 'lucide-react';

const AGE_NAMES = ['', 'Rural Dawn', 'Guild Era', 'Industrial Awakening'];

export const LifeProgress = () => {
  const { age, worldAge, agePoints, lifeNumber } = useGame();
  
  const lifeStage = age < 16 ? 'Youth' : age < 60 ? 'Adult' : 'Elder';
  const lifeProgress = ((age - 16) / (85 - 16)) * 100;
  
  const nextAgeThreshold = worldAge === 1 ? 100 : worldAge === 2 ? 500 : 999999;
  const ageProgress = (agePoints / nextAgeThreshold) * 100;
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4 bg-card/80 backdrop-blur">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Life {lifeNumber}</span>
            </div>
            <span className="text-sm text-muted-foreground">{lifeStage}</span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Age: {Math.floor(age)}</span>
              <span>85</span>
            </div>
            <Progress value={lifeProgress} className="h-2" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-card/80 backdrop-blur">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-secondary" />
              <span className="font-semibold">{AGE_NAMES[worldAge]}</span>
            </div>
            <span className="text-sm text-muted-foreground">{agePoints} AP</span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>World Progress</span>
              {worldAge < 3 && <span>Next: {nextAgeThreshold} AP</span>}
            </div>
            <Progress value={Math.min(ageProgress, 100)} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};
