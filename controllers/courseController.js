const courses = [
  {
    name: "Learning Javascript",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "",
      thumbnail: "",
    },
    price: 200,
    tag: "javascript",
  },
  {
    name: "Learning Javascript",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "",
    },
    price: 200,
    tag: "javascript",
  },
  {
    name: "Learning Python",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "",
    },
    price: 200,
    tag: "python",
  },
];

const categories = ["All","Cyber Security","Web Developmet", "AI", "ML", "Python", "Javascript", "UI UX", "PHP", "Kali Linux", "Java"];
const filtered = courses.filter((course) => course.tag === course.tag);

module.exports = {
  categories,
  courses,
};
