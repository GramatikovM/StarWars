export type LoginData = {
  username: string;
  password: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ApiResponse = Post[];
