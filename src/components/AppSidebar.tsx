'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/AppLogo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  MessagesSquare,
} from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/resume-analyzer',
    icon: FileText,
    label: 'Resume Analyzer',
  },
  {
    href: '/mock-interview',
    icon: MessagesSquare,
    label: 'Mock Interview',
  },
  {
    href: '/job-recommendations',
    icon: Briefcase,
    label: 'Job Recommendations',
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="md:hidden">
            <Link href="/">
              <AppLogo className="size-6 text-sidebar-primary" />
            </Link>
          </Button>
          <AppLogo className="size-6 text-sidebar-primary" />
          <span className="font-headline text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Career AI Pro
          </span>
          <div className="flex-1" />
          <SidebarTrigger className="text-sidebar-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
