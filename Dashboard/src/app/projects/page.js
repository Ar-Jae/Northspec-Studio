import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const ProjectsPage = () => {
  const projects = [
    {
      id: "PROJ-001",
      title: "New Website for Acme Inc.",
      client: "Acme Inc.",
      status: "In Progress",
      progress: 60,
      dueDate: "2024-04-15",
      team: ["/images/avatars/avatar-1.svg", "/images/avatars/avatar-2.svg", "/images/avatars/avatar-3.svg"],
    },
    {
      id: "PROJ-002",
      title: "Stark Industries Mobile App",
      client: "Stark Industries",
      status: "Completed",
      progress: 100,
      dueDate: "2024-03-01",
      team: ["/images/avatars/avatar-4.svg", "/images/avatars/avatar-5.svg"],
    },
    {
      id: "PROJ-003",
      title: "Wayne Enterprises Branding",
      client: "Wayne Enterprises",
      status: "On Hold",
      progress: 20,
      dueDate: "2024-05-01",
      team: ["/images/avatars/avatar-6.svg"],
    },
    {
        id: "PROJ-004",
        title: "Daily Bugle News Portal",
        client: "Daily Bugle",
        status: "In Progress",
        progress: 80,
        dueDate: "2024-03-20",
        team: ["/images/avatars/avatar-1.svg", "/images/avatars/avatar-5.svg", "/images/avatars/avatar-2.svg"],
      },
  ];

  const actions = [
    {
      label: "New Project",
      primary: true,
      href: "/projects/create",
    },
  ];

  return (
    <div>
      <PageHeader title="Projects" actions={actions.map(action => 
        action.href ? (
          <Link href={action.href} key={action.label} passHref>
            <span className={action.primary ? "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-brand-gold text-black" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-white/5 text-gray-300 border border-white/5"}>
              {action.label}
            </span>
          </Link>
        ) : (
          <button
            key={action.label}
            className={action.primary ? "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-brand-gold text-black" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-white/5 text-gray-300 border border-white/5"}
          >
            {action.label}
          </button>
        )
      )} />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-500/10 text-green-400"
                        : project.status === "In Progress"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{project.client}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div
                      className="bg-brand-gold h-1.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.team.map((avatar, index) => (
                    <img
                      key={index}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800"
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">Due: {project.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;