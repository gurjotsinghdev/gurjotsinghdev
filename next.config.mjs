/** @type {import('next').NextConfig} */
const nextConfig = {
  // next dev otherwise rewrites AGENTS.md / CLAUDE.md on every run.
  agentRules: false,

  async redirects() {
    // The previous Pages Router site had these routes; keep old links alive.
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#services", permanent: true },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/work/unify", destination: "/#work", permanent: true },
    ];
  },
};

export default nextConfig;
