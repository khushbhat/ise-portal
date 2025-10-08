import { Users, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BOSandBOE = () => {
  const bosMembers = [
    { name: "Dr. John Doe", designation: "Chairperson", affiliation: "Head of Department, ISE" },
    { name: "Dr. Jane Smith", designation: "Member", affiliation: "Professor, ISE" },
    { name: "Dr. Robert Johnson", designation: "Member", affiliation: "Associate Professor, ISE" },
    { name: "Industry Expert 1", designation: "External Member", affiliation: "Tech Company" },
    { name: "Industry Expert 2", designation: "External Member", affiliation: "Software Firm" },
  ];

  const boeMembers = [
    { name: "Dr. Michael Brown", designation: "Chairperson", affiliation: "Dean, Engineering" },
    { name: "Dr. Sarah Wilson", designation: "Member", affiliation: "Professor, CSE" },
    { name: "Dr. David Lee", designation: "Member", affiliation: "HOD, ISE" },
    { name: "Academic Expert 1", designation: "External Member", affiliation: "University" },
    { name: "Industry Expert", designation: "External Member", affiliation: "Industry" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
            Board of Studies & Board of Examiners
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in">
            Academic governance and quality assurance committees
          </p>
        </div>
      </section>

      {/* BOS Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-10 w-10 text-accent" />
            <h2 className="text-4xl font-heading font-bold">Board of Studies (BOS)</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            The Board of Studies is responsible for the design and development of the curriculum, 
            formulation of schemes of examination, and continuous improvement of academic programs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {bosMembers.map((member, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-accent">
                    {member.designation}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.affiliation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* BOE Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-10 w-10 text-accent" />
            <h2 className="text-4xl font-heading font-bold">Board of Examiners (BOE)</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            The Board of Examiners ensures the quality and fairness of the examination process, 
            oversees the evaluation procedures, and maintains academic standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boeMembers.map((member, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-accent">
                    {member.designation}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.affiliation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Calendar className="h-6 w-6 text-accent mt-1" />
            <div>
              <h3 className="text-xl font-heading font-semibold mb-2">Meeting Schedule</h3>
              <p className="text-muted-foreground">
                The Board of Studies meets at least twice a year to review and update the curriculum. 
                The Board of Examiners convenes during examination periods to ensure proper conduct 
                and evaluation of assessments. Meeting minutes and decisions are documented and 
                available through the department office.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BOSandBOE;
