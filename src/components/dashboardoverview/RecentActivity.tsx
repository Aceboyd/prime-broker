import React from "react";

type Activity = {
  action: string;
  amount: string;
  time: string;
  status: "completed" | "pending";
};

type RecentActivityProps = {
  activities: Activity[];
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
      <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  activity.status === "completed" ? "bg-green-400" : "bg-yellow-400"
                }`}
              />
              <div>
                <h4 className="font-medium">{activity.action}</h4>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{activity.amount}</p>
              <p
                className={`text-sm capitalize ${
                  activity.status === "completed" ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {activity.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
