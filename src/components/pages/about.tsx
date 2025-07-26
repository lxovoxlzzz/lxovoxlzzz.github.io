import { useState } from "react";
import normal from "@/assets/normalface.png";
import funny from "@/assets/funnyface.png";

export default function About() {
  const [face, setFace] = useState(normal);

  return (
    <article className="h-svh bg-neutral-800 text-neutral-300">
      <section className="max-w-5xl mx-auto pt-36 pb-44">
        <h1 className="mb-16 text-4xl font-bold">About Me</h1>
        <img
          className="face"
          src={face}
          alt="face"
          width={150}
          height={150}
          onMouseEnter={() => setFace(funny)}
          onMouseLeave={() => setFace(normal)}
        />
        <div>
          <h2 className="mt-4 text-xl font-bold">U.Ezoe</h2>
          <p className="">
            Freelance Designer (8 yrs) & Front-end Developer (4 yrs)
          </p>
          <dl className="mt-4">
            <dt className="font-bold">title</dt>
            <dd>content</dd>
            <dt className="mt-4 font-bold">title</dt>
            <dd>content</dd>
          </dl>
        </div>
      </section>
    </article>
  );
}
