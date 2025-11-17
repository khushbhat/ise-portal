import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { facultyAPI } from "@/services/api";

const FacultyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const data = await facultyAPI.getById(Number(id));
        setFaculty(data);
      } catch (err) {
        setFaculty(null);
      }
    }
    fetchFaculty();
  }, [id]);

  const getInitials = (name = "") =>
    name.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();

  if (!faculty) {
    return (
      <div className="container mx-auto py-20 text-center text-muted-foreground">
        Loading...
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 px-4 py-2 border rounded mt-4 font-heading"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-6 md:p-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 px-4 py-2 border rounded mb-6 bg-card/60 shadow-sm font-heading hover:bg-muted transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Top block: Image and main info */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12 animate-fade-in">
          <div className="w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden border border-border shadow">
            <Avatar className="w-full h-full">
              <AvatarImage src={faculty.image || "/default-avatar.png"} alt={faculty.name} />
              <AvatarFallback className="bg-gradient-primary text-3xl">
                {getInitials(faculty.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">{faculty.name}</h1>
            <div className="text-xl md:text-2xl font-semibold text-secondary mb-2">{faculty.designation}</div>
            <div className="text-md text-muted-foreground mb-4">{faculty.qualification}</div>
            <div className="flex gap-6 flex-wrap items-center text-[1rem]">
              <span className="flex gap-2 items-center text-muted-foreground">
                <Mail className="h-5 w-5 text-secondary" />
                <a href={`mailto:${faculty.email}`} className="underline">{faculty.email}</a>
              </span>
              <span className="flex gap-2 items-center text-muted-foreground font-mono">
                <Phone className="h-5 w-5 text-secondary" />
                <a href={`tel:${faculty.phone}`} className="underline">{faculty.phone}</a>
              </span>
            </div>
          </div>
        </div>

        {/* Sectioned detailed info, full width + spacing */}
        <div className="space-y-6 md:space-y-8 max-w-3xl">
          <ProfileSection title="Brief Info" text={faculty.brief_info} />
          <ProfileSection title="Education" text={faculty.education} />
          <ProfileSection title="Subjects Taught" text={faculty.subjects_taught} />
          <ProfileSection title="Funded Projects" text={faculty.funded_projects} />
          <ProfileSection title="Honours & Achievements" text={faculty.honours_achievements} />
          <ProfileSection title="Professional Memberships" text={faculty.memberships} />
          <ProfileSection title="Patents" text={faculty.patents} />
          <ProfileSection title="Workshops/FDP/Guest Lectures Attended" text={faculty.workshops_attended} />
        </div>
      </div>
    </div>
  );
};

// Section helper (only renders if text exists)
const ProfileSection = ({ title, text }: { title: string; text?: string }) =>
  text && text.trim() ? (
    <section className="animate-slide-up">
      <h2 className="font-heading text-2xl text-accent mb-3">{title}</h2>
      <div className="rounded-lg bg-muted/60 p-4 text-md whitespace-pre-line shadow-sm">
        {text}
      </div>
    </section>
  ) : null;

export default FacultyProfile;