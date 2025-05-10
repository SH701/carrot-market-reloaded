import TabBar from "@/components/tab-bar";

export const dynamic = "force-dynamic";

export default function TabsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
          {children}
        <TabBar />
      </>
    );
  }
  