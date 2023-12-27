import {currentUser} from "@clerk/nextjs";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {getUserByClerkId} from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userInfo = await getUserByClerkId(user?.id);

  return (
    <div className="flex min-h-screen flex-col">
      <Header role={userInfo.role} />
      <main className="flex-1 bg-gray-100 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
