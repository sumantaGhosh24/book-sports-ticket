export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type CreateSportParams = {
  userId: string;
  sport: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    url: string;
  };
  path: string;
};

export type UpdateSportParams = {
  userId: string;
  sport: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    url: string;
  };
  path: string;
};

export type DeleteSportParams = {
  sportId: string;
  path: string;
};

export type GetAllSportsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetSportsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedSportsByCategoryParams = {
  categoryId: string;
  sportId: string;
  limit?: number;
  page: number | string;
};

export type CreateOrder = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  sport: string;
  user: string;
  totalPrice: number;
};

export type Sport = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

export type CreateCategoryParams = {
  categoryName: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
};
