const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Bootstrap",
  "PHP", "MySQL", "Node.js", "Tailwind", "TypeScript",
  "Git", "REST API", "Sass", "jQuery", "Laravel",
  "Express", "MongoDB", "Figma", "Vite", "Webpack",
];

export function SkillGlobe() {
  const radius = 220;
  const total = SKILLS.length;

  return (
    <div className="skill-globe">
      <div className="skill-core" />
      <div className="skill-globe-inner">
        {SKILLS.map((skill, i) => {
          // Distribute points evenly on a sphere (Fibonacci sphere)
          const phi = Math.acos(-1 + (2 * i) / total);
          const theta = Math.sqrt(total * Math.PI) * phi;
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);

          return (
            <div
              key={skill}
              className="skill-tag"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
              }}
            >
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
}
