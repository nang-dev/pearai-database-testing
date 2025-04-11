import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Profile</h1>
        <p className="text-secondary-foreground">Manage your account information</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-primary rounded-full">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Your basic profile details</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">John Doe</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">January 2024</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="font-medium">2 hours ago</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Account Status</p>
              <p className="font-medium text-green-500">Active</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;