export interface PostOffice {
    Pincode: string;
    Name?: string;
    State?: string;
  }
  
  export interface ApiResponse {
    Message: string;
    Status: string;
    PostOffice: PostOffice[] | null;
  }