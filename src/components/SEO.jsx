import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeMeta = {
  '/': {
    title: 'Suyash Dwivedi | Computer Science Engineer & Full-Stack AI Developer',
    description: 'Official portfolio of Suyash Dwivedi — Computer Science Engineer & Full-Stack AI Developer. Specializing in scalable web systems, autonomous AI agents, and interactive 3D digital experiences.',
    canonical: 'https://suyashdwivedi.in/'
  },
  '/projects': {
    title: 'Projects | Suyash Dwivedi — AI Systems & Full-Stack Engineering',
    description: 'Explore signature projects by Suyash Dwivedi: CineRec (AI Recommendation Engine), Tangent (Autonomous AI Agent on Cloudflare), SyncBoard, and Game Of Tag.',
    canonical: 'https://suyashdwivedi.in/projects'
  },
  '/skills': {
    title: 'Technical Skills & Architecture | Suyash Dwivedi',
    description: 'Technical proficiencies of Suyash Dwivedi: Python, TypeScript, React, Next.js, Node.js, FastAPI, PostgreSQL, Cloudflare Workers, Three.js, Docker, and Distributed Systems.',
    canonical: 'https://suyashdwivedi.in/skills'
  },
  '/contact': {
    title: 'Contact & Connect | Suyash Dwivedi — Software Engineer',
    description: 'Connect with Suyash Dwivedi for software engineering roles, AI system architecture, and freelance collaborations. Reach out via Email, GitHub, or LinkedIn.',
    canonical: 'https://suyashdwivedi.in/contact'
  }
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname] || routeMeta['/'];

    // Update document title
    document.title = meta.title;

    // Helper to safely update meta tags
    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Update standard meta
    updateMetaTag('meta[name="description"]', 'content', meta.description);

    // Update Open Graph
    updateMetaTag('meta[property="og:title"]', 'content', meta.title);
    updateMetaTag('meta[property="og:description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:url"]', 'content', meta.canonical);

    // Update Twitter
    updateMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', meta.description);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonical);
  }, [location.pathname]);

  return null;
};

export default SEO;
