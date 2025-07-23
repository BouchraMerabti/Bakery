import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header/Hero Section */}
      <header className="section-container flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">John Doe</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">Software & Security Engineer</h2>
        <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          Specializing in secure software development, penetration testing, and building robust applications.
        </p>
      </header>

      {/* Skills Section */}
      <section className="section-container bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard title="Software Development" items={['React', 'TypeScript', 'Node.js', 'Python', 'Java']} />
          <SkillCard title="Security" items={['Penetration Testing', 'OWASP', 'Network Security', 'Cryptography']} />
          <SkillCard title="Tools & Technologies" items={['Git', 'Docker', 'AWS', 'Linux', 'CI/CD']} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-container">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Secure Banking API"
            description="Developed a secure banking API with OAuth 2.0, JWT, and end-to-end encryption."
            tags={['Node.js', 'TypeScript', 'Security']}
          />
          <ProjectCard
            title="Vulnerability Scanner"
            description="Built an automated vulnerability scanner for web applications using Python."
            tags={['Python', 'Security', 'Automation']}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            GitHub
          </a>
          <a href="https://linkedin.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            Email
          </a>
        </div>
      </section>
    </div>
  );
};

interface SkillCardProps {
  title: string;
  items: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, items }) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
        ))}
      </ul>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags }) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
