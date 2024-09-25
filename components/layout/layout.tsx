import Header from "./header";

export const siteTitle = "sorrowbacon | a comic";
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="container mx-auto max-w-[60rem] px-3 mb-12">
      <Header />
      {children}
    </div>
  );
}
