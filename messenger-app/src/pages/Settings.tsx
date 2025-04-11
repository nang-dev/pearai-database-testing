import { Card } from "@/components/ui/card";
import { Bell, Moon, Globe, Lock, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Settings</h1>
        <p className="text-secondary-foreground">Customize your account preferences</p>
      </header>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Security</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Password Protection</p>
                <p className="text-sm text-muted-foreground">Require password for sensitive actions</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;