interface User {
    name: string;
    username: string;
  }
  
  export interface Advert {
    id: number;
    userId: number;
    content: string;
    updatedAt: string;
    user: User;
  }
  
  export interface AdvertContent {
    content: string;
  }
  