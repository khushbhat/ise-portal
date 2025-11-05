import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/api";

const FacultyLogin = () => {
  const [hodEmail, setHodEmail] = useState("");
  const [hodPassword, setHodPassword] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHodLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(hodEmail, hodPassword, 'hod');
      if (response.success) {
        localStorage.setItem("hodAuthenticated", "true");
        localStorage.setItem("userRole", "hod");
        if (response.token) localStorage.setItem("token", response.token);
        toast({
          title: "Success",
          description: "HoD login successful",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Error",
          description: response.message || "Invalid HoD credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid HoD credentials",
        variant: "destructive",
      });
    }
  };

  const handleFacultyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(facultyEmail, facultyPassword, 'faculty');

      // Debugging: if login doesn't work, inspect the response object
      // console.log("Faculty login response:", response);

      if (!response) {
        throw new Error("No response from server");
      }

      if (response.success) {
        // Normalize possible id keys returned by the server:
        // backend might return response.user.id or response.user.faculty_id or response.user.facultyId
        const userObj = response.user || {};
        const facultyId =
          userObj.faculty_id ?? userObj.facultyId ?? userObj.id ?? null;

        if (!facultyId) {
          // If we don't have an id, show a helpful error and do not navigate
          toast({
            title: "Error",
            description: "Login succeeded but no faculty id returned by server. Check backend response.",
            variant: "destructive",
          });
          // Keep a console log for debugging
          // console.error("Faculty login response (missing id):", response);
          return;
        }

        // Store values as strings in localStorage; parse on read.
        localStorage.setItem("facultyAuthenticated", "true");
        localStorage.setItem("userRole", "faculty");
        localStorage.setItem("facultyId", String(facultyId));

        // If backend returns a JWT token, store it for subsequent requests
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        // Also store any user-level id if provided (useful if backend separates user vs faculty objects)
        if (userObj.id) localStorage.setItem("facultyUserId", String(userObj.id));

        toast({
          title: "Success",
          description: "Faculty login successful",
        });
        navigate("/faculty/dashboard");
      } else {
        toast({
          title: "Error",
          description: response.message || "Invalid faculty credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid faculty credentials or server error",
        variant: "destructive",
      });
      console.error("Faculty login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-heading">Admin Login</CardTitle>
          <CardDescription>Access the department management system</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hod" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hod">HoD Login</TabsTrigger>
              <TabsTrigger value="faculty">Faculty Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hod">
              <form onSubmit={handleHodLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hod-email">Email</Label>
                  <Input
                    id="hod-email"
                    type="email"
                    placeholder="hod@rit.edu"
                    value={hodEmail}
                    onChange={(e) => setHodEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hod-password">Password</Label>
                  <Input
                    id="hod-password"
                    type="password"
                    value={hodPassword}
                    onChange={(e) => setHodPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as HoD
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="faculty">
              <form onSubmit={handleFacultyLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-email">Email</Label>
                  <Input
                    id="faculty-email"
                    type="email"
                    placeholder="faculty@rit.edu"
                    value={facultyEmail}
                    onChange={(e) => setFacultyEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input
                    id="faculty-password"
                    type="password"
                    value={facultyPassword}
                    onChange={(e) => setFacultyPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Faculty
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyLogin;