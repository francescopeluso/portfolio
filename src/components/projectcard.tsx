import React from "react";

// import styles
import "../styles/ProjectCard.css";

// import assets
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

interface ProjectCardProps {
    title: string;
    logo: string;
    description: string;
    techStack: string;
    githubLink?: string;
    demoLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, logo, description, techStack, githubLink, demoLink }) => {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <div className="project-card-header-img">
                    <img src={logo} alt={title} />
                </div>
                <h3>{title}</h3>
            </div>
            <div className="project-card-body">
                <p className="project-description">💬: {description}</p>
                <p className="tech-stack">👨🏻‍💻: {techStack}</p>
            </div>
            <div className="project-card-footer">
                {githubLink && (
                    <a href={githubLink} target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                )}
                <a href={demoLink} target="_blank" rel="noreferrer">
                    <CgWebsite />
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;