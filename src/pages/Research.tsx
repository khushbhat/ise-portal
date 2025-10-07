import { useState } from "react";
import { FileText, Download, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Research = () => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const publications = [
    {
      title: "Deep Learning Approaches for Sentiment Analysis in Social Media",
      authors: "Dr. Priya Sharma, Dr. Rajesh Kumar",
      journal: "IEEE Transactions on Neural Networks and Learning Systems",
      year: "2025",
      domain: "Machine Learning",
      link: "#",
    },
    {
      title: "Quantum-Resistant Cryptographic Protocols for IoT Security",
      authors: "Dr. Amit Patel, Dr. Vikram Singh",
      journal: "ACM Transactions on Privacy and Security",
      year: "2025",
      domain: "Cybersecurity",
      link: "#",
    },
    {
      title: "Optimizing Cloud Resource Allocation using Reinforcement Learning",
      authors: "Dr. Sneha Reddy, Dr. Kavita Desai",
      journal: "Journal of Cloud Computing",
      year: "2024",
      domain: "Cloud Computing",
      link: "#",
    },
    {
      title: "Real-time Object Detection in Autonomous Vehicles using CNNs",
      authors: "Dr. Meera Krishnan, Dr. Arjun Nair",
      journal: "International Journal of Computer Vision",
      year: "2024",
      domain: "Computer Vision",
      link: "#",
    },
    {
      title: "Energy-Efficient Data Transmission in WSN for Smart Agriculture",
      authors: "Dr. Vikram Singh",
      journal: "Sensors Journal",
      year: "2024",
      domain: "IoT",
      link: "#",
    },
  ];

  const projects = [
    {
      title: "AI-Powered Healthcare Diagnostics System",
      leader: "Dr. Priya Sharma",
      funding: "AICTE Research Grant",
      duration: "2024-2026",
      description: "Developing deep learning models for early disease detection using medical imaging.",
    },
    {
      title: "Blockchain-Based Secure Voting Platform",
      leader: "Dr. Amit Patel",
      funding: "DST SERB Grant",
      duration: "2023-2025",
      description: "Creating a transparent and tamper-proof electronic voting system using blockchain.",
    },
    {
      title: "Smart City Infrastructure Monitoring",
      leader: "Dr. Sneha Reddy",
      funding: "Industry Collaboration",
      duration: "2024-2025",
      description: "IoT and cloud-based solution for real-time monitoring of city infrastructure.",
    },
  ];

  const filteredPublications = selectedYear === "All" 
    ? publications 
    : publications.filter(pub => pub.year === selectedYear);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">Research & Publications</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Driving innovation through cutting-edge research in emerging technologies
        </p>
      </div>

      <Tabs defaultValue="publications" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="projects">Research Projects</TabsTrigger>
        </TabsList>

        {/* Publications Tab */}
        <TabsContent value="publications" className="space-y-6">
          {/* Year Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["All", "2025", "2024", "2023"].map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                className={selectedYear === year ? "bg-gradient-primary" : ""}
              >
                {year}
              </Button>
            ))}
          </div>

          {/* Publications List */}
          <div className="grid gap-6">
            {filteredPublications.map((pub, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-3">{pub.title}</CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-secondary" />
                          <span>{pub.authors}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-secondary" />
                          <span>{pub.journal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-secondary" />
                          <span>{pub.year}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="flex-shrink-0">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                    {pub.domain}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No publications found for {selectedYear}.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Research Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Principal Investigator: {project.leader}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span>Duration: {project.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-secondary">Funding:</span>
                    <span className="text-muted-foreground">{project.funding}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Research Areas */}
      <section className="mt-16">
        <h2 className="text-3xl font-heading font-bold mb-8 text-center">Research Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Artificial Intelligence",
            "Machine Learning",
            "Data Science",
            "Cybersecurity",
            "Cloud Computing",
            "Internet of Things",
            "Computer Vision",
            "Natural Language Processing",
          ].map((area, index) => (
            <Card key={index} className="glass-card hover-lift text-center">
              <CardContent className="pt-6">
                <p className="font-medium">{area}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Research;
