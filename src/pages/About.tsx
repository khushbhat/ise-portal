import { useState, useEffect } from "react";
import { Target, Eye, Award, Building2, History, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutAPI } from "@/services/api";

const About = () => {
  const [aboutContent, setAboutContent] = useState({
    vision: "To evolve as an outstanding education and research center of Information Technology to create high quality Engineering Professionals for the betterment of Society.",
    mission: "Department of Information Science and Engineering shall create high quality IT Engineering Professionals for the betterment of society by: Providing education through an ever improving curriculum and effective pedagogy techniques. Encouraging extra and co-curricular activities to develop their overall personality along with technical skills. Collaborating with industry and academia for strengthening research, innovation and entrepreneurship ecosystem.",
    departmentProfile: "The Department of Information Science and Engineering (ISE) was established in the year 1992 with an objective of producing high quality professionals to meet the demands of the emerging field of Information Technology. Department offers Bachelor's program in Information Science and Engineering (B.E), Master's program in Data Science (MTech) and Doctoral program (Ph.D.)."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const data = await aboutAPI.get();
        if (data) {
          setAboutContent({
            vision: data.vision || aboutContent.vision,
            mission: data.mission || aboutContent.mission,
            departmentProfile: data.department_profile || aboutContent.departmentProfile,
          });
        }
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutContent();
  }, []);
  const stats = [
    { number: "90%", label: "High Profile Placements" },
    { number: "300+", label: "Research Publications" },
    { number: "8", label: "Patents Published" },
    { number: "100%", label: "Internship Statistics" },
  ];

  const offeredPrograms = [
    {
      title: "Bachelor of Engineering",
      subtitle: "Information Science & Engineering",
      intake: "120 Students"
    },
    {
      title: "Master of Technology",
      subtitle: "Data Science",
      intake: "18 Students"
    },
    {
      title: "Doctoral Program",
      subtitle: "Ph.D",
      intake: "Research Based"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">About ISE Department</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Pioneering excellence in Information Science and Engineering education since 1995
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-secondary" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              {aboutContent.vision}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-secondary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {aboutContent.mission}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department Profile */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-6">Department Profile</h2>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {aboutContent.departmentProfile}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5 Year Statistics */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Achievements (5 Years Statistics)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {stats.map((item, index) => (
            <Card key={index} className="glass-card text-center hover-lift">
              <CardContent className="pt-6">
                <div className="text-4xl font-heading font-bold text-secondary mb-2">
                  {item.number}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>20+ Prestigious National & International awards.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>About 90% high profile placements with average annual package of 9.25 lakhs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>300+ research publications in referred journals/conferences with 2000+ citations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>8 Indian/Foreign patents published.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>10+ funded research/consultancy projects from UGC, AICTE, VGST, IBM, Tech Machinery, ARTPARK, ICMR etc. amounting to Rs. 1 Crore till date.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>100% Internships statistics with average stipends of Rs. 30,000.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3">•</span>
                <span>Good number of students are opting for higher education in prestigious institutions of India & Abroad.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Department History */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <History className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Department History</h2>
        </div>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">1992</h3>
                <p className="text-lg">Department of Information Science and Engineering (ISE) was established with B.E in Information Science and Engineering with an intake of 30 students.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">1999</h3>
                <p className="text-lg">Intake enhanced to 60 students.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">2001</h3>
                <p className="text-lg">Intake enhanced to 90 students. UG Program accredited by NBA for the first time.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">2004, 2010, 2015</h3>
                <p className="text-lg">NBA re-accreditation achieved.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">2008</h3>
                <p className="text-lg">Intake enhanced to 120 students.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">2023</h3>
                <p className="text-lg">M.Tech in Data Science program started with 18 students.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Offered Programs */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Offered Programs</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offeredPrograms.map((program, index) => (
            <Card key={index} className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-secondary mb-2">{program.subtitle}</p>
                <p className="text-sm text-muted-foreground">Intake: {program.intake}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Facilities</h2>
        </div>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Department has 8 well-equipped state of the art laboratories which meet the requirements of curriculum, innovation and research.
            </p>
            <p className="text-lg">
              Collaboration with leading industries such as Apple, Unisys, Mindtree, Intel, Google, SECO, IBM, NVIDIA etc. provides access to cutting-edge computing infrastructure and tools.
            </p>
          </CardContent>
        </Card>
      </section>

    </div>
  );
};

export default About;
