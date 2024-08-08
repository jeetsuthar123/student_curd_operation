/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./auth/dto/signup.dto"),
          {
            SignUpDto: {
              email: { required: true, type: () => String, maxLength: 50 },
              password: { required: true, type: () => String, maxLength: 50 },
              name: { required: true, type: () => String, maxLength: 50 },
            },
          },
        ],
        [
          import("./auth/dto/logIn.dto"),
          {
            LogInDto: {
              email: { required: true, type: () => String, maxLength: 50 },
              password: { required: true, type: () => String, maxLength: 50 },
            },
          },
        ],
        [
          import("./student/dto/create-student.dto"),
          {
            CreateStudentDto: {
              name: { required: true, type: () => String, maxLength: 50 },
              roleNumber: { required: true, type: () => Number, maxLength: 50 },
              class: { required: true, type: () => Number, maxLength: 50 },
              gender: { required: true, type: () => String, maxLength: 50 },
              marks: { required: true, type: () => Number, maxLength: 50 },
              user: { required: true, type: () => String },
        
               },
          },
        ],
      ],
      
    },
  };
};
