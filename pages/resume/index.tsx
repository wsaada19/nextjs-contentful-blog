import Layout from '@components/layouts/PageLayout';
import React from 'react';

export default function Resume() {
  return (
    <Layout description="My resume" title="Resume">
      <div className="rounded-lg border p-4 border-solid border-gray-400 mt-2">
        <h1 className="text-5xl pb-3 ">{yourName}</h1>
        <h2 className="text-2xl pb-2 text-blue-600">Full Stack Software Engineer</h2>
        <div className="text-lg md:grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Section title="Work Experience">
              {jobs.map((job) => {
                return <Job key={job.title} {...job} />;
              })}
            </Section>
          </div>
          <div className="col-span-1">
            <Section title="Relevant Skills">
              <h4 className="text-xl font-semibold">Advanced</h4>
              <List
                items={['JavaScript', 'Node', 'React & Vue', 'Azure', 'C#', 'DevOps & Testing']}
              />
              <h4 className="text-lg font-semibold">Experience with</h4>
              <List items={['Next.js', 'Express & Fastify', 'CosmosDB & SQL', 'AWS', 'Unity']} />
            </Section>
            <Section title="Education">
              <p className="font-semibold">University of Richmond</p>
              <p>Class of 2019</p>
              <p>Computer Science and Mathematics</p>
            </Section>
            <Section title="Interests">
              <List items={['Game Dev & Modding', 'Collectibles', 'Cleveland Sports', 'Running']} />
            </Section>
            <Section title="Contact">
              <a href="mailto:youremail">youremail</a>
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

type SectionProps = {
  title: string;
  children?: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <>
      <h3 className="text-xl py-1 font-semibold">{title}</h3>
      <hr className="bg-blue-600 h-0.5 mb-0.5 dark:bg-white" />
      {children}
    </>
  );
};

type JobProps = {
  title: string;
  date: string;
  company: string;
  location: string;
  bullets: string[];
};

const Job = ({ title, company, location, date, bullets }: JobProps) => {
  return (
    <div className="mb-1">
      <p>
        <strong>{title}</strong> {`(${date})`}
      </p>
      <p className="text-md">
        {company}, {location}
      </p>
      <List items={bullets} />
    </div>
  );
};

type ListProps = {
  items: string[];
};

const List = ({ items }: ListProps) => {
  return (
    <ul className="list-disc pl-4 text-md">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

// TODO: move data to Contentful
const yourName = 'Jon Doe';
const jobs = [
  {
    title: 'Principal Associate Software Engineer',
    company: 'Capital One',
    location: 'Richmond, VA',
    date: '2023 - Present',
    bullets: ['Working on an internal platform for managing micro-frontends at scale.'],
  },
  {
    title: 'Senior Associate Software Engineer',
    company: 'Capital One',
    location: 'Richmond, VA',
    date: '2022 - 2023',
    bullets: ['Developing a internal web application for call center agents with Node.js and Vue.'],
  },
  {
    title: 'Software Engineer II',
    company: 'CarMax',
    location: 'Richmond, VA',
    date: '2021 - 2022',
    bullets: [
      'Rebuilt sections of the website to improve SEO performance.',
      'Integrated our website with Contentful a CMS platform and developed tools to assist content editors using the platform.',
      'Created a web application using Next.js to improve page performance and Core Web Vitals to improve SEO.',
      'Worked with and mentored interns and new hires.',
    ],
  },
  {
    title: 'Software Engineer I',
    company: 'CarMax',
    location: 'Richmond, VA',
    date: '2019 - 2021',
    bullets: [
      'Developed a UI for a Knowledge Based Authentication system using React, Azure and .Net Core.',
      "Created our team's DevOps pipelines from scratch with Azure DevOps, fully automating our code integration and deployment process.",
      'Built acceptance tests using Puppeteer and Specflow to increase our confidence in frequently releasing code into production.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'UDig',
    location: 'Richmond, VA',
    date: '2018',
    bullets: [
      'Developed a dashboard application using React and Redux on the front-end and Node JS, Express, SQL and Redis on the back-end for internal company use.',
      'Learned how to design and build and application following agile software development best practices.',
    ],
  },
];
