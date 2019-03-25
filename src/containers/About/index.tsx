import * as React from "react";

interface AboutProps {
  title: string;
}

const About = (props: AboutProps) => {
  const { title } = props;
  return <div>{title}</div>;
};

export default About;
