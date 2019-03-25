import * as React from "react";

interface HomeProps {
  title: string;
}

const Home = (props: HomeProps) => {
  const { title } = props;
  return <div>{title}</div>;
};

export default Home;
