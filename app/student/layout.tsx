import StudentClientLayout from "./StudentClientLayout";

export const runtime = 'edge';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <StudentClientLayout>{children}</StudentClientLayout>;
}
