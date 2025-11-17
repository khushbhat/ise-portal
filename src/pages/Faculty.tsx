import { useState, useEffect } from "react";
import { Mail, Phone, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { facultyAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyMembers, setFacultyMembers] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await facultyAPI.getAll();
        setFacultyMembers(data);
      } catch (error) {
        console.error("Failed to load faculty:", error);
      }
    };
    loadFaculty();
  }, []);

  const filteredFaculty = facultyMembers.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
const [selectedFaculty, setSelectedFaculty] = useState(null);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">Our Faculty</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet our distinguished team of educators and researchers dedicated to excellence
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, specialization, or designation..."
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty, index) => (
          <Card key={index} className="glass-card hover-lift">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={faculty.image} alt={faculty.name} />
                  <AvatarFallback className="bg-gradient-primary text-xl">
                    {getInitials(faculty.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl mb-1">{faculty.name}</CardTitle>
                <p className="text-sm text-secondary font-medium mb-3">{faculty.designation}</p>
                <p className="text-sm text-muted-foreground">{faculty.qualification}</p>
                <p className="text-sm text-muted-foreground">{faculty.specialization}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                  <a
                    href={`mailto:${faculty.email}`}
                    className="hover:text-secondary transition-colors truncate"
                  >
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                  <a
                    href={`tel:${faculty.phone}`}
                    className="hover:text-secondary transition-colors"
                  >
                    {faculty.phone}
                  </a>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/faculty/${faculty.id}`)}
                className="mt-4"
              >
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
        {/* {selectedFaculty && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg max-w-xl w-full p-8 relative">
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={() => setSelectedFaculty(null)}
      >
        Close
      </Button>
      <h2 className="text-2xl font-heading font-bold mb-4">
        {selectedFaculty.name}
      </h2>
      <p className="mb-2 text-muted-foreground">{selectedFaculty.designation}</p>
      {selectedFaculty.brief_info && (
        <div className="mb-4">
          <h3 className="font-semibold">Brief Info:</h3>
          <p>{selectedFaculty.brief_info}</p>
        </div>
      )}
      <ul className="space-y-2">
        {selectedFaculty.education && <li><strong>Education:</strong> {selectedFaculty.education}</li>}
        {selectedFaculty.subjects_taught && <li><strong>Subjects Taught:</strong> {selectedFaculty.subjects_taught}</li>}
        {selectedFaculty.funded_projects && <li><strong>Funded Projects:</strong> {selectedFaculty.funded_projects}</li>}
        {selectedFaculty.honours_achievements && <li><strong>Honours & Achievements:</strong> {selectedFaculty.honours_achievements}</li>}
        {selectedFaculty.memberships && <li><strong>Memberships:</strong> {selectedFaculty.memberships}</li>}
        {selectedFaculty.patents && <li><strong>Patents:</strong> {selectedFaculty.patents}</li>}
        {selectedFaculty.workshops_attended && <li><strong>Workshops Attended:</strong> {selectedFaculty.workshops_attended}</li>}
      </ul>
    </div>
  </div>
)} */}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No faculty members found matching your search.</p>
          <Button variant="ghost" onClick={() => setSearchTerm("")} className="mt-4">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};


export default Faculty;
