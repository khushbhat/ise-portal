import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, Package, Calendar, BookMarked, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const navigate = useNavigate();

  const resourceCategories = [
    {
      id: "syllabus",
      icon: BookOpen,
      title: "Syllabus",
      description: "Course syllabus and curriculum details",
    },
    {
      id: "study-materials",
      icon: FileText,
      title: "Study Materials",
      description: "Lecture notes and reference materials",
    },
    {
      id: "timetables",
      icon: Calendar,
      title: "Timetables",
      description: "Current semester schedules and timetables",
    },
    {
      id: "voise-magazines",
      icon: BookMarked,
      title: "Vo'ISE Magazines",
      description: "Departmental magazine and publications",
    },
    {
      id: "nba-documents",
      icon: Award,
      title: "NBA Documents",
      description: "Accreditation and quality assurance documents",
    },
    {
      id: "others",
      icon: Package,
      title: "Others",
      description: "Additional resources and materials",
    },
  ];

  const handleCardClick = (type: string) => {
    navigate(`/resources/${type}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
            Academic Resources
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">
            Access syllabus, study materials, timetables, and departmental publications
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <div
                key={resource.id}
                onClick={() => handleCardClick(resource.id)}
                className="cursor-pointer"
              >
                <Card className="glass-card hover-lift h-full">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-accent mb-4" />
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-heading font-semibold mb-4">Note for Students</h3>
          <p className="text-muted-foreground">
            All resources are hosted on Google Drive. Click on any card above to access the respective materials. 
            Make sure you're logged in with your institutional email for full access. For any issues accessing the materials, 
            please contact the department office.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resources;
