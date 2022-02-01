import Head from "next/head";
import Menu from "./..//Menu"; // this works also this way: ".././././././Menu"; or "..//////Menu"; with as many slashes as you want

export const Container = ({
  title,
  children,
}: {
  title?: string;
  children: any;
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Menu />
      <div>{children}</div>
    </div>
  );
};
