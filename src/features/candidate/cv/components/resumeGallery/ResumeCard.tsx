import styles from "./ResumeCard.module.css";

export default function ResumeCard() {
  return (
    <div className={styles["resume-card"]}>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white p-6 flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
            <img src="https://via.placeholder.com/150" alt="Profile Picture" />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-lg">Software Engineer</p>
            <p className="mt-2 text-sm">Location: San Francisco, CA</p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500">About Me</h2>
          <div className="w-16 h-1 bg-blue-500 my-2"></div>
          <p className="text-gray-700 text-sm">
            A highly motivated and skilled software engineer with experience in
            building scalable web applications. Passionate about learning new
            technologies and solving challenging problems.
          </p>
        </div>

        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-blue-500">Skills</h2>
          <div className="w-16 h-1 bg-blue-500 my-2"></div>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>JavaScript, React, and Node.js</li>
            <li>Python and Django</li>
            <li>Database Management (MySQL, MongoDB)</li>
            <li>Version Control (Git, GitHub)</li>
            <li>Problem-solving and Critical Thinking</li>
          </ul>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500">Work Experience</h2>
          <div className="w-16 h-1 bg-blue-500 my-2"></div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Software Engineer</h3>
            <p className="text-sm text-gray-500">
              TechCorp Inc. | Jan 2020 - Present
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Worked on developing and maintaining scalable web applications.
              Collaborated with cross-functional teams to design and implement
              new features, resulting in a 20% increase in user engagement.
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Junior Developer</h3>
            <p className="text-sm text-gray-500">
              CodeLabs | Jul 2018 - Dec 2019
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Assisted in the development of various client projects, debugging
              issues, and optimizing code to enhance performance. Gained
              hands-on experience in web development tools and frameworks.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-blue-500">Education</h2>
          <div className="w-16 h-1 bg-blue-500 my-2"></div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Bachelor's Degree in Computer Science
            </h3>
            <p className="text-sm text-gray-500">
              University of California, Berkeley | 2014 - 2018
            </p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500">Contact</h2>
          <div className="w-16 h-1 bg-blue-500 my-2"></div>
          <ul className="text-gray-700 text-sm">
            <li>Email: john.doe@example.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Website: www.johndoe.com</li>
            <li>LinkedIn: linkedin.com/in/johndoe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
