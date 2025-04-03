// Utility function to sanitize any object, including nested objects and arrays
export const sanitizeObject = (obj, fieldsToInclude) => {
  if (!obj) return null;

  // If the input is an array, recursively sanitize each element
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, fieldsToInclude));
  }

  // If the input is an object, create a sanitized version
  if (typeof obj === "object") {
    const sanitized = {};
    fieldsToInclude.forEach((field) => {
      if (obj[field] !== undefined) {
        // Recursively sanitize nested objects or arrays
        sanitized[field] =
          typeof obj[field] === "object" ? sanitizeObject(obj[field], getFieldsFor(field)) : obj[field];
      }
    });
    return sanitized;
  }

  // If the input is neither an object nor an array, return it as is
  return obj;
};

// Helper function to get fields to include for specific nested objects
const getFieldsFor = (field) => {
  switch (field) {
    case "author":
      return ["username", "firstName", "lastName", "isVerified","avatar"];
    case "comment":
      return ["content", "author", "image", "createdAt", "updatedAt"];
    default:
      return [];
  }
};

// Specific function for sanitizing user objects
export const sanitizeUser = (user) => {
  const fieldsToInclude = [
    "email",
    "username",
    "firstName",
    "lastName",
    "isVerified",
    "bio",
    "followers",
    "following",
    "avatar",
    "provider",
  ];

  return sanitizeObject(user, fieldsToInclude);
};

// Specific function for sanitizing post objects
export const sanitizePost = (post) => {
  const fieldsToInclude = [
    "_id",
    "content",
    "tags",
    "author",
    "image",
    "comments",
    "commentCount",
    "likeCount",
    "createdAt",
    "updatedAt",
  ];

  return sanitizeObject(post, fieldsToInclude);
};

export const sanitizeComment = (comment) => {
  const fieldToInclude = [
    "content",
    "author",
    "image",
    "createdAt",
    "updatedAt"
  ];
  return sanitizeObject(comment, fieldToInclude);
};

const postData = [
  {
    _id: "67e4b33873e145ca0715e333",
    content: "Just finished a 10K run! 🏃‍♂️",
    tags: ["fitness", "running"],
    author: {
      _id: "67e4ac8b47024bd2b1c81a5a",
      username: "admin_user",
      firstName: "Admin",
      lastName: "User",
      isVerified: true,
    },
    image: [],
    comments: [],
    commentCount: 0,
    likeCount: 39,
    createdAt: "2025-03-27T02:08:56.805Z",
    updatedAt: "2025-03-27T02:08:56.805Z",
  },
];

const sanitizedPosts = sanitizePost(postData);

console.log(sanitizedPosts);
// Output:
// [
//   {
//     content: "Just finished a 10K run! 🏃‍♂️",
//     tags: ["fitness", "running"],
//     author: {
//       username: "admin_user",
//       firstName: "Admin",
//       lastName: "User",
//       isVerified: true
//     },
//     image: [],
//     comments: [],
//     commentCount: 0,
//     likeCount: 39,
//     createdAt: "2025-03-27T02:08:56.805Z",
//     updatedAt: "2025-03-27T02:08:56.805Z"
//   }
// ]