const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Bootstrap",
  "PHP", "MySQL", "Node.js", "Tailwind", "TypeScript",
  "Git", "REST API", "Sass", "jQuery", "Laravel",
  "Express", "MongoDB", "Figma", "Vite", "Webpack",
];

import { useEffect, useState } from "react";

export function SkillGlobe() {
  const [radius, setRadius] = useState(220);
  const total = SKILLS.length;

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(130);
      else if (w < 768) setRadius(170);
      else if (w < 1024) setRadius(190);
      else setRadius(220);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
