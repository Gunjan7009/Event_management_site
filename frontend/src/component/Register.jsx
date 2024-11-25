import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import api from "../data/api";
import { useNavigate } from 'react-router-dom';
const Register = () => {
const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // const onSubmit = (data) => {
    //     console.log("Form Submitted", data);
    //     reset(); 
    // };
    const onSubmit = async (data) => {
        try {
            const response = await api.post('/register',  {
              name: data.name,
              email: data.email,
              password: data.password,
          });
console.log(response.status);
          if (response.status === 201) {
            // Handle successful login, e.g., store token, redirect, etc.
            console.log("Register successful", response.data);
            setMessage('Signup Successful Check your mail to activate the acount')
            setErrorMessage('');
            // Reset form fields
            reset();

            // Redirect to another page (e.g., dashboard)
            setTimeout(() => {
              navigate('/login');// Clear message after a few seconds
          }, 5000);
           
        }

            
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
          setErrorMessage(error.response ? error.response.data : error.message);
          setMessage('');
            // Optionally handle error (e.g., show an error message)
        }
    };

  return (
    <> 
     <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517707711963-adf9078bdf01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            >
                <div>
      <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="relative bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg border border-opacity-30 border-white w-full sm:w-96 md:w-[450px] lg:w-[550px] h-auto sm:h-96 md:h-112 lg:h-[600px]">
          <div className="absolute inset-0 bg-white opacity-10 rounded-2xl filter blur-xl"></div>
          <div className="relative z-10">
            <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-4xl text-3xl">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-opacity-70"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email is invalid',
                    },
                  })}
                  className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-opacity-70"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block xl:text-2xl lg:text-2xl md:text-xl text-blue-950 font-semibold mb-2 mt-10">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
                  className="w-full text-black text-xl px-4 py-3 lg:w-full sm:w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-opacity-70"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-64 text-2xl items-center bg-purple-400 text-blue-950 font-semibold py-6 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2
                                             focus:ring-purple-500 focus:ring-opacity-50 transform transition duration-200 
                                             hover:scale-105 shadow-md lg:mt-[35px] lg:ml-[165px] md:mt-[35px] md:ml-[115px] sm:mt-[35px] sm:ml-[90px] xs:mt-[35px] xs:ml-[65px] md:w-50 sm:w-36 xs:w-36 xs:py-4 xs:text-lg"
              >
                Sign Up
              </button>
              {message && <p className="text-lg text-green-950 text-center mt-1">{message}</p>}
              {errorMessage && <p className="text-lg text-red-500 text-center mt-1">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Register
// import { useState } from 'react';
// import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

// function Register() {
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   return (
//     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>First name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="First name"
//             defaultValue="Mark"
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Last name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Last name"
//             defaultValue="Otto"
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Username</Form.Label>
//           <InputGroup hasValidation>
//             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//             <Form.Control
//               type="text"
//               placeholder="Username"
//               aria-describedby="inputGroupPrepend"
//               required
//             />
//             <Form.Control.Feedback type="invalid">
//               Please choose a username.
//             </Form.Control.Feedback>
//           </InputGroup>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom03">
//           <Form.Label>City</Form.Label>
//           <Form.Control type="text" placeholder="City" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid city.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom04">
//           <Form.Label>State</Form.Label>
//           <Form.Control type="text" placeholder="State" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid state.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom05">
//           <Form.Label>Zip</Form.Label>
//           <Form.Control type="text" placeholder="Zip" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid zip.
//           </Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Form.Group className="mb-3">
//         <Form.Check
//           required
//           label="Agree to terms and conditions"
//           feedback="You must agree before submitting."
//           feedbackType="invalid"
//         />
//       </Form.Group>
//       <Button type="submit">Submit form</Button>
//     </Form>
//   );
// }

// export default Register;