import { GameProvider } from '@/contexts/GameContext';
import { ResourceDisplay } from '@/components/ResourceDisplay';
import { LifeProgress } from '@/components/LifeProgress';
import { JobSelector } from '@/components/JobSelector';
import { StudyPanel } from '@/components/StudyPanel';
import { ReincarnationModal } from '@/components/ReincarnationModal';
import { LegacyTree } from '@/components/LegacyTree';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Infinity } from 'lucide-react';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-card/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Infinity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Legacy Loop</h1>
                <p className="text-sm text-muted-foreground">An Eternal Journey Through Ages</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-6 space-y-6">
          <ResourceDisplay />
          <LifeProgress />
          
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Occupations</TabsTrigger>
              <TabsTrigger value="study">Study</TabsTrigger>
              <TabsTrigger value="legacy">Legacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="mt-6">
              <JobSelector />
            </TabsContent>
            
            <TabsContent value="study" className="mt-6">
              <StudyPanel />
            </TabsContent>
            
            <TabsContent value="legacy" className="mt-6">
              <LegacyTree />
            </TabsContent>
          </Tabs>
        </main>
        
        <ReincarnationModal />
      </div>
    </GameProvider>
  );
};

export default Index;
