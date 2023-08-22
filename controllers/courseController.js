const courses = [
  {
    name: "Introduction to Javascript with Ace: Beginner's Guide",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "./assets/img/avatar.png",
    },
    price: "Free",
    thumbnail: "./assets/img/pexels-andrea-piacquadio-3762940.jpg",
    tag: "javascript",
  },
  {
    name: "Learning Javascript Intermediate with Smooch",
    tutor: {
      tutorName: "Mica Nduamon",
      tutorImage: "./assets/img/me1.jpeg",
    },
    price: 490,
    tag: "javascript",
    thumbnail: "./assets/img/pexels-andrea-piacquadio-3769021.jpg",
  },
  {
    name: "Learning Python and Machine Learning with Einstein",
    tutor: {
      tutorName: "Albert Prah",
      tutorImage: "./assets/img/me2.jpeg",
    },
    price: 500,
    thumbnail: "./assets/img/pexels-anna-nekrashevich-7552568.jpg",
    tag: "python",
  },
  {
    name: "Introduction to Javascript with Saviour: Beginner's Guide",
    tutor: {
      tutorName: "Saviour Kwofie",
      tutorImage: "./assets/img/avatar.png",
    },
    price: 240,
    thumbnail: "./assets/img/pexels-andrea-piacquadio-3762940.jpg",
    tag: "javascript",
  },
  {
    name: "Introduction to Javascript with Corsa: Beginner's Guide",
    tutor: {
      tutorName: "Corsa Academy",
      tutorImage: "./assets/img/logo.png",
    },
    price: 105,
    thumbnail: "./assets/img/guy-happy-in-couch.8da7cbfccd005211e227.jpg",
    tag: ["javascript", "web development"],
  },
  {
    name: "Music with Jeniffer and the Joyful Tunes",
    tutor: {
      tutorName: "Jennifer Lopez",
      tutorImage: "./assets/img/girl-yellow-sweater-afro-phone.359181bfef6d9ee07741.jpg",
    },
    price: "GHS 29/h",
    thumbnail: "./assets/img/girl-yellow-sweater-afro-phone.359181bfef6d9ee07741.jpg",
    tag: "music",
  },
  {
    name: "Introduction to NodeJS. A no bullshit guide.",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "./assets/img/avatar.png",
    },
    price: 250,
    thumbnail: "./assets/img/pexels-andrea-piacquadio-3762940.jpg",
    tag: "javascript",
  },
  {
    name: "Introduction to commerce. A beginners guide",
    tutor: {
      tutorName: "Perfect Avuglah",
      tutorImage: "./assets/img/girl-clothing-rack.adf9515bb1776235b25d.jpg",
    },
    price: 100,
    thumbnail: "./assets/img/girl-clothing-rack.adf9515bb1776235b25d.jpg",
    tag: "javascript",
  },
  {
    name: "Introduction to Javascript with Ace: Beginner's Guide",
    tutor: {
      tutorName: "Gideon Appau",
      tutorImage: "./assets/img/avatar.png",
    },
    price: 99,
    thumbnail: "./assets/img/girl-calculator-phone-wide.a6df2efc4edb7fdcc575.jpg",
    tag: "javascript",
  },
];
const homeCourse = [];
for (let i = 0; i < 3; i++) {
  homeCourse.push(courses[i]);
}
const categories = [
  "All",
  "Cyber Security",
  "Web Development",
  "AI",
  "ML",
  "Python",
  "Javascript",
  "UI UX",
  "PHP",
  "Kali Linux",
  "Java",
];

const filtered = courses.filter((course) => course.tag === course.tag);
module.exports = {
  categories,
  courses,
  homeCourse
};
