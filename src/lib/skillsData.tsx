import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiShopify,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";

export type SkillItem = { name: string; Icon: IconType; color: string };
export type SkillCategory = { title: string; items: SkillItem[] };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "React.js", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
    ],
  },
  {
    title: "Styling",
    items: [
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
      { name: "Sass", Icon: SiSass, color: "#CC6699" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
      { name: "REST API", Icon: TbApi, color: "#FF7A1A" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", Icon: SiFirebase, color: "#DD2C00" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
      { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    title: "Deployment & Cloud",
    items: [
      { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
      { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
    ],
  },
  {
    title: "eCommerce",
    items: [
      { name: "Shopify", Icon: SiShopify, color: "#7AB55C" },
      { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
    ],
  },
];
