import { Card } from "@/components/ui/card";
import { Bell, Check, X } from "lucide-react";

const Notifications = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Notifications</h1>
        <p className="text-secondary-foreground">Stay updated with your account activity</p>
      </header>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
        <div className="space-y-4">
          {[
            {
              title: "Payment Successful",
              description: "Your last payment was processed successfully",
              time: "2 hours ago",
              icon: Check,
              color: "text-green-500",
            },
            {
              title: "Failed Transaction",
              description: "Unable to process transaction #12345",
              time: "5 hours ago",
              icon: X,
              color: "text-red-500",
            },
            {
              title: "Account Update",
              description: "Your account details have been updated",
              time: "1 day ago",
              icon: Bell,
              color: "text-blue-500",
            },
          ].map((notification, i) => {
            const Icon = notification.icon;
            return (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-muted rounded-full ${notification.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Notifications;