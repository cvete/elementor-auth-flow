
import { useState } from "react";
import ChannelCard from "./ChannelCard";

// Mock data for TV channels
const trendingChannels = [
  {
    id: "1",
    name: "Etalk",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640",
    currentShow: "Celebrity News",
    time: "Mon-Sat 24"
  },
  {
    id: "2",
    name: "National News",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640", 
    currentShow: "Evening Report",
    time: "Mon-Sun 24"
  },
  {
    id: "3",
    name: "Daily Planet",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640",
    currentShow: "Morning News",
    time: "Tue-Sun 24"
  },
  {
    id: "4", 
    name: "SportsCenter",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640",
    currentShow: "Game Highlights", 
    time: "Tue-Sat 24"
  },
  {
    id: "5",
    name: "The Social",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640",
    currentShow: "Talk Show",
    time: "Wed-Sun 20" 
  }
];

const onDemandChannels = [
  {
    id: "6",
    name: "Fibe TV1",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640"
  },
  {
    id: "7",
    name: "M Network",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640"
  },
  {
    id: "8",
    name: "CTV",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640"
  },
  {
    id: "9",
    name: "Crave TV",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640"
  },
  {
    id: "10",
    name: "Kids Suite",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dHZ8fHx8fHwxNjE2NDA5MjUw&ixlib=rb-1.2.1&q=80&w=640"
  }
];

const TVChannelList = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'ondemand'>('trending');
  
  return (
    <div className="space-y-8">
      <div className="flex border-b border-blue-700">
        <button
          className={`py-2 px-4 text-white ${
            activeTab === 'trending' ? 'border-b-2 border-white font-medium' : 'text-blue-300'
          }`}
          onClick={() => setActiveTab('trending')}
        >
          Trending Now
        </button>
        <button
          className={`py-2 px-4 text-white ${
            activeTab === 'ondemand' ? 'border-b-2 border-white font-medium' : 'text-blue-300'
          }`}
          onClick={() => setActiveTab('ondemand')}
        >
          Channels on demand
        </button>
      </div>

      {activeTab === 'trending' && (
        <div>
          <h2 className="text-white text-xl mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                id={channel.id}
                name={channel.name}
                logo={channel.logo}
                currentShow={channel.currentShow}
                time={channel.time}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ondemand' && (
        <div>
          <h2 className="text-white text-xl mb-4">Channels on demand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {onDemandChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                id={channel.id}
                name={channel.name}
                logo={channel.logo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TVChannelList;
