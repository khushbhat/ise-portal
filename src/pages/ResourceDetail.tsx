import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resourcesAPI } from "@/services/api";

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  created_at: string;
}

const ResourceDetail = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Map URL slugs to display names
  const typeDisplayNames: { [key: string]: string } = {
    "syllabus": "Syllabus",
    "study-materials": "Study Materials",
    "timetables": "Timetables",
    "voise-magazines": "Vo'ISE Magazines",
    "nba-documents": "NBA Documents",
    "others": "Others",
  };

  const displayName = typeDisplayNames[type || ""] || type;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const allResources = await resourcesAPI.getAll();
        // Filter resources by type and sort by created_at (newest first)
        const filteredResources = allResources
          .filter((resource: Resource) => {
            const resourceType = resource.type.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
            return resourceType === type;
          })
          .sort((a: Resource, b: Resource) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        setResources(filteredResources);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [type]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/resources")}
            className="mb-6 text-primary-foreground hover:text-primary-foreground/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
              {displayName}
            </h1>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in">
              Browse all {displayName.toLowerCase()} resources
            </p>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                      <CardDescription className="text-base">
                        {resource.description}
                      </CardDescription>
                    </div>
                    <FileText className="h-8 w-8 text-accent ml-4 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Resource
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No {displayName.toLowerCase()} resources have been uploaded yet.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Check back later or contact the department for more information.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default ResourceDetail;
