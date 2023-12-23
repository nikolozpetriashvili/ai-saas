import Heading from "@/components/Heading";
import { Settings } from "lucide-react";

const SettingsPage = async () => {

  return ( 
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          You are currently on a free plan.(Im sorry, but upgrading to premium is not available on this website. The main goal of this platform is to showcase and demonstrate my knowledge, rather than offering premium features or services.)
        </div>
      </div>
    </div>
   );
}
 
export default SettingsPage;