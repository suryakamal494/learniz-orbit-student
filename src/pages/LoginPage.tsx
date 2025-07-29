
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-display-sm font-bold text-gradient-primary">
            Welcome Back
          </h1>
          <p className="text-body-md text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={userType}
            onValueChange={(value) => {
              if (value) setUserType(value as "student" | "teacher");
            }}
            className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl"
          >
            <ToggleGroupItem
              value="student"
              className={`
                flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-body-sm font-medium transition-premium
                ${userType === "student" 
                  ? "bg-background shadow-premium text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <GraduationCap className="h-4 w-4" />
              Student Login
            </ToggleGroupItem>
            <ToggleGroupItem
              value="teacher"
              className={`
                flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-body-sm font-medium transition-premium
                ${userType === "teacher" 
                  ? "bg-background shadow-premium text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <User className="h-4 w-4" />
              Teacher Login
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-premium-lg backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center">
              {userType === "student" ? "Student Portal" : "Teacher Portal"}
            </CardTitle>
            <CardDescription className="text-center">
              {userType === "student" 
                ? "Access your courses and assignments"
                : "Coming soon - Teacher dashboard access"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userType === "student" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-label-md">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 px-4 rounded-xl border-border/50 focus:border-primary/50 transition-premium"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-label-md">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 px-4 rounded-xl border-border/50 focus:border-primary/50 transition-premium"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 mt-6 text-label-md font-semibold rounded-xl"
                  size="lg"
                >
                  Sign In to Student Portal
                </Button>

                <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    className="text-body-sm text-primary hover:text-primary-light transition-premium text-center"
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    className="text-body-sm text-primary hover:text-primary-light transition-premium text-center"
                  >
                    Create New Account
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Coming Soon</h3>
                  <p className="text-body-sm text-muted-foreground max-w-sm mx-auto">
                    Teacher portal is under development. Please check back later for access to teacher dashboard and features.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-body-xs text-muted-foreground">
          Need help? Contact{" "}
          <button className="text-primary hover:text-primary-light transition-premium">
            support@platform.com
          </button>
        </p>
      </div>
    </div>
  );
}
