interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Message {
  _id: string;
  text: string;
  createdAt: string;
  user: string;
}

interface Chat {
  _id: string;
  users: string;
}
