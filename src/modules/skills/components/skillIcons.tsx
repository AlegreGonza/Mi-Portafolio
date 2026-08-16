import { 
  Cpu, 
  Server, 
  Database, 
  Globe, 
  Code, 
  FileCode, 
  FileText, 
  Layout, 
  GitBranch, 
  Zap, 
  Box, 
  Send 
} from 'lucide-react';

const skillIcons: { keyword: string; icon: React.ReactNode }[] = [
  { keyword: 'spring', icon: <Server size={16} /> },
  { keyword: 'java', icon: <Cpu size={16} /> },
  { keyword: 'mysql', icon: <Database size={16} /> },
  { keyword: 'database', icon: <Database size={16} /> },
  { keyword: 'api', icon: <Globe size={16} /> },
  { keyword: 'react', icon: <Code size={16} /> },
  { keyword: 'next', icon: <Zap size={16} /> },
  { keyword: 'typescript', icon: <FileCode size={16} /> },
  { keyword: 'javascript', icon: <FileCode size={16} /> },
  { keyword: 'html', icon: <FileText size={16} /> },
  { keyword: 'css', icon: <Layout size={16} /> },
  { keyword: 'github', icon: <GitBranch size={16} /> }, // Usamos GitBranch para github
  { keyword: 'git', icon: <GitBranch size={16} /> },
  { keyword: 'vite', icon: <Zap size={16} /> },
  { keyword: 'maven', icon: <Box size={16} /> },
  { keyword: 'postman', icon: <Send size={16} /> },
];

export const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();
  const match = skillIcons.find(item => name.includes(item.keyword));
  return match ? match.icon : <Code size={16} />;
};