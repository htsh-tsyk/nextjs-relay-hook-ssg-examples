import Link from "next/link";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <span> | </span>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span> | </span>
      <Link href="/client-only">
        <a>Client only</a>
      </Link>

      <p>This is the about page</p>
    </div>
  );
};

export default About;
