export type Answer = "blue" | "yellow";

export default interface User {
  name:     string;
  surname:  string;
  id:       string;
  answers:  Answer[];
}

export function createUser(): User {
  return {
    name: "",
    surname: "",
    id: "",
    answers: []
  }
}

export function createUserWithID(id: string): User {
  const nameParts = id.split('-');

  return {
    name: nameParts[1],
    surname: nameParts[0],
    id: id,
    answers: []
  }
}

export function createUserWithName(surname: string, name: string): User {
  return {
    name: name,
    surname: surname,
    id: `${surname}-${name}`,
    answers: []
  }
}

export function userIsInitialized(user: User): boolean {
  const existsAndNotEmpty = (val: string | null | undefined) => val ? true : false;

  return existsAndNotEmpty(user.name) && existsAndNotEmpty(user.surname) && existsAndNotEmpty(user.id);
}

export function createID(name: string, surname: string): string {
  return `${surname}-${name}`;
}

export function parseUser(str: string): User {
  const parsed = JSON.parse(str) as User;

  if (userIsInitialized(parsed)) return parsed;
  else throw new Error("Received JSON object is not a valid user");
}