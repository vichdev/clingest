import { Inter } from "next/font/google";
import StyledJsxRegistry from "@/styles/GlobalStyles";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clin gest",
  description: "Created by Victor Hugo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
