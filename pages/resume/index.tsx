import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout';

export default function Resume() {
  return (
    <Layout description="My resume">
      <Head>
        <title>Resume</title>
      </Head>
      <div className="rounded-lg border p-4 border-solid border-gray-400 mt-2">
        <h1 className="text-5xl pb-3 ">Will Saada</h1>
        <h2 className="text-2xl pb-2 text-blue-600">Full Stack Software Engineer</h2>
        <div className="md:grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Section title="Work Experience">
              {jobs.map((job) => {
                return <Job key={job.title} {...job} />;
              })}
            </Section>
          </div>
          <div className="col-span-1">
            <Section title="Relevant Skills">
              <h4 className="text-lg font-semibold">Advanced</h4>
              <List items={['C# & .NET', 'JavaScript', 'React', 'Azure', 'HTML/CSS']} />
              <h4 className="text-lg font-semibold">Experience with</h4>
              <List items={['Next.js', 'Node & Express', 'CosmosDB & SQL', 'Docker', 'Unity']} />
            </Section>
            <Section title="Education">
              <p className="font-semibold">Univeristy of Richmond</p>
              <p>Class of 2019</p>
              <p>Computer Science and Mathematics</p>
            </Section>
            <Section title="Interests">
              <List
                items={['Game Dev & Modding', 'DevOps & Testing', 'Cleveland Sports', 'Running']}
              />
            </Section>
            <Section title="Contact">
              <a href="mailto:willsaada19@gmail.com">willsaada19@gmail.com</a>
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
      <hr className="bg-blue-600 h-0.5 mb-0.5" />
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
        <strong>{title}</strong> {date}
      </p>
      <p className="text-sm">
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
    <ul className="list-disc pl-4 text-sm">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

// TODO: move data to Contentful
const jobs = [
  {
    title: 'Software Engineer II',
    company: 'CarMax',
    location: 'Richmond, VA',
    date: 'March 2021 - Present',
    bullets: [
      'Rebuilt sections of the website to improve SEO performance.',
      'Integrated Contentful a CMS platform into the website and built tools to help content editors add content and articles to the website.',
      'Built new web application using Next.js to improve page performance and Core Web Vitals on experiences to drive sales through SEO performance.',
    ],
  },
  {
    title: 'Software Engineer I',
    company: 'CarMax',
    location: 'Richmond, VA',
    date: 'June 2019 - March 2021',
    bullets: [
      'Leveraged a modern Identity as a Service Platform to replace our legacy CIAM solution using industry best practices such as OAuth and OpenId Connect.',
      'Developed a custom UI for a knowledge based authentication system using React, Azure and .Net Core.',
      'Worked on transitioning our team"s CI/CD pipelines to Azure DevOps, fully automating our deployment process.',
      'Built acceptance tests using Puppeteer and Specflow to improve our confidence in releasing code frequently into production.',
    ],
  },
  {
    title: 'IT Innovation Intern',
    company: 'UDig',
    location: 'Richmond, VA',
    date: 'June 2018 - December 2018',
    bullets: [
      'Developed a dashboard application using React and Redux on the front-end and Node JS, Express, SQL and Redis on the back-end for internal company use.',
      'Learned the importance of teamwork and communication while following standard software development protocols while learning from senior engineers within the company.',
    ],
  },
];
