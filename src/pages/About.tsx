import { Target, Eye, Award, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const achievements = [
    { number: "25+", label: "Experienced Faculty" },
    { number: "500+", label: "Students Enrolled" },
    { number: "95%", label: "Placement Rate" },
    { number: "100+", label: "Research Publications" },
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
              To be a center of excellence in Information Science and Engineering education,
              fostering innovation, research, and technological advancement that addresses
              global challenges and contributes to societal development.
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
            <p className="text-lg leading-relaxed">
              To provide quality education through innovative teaching methodologies, promote
              cutting-edge research, and develop industry-ready professionals equipped with
              technical expertise, ethical values, and leadership skills.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-6">Department Overview</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-4">
            The Information Science and Engineering Department was established in 1995 with a vision
            to create future-ready professionals in the field of computer science and information
            technology. Over the years, we have grown into one of the premier departments, known for
            our academic excellence, research contributions, and industry partnerships.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Our curriculum is designed to provide a strong foundation in computer science fundamentals
            while exposing students to emerging technologies such as Artificial Intelligence, Machine
            Learning, Data Science, Cloud Computing, and Cybersecurity. We emphasize hands-on learning
            through well-equipped laboratories, industry projects, and internships.
          </p>
          <p className="text-lg leading-relaxed">
            The department boasts a team of highly qualified faculty members who are actively engaged
            in research and have published numerous papers in reputed international journals and
            conferences. We maintain strong collaborations with leading technology companies and
            research institutions worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
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
      </section>

      {/* Infrastructure */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Infrastructure</h2>
        </div>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-heading font-semibold mb-3">Computing Facilities</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 10 state-of-the-art computer laboratories</li>
                  <li>• High-performance computing cluster</li>
                  <li>• Latest software and development tools</li>
                  <li>• 24/7 internet connectivity</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold mb-3">Specialized Labs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AI & Machine Learning Lab</li>
                  <li>• Data Science & Analytics Lab</li>
                  <li>• Cybersecurity Lab</li>
                  <li>• IoT & Embedded Systems Lab</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Achievements */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-8 w-8 text-secondary" />
          <h2 className="text-3xl font-heading font-bold">Key Achievements</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle>Academic Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Consistently ranked among top engineering departments with outstanding academic
                performance and university toppers.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle>Research Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Over 100 publications in prestigious journals and conferences, with multiple
                patents filed.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle>Industry Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Strong industry partnerships with leading tech companies, ensuring excellent
                placement opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
