import { useEffect, useState } from 'react'


function ProfileInfo() {

    const [userData,setUserData] = useState('');
  useEffect(() => {
    const localuser = localStorage.getItem('userData');
    
    setUserData(JSON.parse(localuser));
    console.log(userData);
}, []);
  return (
    <>
      {userData.role === 'alumni'&&(<><div className="bg-gray-900 text-white">
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">
              As a Designer with a strong foundation in HTML, CSS, and proficiency in Microsoft Applications, I bring a unique blend of technical skills and creative thinking to every project I undertake. With a passion for logic building and problem-solving, I strive to deliver innovative solutions that exceed expectations.

My journey in the world of technology began during my time at Airport School Ahmedabad, where I completed my 12th Commerce education. It was here that I discovered my love for design and programming. Eager to deepen my knowledge, I pursued a Master of Science in Information Technology at KS School of Business Management, which I am currently enrolled in (2022-2025).

During my academic journey, I have actively engaged in various projects and honed my skills in Python, particularly in developing Tkinter GUI applications. Notable projects include an Employee Payroll Management System, a Book Store platform, Career Guidance tools, Cloth Management systems, and even an innovative project called "Jarvis."

My expertise extends beyond Python, encompassing a range of web development technologies. I am proficient in HTML, CSS, and JavaScript, and have hands-on experience in designing and implementing registration forms, websites, and user interfaces. Additionally, I possess a solid understanding of backend development using MySQL, having successfully implemented it in projects such as the Employee Payroll Management System and the Book Store.

In addition to my technical accomplishments, I take pride in my achievements outside the academic sphere. I was awarded the 1st prize at Indus University, highlighting my dedication and excellence in my field. Furthermore, I was recognized as a Runner Up in the Cyber shadez IT Quiz at GLS University, showcasing my passion for staying up to date with the latest advancements in technology.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Graduation Year</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">2025</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Educational Qualification</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">BSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current Degree / Current Job</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">MSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current College / Current Company</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">KS School of Business Management</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Interests / Hobbies</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Swimming, Cooking, Fishing</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Expertise</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Web Development</h3>
            </div>
          </div>
        </div>
      </div>
    </div></>)}
      {userData.role === 'teacher'&&(<><div className="bg-gray-900 text-white">
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">
                sdhkffffffffffffffffffffffffffffffkjshkjfhj hbkdafhhkjdfhkjhfs
                hjkdhfjhjfdsh c cbbcjb dkhhdkjfshkjshfdjkhfjkhdfdfshfkjbvjgvjkfdvbsdhkffffffffffffffffffffffffffffffkjshkjfhj hbkdafhhkjdfhkjhfs
                hjkdhfjhjfdsh c cbbcjb dkhhdkjfshkjshfdjkhfjkhdfdfshfkjbvjgvjkfdv
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Educational Qualification</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">BSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Job Title</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">MSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">KS School of Business Management</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Interests / Hobbies</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Swimming, Cooking, Fishing</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Expertise</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Web Development</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
</>)}
      {userData.role === 'student'&&(<> <div className="bg-gray-900 text-white">
      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">
                sdhkffffffffffffffffffffffffffffffkjshkjfhj hbkdafhhkjdfhkjhfs
                hjkdhfjhjfdsh c cbbcjb dkhhdkjfshkjshfdjkhfjkhdfdfshfkjbvjgvjkfdvbsdhkffffffffffffffffffffffffffffffkjshkjfhj
                hbkdafhhkjdfhkjhfs hjkdhfjhjfdsh c cbbcjb dkhhdkjfshkjshfdjkhfjkhdfdfshfkjbvjgvjkfdv
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Educational Qualification</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">BSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current Pursued Degree</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">MSC(CA&IT)</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Expected Graduation Year</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">2025</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Interests / Hobbies</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Swimming, Cooking, Fishing</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Expertise</h2>
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Web Development</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
</>)}
    </>
  )
}

export default ProfileInfo
