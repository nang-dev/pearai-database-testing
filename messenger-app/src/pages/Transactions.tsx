import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Content = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Content</h1>
        <p className="text-secondary-foreground">Recent activity and updates</p>
      </header>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-full">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Content Update</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <p className="font-medium text-muted">Updated</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Content;