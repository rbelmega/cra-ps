import fetch from 'isomorphic-fetch';

const myBio = {
  activities: [
  ],
  bio:
    '9+ years of experience in Web development. I have been involved in numerous projects of a small startup’s nature as well as big enterprise solutions. I have experience working in different team sizes and distribution all over the world. Had experience leading the technical solution and acting as a team lead. \n' +
    'At this moment I focus on modern new web UI frameworks and have good experience working with numerous frameworks and libraries such as Angular, React, NodeJS, etc. I had strong experience working with a couple of Business Intelligence platforms and creating customizable rich web UI dashboards in the ways of extending the native components and creating rich interfaces.',
};

const posts = [
  {
    name: 'should you be an engineer (part 1)?',
    date: '1 Mar 2016',
    id: '1',
    file: 'post-1.md',
  },
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBio = () =>
  delay(0).then(() => {
    return myBio;
  });

export const fetchPosts = () =>
  delay(0).then(() => {
    return posts;
  });

export const fetchBlogPost = blogID =>
  fetch(`/data/posts/${blogID}`).then(response => response.body);
