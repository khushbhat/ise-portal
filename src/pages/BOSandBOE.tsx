import { useState, useEffect } from "react";
import { Users, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { bosAPI, boeAPI } from "@/services/api";

interface BOSMember {
  id: number;
  name: string;
  designation: string;
  organization: string;
}

interface BOEMember {
  id: number;
  name: string;
  designation: string;
  organization: string;
}

const BOSandBOE = () => {
  const [bosMembers, setBosMembers] = useState<BOSMember[]>([]);
  const [boeMembers, setBoeMembers] = useState<BOEMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const [bosData, boeData] = await Promise.all([
          bosAPI.getAll(),
          boeAPI.getAll()
        ]);
        setBosMembers(bosData);
        setBoeMembers(boeData);
      } catch (error) {
        console.error("Failed to fetch BOS/BOE members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

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

      {loading ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading BOS/BOE members...</p>
        </div>
      ) : (
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
              {bosMembers.length > 0 ? (
                bosMembers.map((member) => (
                  <Card key={member.id} className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-accent">
                        {member.designation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.organization}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="glass-card col-span-3">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No BOS members uploaded yet.</p>
                  </CardContent>
                </Card>
              )}
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
              {boeMembers.length > 0 ? (
                boeMembers.map((member) => (
                  <Card key={member.id} className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-accent">
                        {member.designation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.organization}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="glass-card col-span-3">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No BOE members uploaded yet.</p>
                  </CardContent>
                </Card>
              )}
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
      )}
    </div>
  );
};

export default BOSandBOE;
