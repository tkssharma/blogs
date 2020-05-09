interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  },
  posts?: Array<Post>
}

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export type Users = Array<User>;

export type Posts = Array<Post>;