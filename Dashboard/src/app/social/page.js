import PageHeader from "@/components/PageHeader";

const SocialPage = () => {
  const socialStats = [
    { platform: "Twitter", handle: "@northspec", followers: "1.2K", change: "+12%", changeType: "increase" },
    { platform: "Instagram", handle: "@northspec.studio", followers: "3.4K", change: "+8%", changeType: "increase" },
    { platform: "LinkedIn", handle: "Northspec Studio", followers: "5.6K", change: "-2%", changeType: "decrease" },
    { platform: "Facebook", handle: "NorthspecStudio", followers: "7.8K", change: "+5%", changeType: "increase" },
  ];

  const recentPosts = [
    { 
      platform: "Twitter", 
      content: "Just launched our new website! Check it out at northspec.com", 
      likes: 15, 
      retweets: 8, 
      date: "2024-03-12" 
    },
    { 
      platform: "Instagram", 
      content: "Behind the scenes of our latest project. #webdesign #branding", 
      likes: 120, 
      comments: 15, 
      date: "2024-03-11" 
    },
    { 
      platform: "LinkedIn", 
      content: "We're hiring a new Senior Designer! Apply now on our website.", 
      likes: 45, 
      shares: 10, 
      date: "2024-03-10" 
    },
  ];

  return (
    <div>
      <PageHeader title="Social Media" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {socialStats.map((stat) => (
            <div key={stat.platform} className="bg-white/5 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{stat.platform}</h3>
                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-400">{stat.handle}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.followers}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-white">{post.platform}</p>
                    <p className="text-gray-300 mt-1">{post.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                  <span>Likes: {post.likes}</span>
                  {post.retweets && <span>Retweets: {post.retweets}</span>}
                  {post.comments && <span>Comments: {post.comments}</span>}
                  {post.shares && <span>Shares: {post.shares}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;