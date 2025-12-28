import React from 'react';

const CapacityIndicator = ({ status = 'yellow' }) => {
  const configs = {
    green: {
      color: '#2ecc71',
      label: 'Accepting New Projects',
      description: 'We currently have availability for one new build. If your project is time-sensitive, now is the best time to start a conversation.',
      class: 'green'
    },
    yellow: {
      color: '#f1c40f',
      label: 'Limited Availability',
      description: 'We’re currently operating near full capacity. New projects may experience a short wait before onboarding. Priority Delivery is available for urgent builds.',
      class: 'yellow'
    },
    red: {
      color: '#e74c3c',
      label: 'Waitlist Only',
      description: 'We’re currently at full capacity to maintain quality on active builds. You can secure a future slot by joining our waitlist.',
      class: 'red'
    }
  };

  const config = configs[status] || configs.yellow;

  return (
    <div className={`capacity-status ${config.class} rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm max-w-md`}>
      <div className="flex items-center gap-3 mb-2">
        <span 
          className="block w-3.5 h-3.5 rounded-full animate-pulse" 
          style={{ backgroundColor: config.color }}
        />
        <strong className="text-white font-semibold">{config.label}</strong>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        {config.description}
      </p>
    </div>
  );
};

export default CapacityIndicator;
