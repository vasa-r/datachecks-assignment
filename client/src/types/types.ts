export interface Blog {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  content: string;
  user_id: string;
  created_at: string;
  creator: {
    full_name: string;
    email: string;
  };
}
