import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";

interface ChannelCardProps {
  id: string;
  name: string;
  logo: string;
  currentShow?: string;
  time?: string;
}

const ChannelCard = ({ name, logo, currentShow, time }: ChannelCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video bg-gradient-to-b from-blue-900 to-black flex items-center justify-center">
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all"
            aria-label={`Watch ${name}`}
          >
            <Play className="h-8 w-8 text-white fill-white" />
          </button>
        </div>
      </div>

      {(currentShow || time) && (
        <div className="p-3 bg-gray-800 text-white">
          <div className="text-sm font-medium">{name}</div>
          {currentShow && <p className="text-xs text-gray-300 truncate">{currentShow}</p>}
          {time && <p className="text-xs text-gray-400">{time}</p>}
        </div>
      )}
    </Card>
  );
};

export default ChannelCard;
