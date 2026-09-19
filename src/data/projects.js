const projects = [
  {
    id: 1,
    name: 'SyncBoard',
    description: 'A collaborative real-time whiteboard with syncing capabilities across multiple devices.',
    tech: ['React', 'WebSockets', 'Next.js', 'Vercel'],
    link: 'https://syncmyboard.vercel.app',
    image: '/syncboard.png'
  },
  {
    id: 2,
    name: 'Tangent',
    description: 'An entirely autonomous, self-governing AI agent that schedules itself via Cloudflare Cron, researches independently via Tavily, and publishes contrarian insights to Threads.',
    tech: ['TypeScript', 'Cloudflare Workers', 'Llama-3', 'Cloudflare D1', 'Tavily API', 'Threads API'],
    link: 'https://tangent.suyashdwivedi.workers.dev/',
    image: '/robo3.jpg'
  },
  {
    id: 3,
    name: 'Game Of Tag',
    description: 'An interactive real-time multiplayer game of tag.',
    tech: ['Node.js', 'Socket.io', 'Render'],
    link: 'https://tag-30d5.onrender.com/',
    image: '/game-of-tag-2.png'
  },
  {
    id: 4,
    name: 'EchoChat',
    description: 'An end-to-end encrypted messaging platform with voice notes, file sharing, and ephemeral messages.',
    tech: ['React Native', 'Socket.io', 'MongoDB', 'WebRTC'],
    link: '#',
    image: null
  },
  {
    id: 5,
    name: 'Algorithmica',
    description: 'An interactive platform for visualizing sorting, pathfinding, and graph algorithms with step-by-step playback.',
    tech: ['JavaScript', 'Canvas API', 'Web Workers'],
    link: '#',
    image: null
  },
  {
    id: 6,
    name: 'DevForge CLI',
    description: 'A command-line toolkit for scaffolding projects, managing environments, and automating deployment pipelines.',
    tech: ['Rust', 'Docker', 'GitHub Actions'],
    link: '#',
    image: null
  }
];

export default projects;
