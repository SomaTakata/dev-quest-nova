"use client";
import { useLocalStorage } from "react-use";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
interface ProjectItem {
  id: string;
  companyName: string;
  deadline: string;
  url: string;
}

interface ProjectItemProps {
  value: ProjectItem[] | undefined;
  setValue: Dispatch<SetStateAction<ProjectItem[] | undefined>>;
}
export const DataContext = createContext<ProjectItemProps>({
  value: undefined,
  setValue: () => {}, // 空の関数を設定
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [value, setValue, remove] = useLocalStorage<ProjectItem[]>("test", []);
  console.log(value);
  return (
    <DataContext.Provider value={{ value, setValue }}>
      {children}
    </DataContext.Provider>
  );
}
