import { Trophy, Award, Star, Medal, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Achievements = () => {
  const academicAchievements = [
    {
      title: "University Gold Medal",
      student: "Rahul Mehta",
      year: "2024",
      description: "Secured first rank in the university with 9.8 CGPA",
      icon: Medal,
    },
    {
      title: "Best Project Award",
      student: "Team Alpha (Priya, Arjun, Sneha)",
      year: "2024",
      description: "AI-powered healthcare diagnosis system recognized as best final year project",
      icon: Award,
    },
    {
      title: "Research Publication",
      student: "Vikram Nair",
      year: "2024",
      description: "Published paper in IEEE conference on quantum computing",
      icon: Star,
    },
  ];

  const competitionAchievements = [
    {
      title: "Smart India Hackathon 2024 - Winner",
      team: "Team InnoTech",
      description: "Developed smart traffic management system using IoT and AI",
      prize: "₹1,00,000",
      icon: Trophy,
    },
    {
      title: "ACM ICPC Regionals - 2nd Place",
      team: "CodeCrafters (Amit, Kavya, Rohan)",
      description: "Secured 2nd position in Asia Pacific programming competition",
      prize: "Medal & Certificate",
      icon: Medal,
    },
    {
      title: "Google Code Jam - Top 100",
      team: "Aditya Sharma",
      description: "Ranked in top 100 globally in Google's coding competition",
      prize: "Google Swag",
      icon: Star,
    },
  ];

  const placementAchievements = [
    {
      company: "Google",
      students: 5,
      package: "₹45 LPA",
      year: "2024",
    },
    {
      company: "Microsoft",
      students: 8,
      package: "₹42 LPA",
      year: "2024",
    },
    {
      company: "Amazon",
      students: 12,
      package: "₹38 LPA",
      year: "2024",
    },
    {
      company: "Goldman Sachs",
      students: 6,
      package: "₹35 LPA",
      year: "2024",
    },
  ];

  const internshipAchievements = [
    {
      title: "Google Summer of Code",
      student: "Meera Krishnan",
      organization: "Apache Foundation",
      year: "2024",
      description: "Contributed to open-source machine learning project",
    },
    {
      title: "Microsoft Research Intern",
      student: "Karthik Reddy",
      organization: "Microsoft Research India",
      year: "2024",
      description: "Worked on NLP and conversational AI research",
    },
    {
      title: "Amazon ML Scholar",
      student: "Divya Patel",
      organization: "Amazon",
      year: "2023",
      description: "Selected for prestigious ML scholarship program",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">Student Achievements</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Celebrating excellence, innovation, and success of our talented students
        </p>
      </div>

      <Tabs defaultValue="academic" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
        </TabsList>

        {/* Academic Achievements */}
        <TabsContent value="academic" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicAchievements.map((achievement, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <achievement.icon className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-xl mb-2">{achievement.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{achievement.student}</p>
                    <p>Year: {achievement.year}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competition Achievements */}
        <TabsContent value="competitions" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {competitionAchievements.map((achievement, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <achievement.icon className="h-12 w-12 text-secondary" />
                    <span className="text-sm font-medium bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                      {achievement.prize}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2">{achievement.title}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">{achievement.team}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Placement Achievements */}
        <TabsContent value="placements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementAchievements.map((placement, index) => (
              <Card key={index} className="glass-card hover-lift text-center">
                <CardHeader>
                  <Briefcase className="h-10 w-10 text-secondary mx-auto mb-3" />
                  <CardTitle className="text-xl mb-2">{placement.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Students Placed</p>
                      <p className="text-2xl font-bold text-secondary">{placement.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Highest Package</p>
                      <p className="text-lg font-semibold">{placement.package}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Batch: {placement.year}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mt-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-4xl font-bold text-secondary mb-2">95%</p>
                  <p className="text-sm text-muted-foreground">Placement Rate</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary mb-2">₹12.5 LPA</p>
                  <p className="text-sm text-muted-foreground">Average Package</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary mb-2">₹45 LPA</p>
                  <p className="text-sm text-muted-foreground">Highest Package</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Internship Achievements */}
        <TabsContent value="internships" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipAchievements.map((internship, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-secondary mb-3" />
                  <CardTitle className="text-lg mb-2">{internship.title}</CardTitle>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">{internship.student}</p>
                    <p>{internship.organization}</p>
                    <p>Year: {internship.year}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{internship.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Achievements;
