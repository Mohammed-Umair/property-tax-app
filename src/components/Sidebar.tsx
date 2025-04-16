// "use client"

// import { useState, useEffect } from 'react';
// import { cn } from '@/lib/utils';
// import { 
//   ChevronRight, 
//   LayoutDashboard, 
//   Users, 
//   Inbox, 
//   GitPullRequestDraft, 
//   FileCheck, 
//   FileText, 
//   ListChecks, 
//   Settings, 
//   LogOut 
// } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import { Button } from './ui/button';
// import Link from 'next/link';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   href: string;
//   expanded: boolean;
// }

// const SidebarItem = ({ icon, label, href, expanded }: SidebarItemProps) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center px-3 py-3 mb-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
//         isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
//       )}
//     >
//       <div className="mr-2 text-xl">{icon}</div>
//       {expanded && <span>{label}</span>}
//     </Link>
//   );
// };

// export function Sidebar() {
//   const [expanded, setExpanded] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   // Handle hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div
//       className={cn(
//         "h-screen bg-sidebar text-sidebar-foreground border-r shrink-0 transition-all duration-300 sticky top-0 left-0",
//         expanded ? "w-56" : "w-16"
//       )}
//     >
//       <div className="flex justify-end p-2">
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           onClick={toggleExpanded}
//           className="bg-blue-700 hover:bg-blue-700"
//         >
//           <ChevronRight className={cn(
//             "h-5 w-5 text-white  transition-transform",
//             expanded ? "rotate-180" : ""
//           )} />
//         </Button>
//       </div>

//       <div className="px-3 py-2">
//         <SidebarItem
//           icon={<LayoutDashboard />}
//           label="Dashboard"
//           href="/dashboard"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<Users />}
//           label="Accounts"
//           href="/dashboard/accounts"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<Inbox />}
//           label="Batches"
//           href="/dashboard/batches"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<GitPullRequestDraft />}
//           label="Resolution"
//           href="/dashboard/resolution"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<FileCheck />}
//           label="Assessments"
//           href="/dashboard/assessments"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<FileText />}
//           label="Appeal Letter"
//           href="/dashboard/appeal-letter"
//           expanded={expanded}
//         />
        
//         <SidebarItem
//           icon={<ListChecks />}
//           label="Summary"
//           href="/dashboard/summary"
//           expanded={expanded}
//         />
//       </div>

//       <div className="mt-auto pb-4 px-3">
//         <SidebarItem
//           icon={<Settings />}
//           label="Settings"
//           href="/dashboard/settings"
//           expanded={expanded}
//         />
        
//         <div className="mt-6">
//           <Button 
//             variant="ghost" 
//             className={cn(
//               "flex items-center px-3 py-2 rounded-md bg-sidebar-primary text-sidebar-primary-foreground hover:bg-opacity-90",
//               !expanded && "justify-center"
//             )}
//           >
//             <LogOut className={expanded ? "mr-2" : ""} />
//             {expanded && <span>Logout</span>}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight,
  LayoutGrid, 
  User, 
  FileText, 
  Scale, 
  ClipboardCheck, 
  Building, 
  ListChecks, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  expanded: boolean;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, expanded, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-3 text-white hover:bg-white/10 transition-colors",
        expanded ? "px-4" : "justify-center px-2",
        active && "bg-[#375a7e] text-white"
      )}
    >
      <div className={cn("text-lg", expanded ? "mr-3" : "mx-auto")}>
        {icon}
      </div>
      {expanded && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-[#1e3a5a] flex flex-col justify-between rounded-r-lg relative transition-all duration-300",
        expanded ? "w-56" : "w-16"
      )}
    >
      {/* Toggle button */}
      <div className="absolute -right-3 top-4">
        <button 
          onClick={toggleSidebar}
          className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md focus:outline-none"
        >
          <ChevronRight 
            className={cn(
              "h-4 w-4 text-[#1e3a5a] transition-transform",
              expanded ? "rotate-180" : ""
            )} 
          />
        </button>
      </div>
      
      {/* Main menu items */}
      <div className="mt-10">
        <SidebarItem
          icon={<LayoutGrid size={20} />}
          label="Dashboard"
          href="/dashboard"
          expanded={expanded}
          active={pathname === '/dashboard'}
        />
        
        <SidebarItem
          icon={<User size={20} />}
          label="Accounts"
          href="/dashboard/accounts"
          expanded={expanded}
          active={pathname === '/dashboard/accounts'}
        />
        
        <SidebarItem
          icon={<FileText size={20} />}
          label="Batches"
          href="/dashboard/batches"
          expanded={expanded}
          active={pathname === '/dashboard/batches'}
        />
        
        <SidebarItem
          icon={<Scale size={20} />}
          label="Resolution"
          href="/dashboard/resolution"
          expanded={expanded}
          active={pathname === '/dashboard/resolution'}
        />
        
        <SidebarItem
          icon={<ClipboardCheck size={20} />}
          label="Assessments"
          href="/dashboard/assessments"
          expanded={expanded}
          active={pathname === '/dashboard/assessments'}
        />
        
        <SidebarItem
          icon={<Building size={20} />}
          label="Appeal Letter"
          href="/dashboard/appeal-letter"
          expanded={expanded}
          active={pathname === '/dashboard/appeal-letter'}
        />
        
        <SidebarItem
          icon={<ListChecks size={20} />}
          label="Summary"
          href="/dashboard/summary"
          expanded={expanded}
          active={pathname === '/dashboard/summary'}
        />
      </div>
      
      {/* Bottom items */}
      <div className="mb-4 px-2">
        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          href="/dashboard/settings"
          expanded={expanded}
          active={pathname === '/dashboard/settings'}
        />
        
        <div className={cn("mt-3", expanded ? "px-2" : "px-1")}>
          <button 
            className={cn(
              "bg-[#2ec4b6] hover:bg-[#26a99d] text-white py-3 rounded-md flex items-center",
              expanded ? "w-full justify-center" : "mx-auto px-2"
            )}
          >
            <LogOut size={18} className={expanded ? "mr-2" : ""} />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

















// "use client"

// import { useState, useEffect } from 'react';
// import { cn } from '@/lib/utils';
// import { 
//   ChevronRight,
//   LayoutGrid, 
//   User, 
//   FileText, 
//   Scale, 
//   ClipboardCheck, 
//   Building, 
//   ListChecks, 
//   Settings, 
//   LogOut 
// } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   href: string;
//   active?: boolean;
// }

// const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center px-4 py-3 text-white hover:bg-white/10 transition-colors",
//         active && "bg-[#375a7e] text-white"
//       )}
//     >
//       <div className="mr-3 text-lg">{icon}</div>
//       <span>{label}</span>
//     </Link>
//   );
// };

// export function Sidebar() {
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);

//   // Handle hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="h-screen bg-[#1e3a5a] w-56 flex flex-col justify-between rounded-r-lg relative">
//       {/* Toggle button */}
//       <div className="absolute -right-3 top-4">
//         <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
//           <ChevronRight className="h-4 w-4 text-[#1e3a5a]" />
//         </div>
//       </div>
      
//       {/* Main menu items */}
//       <div className="mt-10">
//         <SidebarItem
//           icon={<LayoutGrid size={20} />}
//           label="Dashboard"
//           href="/dashboard"
//           active={pathname === '/dashboard'}
//         />
        
//         <SidebarItem
//           icon={<User size={20} />}
//           label="Accounts"
//           href="/dashboard/accounts"
//           active={pathname === '/dashboard/accounts'}
//         />
        
//         <SidebarItem
//           icon={<FileText size={20} />}
//           label="Batches"
//           href="/dashboard/batches"
//           active={pathname === '/dashboard/batches'}
//         />
        
//         <SidebarItem
//           icon={<Scale size={20} />}
//           label="Resolution"
//           href="/dashboard/resolution"
//           active={pathname === '/dashboard/resolution'}
//         />
        
//         <SidebarItem
//           icon={<ClipboardCheck size={20} />}
//           label="Assessments"
//           href="/dashboard/assessments"
//           active={pathname === '/dashboard/assessments'}
//         />
        
//         <SidebarItem
//           icon={<Building size={20} />}
//           label="Appeal Letter"
//           href="/dashboard/appeal-letter"
//           active={pathname === '/dashboard/appeal-letter'}
//         />
        
//         <SidebarItem
//           icon={<ListChecks size={20} />}
//           label="Summary"
//           href="/dashboard/summary"
//           active={pathname === '/dashboard/summary'}
//         />
//       </div>
      
//       {/* Bottom items */}
//       <div className="mb-4 px-2">
//         <SidebarItem
//           icon={<Settings size={20} />}
//           label="Settings"
//           href="/dashboard/settings"
//           active={pathname === '/dashboard/settings'}
//         />
        
//         <div className="px-2 mt-3">
//           <button 
//             className="w-full bg-[#2ec4b6] hover:bg-[#26a99d] text-white py-3 rounded-md flex items-center justify-center"
//           >
//             <LogOut size={18} className="mr-2" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
