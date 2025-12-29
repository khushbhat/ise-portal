import { useState, useEffect } from "react";
import { Trophy, Award, Star, Medal, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { achievementsAPI } from "@/services/api";

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await achievementsAPI.getAll();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // Filter achievements by category
  const academicAchievements = achievements.filter(a => a.category.toLowerCase() === 'academic');
  const competitionAchievements = achievements.filter(a => a.category.toLowerCase() === 'competition');
  const placementAchievements = achievements.filter(a => a.category.toLowerCase() === 'placement');
  const internshipAchievements = achievements.filter(a => a.category.toLowerCase() === 'internship');

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic': return Medal;
      case 'competition': return Trophy;
      case 'placement': return Briefcase;
      case 'internship': return GraduationCap;
      default: return Award;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">Student Achievements</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Celebrating excellence, innovation, and success of our talented students
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading achievements...</p>
        </div>
      ) : (
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
          </TabsList>

          {/* Academic Achievements */}
          <TabsContent value="academic" className="space-y-6">
            {academicAchievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {academicAchievements.map((achievement) => {
                  const Icon = getIcon(achievement.category);
                  return (
                    <Card key={achievement.id} className="glass-card hover-lift">
                      <CardHeader>
                        <Icon className="h-12 w-12 text-secondary mb-4" />
                        <CardTitle className="text-xl mb-2">{achievement.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No academic achievements uploaded yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Competition Achievements */}
          <TabsContent value="competitions" className="space-y-6">
            {competitionAchievements.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {competitionAchievements.map((achievement) => {
                  const Icon = getIcon(achievement.category);
                  return (
                    <Card key={achievement.id} className="glass-card hover-lift">
                      <CardHeader>
                        <Icon className="h-12 w-12 text-secondary mb-4" />
                        <CardTitle className="text-xl mb-2">{achievement.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No competition achievements uploaded yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Placement Achievements */}
          <TabsContent value="placements" className="space-y-6">
            {placementAchievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placementAchievements.map((achievement) => {
                  const Icon = getIcon(achievement.category);
                  return (
                    <Card key={achievement.id} className="glass-card hover-lift">
                      <CardHeader>
                        <Icon className="h-10 w-10 text-secondary mb-3" />
                        <CardTitle className="text-xl mb-2">{achievement.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No placement achievements uploaded yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Internship Achievements */}
          <TabsContent value="internships" className="space-y-6">
            {internshipAchievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internshipAchievements.map((achievement) => {
                  const Icon = getIcon(achievement.category);
                  return (
                    <Card key={achievement.id} className="glass-card hover-lift">
                      <CardHeader>
                        <Icon className="h-10 w-10 text-secondary mb-3" />
                        <CardTitle className="text-lg mb-2">{achievement.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No internship achievements uploaded yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Achievements;
