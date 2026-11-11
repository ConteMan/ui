"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type AdminNavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  render?: React.ReactElement;
  active?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

export type AdminNavigationGroup = {
  id: string;
  title?: string;
  items: AdminNavigationItem[];
};

export type AdminShellLabels = {
  navigation: string;
  mobileTitle: string;
  mobileDescription?: string;
  openNavigation: string;
  closeNavigation: string;
  expandSidebar: string;
  collapseSidebar: string;
};

type SidebarSlot = React.ReactNode | ((compact: boolean) => React.ReactNode);

export type AdminShellProps = {
  groups: AdminNavigationGroup[];
  bottomGroups?: AdminNavigationGroup[];
  labels: AdminShellLabels;
  brand?: SidebarSlot;
  footer?: SidebarSlot;
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
};

const StickyTarget = React.createContext<HTMLDivElement | null>(null);

export function AdminPageLayout({
  header,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  header: React.ReactNode;
}) {
  const [target, setTarget] = React.useState<HTMLDivElement | null>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const layout = layoutRef.current;
    const stickyHeader = headerRef.current;
    if (!layout || !stickyHeader) return;
    const update = () => {
      layout.style.setProperty(
        "--admin-sticky-height",
        `${stickyHeader.getBoundingClientRect().height}px`,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(stickyHeader);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <StickyTarget.Provider value={target}>
      <div
        ref={layoutRef}
        data-slot="admin-page-layout"
        className={cn(
          "relative min-h-0 min-w-0 flex-1 overflow-y-auto [scroll-padding-top:var(--admin-sticky-height,0px)] [&_:where(input,button,a,textarea,select,summary,[tabindex])]:scroll-mt-3",
          className,
        )}
        {...props}
      >
        <div
          ref={headerRef}
          data-slot="admin-sticky-header"
          className="sticky top-0 z-20 bg-background"
        >
          {header}
          <div
            ref={setTarget}
            data-slot="admin-page-sticky"
            className="border-b border-border px-4 py-3 text-sm empty:hidden md:px-6 [&_button]:min-h-11 [&_button]:min-w-11"
          />
        </div>
        <div data-slot="admin-page-content" className="min-w-0">
          {children}
        </div>
      </div>
    </StickyTarget.Provider>
  );
}

export function AdminPageSticky({ children }: { children: React.ReactNode }) {
  const target = React.useContext(StickyTarget);
  return target ? createPortal(children, target) : null;
}

function NavigationGroups({
  groups,
  compact,
  onNavigate,
}: {
  groups: AdminNavigationGroup[];
  compact: boolean;
  onNavigate?: () => void;
}) {
  return groups.map((group, index) => (
    <React.Fragment key={group.id}>
      {index > 0 && <SidebarSeparator />}
      <SidebarGroup>
        {group.title && !compact && (
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
        )}
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                render={
                  item.render ??
                  (item.href ? <a href={item.href} /> : undefined)
                }
                type={item.href || item.render ? undefined : "button"}
                isActive={item.active}
                aria-current={item.active ? "page" : undefined}
                aria-label={item.label}
                aria-disabled={item.disabled || undefined}
                disabled={item.href || item.render ? undefined : item.disabled}
                tabIndex={item.disabled ? -1 : undefined}
                tooltip={compact ? item.label : undefined}
                className="min-h-11 text-sm group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center"
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                    return;
                  }
                  item.onSelect?.();
                  onNavigate?.();
                }}
              >
                <span aria-hidden="true" className="shrink-0">
                  {item.icon}
                </span>
                {!compact && <span>{item.label}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </React.Fragment>
  ));
}

function Navigation({
  groups,
  bottomGroups = [],
  labels,
  brand,
  footer,
  compact,
  onNavigate,
}: Pick<
  AdminShellProps,
  "groups" | "bottomGroups" | "labels" | "brand" | "footer"
> & {
  compact: boolean;
  onNavigate?: () => void;
}) {
  const slot = (content: SidebarSlot) =>
    typeof content === "function" ? content(compact) : content;
  return (
    <>
      {brand && (
        <SidebarHeader className="min-h-16 justify-center">
          {slot(brand)}
        </SidebarHeader>
      )}
      <nav
        aria-label={labels.navigation}
        className="flex min-h-0 flex-1 flex-col"
      >
        <SidebarContent className="group-data-[collapsible=icon]:overflow-y-auto">
          <NavigationGroups
            groups={groups}
            compact={compact}
            onNavigate={onNavigate}
          />
          {bottomGroups.length > 0 && (
            <div data-slot="admin-navigation-bottom" className="mt-auto pt-4">
              <SidebarSeparator />
              <NavigationGroups
                groups={bottomGroups}
                compact={compact}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </SidebarContent>
      </nav>
      {footer && (
        <SidebarFooter className="border-t border-sidebar-border">
          {slot(footer)}
        </SidebarFooter>
      )}
    </>
  );
}

function AdminShellFrame(props: AdminShellProps) {
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useSidebar();
  React.useEffect(() => {
    if (!isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);
  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <aside
        data-slot="admin-sidebar"
        data-collapsible={open ? undefined : "icon"}
        className={cn(
          "group hidden h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex",
          open ? "w-(--sidebar-width)" : "w-(--sidebar-width-icon)",
        )}
      >
        <Navigation {...props} compact={!open} />
      </aside>
      <AdminPageLayout
        header={
          <div className="flex min-h-16 items-center gap-3 border-b border-border px-4 py-2 md:px-6">
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 shrink-0 md:hidden"
                />
              }
              aria-label={props.labels.openNavigation}
            >
              <PanelLeftIcon aria-hidden="true" />
            </SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-11 shrink-0 md:inline-flex"
              aria-label={
                open ? props.labels.collapseSidebar : props.labels.expandSidebar
              }
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <PanelLeftIcon aria-hidden="true" />
            </Button>
            <div className="min-w-0 flex-1">{props.header}</div>
          </div>
        }
      >
        {props.children}
      </AdminPageLayout>
      <SheetContent
        side="left"
        closeLabel={props.labels.closeNavigation}
        className="w-[min(20rem,calc(100vw-2rem))]! gap-0 bg-sidebar p-0 text-sidebar-foreground [&_[data-slot=sheet-close]]:size-11"
      >
        <SheetHeader className="min-h-16 justify-center border-b border-sidebar-border pr-16">
          <SheetTitle>{props.labels.mobileTitle}</SheetTitle>
          <SheetDescription
            className={props.labels.mobileDescription ? undefined : "sr-only"}
          >
            {props.labels.mobileDescription}
          </SheetDescription>
        </SheetHeader>
        <Navigation
          {...props}
          compact={false}
          onNavigate={() => setOpenMobile(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

export function AdminShell({ className, style, ...props }: AdminShellProps) {
  return (
    <SidebarProvider
      defaultOpen={props.defaultOpen}
      open={props.open}
      onOpenChange={props.onOpenChange}
      className={cn(
        "h-svh min-h-0 overflow-hidden bg-background text-foreground",
        className,
      )}
      style={
        { "--sidebar-width-icon": "4rem", ...style } as React.CSSProperties
      }
    >
      <AdminShellFrame {...props} />
    </SidebarProvider>
  );
}
